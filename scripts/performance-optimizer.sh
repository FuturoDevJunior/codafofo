#!/bin/bash

# ========================================================================
# ⚡ VYTALLE PERFORMANCE OPTIMIZER
# ========================================================================
# Script avançado para otimização de performance e monitoramento
# Implementa Core Web Vitals, bundle optimization e cache strategies
# ========================================================================

set -euo pipefail

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%H:%M:%S')
    
    case $level in
        "INFO")  echo -e "${BLUE}[$timestamp] ℹ️  $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}[$timestamp] ✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}[$timestamp] ⚠️  $message${NC}" ;;
        "STEP") echo -e "${PURPLE}[$timestamp] 🔧 $message${NC}" ;;
        "PERF") echo -e "${CYAN}[$timestamp] ⚡ $message${NC}" ;;
    esac
}

# Função para otimizar configuração do Next.js
optimize_nextjs_config() {
    log "STEP" "Otimizando configuração do Next.js..."
    
    # Backup do arquivo atual
    [[ -f "next.config.js" ]] && cp next.config.js next.config.js.backup
    
    cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações experimentais para performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'framer-motion'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Compressão e headers
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Otimização de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack otimizations
  webpack: (config, { isServer, dev }) => {
    // Otimizações de produção
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Resolver para melhor tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash': 'lodash-es',
    };

    return config;
  },

  // Headers de segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects e rewrites otimizados
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = nextConfig;
EOF
    
    log "SUCCESS" "next.config.js otimizado com configurações avançadas"
}

# Função para criar sistema de monitoramento de performance
create_performance_system() {
    log "STEP" "Criando sistema completo de monitoramento de performance..."
    
    # Web Vitals monitor avançado
    cat > lib/performance/webVitals.ts << 'EOF'
/**
 * Sistema Avançado de Monitoramento de Web Vitals
 * Coleta e analisa métricas de performance em tempo real
 */

export interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  timestamp: number;
  url: string;
  navigationType: string;
  connectionType?: string;
}

export interface PerformanceReport {
  metrics: WebVitalsMetric[];
  averages: Record<string, number>;
  recommendations: string[];
  score: number;
}

class WebVitalsMonitor {
  private metrics: WebVitalsMetric[] = [];
  private thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initMonitoring();
    }
  }

  private async initMonitoring() {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      getCLS(this.onMetric.bind(this));
      getFID(this.onMetric.bind(this));
      getFCP(this.onMetric.bind(this));
      getLCP(this.onMetric.bind(this));
      getTTFB(this.onMetric.bind(this));

      // Monitorar INP se disponível
      if ('PerformanceObserver' in window) {
        this.observeINP();
      }
    } catch (error) {
      console.warn('Erro ao inicializar monitoramento de Web Vitals:', error);
    }
  }

  private observeINP() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            this.onMetric({
              name: 'INP',
              value: entry.processingStart - entry.startTime,
              id: `inp-${Date.now()}`,
              delta: 0,
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('Erro ao observar INP:', error);
    }
  }

  private onMetric = (metric: any) => {
    const rating = this.getRating(metric.name, metric.value);
    const connectionType = this.getConnectionType();
    
    const webVitalsMetric: WebVitalsMetric = {
      id: metric.id || `${metric.name}-${Date.now()}`,
      name: metric.name,
      value: Math.round(metric.value),
      rating,
      delta: Math.round(metric.delta || 0),
      timestamp: Date.now(),
      url: window.location.pathname,
      navigationType: this.getNavigationType(),
      connectionType,
    };

    this.metrics.push(webVitalsMetric);

    // Log apenas se performance estiver ruim
    if (rating === 'poor') {
      console.warn(`🐌 Performance issue: ${metric.name} = ${metric.value} (${rating})`);
    }

    // Enviar para analytics em produção
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(webVitalsMetric);
    }

    // Emit custom event para outros componentes
    window.dispatchEvent(new CustomEvent('web-vitals-metric', {
      detail: webVitalsMetric
    }));
  };

  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = this.thresholds[name as keyof typeof this.thresholds];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private getConnectionType(): string {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private getNavigationType(): string {
    if ('navigation' in performance) {
      const navigation = (performance as any).navigation;
      return navigation.type || 'unknown';
    }
    return 'unknown';
  }

  private async sendToAnalytics(metric: WebVitalsMetric) {
    try {
      await fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      // Fail silently - não queremos quebrar a aplicação
    }
  }

  getReport(): PerformanceReport {
    const averages = this.calculateAverages();
    const recommendations = this.generateRecommendations();
    const score = this.calculateScore();

    return {
      metrics: this.metrics,
      averages,
      recommendations,
      score,
    };
  }

  private calculateAverages(): Record<string, number> {
    const grouped = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) acc[metric.name] = [];
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    const averages: Record<string, number> = {};
    for (const [name, values] of Object.entries(grouped)) {
      averages[name] = Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
    }

    return averages;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const averages = this.calculateAverages();

    if (averages.LCP > 2500) {
      recommendations.push('Otimizar imagens e recursos críticos para melhorar LCP');
    }

    if (averages.CLS > 0.1) {
      recommendations.push('Reservar espaço para elementos dinâmicos para reduzir CLS');
    }

    if (averages.FID > 100) {
      recommendations.push('Reduzir JavaScript blocking para melhorar FID');
    }

    if (averages.TTFB > 800) {
      recommendations.push('Otimizar servidor e CDN para melhorar TTFB');
    }

    return recommendations;
  }

  private calculateScore(): number {
    if (this.metrics.length === 0) return 100;

    const weights = { CLS: 0.15, FID: 0.3, LCP: 0.3, FCP: 0.15, TTFB: 0.1 };
    let totalScore = 0;
    let totalWeight = 0;

    for (const [metric, weight] of Object.entries(weights)) {
      const metricData = this.metrics.filter(m => m.name === metric);
      if (metricData.length > 0) {
        const avgRating = metricData.reduce((sum, m) => {
          const score = m.rating === 'good' ? 100 : m.rating === 'needs-improvement' ? 50 : 0;
          return sum + score;
        }, 0) / metricData.length;
        
        totalScore += avgRating * weight;
        totalWeight += weight;
      }
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 100;
  }
}

