# 🔧 Troubleshooting - Vytalle Estética

> **Guia completo para resolver problemas comuns e emergências**

## 📋 Índice

- [Problemas de Setup](#problemas-de-setup)
- [Problemas de Build](#problemas-de-build)
- [Problemas de Banco](#problemas-de-banco)
- [Problemas de Testes](#problemas-de-testes)
- [Problemas de Deploy](#problemas-de-deploy)
- [Problemas de Performance](#problemas-de-performance)
- [Problemas de Segurança](#problemas-de-segurança)
- [Comandos de Emergência](#comandos-de-emergência)
- [Debug Avançado](#debug-avançado)

---

## 🚀 Problemas de Setup

### ❌ Erro: "Cannot find module"

**Sintomas:**

```bash
Error: Cannot find module 'next'
Error: Cannot find module '@supabase/supabase-js'
```

**Solução:**

```bash
# 1. Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# 2. Se persistir, verificar Node.js
node --version  # Deve ser >= 18.0.0
npm --version   # Deve ser >= 9.0.0

# 3. Reset completo
rm -rf .next node_modules package-lock.json
npm cache clean --force
npm install
```

### ❌ Erro: "Environment variables not found"

**Sintomas:**

```bash
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
Error: SUPABASE_SERVICE_ROLE_KEY is missing
```

**Solução:**

```bash
# 1. Verificar arquivo .env.local
ls -la .env.local

# 2. Criar se não existir
cp .env.example .env.local

# 3. Editar com suas credenciais
nano .env.local

# 4. Verificar variáveis obrigatórias
grep -E "NEXT_PUBLIC_SUPABASE|SUPABASE_SERVICE|ADMIN_" .env.local
```

### ❌ Erro: "Port 3000 is already in use"

**Solução:**

```bash
# 1. Encontrar processo
lsof -ti:3000

# 2. Matar processo
kill -9 $(lsof -ti:3000)

# 3. Ou usar porta diferente
npm run dev -- -p 3001
```

---

## 🔨 Problemas de Build

### ❌ Erro: "Build failed"

**Sintomas:**

```bash
Error: Build failed
Error: TypeScript compilation failed
Error: ESLint errors found
```

**Solução:**

```bash
# 1. Verificar TypeScript
npm run type-check

# 2. Verificar ESLint
npm run lint

# 3. Corrigir automaticamente
npm run lint:fix

# 4. Build limpo
rm -rf .next
npm run build

# 5. Se persistir, reset completo
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### ❌ Erro: "Module not found"

**Sintomas:**

```bash
Module not found: Can't resolve '@/components/ProductCard'
Module not found: Can't resolve '@/lib/supabase'
```

**Solução:**

```bash
# 1. Verificar imports
grep -r "import.*@/" src/

# 2. Verificar tsconfig.json paths
cat tsconfig.json | grep -A 5 "paths"

# 3. Verificar estrutura de arquivos
find . -name "ProductCard.tsx"
find . -name "supabase.ts"

# 4. Corrigir imports
# Mudar de: import { ProductCard } from '@/components/ProductCard'
# Para: import { ProductCard } from '@/components/ProductCard/ProductCard'
```

### ❌ Erro: "Bundle size too large"

**Sintomas:**

```bash
Warning: Bundle size is 500KB (limit: 350KB)
```

**Solução:**

```bash
# 1. Analisar bundle
npm run analyze

# 2. Verificar dependências
npm ls --depth=0

# 3. Otimizar imports
# Mudar de: import * as React from 'react'
# Para: import { useState, useEffect } from 'react'

# 4. Usar dynamic imports
# Mudar de: import HeavyComponent from './HeavyComponent'
# Para: const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

---

## 🗄️ Problemas de Banco

### ❌ Erro: "Database connection failed"

**Sintomas:**

```bash
Error: connect ECONNREFUSED
Error: Invalid API key
Error: Database not found
```

**Solução:**

```bash
# 1. Verificar credenciais
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# 2. Testar conexão
npx supabase status

# 3. Resetar banco
npm run db:init

# 4. Se persistir, verificar Supabase
npx supabase db reset --linked --yes
```

### ❌ Erro: "Migration failed"

**Sintomas:**

```bash
Error: Migration 001_products.sql failed
Error: Table already exists
```

**Solução:**

```bash
# 1. Verificar migrations
ls -la supabase/migrations/

# 2. Resetar migrations
npx supabase db reset --linked --yes

# 3. Aplicar migrations manualmente
npx supabase db push

# 4. Se persistir, reset completo
npx supabase db reset --linked --yes
npm run db:init
```

### ❌ Erro: "RLS policy error"

**Sintomas:**

```bash
Error: Row Level Security policy violation
Error: Access denied to table
```

**Solução:**

```bash
# 1. Verificar policies
npx supabase db diff --schema public

# 2. Recriar policies
npx supabase db reset --linked --yes

# 3. Verificar autenticação
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-project.supabase.co/rest/v1/products
```

---

## 🧪 Problemas de Testes

### ❌ Erro: "Tests failing"

**Sintomas:**

```bash
FAIL  src/components/ProductCard.test.tsx
Error: expect(received).toBe(expected)
```

**Solução:**

```bash
# 1. Rodar testes específicos
npm run test ProductCard

# 2. Modo watch para debug
npm run test:watch

# 3. Reset completo
npm run test:reset

# 4. Verificar cobertura
npm run test:coverage
```

### ❌ Erro: "act() warnings"

**Sintomas:**

```bash
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solução:**

```typescript
// 1. Importar act
import { act } from '@testing-library/react';

// 2. Envolver operações assíncronas
await act(async () => {
  await user.click(button);
});

// 3. Ou usar waitFor
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

### ❌ Erro: "Mock not working"

**Sintomas:**

```bash
Error: Cannot find module 'framer-motion'
Error: Mock not hoisted
```

**Solução:**

```typescript
// 1. Mover mocks para topo do arquivo
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

// 2. Usar vi.hoisted se necessário
const mockComponent = vi.hoisted(() => {
  return ({ children }) => <div>{children}</div>;
});

vi.mock('@/components/Component', () => ({
  default: mockComponent
}));
```

---

## 🚀 Problemas de Deploy

### ❌ Erro: "Deploy failed on Vercel"

**Sintomas:**

```bash
Error: Build failed
Error: Environment variables missing
Error: TypeScript compilation failed
```

**Solução:**

```bash
# 1. Verificar build local
npm run build

# 2. Verificar variáveis de ambiente
vercel env ls

# 3. Adicionar variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY

# 4. Deploy forçado
vercel --prod --force

# 5. Rollback se necessário
vercel rollback
```

### ❌ Erro: "Domain not working"

**Sintomas:**

```bash
Error: Domain not configured
Error: SSL certificate failed
```

**Solução:**

```bash
# 1. Verificar domínio
vercel domains ls

# 2. Adicionar domínio
vercel domains add your-domain.com

# 3. Configurar DNS
# Adicionar CNAME: your-domain.com -> cname.vercel-dns.com

# 4. Verificar SSL
curl -I https://your-domain.com
```

### ❌ Erro: "Function timeout"

**Sintomas:**

```bash
Error: Function execution timeout
Error: 504 Gateway Timeout
```

**Solução:**

```typescript
// 1. Otimizar queries
const products = await supabase
  .from('products')
  .select('id, name, price_pix')
  .eq('active', true)
  .limit(50);

// 2. Usar cache
const cachedProducts = await redis.get('products');
if (cachedProducts) return JSON.parse(cachedProducts);

// 3. Implementar paginação
const products = await supabase
  .from('products')
  .select('*')
  .range(offset, offset + limit);
```

---

## ⚡ Problemas de Performance

### ❌ Erro: "Core Web Vitals poor"

**Sintomas:**

```bash
LCP: 4.2s (should be < 2.5s)
FID: 150ms (should be < 100ms)
CLS: 0.15 (should be < 0.1)
```

**Solução:**

```bash
# 1. Analisar performance
npm run lighthouse

# 2. Otimizar imagens
# Usar next/image com otimização
import Image from 'next/image';

# 3. Implementar lazy loading
const LazyComponent = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />
});

# 4. Otimizar bundle
npm run analyze
# Remover dependências não utilizadas
```

### ❌ Erro: "Memory leak"

**Sintomas:**

```bash
Warning: Can't perform a React state update on an unmounted component
Error: Maximum call stack size exceeded
```

**Solução:**

```typescript
// 1. Limpar event listeners
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);

// 2. Usar AbortController
useEffect(() => {
  const abortController = new AbortController();

  fetch('/api/data', { signal: abortController.signal });

  return () => {
    abortController.abort();
  };
}, []);
```

---

## 🔒 Problemas de Segurança

### ❌ Erro: "CSP violation"

**Sintomas:**

```bash
Error: Content Security Policy violation
Error: Refused to load script
```

**Solução:**

```typescript
// 1. Configurar CSP no next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
];

// 2. Verificar headers
curl -I https://your-domain.com | grep -i security

// 3. Testar CSP
npx csp-checker https://your-domain.com
```

### ❌ Erro: "Authentication failed"

**Sintomas:**

```bash
Error: Invalid JWT token
Error: User not authenticated
```

**Solução:**

```bash
# 1. Verificar token
jwt.io  # Decodificar token

# 2. Renovar token
curl -X POST /api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "..."}'

# 3. Verificar sessão
npx supabase auth list
```

---

## 🚨 Comandos de Emergência

### Reset Completo do Projeto

```bash
#!/bin/bash
# reset-complete.sh

echo "🔄 Reset completo do projeto..."

# 1. Parar processos
pkill -f "next"
pkill -f "supabase"

# 2. Limpar arquivos
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
rm -rf .env.local

# 3. Reinstalar
npm install

# 4. Configurar ambiente
cp .env.example .env.local
echo "⚠️  Edite .env.local com suas credenciais"

# 5. Resetar banco
npx supabase db reset --linked --yes

# 6. Inicializar
npm run db:init

# 7. Testar
npm run test
npm run build

echo "✅ Reset completo concluído!"
```

### Deploy de Emergência

```bash
#!/bin/bash
# emergency-deploy.sh

echo "🚨 Deploy de emergência..."

# 1. Backup
git stash
git checkout main
git pull origin main

# 2. Verificar build
npm run build

# 3. Deploy forçado
vercel --prod --force

# 4. Verificar health
curl https://your-domain.com/api/health

echo "✅ Deploy de emergência concluído!"
```

### Rollback de Emergência

```bash
#!/bin/bash
# emergency-rollback.sh

echo "🔄 Rollback de emergência..."

# 1. Reverter último commit
git revert HEAD --no-edit

# 2. Push
git push origin main

# 3. Deploy
vercel --prod --force

echo "✅ Rollback concluído!"
```

---

## 🔍 Debug Avançado

### Debug de Rede

```bash
# 1. Verificar conectividade
curl -v https://vytalle-estetica.vercel.app/api/health

# 2. Testar Supabase
curl -H "apikey: YOUR_ANON_KEY" \
  https://your-project.supabase.co/rest/v1/products

# 3. Verificar DNS
nslookup vytalle-estetica.vercel.app

# 4. Testar SSL
openssl s_client -connect vytalle-estetica.vercel.app:443
```

### Debug de Performance

```bash
# 1. Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-domain.com --output html

# 2. Bundle analyzer
npm run analyze

# 3. Memory profiler
node --inspect npm run dev

# 4. Network throttling
# Chrome DevTools > Network > Throttling
```

### Debug de Banco

```bash
# 1. Conectar ao banco
npx supabase db connect

# 2. Verificar tabelas
\dt

# 3. Verificar policies
SELECT * FROM pg_policies;

# 4. Verificar logs
npx supabase logs
```

### Debug de Testes

```bash
# 1. Testes com debug
DEBUG=* npm run test

# 2. Testes específicos
npm run test -- --grep "ProductCard"

# 3. Cobertura detalhada
npm run test:coverage -- --reporter=html

# 4. Testes E2E com debug
DEBUG=pw:api npm run test:e2e
```

---

## 📞 Suporte

### Contatos de Emergência

- **📧 E-mail**:
  [contato.ferreirag@outlook.com](mailto:contato.ferreirag@outlook.com)
- **🐛 Issues**:
  [GitHub Issues](https://github.com/FuturoDevJunior/codafofo/issues)
- **📖 Docs**: [Documentação Completa](./docs/)

### Logs Importantes

```bash
# 1. Logs do Vercel
vercel logs

# 2. Logs do Supabase
npx supabase logs

# 3. Logs da aplicação
npm run dev 2>&1 | tee app.log

# 4. Logs de build
npm run build 2>&1 | tee build.log
```

### Métricas de Monitoramento

```bash
# 1. Health check
curl https://your-domain.com/api/health

# 2. Performance
curl https://your-domain.com/api/performance

# 3. Status do banco
curl https://your-domain.com/api/db-status

# 4. Uptime
uptime
```

---

**Vytalle Estética - Troubleshooting profissional para seu negócio! 🚀**
