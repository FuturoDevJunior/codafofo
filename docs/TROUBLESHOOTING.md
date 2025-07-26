# 🔧 Guia de Troubleshooting - Vytalle Estética

> **Resolução rápida de problemas comuns e soluções profissionais**

## 📋 Índice

- [Problemas de Instalação](#problemas-de-instalação)
- [Problemas de Desenvolvimento](#problemas-de-desenvolvimento)
- [Problemas de Banco de Dados](#problemas-de-banco-de-dados)
- [Problemas de Deploy](#problemas-de-deploy)
- [Problemas de Performance](#problemas-de-performance)
- [Problemas de Testes](#problemas-de-testes)
- [Problemas de Segurança](#problemas-de-segurança)
- [Problemas de API](#problemas-de-api)
- [Problemas de PWA](#problemas-de-pwa)
- [Contatos de Emergência](#contatos-de-emergência)

---

## 🚀 Problemas de Instalação

### 1. Node.js não encontrado

**Erro:**
```bash
node: command not found
```

**Solução:**
```bash
# Instale Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Ou use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### 2. Dependências não instalam

**Erro:**
```bash
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /package.json
```

**Solução:**
```bash
# Limpe cache do npm
npm cache clean --force

# Delete node_modules e reinstale
rm -rf node_modules package-lock.json
npm install

# Se persistir, use yarn
npm install -g yarn
yarn install
```

### 3. Supabase CLI não funciona

**Erro:**
```bash
supabase: command not found
```

**Solução:**
```bash
# Instale Supabase CLI
npm install -g supabase

# Ou via Homebrew (macOS)
brew install supabase/tap/supabase

# Verifique instalação
supabase --version
```

---

## 💻 Problemas de Desenvolvimento

### 1. Servidor não inicia

**Erro:**
```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução:**
```bash
# Encontre processo usando porta 3000
lsof -ti:3000

# Mate o processo
kill -9 $(lsof -ti:3000)

# Ou use porta diferente
npm run dev -- -p 3001
```

### 2. TypeScript errors

**Erro:**
```bash
Type error: Property 'price_card' does not exist on type 'Product'
```

**Solução:**
```bash
# Verifique tipos
npm run type-check

# Atualize interface Product
# types/product.ts
interface Product {
  id: string;
  name: string;
  price_pix: number;
  price_card: number; // Adicione esta linha
  price_prazo: number;
  // ...
}
```

### 3. Hot reload não funciona

**Solução:**
```bash
# Limpe cache do Next.js
rm -rf .next

# Reinicie servidor
npm run dev

# Verifique arquivo .env.local
cat .env.local
```

### 4. Tailwind CSS não aplica estilos

**Solução:**
```bash
# Verifique configuração
cat tailwind.config.js

# Regenere CSS
npm run build:css

# Verifique imports no CSS
# app/globals.css deve ter:
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🗄️ Problemas de Banco de Dados

### 1. Conexão com Supabase falha

**Erro:**
```bash
Error: connect ECONNREFUSED
```

**Solução:**
```bash
# Verifique status do Supabase
supabase status

# Reconfigure projeto
supabase link --project-ref YOUR_PROJECT_REF

# Verifique variáveis de ambiente
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 2. Migrations não aplicam

**Erro:**
```bash
Error: relation "products" does not exist
```

**Solução:**
```bash
# Aplique migrations
supabase db push

# Se falhar, reset completo
supabase db reset --linked --yes

# Verifique migrations
ls supabase/migrations/
```

### 3. RLS (Row Level Security) bloqueia acesso

**Erro:**
```bash
Error: new row violates row-level security policy
```

**Solução:**
```bash
# Verifique policies
supabase db diff

# Desative RLS temporariamente (apenas desenvolvimento)
-- No Supabase Studio: Table Editor > products > RLS > Disable

# Ou ajuste policies
-- Supabase Studio: Authentication > Policies
```

### 4. Storage não funciona

**Erro:**
```bash
Error: Storage bucket not found
```

**Solução:**
```bash
# Crie bucket no Supabase
supabase storage create orders

# Configure permissões
supabase storage policy create "Public Access" on orders for select using (true);

# Verifique configuração
supabase storage list
```

---

## 🚀 Problemas de Deploy

### 1. Build falha no Vercel

**Erro:**
```bash
Build failed: TypeScript compilation error
```

**Solução:**
```bash
# Teste build local
npm run build

# Verifique TypeScript
npm run type-check

# Verifique lint
npm run lint

# Se tudo OK, force deploy
vercel --prod --force
```

### 2. Variáveis de ambiente não carregam

**Solução:**
```bash
# Verifique variáveis no Vercel
vercel env ls

# Adicione variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Redeploy após adicionar variáveis
vercel --prod
```

### 3. Deploy lento

**Solução:**
```bash
# Otimize bundle
npm run analyze

# Verifique tamanho das imagens
npm run optimize-images

# Use cache do Vercel
# vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### 4. Rollback necessário

**Solução:**
```bash
# Rollback via Vercel Dashboard
# Deployments > [deployment] > "Revert to this deployment"

# Ou via CLI
vercel rollback [deployment-id]

# Ou via Git
git revert HEAD
git push origin main
```

---

## ⚡ Problemas de Performance

### 1. Carregamento lento

**Solução:**
```bash
# Analise performance
npm run analyze

# Otimize imagens
npm run optimize-images

# Verifique Core Web Vitals
# https://pagespeed.web.dev/

# Implemente lazy loading
# components/ProductCard.tsx
import { lazy } from 'react';
const ProductImage = lazy(() => import('./ProductImage'));
```

### 2. Bundle size muito grande

**Solução:**
```bash
# Analise dependências
npm run analyze

# Remova dependências não utilizadas
npm uninstall lodash
npm install lodash-es

# Use dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
});
```

### 3. Memory leaks

**Solução:**
```bash
# Verifique memory usage
node --inspect npm run dev

# Use React DevTools Profiler
# Chrome DevTools > Performance > Record

# Limpe event listeners
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

---

## 🧪 Problemas de Testes

### 1. Testes falham

**Erro:**
```bash
FAIL components/ProductCard.test.tsx
```

**Solução:**
```bash
# Rode testes específicos
npm run test ProductCard

# Limpe cache dos testes
npm run test -- --clearCache

# Verifique mocks
# __mocks__/next/image.tsx deve existir

# Atualize snapshots
npm run test -- -u
```

### 2. Cobertura baixa

**Solução:**
```bash
# Gere relatório de cobertura
npm run test:coverage

# Verifique arquivos não cobertos
# coverage/lcov-report/index.html

# Adicione testes para componentes não cobertos
# components/NewComponent.test.tsx
```

### 3. Testes E2E falham

**Erro:**
```bash
Error: page.goto: net::ERR_CONNECTION_REFUSED
```

**Solução:**
```bash
# Verifique se servidor está rodando
npm run dev

# Rode testes E2E
npm run test:e2e

# Verifique Playwright
npx playwright install
```

---

## 🔒 Problemas de Segurança

### 1. Headers de segurança

**Solução:**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. Validação de inputs

**Solução:**
```typescript
// lib/validation.ts
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(2).max(100),
  price_pix: z.number().positive(),
  category: z.enum(['Toxina Botulínica', 'Preenchedor', 'Bioestimulador'])
});

export function validateProduct(data: unknown) {
  return productSchema.parse(data);
}
```

### 3. Rate limiting

**Solução:**
```typescript
// lib/rateLimit.ts
import { NextApiRequest, NextApiResponse } from 'next';

const rateLimit = new Map();

export function rateLimitMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const limit = 100; // requests per minute
  
  if (rateLimit.has(ip)) {
    const { count, resetTime } = rateLimit.get(ip);
    if (Date.now() > resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: Date.now() + 60000 });
    } else if (count >= limit) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      rateLimit.set(ip, { count: count + 1, resetTime });
    }
  } else {
    rateLimit.set(ip, { count: 1, resetTime: Date.now() + 60000 });
  }
}
```

---

## 🌐 Problemas de API

### 1. CORS errors

**Solução:**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

### 2. API não responde

**Solução:**
```bash
# Verifique logs
vercel logs [deployment-id]

# Teste endpoint local
curl http://localhost:3000/api/health

# Verifique variáveis de ambiente
echo $NEXT_PUBLIC_SUPABASE_URL
```

### 3. Autenticação falha

**Solução:**
```bash
# Verifique token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/products

# Renove token
curl -X POST https://vytalle-estetica.vercel.app/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "YOUR_REFRESH_TOKEN"}'
```

---

## 📱 Problemas de PWA

### 1. PWA não instala

**Solução:**
```json
// public/manifest.json
{
  "name": "Vytalle Estética",
  "short_name": "Vytalle",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker não registra

**Solução:**
```typescript
// app/layout.tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  }
}, []);
```

### 3. Offline não funciona

**Solução:**
```javascript
// public/sw.js
const CACHE_NAME = 'vytalle-v1';
const urlsToCache = [
  '/',
  '/products',
  '/cart',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

## 🆘 Contatos de Emergência

### Suporte Técnico

- **E-mail**: contato.ferreirag@outlook.com

- **GitHub Issues**: [Criar Issue](https://github.com/FuturoDevJunior/codafofo/issues)

### Recursos Externos

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev

### Comandos de Emergência

```bash
# Reset completo do projeto
rm -rf node_modules .next
npm install
npx supabase db reset --linked --yes
npm run dev

# Deploy de emergência
git stash
git checkout main
git pull origin main
vercel --prod --force

# Rollback de emergência
git revert HEAD
git push origin main
```

---

## ✅ Checklist de Troubleshooting

### Antes de Pedir Ajuda

- [ ] Verifiquei a documentação
- [ ] Testei em ambiente limpo
- [ ] Verifiquei logs de erro
- [ ] Testei em navegador diferente
- [ ] Verifiquei variáveis de ambiente
- [ ] Testei build local
- [ ] Verifiquei dependências

### Informações para Suporte

- **Sistema Operacional**: macOS/Windows/Linux
- **Node.js Version**: `node --version`
- **npm Version**: `npm --version`
- **Erro Completo**: Copie toda a mensagem de erro
- **Passos para Reproduzir**: Como reproduzir o problema
- **Comportamento Esperado**: O que deveria acontecer

---

**Troubleshooting profissional, sempre! 🔧** 