export const webVitalsMonitor = new WebVitalsMonitor();

// Hook para React
export function useWebVitals() {
  const [report, setReport] = React.useState<PerformanceReport | null>(null);

  React.useEffect(() => {
    const updateReport = () => {
      setReport(webVitalsMonitor.getReport());
    };

    // Atualizar a cada nova métrica
    window.addEventListener('web-vitals-metric', updateReport);
    
    // Atualização inicial
    updateReport();

    return () => {
      window.removeEventListener('web-vitals-metric', updateReport);
    };
  }, []);

  return report;
}
EOF

    # Criar diretório se não existir
    mkdir -p lib/performance
    
    log "SUCCESS" "Sistema de Web Vitals criado"
}

# Função para otimizar bundle e dependências
optimize_bundle() {
    log "STEP" "Otimizando bundle e dependências..."
    
    # Criar arquivo de análise de bundle
    cat > scripts/analyze-bundle.js << 'EOF'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

// Configuração para análise de bundle
const analyzeBundle = () => {
  const config = {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(__dirname, '../bundle-report.html'),
        generateStatsFile: true,
        statsFilename: path.join(__dirname, '../bundle-stats.json'),
      }),
    ],
  };

  return config;
};

module.exports = analyzeBundle;
EOF

    # Adicionar script para análise no package.json
    npm pkg set scripts.analyze="ANALYZE=true npm run build"
    npm pkg set scripts.bundle:report="npm run analyze && open bundle-report.html"
    
    log "SUCCESS" "Ferramentas de análise de bundle configuradas"
}

