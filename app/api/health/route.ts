import { NextResponse } from 'next/server';

// Interface para métricas de saúde
interface HealthMetrics {
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  memory: NodeJS.MemoryUsage;
  platform: string;
  nodeVersion: string;
  cpuUsage?: NodeJS.CpuUsage;
  processId: number;
  buildTime?: string;
  lastDeploy?: string;
}

// Interface para verificações de saúde
interface HealthCheck {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  duration?: number;
  details?: any;
}

// Interface para resposta de saúde
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: string;
  version: string;
  environment: string;
  checks: HealthCheck[];
  metrics: HealthMetrics;
  uptime: string;
  memory: {
    used: string;
    total: string;
    percentage: number;
  };
}

// Função para formatar bytes
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Função para formatar uptime
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m ${secs}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

// Função para verificar variáveis de ambiente
async function checkEnvironmentVariables(): Promise<HealthCheck> {
  const startTime = Date.now();

  const requiredEnvVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];

  const optionalEnvVars = ['NODE_ENV', 'VERCEL_ENV', 'VERCEL_URL', 'NEXT_PUBLIC_VERCEL_URL'];

  const missingRequired = requiredEnvVars.filter(envVar => !process.env[envVar]);
  const missingOptional = optionalEnvVars.filter(envVar => !process.env[envVar]);

  const duration = Date.now() - startTime;

  if (missingRequired.length > 0) {
    return {
      name: 'environment_variables',
      status: 'unhealthy',
      message: `Missing required environment variables: ${missingRequired.join(', ')}`,
      duration,
      details: {
        missing_required: missingRequired,
        missing_optional: missingOptional,
        present: requiredEnvVars.filter(envVar => process.env[envVar]),
      },
    };
  }

  return {
    name: 'environment_variables',
    status: 'healthy',
    message: 'All required environment variables are present',
    duration,
    details: {
      missing_optional: missingOptional,
      present: requiredEnvVars.filter(envVar => process.env[envVar]),
    },
  };
}

