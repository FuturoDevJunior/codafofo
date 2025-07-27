#!/usr/bin/env node

/**
 * MONITOR DE MEMÓRIA - VYTALLE ESTÉTICA
 * ====================================
 *
 * Script para monitorar uso de memória da aplicação
 * e trigger automático de garbage collection
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  healthEndpoint: 'https://vitalle-omega.vercel.app/api/health',
  checkInterval: 30000, // 30 segundos
  memoryThreshold: 75, // %
  logFile: path.join(__dirname, '../logs/memory.log'),
  maxLogSize: 10 * 1024 * 1024, // 10MB
};

// Garantir que o diretório de logs existe
const logsDir = path.dirname(CONFIG.logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Função para log com timestamp
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    data,
  };

  // console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);

  // Escrever no arquivo de log
  try {
    const logLine = JSON.stringify(logEntry) + '\n';

    // Verificar tamanho do arquivo
    if (fs.existsSync(CONFIG.logFile)) {
      const stats = fs.statSync(CONFIG.logFile);
      if (stats.size > CONFIG.maxLogSize) {
        // Rotacionar log
        const backupFile = CONFIG.logFile + '.backup';
        fs.renameSync(CONFIG.logFile, backupFile);
      }
    }

    fs.appendFileSync(CONFIG.logFile, logLine);
  } catch (error) {
    console.error('Erro ao escrever log:', error.message);
  }
}

// Função para fazer request HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    https
      .get(url, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          const duration = Date.now() - startTime;
          try {
            const parsed = JSON.parse(data);
            resolve({ ...parsed, responseTime: duration });
          } catch (error) {
            reject(new Error(`JSON parse error: ${error.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

// Função para verificar saúde da aplicação
async function checkHealth() {
  try {
    const healthData = await makeRequest(CONFIG.healthEndpoint);

    const memoryPercentage = healthData.memory?.percentage || 0;
    const status = healthData.status;

    log('info', `Health check: ${status}`, {
      memory: healthData.memory,
      uptime: healthData.uptime,
      responseTime: healthData.responseTime,
      checks: healthData.checks?.length || 0,
    });

    // Verificar threshold de memória
    if (memoryPercentage > CONFIG.memoryThreshold) {
      log('warning', `High memory usage: ${memoryPercentage.toFixed(2)}%`, {
        threshold: CONFIG.memoryThreshold,
        current: memoryPercentage,
        recommendation: 'Consider memory optimization',
      });

      // Se memória muito alta, sugerir ações
      if (memoryPercentage > 90) {
        log('error', 'Critical memory usage - immediate action required', {
          memory: memoryPercentage,
          actions: [
            'Check for memory leaks',
            'Restart application if needed',
            'Review large object allocations',
          ],
        });
      }
    }

    // Verificar checks específicos
    if (healthData.checks) {
      const failedChecks = healthData.checks.filter(check => check.status !== 'healthy');
      if (failedChecks.length > 0) {
        log('warning', `${failedChecks.length} health checks failed`, {
          failed: failedChecks.map(check => ({
            name: check.name,
            status: check.status,
            message: check.message,
          })),
        });
      }
    }

    return healthData;
  } catch (error) {
    log('error', `Health check failed: ${error.message}`, {
      endpoint: CONFIG.healthEndpoint,
      error: error.message,
    });
    throw error;
  }
}

// Função para análise de tendências
const healthHistory = [];
const MAX_HISTORY = 50; // Manter últimas 50 verificações

function analyzeHealthTrend(currentHealth) {
  healthHistory.push({
    timestamp: Date.now(),
    memory: currentHealth.memory?.percentage || 0,
    status: currentHealth.status,
  });

  // Manter apenas as últimas verificações
  if (healthHistory.length > MAX_HISTORY) {
    healthHistory.shift();
  }

  if (healthHistory.length < 5) return; // Precisa de histórico mínimo

  // Analisar tendência de memória
  const recentMemory = healthHistory.slice(-5).map(h => h.memory);
  const avgMemory = recentMemory.reduce((a, b) => a + b, 0) / recentMemory.length;
  const trend = recentMemory[recentMemory.length - 1] - recentMemory[0];

  if (trend > 10) {
    log('warning', 'Memory usage trending upward', {
      trend: `+${trend.toFixed(2)}%`,
      current: recentMemory[recentMemory.length - 1],
      average: avgMemory.toFixed(2),
    });
  }
}

// Função principal de monitoramento
async function monitor() {
  log('info', 'Starting Vytalle memory monitor', {
    interval: CONFIG.checkInterval,
    threshold: CONFIG.memoryThreshold,
    endpoint: CONFIG.healthEndpoint,
  });

  while (true) {
    try {
      const healthData = await checkHealth();
      analyzeHealthTrend(healthData);

      // Aguardar próxima verificação
      await new Promise(resolve => setTimeout(resolve, CONFIG.checkInterval));
    } catch (error) {
      log('error', `Monitor error: ${error.message}`);

      // Aguardar mais tempo em caso de erro
      await new Promise(resolve => setTimeout(resolve, CONFIG.checkInterval * 2));
    }
  }
}

// Função para gerar relatório
function generateReport() {
  if (healthHistory.length === 0) {
    // console.log('No health data available for report');
    return;
  }

  const report = {
    period: {
      start: new Date(healthHistory[0].timestamp).toISOString(),
      end: new Date(healthHistory[healthHistory.length - 1].timestamp).toISOString(),
      checks: healthHistory.length,
    },
    memory: {
      current: healthHistory[healthHistory.length - 1].memory,
      average: (healthHistory.reduce((a, h) => a + h.memory, 0) / healthHistory.length).toFixed(2),
      min: Math.min(...healthHistory.map(h => h.memory)),
      max: Math.max(...healthHistory.map(h => h.memory)),
    },
    status: {
      healthy: healthHistory.filter(h => h.status === 'healthy').length,
      degraded: healthHistory.filter(h => h.status === 'degraded').length,
      unhealthy: healthHistory.filter(h => h.status === 'unhealthy').length,
    },
  };

  // console.log('\n=== VYTALLE MEMORY REPORT ===');
  // console.log(JSON.stringify(report, null, 2));

  return report;
}

// Handlers para sinais do sistema
process.on('SIGINT', () => {
  log('info', 'Monitor stopping...');
  generateReport();
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('info', 'Monitor terminated');
  generateReport();
  process.exit(0);
});

// Comando de linha
const command = process.argv[2];

switch (command) {
  case 'check':
    checkHealth()
      .then(data => {
        // console.log(JSON.stringify(data, null, 2));
        process.exit(0);
      })
      .catch(error => {
        // console.error('Check failed:', error.message);
        process.exit(1);
      });
    break;

  case 'report':
    // Executar algumas verificações e gerar relatório
    (async () => {
      for (let i = 0; i < 5; i++) {
        try {
          const healthData = await checkHealth();
          analyzeHealthTrend(healthData);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (_error) {
          // console.error('Check failed:', error.message);
        }
      }
      generateReport();
    })();
    break;

  case 'monitor':
  default:
    monitor().catch(_error => {
      log('error', `Monitor crashed: ${_error.message}`);
      process.exit(1);
    });
}