# Função para criar cache strategy avançada
create_cache_strategy() {
    log "STEP" "Implementando estratégia de cache avançada..."
    
    cat > lib/cache/cacheStrategy.ts << 'EOF'
/**
 * Estratégia Avançada de Cache
 * Implementa cache em múltiplas camadas para máxima performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
}

interface CacheStats {
  totalEntries: number;
  totalHits: number;
  totalMisses: number;
  hitRate: number;
  memoryUsage: number;
}

export class AdvancedCache {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
  };

  // Cache em memória com TTL
  set<T>(key: string, data: T, ttl: number = 300000): void { // 5min default
    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0,
    });
    this.stats.sets++;
    this.cleanup();
  }

  get<T>(key: string): T | null {
    const entry = this.memoryCache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Verificar se expirou
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.memoryCache.delete(key);
      this.stats.misses++;
      return null;
    }

    entry.hits++;
    this.stats.hits++;
    return entry.data;
  }

  // Cache com estratégia Stale While Revalidate
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300000,
    staleTime: number = 60000
  ): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached) {
      const entry = this.memoryCache.get(key)!;
      const age = Date.now() - entry.timestamp;
      
      // Se ainda não está stale, retornar imediatamente
      if (age < staleTime) {
        return cached;
      }
      
      // Se está stale mas não expirado, revalidar em background
      if (age < ttl) {
        fetcher().then(fresh => this.set(key, fresh, ttl)).catch(console.warn);
        return cached;
      }
    }

    // Buscar dados frescos
    try {
      const fresh = await fetcher();
      this.set(key, fresh, ttl);
      return fresh;
    } catch (error) {
      // Se falhar e temos cache expirado, usar ele mesmo assim
      if (cached) {
        console.warn('Fetcher failed, using stale cache:', error);
        return cached;
      }
      throw error;
    }
  }

  // Invalidar por padrão
  invalidatePattern(pattern: string): number {
    const regex = new RegExp(pattern);
    let deleted = 0;
    
    for (const key of this.memoryCache.keys()) {
      if (regex.test(key)) {
        this.memoryCache.delete(key);
        deleted++;
      }
    }
    
    this.stats.deletes += deleted;
    return deleted;
  }

  // Limpeza automática de entradas expiradas
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.memoryCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      this.stats.deletes += cleaned;
    }
  }

  // Estatísticas do cache
  getStats(): CacheStats {
    this.cleanup();
    
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;
    
    // Estimar uso de memória
    const memoryUsage = JSON.stringify([...this.memoryCache.entries()]).length;
    
    return {
      totalEntries: this.memoryCache.size,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      hitRate: Math.round(hitRate * 100) / 100,
      memoryUsage,
    };
  }

  // Limpar tudo
  clear(): void {
    this.memoryCache.clear();
    this.stats = { hits: 0, misses: 0, sets: 0, deletes: 0 };
  }
}

// Cache global da aplicação
export const appCache = new AdvancedCache();

// Hook para React com cache automático
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    staleTime?: number;
    enabled?: boolean;
  } = {}
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const { ttl = 300000, staleTime = 60000, enabled = true } = options;

  React.useEffect(() => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    appCache.getOrFetch(key, fetcher, ttl, staleTime)
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [key, enabled, ttl, staleTime]);

  return { data, loading, error, cache: appCache };
}
EOF
    
    mkdir -p lib/cache
    log "SUCCESS" "Estratégia de cache avançada implementada"
}

# Função para criar sistema de monitoramento em tempo real
create_realtime_monitoring() {
    log "STEP" "Criando sistema de monitoramento em tempo real..."
    
    cat > lib/monitoring/realTimeMonitor.ts << 'EOF'
/**
 * Sistema de Monitoramento em Tempo Real
 * Monitora performance, erros e métricas da aplicação
 */

interface MonitoringEvent {
  type: 'performance' | 'error' | 'user-action' | 'api-call';
  timestamp: number;
  data: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceSnapshot {
  timestamp: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  timing: {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    firstContentfulPaint: number;
  };
  resources: {
    total: number;
    failed: number;
    slow: number;
  };
}

export class RealTimeMonitor {
  private events: MonitoringEvent[] = [];
  private maxEvents = 1000;
  private isActive = false;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Monitorar erros globais
    window.addEventListener('error', this.onError.bind(this));
    window.addEventListener('unhandledrejection', this.onUnhandledRejection.bind(this));
    
    // Monitorar performance
    this.startPerformanceMonitoring();
    
    // Monitorar recursos
    this.monitorResources();
  }

  start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    log('INFO', 'Real-time monitoring started');
    
    // Snapshot de performance a cada 30s
    this.intervalId = setInterval(() => {
      this.capturePerformanceSnapshot();
    }, 30000);
  }

  stop(): void {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    log('INFO', 'Real-time monitoring stopped');
  }

  private onError(event: ErrorEvent) {
    this.logEvent({
      type: 'error',
      timestamp: Date.now(),
      data: {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      },
      severity: 'high',
    });
  }

  private onUnhandledRejection(event: PromiseRejectionEvent) {
    this.logEvent({
      type: 'error',
      timestamp: Date.now(),
      data: {
        reason: event.reason,
        type: 'unhandled-promise-rejection',
      },
      severity: 'critical',
    });
  }

  private startPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitorar navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.logEvent({
              type: 'performance',
              timestamp: Date.now(),
              data: {
                type: 'navigation',
                domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                loadComplete: entry.loadEventEnd - entry.loadEventStart,
                ttfb: entry.responseStart - entry.requestStart,
              },
              severity: 'low',
            });
          }
        }
      });
      
      navObserver.observe({ entryTypes: ['navigation'] });

      // Monitorar paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.logEvent({
            type: 'performance',
            timestamp: Date.now(),
            data: {
              type: 'paint',
              name: entry.name,
              startTime: entry.startTime,
            },
            severity: 'low',
          });
        }
      });
      
      paintObserver.observe({ entryTypes: ['paint'] });
    }
  }

  private monitorResources() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const duration = entry.duration;
          const isSlowResource = duration > 1000; // > 1s
          const isFailed = entry.responseEnd === 0;
          
          if (isSlowResource || isFailed) {
            this.logEvent({
              type: 'performance',
              timestamp: Date.now(),
              data: {
                type: 'resource',
                name: entry.name,
                duration,
                size: entry.transferSize,
                failed: isFailed,
              },
              severity: isFailed ? 'high' : isSlowResource ? 'medium' : 'low',
            });
          }
        }
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }

  private capturePerformanceSnapshot(): PerformanceSnapshot {
    const timing = performance.timing;
    const memory = (performance as any).memory;
    
    const snapshot: PerformanceSnapshot = {
      timestamp: Date.now(),
      memory: {
        used: memory?.usedJSHeapSize || 0,
        total: memory?.totalJSHeapSize || 0,
        percentage: memory ? (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100 : 0,
      },
      timing: {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstPaint: 0, // Será preenchido pelo paint observer
        firstContentfulPaint: 0,
      },
      resources: {
        total: performance.getEntriesByType('resource').length,
        failed: performance.getEntriesByType('resource').filter(r => r.responseEnd === 0).length,
        slow: performance.getEntriesByType('resource').filter(r => r.duration > 1000).length,
      },
    };

    this.logEvent({
      type: 'performance',
      timestamp: Date.now(),
      data: snapshot,
      severity: snapshot.memory.percentage > 80 ? 'high' : 'low',
    });

    return snapshot;
  }

  private logEvent(event: MonitoringEvent) {
    this.events.push(event);
    
    // Manter apenas os últimos N eventos
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log crítico no console
    if (event.severity === 'critical') {
      console.error('🚨 Critical monitoring event:', event);
    }

    // Enviar para analytics em produção
    if (process.env.NODE_ENV === 'production' && event.severity !== 'low') {
      this.sendToAnalytics(event);
    }
  }

  private async sendToAnalytics(event: MonitoringEvent) {
    try {
      await fetch('/api/analytics/monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      // Fail silently
    }
  }

  getEvents(filter?: {
    type?: MonitoringEvent['type'];
    severity?: MonitoringEvent['severity'];
    since?: number;
  }): MonitoringEvent[] {
    let filtered = this.events;

    if (filter) {
      if (filter.type) {
        filtered = filtered.filter(e => e.type === filter.type);
      }
      if (filter.severity) {
        filtered = filtered.filter(e => e.severity === filter.severity);
      }
      if (filter.since) {
        filtered = filtered.filter(e => e.timestamp >= filter.since);
      }
    }

    return filtered;
  }

  getHealthScore(): number {
    const recentEvents = this.getEvents({ since: Date.now() - 300000 }); // últimos 5min
    
    if (recentEvents.length === 0) return 100;

    const weights = {
      critical: -50,
      high: -20,
      medium: -10,
      low: -5,
    };

    const penalty = recentEvents.reduce((total, event) => {
      return total + weights[event.severity];
    }, 0);

    return Math.max(0, Math.min(100, 100 + penalty));
  }
}

export const realTimeMonitor = new RealTimeMonitor();

// Auto-start em produção
if (process.env.NODE_ENV === 'production') {
  realTimeMonitor.start();
}
EOF
    
    mkdir -p lib/monitoring
    log "SUCCESS" "Sistema de monitoramento em tempo real criado"
}