// Função para verificar conectividade com Supabase
async function checkSupabaseConnection(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        name: 'supabase_connection',
        status: 'unhealthy',
        message: 'Supabase credentials not configured',
        duration: Date.now() - startTime,
      };
    }

    // Verificar conectividade básica
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    const duration = Date.now() - startTime;

    if (response.ok) {
      return {
        name: 'supabase_connection',
        status: 'healthy',
        message: 'Supabase connection successful',
        duration,
        details: {
          status_code: response.status,
          response_time: duration,
        },
      };
    } else {
      return {
        name: 'supabase_connection',
        status: 'degraded',
        message: `Supabase connection issues (HTTP ${response.status})`,
        duration,
        details: {
          status_code: response.status,
          response_time: duration,
        },
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: 'supabase_connection',
      status: 'degraded',
      message: `Supabase connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      duration,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        response_time: duration,
      },
    };
  }
}

// Função para verificar uso de memória
async function checkMemoryUsage(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    const memoryUsage = process.memoryUsage();
    const usedMemory = memoryUsage.heapUsed;
    const totalMemory = memoryUsage.heapTotal;
    const memoryPercentage = (usedMemory / totalMemory) * 100;

    const duration = Date.now() - startTime;

    // Alertas baseados no uso de memória
    if (memoryPercentage > 90) {
      return {
        name: 'memory_usage',
        status: 'unhealthy',
        message: `High memory usage: ${memoryPercentage.toFixed(2)}%`,
        duration,
        details: {
          used: formatBytes(usedMemory),
          total: formatBytes(totalMemory),
          percentage: memoryPercentage,
          threshold: '90%',
        },
      };
    } else if (memoryPercentage > 75) {
      return {
        name: 'memory_usage',
        status: 'degraded',
        message: `Elevated memory usage: ${memoryPercentage.toFixed(2)}%`,
        duration,
        details: {
          used: formatBytes(usedMemory),
          total: formatBytes(totalMemory),
          percentage: memoryPercentage,
          threshold: '75%',
        },
      };
    } else {
      return {
        name: 'memory_usage',
        status: 'healthy',
        message: `Memory usage normal: ${memoryPercentage.toFixed(2)}%`,
        duration,
        details: {
          used: formatBytes(usedMemory),
          total: formatBytes(totalMemory),
          percentage: memoryPercentage,
        },
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: 'memory_usage',
      status: 'degraded',
      message: `Memory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      duration,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

// Função para verificar conectividade externa
async function checkExternalConnectivity(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    // Verificar conectividade com serviços externos
    const testUrls = ['https://httpbin.org/status/200', 'https://api.github.com/zen'];

    const results = await Promise.allSettled(
      testUrls.map(url =>
        fetch(url, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000), // 5s timeout
        })
      )
    );

    const successful = results.filter(
      result => result.status === 'fulfilled' && result.value.ok
    ).length;

    const duration = Date.now() - startTime;
    const successRate = (successful / testUrls.length) * 100;

    if (successRate === 100) {
      return {
        name: 'external_connectivity',
        status: 'healthy',
        message: 'External connectivity: 100% success rate',
        duration,
        details: {
          success_rate: successRate,
          tested_urls: testUrls.length,
          successful_requests: successful,
        },
      };
    } else if (successRate >= 50) {
      return {
        name: 'external_connectivity',
        status: 'degraded',
        message: `External connectivity: ${successRate.toFixed(1)}% success rate`,
        duration,
        details: {
          success_rate: successRate,
          tested_urls: testUrls.length,
          successful_requests: successful,
        },
      };
    } else {
      return {
        name: 'external_connectivity',
        status: 'unhealthy',
        message: `External connectivity: ${successRate.toFixed(1)}% success rate`,
        duration,
        details: {
          success_rate: successRate,
          tested_urls: testUrls.length,
          successful_requests: successful,
        },
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: 'external_connectivity',
      status: 'degraded',
      message: `External connectivity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      duration,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

// Função para verificar build e deploy
async function checkBuildInfo(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    const buildTime = process.env.BUILD_TIME || new Date().toISOString();
    const lastDeploy = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';

    const duration = Date.now() - startTime;

    return {
      name: 'build_info',
      status: 'healthy',
      message: 'Build information available',
      duration,
      details: {
        build_time: buildTime,
        last_deploy: lastDeploy,
        environment: process.env.NODE_ENV || 'development',
        vercel_env: process.env.VERCEL_ENV || 'unknown',
      },
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: 'build_info',
      status: 'degraded',
      message: `Build info check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      duration,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

export async function GET() {
  const startTime = Date.now();

  try {
    // Executar todas as verificações de saúde
    const checks = await Promise.all([
      checkEnvironmentVariables(),
      checkSupabaseConnection(),
      checkMemoryUsage(),
      checkExternalConnectivity(),
      checkBuildInfo(),
    ]);

    // Determinar status geral
    const unhealthyChecks = checks.filter(check => check.status === 'unhealthy');
    const degradedChecks = checks.filter(check => check.status === 'degraded');

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let message = 'Vytalle application is running normally';

    if (unhealthyChecks.length > 0) {
      overallStatus = 'unhealthy';
      message = `${unhealthyChecks.length} critical issues detected`;
    } else if (degradedChecks.length > 0) {
      overallStatus = 'degraded';
      message = `${degradedChecks.length} non-critical issues detected`;
    }

    // Coletar métricas
    const memoryUsage = process.memoryUsage();
    const metrics: HealthMetrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: memoryUsage,
      platform: process.platform,
      nodeVersion: process.version,
      processId: process.pid,
      buildTime: process.env.BUILD_TIME,
      lastDeploy: process.env.VERCEL_GIT_COMMIT_SHA,
    };

    // Calcular métricas de memória
    const usedMemory = memoryUsage.heapUsed;
    const totalMemory = memoryUsage.heapTotal;
    const memoryPercentage = (usedMemory / totalMemory) * 100;

    const response: HealthResponse = {
      status: overallStatus,
      message,
      timestamp: metrics.timestamp,
      version: metrics.version,
      environment: metrics.environment,
      checks,
      metrics,
      uptime: formatUptime(metrics.uptime),
      memory: {
        used: formatBytes(usedMemory),
        total: formatBytes(totalMemory),
        percentage: memoryPercentage,
      },
    };

    const totalDuration = Date.now() - startTime;
    const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;

    // Adicionar headers informativos
    const headers = {
      'X-Health-Check-Duration': `${totalDuration}ms`,
      'X-Health-Check-Timestamp': metrics.timestamp,
      'X-Health-Check-Version': metrics.version,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    };

    return NextResponse.json(response, {
      status: statusCode,
      headers,
    });
  } catch (error) {
    console.error('Health check error:', error);

    const errorResponse = {
      status: 'unhealthy' as const,
      message: 'Internal server error during health check',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime,
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  }
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Health-Check': 'available',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
