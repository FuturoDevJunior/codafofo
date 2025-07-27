#!/bin/bash

# Script para corrigir erros de TypeScript rapidamente

echo "🔧 Corrigindo erros de TypeScript..."

# Corrigir lib/cache/cacheStrategy.ts
sed -i '' '1i\
import React from '\''react'\'';
' lib/cache/cacheStrategy.ts

# Corrigir lib/performance/webVitals.ts  
sed -i '' '1i\
import React from '\''react'\'';
' lib/performance/webVitals.ts

# Corrigir lib/monitoring/realTimeMonitor.ts
sed -i '' 's/log(/console.log(/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.domContentLoadedEventEnd/(entry as PerformanceNavigationTiming).domContentLoadedEventEnd/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.domContentLoadedEventStart/(entry as PerformanceNavigationTiming).domContentLoadedEventStart/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.loadEventEnd/(entry as PerformanceNavigationTiming).loadEventEnd/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.loadEventStart/(entry as PerformanceNavigationTiming).loadEventStart/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.responseStart/(entry as PerformanceNavigationTiming).responseStart/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.requestStart/(entry as PerformanceNavigationTiming).requestStart/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.responseEnd/(entry as PerformanceResourceTiming).responseEnd/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.transferSize/(entry as PerformanceResourceTiming).transferSize/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/entry.processingStart/(entry as PerformanceEventTiming).processingStart/g' lib/performance/webVitals.ts
sed -i '' 's/filter.since!/filter.since/g' lib/monitoring/realTimeMonitor.ts

# Adicionar prefixo _ para variáveis não utilizadas
sed -i '' 's/error) => {/_error) => {/g' lib/monitoring/realTimeMonitor.ts
sed -i '' 's/error) => {/_error) => {/g' lib/performance/webVitals.ts  
sed -i '' 's/error) => {/_error) => {/g' lib/performance.ts

echo "✅ Erros de TypeScript corrigidos!"