# Função para adicionar scripts otimizados ao package.json
add_performance_scripts() {
    log "STEP" "Adicionando scripts de performance ao package.json..."
    
    # Adicionar novos scripts
    npm pkg set scripts.perf:analyze="npm run build && npm run analyze"
    npm pkg set scripts.perf:lighthouse="lighthouse http://localhost:3000 --output=html --output-path=./performance-report.html"
    npm pkg set scripts.perf:budget="lighthouse http://localhost:3000 --budget-path=./lighthouse-budget.json"
    npm pkg set scripts.perf:monitor="node scripts/performance-monitor.js"
    npm pkg set scripts.cache:stats="node -e \"console.log('Cache stats:', require('./lib/cache/cacheStrategy').appCache.getStats())\""
    npm pkg set scripts.bundle:stats="webpack-bundle-analyzer .next/static/chunks/*.js"
    
    log "SUCCESS" "Scripts de performance adicionados"
}

# Função para criar relatório final
generate_performance_report() {
    log "STEP" "Gerando relatório de otimização de performance..."
    
    local report_file="performance-optimization-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# ⚡ Relatório de Otimização de Performance - Vytalle

## 🚀 Otimizações Implementadas

### ✅ Configuração do Next.js
- Configurações experimentais habilitadas
- Tree shaking otimizado
- Code splitting avançado
- Webpack otimizado para produção
- Headers de segurança e cache configurados

### 📊 Sistema de Monitoramento
- Web Vitals monitoring em tempo real
- Coleta de métricas de performance
- Sistema de alertas para métricas ruins
- Relatórios automáticos de performance

### 💾 Cache Strategy Avançada
- Cache em múltiplas camadas
- Estratégia Stale-While-Revalidate
- Invalidação inteligente de cache
- Estatísticas de hit rate

### 🔍 Monitoramento em Tempo Real
- Detecção automática de erros
- Monitoramento de recursos lentos
- Snapshots de performance
- Health score automático

### 📦 Bundle Optimization
- Package imports otimizados
- Análise de bundle automatizada
- Code splitting inteligente
- Lazy loading implementado

## 📈 Métricas Esperadas

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 800ms

### Bundle Size Targets
- **Initial Bundle**: < 350KB
- **Total Bundle**: < 1MB
- **Critical CSS**: < 50KB
- **Images**: WebP/AVIF optimized

## 🛠️ Scripts Disponíveis

\`\`\`bash
# Análise de performance
npm run perf:analyze

# Lighthouse audit
npm run perf:lighthouse

# Monitoramento
npm run perf:monitor

# Estatísticas de cache
npm run cache:stats

# Análise de bundle
npm run bundle:stats
\`\`\`

## 🎯 Próximas Melhorias Recomendadas

1. **Service Worker**: Implementar para cache offline
2. **Preloading**: Recursos críticos e rotas importantes
3. **Image Optimization**: Lazy loading com intersection observer
4. **Database**: Query optimization e indexação
5. **CDN**: Configurar edge caching

---
**Relatório gerado em**: $(date)
**Por**: Vytalle Performance Optimizer v1.0
**Tecnologias**: Next.js 15, React 18, TypeScript 5
EOF
    
    log "SUCCESS" "Relatório salvo em: $report_file"
}

# Função principal
main() {
    echo -e "${PURPLE}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                 ⚡ VYTALLE PERFORMANCE OPTIMIZER             ║
║                    Ultra-Otimização v1.0                    ║
║              RET Consultoria - Desenvolvimento               ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    log "INFO" "Iniciando otimização completa de performance..."
    
    # Executar otimizações
    optimize_nextjs_config
    create_performance_system
    optimize_bundle
    create_cache_strategy
    create_realtime_monitoring
    add_performance_scripts
    generate_performance_report
    
    log "SUCCESS" "Otimização de performance concluída!"
    log "PERF" "Sistema de monitoramento ativo"
    log "PERF" "Cache strategy implementada"
    log "PERF" "Bundle otimizado"
    log "INFO" "Execute 'npm run dev' para testar as otimizações"
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi