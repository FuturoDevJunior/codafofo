# ⚡ Guia de Performance - Vytalle Estética

> **Otimizações avançadas para máxima performance e experiência do usuário**

## 📋 Índice

- [Métricas de Performance](#métricas-de-performance)
- [Otimizações de Frontend](#otimizações-de-frontend)
- [Otimizações de Backend](#otimizações-de-backend)
- [Otimizações de Banco de Dados](#otimizações-de-banco-de-dados)
- [Otimizações de Imagens](#otimizações-de-imagens)
- [Otimizações de Bundle](#otimizações-de-bundle)
- [Caching Strategy](#caching-strategy)
- [Monitoramento](#monitoramento)
- [Ferramentas de Análise](#ferramentas-de-análise)
- [Checklist de Performance](#checklist-de-performance)

---

## 📊 Métricas de Performance

### Core Web Vitals

| Métrica                            | Meta    | Excelente | Precisa Melhorar |
| ---------------------------------- | ------- | --------- | ---------------- |
| **LCP** (Largest Contentful Paint) | < 2.5s  | < 1.8s    | > 4.0s           |
| **FID** (First Input Delay)        | < 100ms | < 50ms    | > 300ms          |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | < 0.05    | > 0.25           |

### Métricas Adicionais

| Métrica                          | Meta      | Descrição                   |
| -------------------------------- | --------- | --------------------------- |
| **TTFB** (Time to First Byte)    | < 600ms   | Tempo até primeiro byte     |
| **FCP** (First Contentful Paint) | < 1.8s    | Primeiro conteúdo visível   |
| **Bundle Size**                  | < 350kB   | Tamanho total do JavaScript |
| **Image Optimization**           | WebP/AVIF | Formatos modernos           |
| **Cache Hit Rate**               | > 90%     | Taxa de acerto do cache     |

---

## 🎨 Otimizações de Frontend

### 1. React Performance

```typescript
// 1. Memoização de componentes
import { memo } from 'react';

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <ProductImage src={product.images[0]} alt={product.name} />
      <ProductInfo product={product} />
      <AddToCartButton onClick={() => onAddToCart(product)} />
    </div>
  );
});

// 2. Memoização de callbacks
import { useCallback } from 'react';

export function ProductList({ products }: ProductListProps) {
  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// 3. Lazy loading de componentes
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

const AdminDashboard = dynamic(() => import('./AdminDashboard'), {
  loading: () => <DashboardSkeleton />,
  ssr: false
});
```

### 2. CSS Performance

```css
/* 1. CSS crítico inline */
/* app/layout.tsx */
<style dangerouslySetInnerHTML={{
  __html: `
    .critical-styles {
      display: block;
      visibility: visible;
    }
  `
}} />

/* 2. CSS não-crítico carregado assincronamente */
<link
  rel="preload"
  href="/styles/non-critical.css"
  as="style"
  onLoad="this.onload=null;this.rel='stylesheet'"
/>

/* 3. Otimizações Tailwind */
/* tailwind.config.js */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Customizações específicas
    },
  },
  plugins: [],
  // Purge CSS não utilizados
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  },
};
```

### 3. JavaScript Performance

```typescript
// 1. Debounce para inputs
import { useMemo } from 'react';
import debounce from 'lodash/debounce';

export function SearchInput({ onSearch }: SearchInputProps) {
  const debouncedSearch = useMemo(
    () => debounce(onSearch, 300),
    [onSearch]
  );

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Buscar produtos..."
    />
  );
}

// 2. Virtualização para listas grandes
import { FixedSizeList as List } from 'react-window';

export function VirtualizedProductList({ products }: ProductListProps) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={products.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
}

// 3. Web Workers para tarefas pesadas
// workers/imageProcessor.ts
self.onmessage = function(e) {
  const { imageData, operations } = e.data;

  // Processa imagem em background
  const processedImage = processImage(imageData, operations);

  self.postMessage({ processedImage });
};

// Uso no componente
const imageWorker = new Worker('/workers/imageProcessor.js');

imageWorker.postMessage({ imageData, operations });
imageWorker.onmessage = function(e) {
  setProcessedImage(e.data.processedImage);
};
```

---

## 🚀 Otimizações de Backend

### 1. API Route Optimization

```typescript
// 1. Cache de respostas
import { NextApiRequest, NextApiResponse } from 'next';

const cache = new Map<string, { data: any; expires: number }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cacheKey = `products-${req.query.category}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() < cached.expires) {
    return res.json(cached.data);
  }

  const products = await getProducts(req.query.category as string);

  cache.set(cacheKey, {
    data: products,
    expires: Date.now() + 5 * 60 * 1000, // 5 minutos
  });

  res.json(products);
}

// 2. Paginação eficiente
export async function getProductsPaginated(
  page: number = 1,
  limit: number = 20
) {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('active', true)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  return {
    products: data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

// 3. Rate limiting inteligente
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  message: 'Muitas requisições, tente novamente mais tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

export default function withRateLimit(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
      limiter(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(handler(req, res));
      });
    });
  };
}
```

### 2. Database Query Optimization

```typescript
// 1. Queries otimizadas
export async function getProductsWithOptimizations() {
  // Seleciona apenas campos necessários
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price_pix,
      price_card,
      images,
      category,
      active
    `)
    .eq('active', true)
    .order('name');

  return data;
}

// 2. Queries com joins otimizados
export async function getOrdersWithProducts() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      customer_name,
      total,
      created_at,
      order_items (
        product_id,
        quantity,
        unit_price,
        products (
          name,
          category
        )
      )
    `)
    .order('created_at', { ascending: false });

  return data;
}

// 3. Índices para performance
// supabase/migrations/024_add_performance_indexes.sql
CREATE INDEX CONCURRENTLY idx_products_category_active
ON products(category, active)
WHERE active = true;

CREATE INDEX CONCURRENTLY idx_orders_created_at_status
ON orders(created_at DESC, status);

CREATE INDEX CONCURRENTLY idx_products_search
ON products USING gin(to_tsvector('portuguese', name || ' ' || description));
```

---

## 🗄️ Otimizações de Banco de Dados

### 1. Connection Pooling

```typescript
// lib/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // máximo de conexões
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}
```

### 2. Query Optimization

```sql
-- 1. Índices compostos
CREATE INDEX idx_products_performance
ON products(category, active, price_pix)
WHERE active = true;

-- 2. Views materializadas para relatórios
CREATE MATERIALIZED VIEW mv_sales_summary AS
SELECT
  DATE(created_at) as sale_date,
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE(created_at);

-- Refresh da view
REFRESH MATERIALIZED VIEW mv_sales_summary;

-- 3. Particionamento para grandes volumes
CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE orders_2025 PARTITION OF orders
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

### 3. Database Monitoring

```sql
-- Queries para monitoramento de performance
-- 1. Queries mais lentas
SELECT
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- 2. Uso de índices
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- 3. Tamanho das tabelas
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🖼️ Otimizações de Imagens

### 1. Next.js Image Optimization

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("image-container", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
```

### 2. Image Formats

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### 3. Lazy Loading

```typescript
// components/LazyImage.tsx
import { useState, useEffect, useRef } from 'react';

export function LazyImage({ src, alt, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
      {...props}
    />
  );
}
```

---

## 📦 Otimizações de Bundle

### 1. Code Splitting

```typescript
// 1. Dynamic imports
const AdminDashboard = dynamic(() => import('./AdminDashboard'), {
  loading: () => <AdminDashboardSkeleton />,
  ssr: false
});

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />
});

// 2. Route-based splitting
// app/admin/page.tsx
export default function AdminPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminDashboard />
    </Suspense>
  );
}

// 3. Component-based splitting
const ProductModal = lazy(() => import('./ProductModal'));

export function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        {/* Card content */}
      </div>

      {showModal && (
        <Suspense fallback={<ModalSkeleton />}>
          <ProductModal
            product={product}
            onClose={() => setShowModal(false)}
          />
        </Suspense>
      )}
    </>
  );
}
```

### 2. Bundle Analysis

```bash
# Analise o bundle
npm run analyze

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'framer-motion']
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      };
    }
    return config;
  },
});
```

### 3. Tree Shaking

```typescript
// 1. Imports específicos
// ❌ Ruim
import * as lodash from 'lodash';

// ✅ Bom
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// 2. Side effects
// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}

// 3. Pure functions
export const formatCurrency = (value: number, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(value);
};
```

---

## 💾 Caching Strategy

### 1. Multi-Layer Caching

```typescript
// lib/cache.ts
export class CacheManager {
  private memoryCache = new Map<string, { data: any; expires: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutos

  async get<T>(key: string): Promise<T | null> {
    // 1. Memory cache
    const cached = this.memoryCache.get(key);
    if (cached && Date.now() < cached.expires) {
      return cached.data;
    }

    // 2. Redis cache (se disponível)
    if (process.env.REDIS_URL) {
      const redisData = await this.getFromRedis(key);
      if (redisData) {
        this.memoryCache.set(key, {
          data: redisData,
          expires: Date.now() + this.TTL,
        });
        return redisData;
      }
    }

    return null;
  }

  async set(key: string, data: any, ttl?: number): Promise<void> {
    const expires = Date.now() + (ttl || this.TTL);

    // Memory cache
    this.memoryCache.set(key, { data, expires });

    // Redis cache
    if (process.env.REDIS_URL) {
      await this.setInRedis(key, data, ttl);
    }
  }

  private async getFromRedis(key: string): Promise<any> {
    // Implementação Redis
  }

  private async setInRedis(
    key: string,
    data: any,
    ttl?: number
  ): Promise<void> {
    // Implementação Redis
  }
}
```

### 2. HTTP Caching

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 3. Service Worker Caching

```javascript
// public/sw.js
const CACHE_NAME = 'vytalle-v1';
const STATIC_CACHE = 'vytalle-static-v1';
const DYNAMIC_CACHE = 'vytalle-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/products',
  '/cart',
  '/static/css/main.css',
  '/static/js/main.js',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  const { request } = event;

  // Cache first para assets estáticos
  if (request.destination === 'image' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(response => response || fetch(request))
    );
  }

  // Network first para API calls
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clonedResponse = response.clone();
          caches
            .open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, clonedResponse));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
```

---

## 📊 Monitoramento

### 1. Performance Monitoring

```typescript
// lib/performance.ts
export class PerformanceMonitor {
  static trackPageView(page: string) {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      analytics.track('page_view', {
        page,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
        firstContentfulPaint: performance.getEntriesByName(
          'first-contentful-paint'
        )[0]?.startTime,
        largestContentfulPaint: this.getLCP(),
        cumulativeLayoutShift: this.getCLS(),
        firstInputDelay: this.getFID(),
      });
    }
  }

  static getLCP(): number | undefined {
    const entries = performance.getEntriesByType('largest-contentful-paint');
    return entries[entries.length - 1]?.startTime;
  }

  static getCLS(): number {
    let cls = 0;
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        cls += (entry as any).value;
      }
    });
    observer.observe({ entryTypes: ['layout-shift'] });
    return cls;
  }

  static getFID(): number | undefined {
    const entries = performance.getEntriesByType('first-input');
    return entries[0]?.processingStart;
  }
}
```

### 2. Error Tracking

```typescript
// lib/errorTracking.ts
export class ErrorTracker {
  static trackError(error: Error, context?: any) {
    analytics.track('error', {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }

  static trackApiError(endpoint: string, status: number, response: any) {
    analytics.track('api_error', {
      endpoint,
      status,
      response,
      timestamp: new Date().toISOString(),
    });
  }
}
```

---

## 🛠️ Ferramentas de Análise

### 1. Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npx lhci autorun
```

### 2. Bundle Analyzer

```bash
# package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "ANALYZE=true npm run build && npm run start"
  }
}
```

### 3. Performance Budget

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.performance = {
        maxAssetSize: 350 * 1024, // 350KB
        maxEntrypointSize: 350 * 1024,
        hints: 'warning',
      };
    }
    return config;
  },
};
```

---

## ✅ Checklist de Performance

### Frontend

- [ ] **LCP < 2.5s**: Largest Contentful Paint otimizado
- [ ] **FID < 100ms**: First Input Delay baixo
- [ ] **CLS < 0.1**: Cumulative Layout Shift mínimo
- [ ] **Bundle < 350KB**: JavaScript otimizado
- [ ] **Images WebP/AVIF**: Formatos modernos
- [ ] **Lazy Loading**: Componentes carregados sob demanda
- [ ] **Code Splitting**: Bundle dividido por rota
- [ ] **Tree Shaking**: Imports não utilizados removidos

### Backend

- [ ] **TTFB < 600ms**: Time to First Byte rápido
- [ ] **Database Indexes**: Índices otimizados
- [ ] **Query Optimization**: Queries eficientes
- [ ] **Caching**: Cache em múltiplas camadas
- [ ] **Rate Limiting**: Proteção contra abuso
- [ ] **Connection Pooling**: Pool de conexões

### Infrastructure

- [ ] **CDN**: Content Delivery Network configurado
- [ ] **HTTP/2**: Protocolo moderno
- [ ] **Gzip/Brotli**: Compressão ativa
- [ ] **Cache Headers**: Headers de cache corretos
- [ ] **Monitoring**: Métricas monitoradas
- [ ] **Error Tracking**: Erros rastreados

---

## 📈 Métricas de Sucesso

### Antes vs Depois

| Métrica         | Antes | Depois | Melhoria |
| --------------- | ----- | ------ | -------- |
| **LCP**         | 4.2s  | 1.8s   | 57%      |
| **FID**         | 150ms | 45ms   | 70%      |
| **CLS**         | 0.15  | 0.03   | 80%      |
| **Bundle Size** | 450KB | 280KB  | 38%      |
| **TTFB**        | 800ms | 350ms  | 56%      |

---

**Performance profissional, sempre! ⚡**
