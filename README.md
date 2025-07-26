<div align="center">
  <a href="https://vytalle-estetica.vercel.app" target="_blank" rel="noopener noreferrer">
    <img src="./Vytalle_Logo_Gold.png" width="120" alt="Logo Vytalle" />
  </a>
  
  # Vytalle Estética - Catálogo Médico Premium
  
  [![CI/CD](https://github.com/FuturoDevJunior/codafofo/workflows/CI/badge.svg)](https://github.com/FuturoDevJunior/codafofo/actions)
  [![Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen)](./docs/TESTING.md)
  [![Tests](https://img.shields.io/badge/tests-640%20passing-success)](#-testes--qualidade)
  [![Deploy](https://img.shields.io/badge/deploy-Vercel-black)](https://vytalle-estetica.vercel.app)
  [![License](https://img.shields.io/badge/license-Proprietary-blue)](./LICENSE)
  [![Node](https://img.shields.io/badge/node-%3E=18.0.0-green)](https://nodejs.org/)
  [![Status](https://img.shields.io/badge/status-Production%20Ready-success)](https://vytalle-estetica.vercel.app)
  [![Security](https://img.shields.io/badge/security-HTTPS%20%2B%20CSP-green)](./docs/SECURITY.md)
  [![PWA](https://img.shields.io/badge/PWA-Ready-purple)](https://web.dev/pwa-checklist/)
  [![A11y](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)
  
  [🌐 **DEMO AO VIVO**](https://vytalle-estetica.vercel.app) • [📖 **DOCUMENTAÇÃO**](./docs/) • [🐛 **ISSUES**](https://github.com/FuturoDevJunior/codafofo/issues)
</div>

<div align="center" style="margin-bottom: 1em;">
  <strong>Plataforma B2B de catálogo médico premium, com checkout WhatsApp, admin avançado, PWA, CI/CD, segurança e performance máxima.<br/>
  <em>Para profissionais exigentes e negócios que não aceitam menos que excelência.</em></strong>
</div>

---

## 🎯 Visão Geral

O **Vytalle Estética** é uma plataforma B2B para comercialização de produtos médicos premium, com checkout via WhatsApp, painel admin avançado, Supabase, PWA, CI/CD, versionamento, automação de releases e foco total em segurança, performance e compliance.

### 🏆 Diferenciais

- **💬 Checkout WhatsApp**: Mensagem profissional, pós-venda com upsell, automação comercial
- **🛡️ Segurança Avançada**: RLS, auditoria, logs, headers de segurança, validação rigorosa
- **⚡ Performance Máxima**: PWA, mobile-first, Core Web Vitals otimizados, bundle <350kB
- **🧪 Qualidade Garantida**: 640 testes automatizados, cobertura >96%, CI/CD robusto
- **📊 Admin "No-Code"**: Painel intuitivo, relatórios, gestão completa de produtos
- **🔧 Deploy Profissional**: Automático, rollback instantâneo, monitoramento 24/7

---

## 📋 Índice Rápido

- [🚀 **Primeiros Passos**](#-primeiros-passos)
- [🛠️ **Stack Tecnológica**](#️-stack-tecnológica)
- [📁 **Estrutura do Projeto**](#-estrutura-do-projeto)
- [🔧 **Scripts Disponíveis**](#-scripts-disponíveis)
- [🌐 **API & Integração**](#-api--integração)
- [📊 **Testes & Qualidade**](#-testes--qualidade)
- [🔒 **Segurança & Compliance**](#-segurança--compliance)
- [📱 **PWA & Mobile**](#-pwa--mobile)
- [📈 **Performance**](#-performance)
- [📚 **Documentação Detalhada**](#-documentação-detalhada)
- [🤝 **Contribuição**](#-contribuição)
- [📞 **Suporte**](#-suporte)
- [🔧 **Troubleshooting Rápido**](#-troubleshooting-rápido)

---

## 🚀 Primeiros Passos

### ⚡ Setup em 5 Minutos

```bash
# 1. Clone o repositório
git clone https://github.com/FuturoDevJunior/codafofo.git
cd codafofo

# 2. Instale dependências
npm install

# 3. Configure ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 4. Inicialize banco
npm run db:init

# 5. Inicie desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e veja o catálogo em ação!

### 📋 Pré-requisitos

| Requisito | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | >= 18.0.0 | Runtime JavaScript |
| **npm** | >= 9.0.0 | Gerenciador de pacotes |
| **Supabase CLI** | >= 1.0.0 | Backend-as-a-Service |
| **Git** | >= 2.30.0 | Controle de versão |

### 🔑 Variáveis de Ambiente

```bash
# Obrigatórias
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_PASSWORD=your-db-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password

# Opcionais
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| **Erro de build** | `rm -rf .next && npm run build` |
| **Banco não conecta** | `npm run db:init` |
| **Testes falham** | `npm run test:reset` |
| **Deploy falha** | Verificar variáveis de ambiente |
| **Admin não acessa** | `npm run setup-admin` |

---

## 🛠️ Stack Tecnológica

### Frontend & UI
- **Next.js 15.4.2** - App Router, Server Components, Static Generation
- **React 18** - Concurrent Features, Suspense, Server Components
- **TypeScript 5** - Type Safety, IntelliSense, Strict Mode
- **Tailwind CSS 3.4** - Utility-first, JIT, Custom Design System
- **Radix UI** - Headless Components, Accessibility, Wautomatização-ARIA
- **Framer Motion** - Animations, Gestures, Layout Animations
- **Zustand** - State Management, Persist, DevTools

### Backend & Database
- **Supabase** - PostgreSQL, Auth, Storage, Edge Functions, RLS
- **Edge Runtime** - Server-side Logic, API Routes, Middleware
- **PostgreSQL 15** - ACID, Views, Triggers, Full-text Search

### DevOps & Quality
- **Vercel** - Deploy, Preview, Analytics, Edge Network
- **GitHub Actions** - CI/CD, Tests, Security Scans
- **Vitest** - Unit Tests, Coverage, Watch Mode
- **Playwright** - E2E Tests, Cross-browser, Visual Testing
- **ESLint + Prettier** - Code Quality, Formatting

### Performance & SEO
- **Next.js Image** - Optimization, WebP/AVIF, Lazy Loading
- **PWA** - Manifest, Service Worker, Offline Support
- **Sitemap.xml** - Dynamic Generation, SEO Optimization
- **Meta Tags** - OpenGraph, Twitter Cards, JSON-LD

### Security & Compliance
- **HTTPS + CSP** - Content Security Policy, Headers
- **RLS (Row Level Security)** - Database-level Access Control
- **Environment Variables** - Secrets Management
- **WCAG 2.1 AA** - Accessibility Compliance

---

## 📁 Estrutura do Projeto

```
vytalle/
├── 📂 app/                    # Next.js App Router
│   ├── 📂 (routes)/           # Route groups
│   │   ├── 📂 admin/          # Admin routes
│   │   ├── 📂 products/       # Product routes
│   │   ├── 📂 cart/           # Cart routes
│   │   └── 📂 checkout/       # Checkout routes
│   ├── 📂 api/                # API routes
│   ├── 📄 globals.css         # Global styles
│   ├── 📄 layout.tsx          # Root layout
│   └── 📄 page.tsx            # Home page
├── 📂 components/             # Reusable components
│   ├── 📂 ui/                 # Base UI components
│   ├── 📂 admin/              # Admin components
│   ├── 📂 cart/               # Cart components
│   └── 📂 products/           # Product components
├── 📂 lib/                    # Business logic
│   ├── 📄 supabase.ts         # Database client
│   ├── 📄 auth.ts             # Authentication
│   ├── 📄 validation.ts       # Data validation
│   ├── 📄 utils.ts            # Utilities
│   └── 📄 store.ts            # State management
├── 📂 types/                  # TypeScript types
├── 📂 supabase/               # Database
│   ├── 📂 migrations/         # Database migrations
│   ├── 📂 functions/          # Edge functions
│   └── 📂 seeds/              # Seed data
├── 📂 public/                 # Static assets
├── 📂 docs/                   # Documentation
├── 📂 tests/                  # Test files
└── 📂 scripts/                # Build scripts
```

---

## 🔧 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Desenvolvimento** | `npm run dev` | Inicia app em modo desenvolvimento |
| **Build** | `npm run build` | Build de produção + migrations |
| **Produção** | `npm run start` | Sobe app em modo produção |
| **Testes** | `npm run test` | Testes unitários (Vitest, RTL) |
| **E2E** | `npm run test:e2e` | Testes end-to-end (Playwright) |
| **Cobertura** | `npm run test:coverage` | Gera relatório de cobertura |
| **Lint** | `npm run lint` | Lint de código (ESLint) |
| **Type Check** | `npm run type-check` | Checagem de tipos TypeScript |
| **DB Init** | `npm run db:init` | Prepara banco, aplica migrations e seeds |
| **Túnel** | `npm run dev:tunnel` | Dev + túnel ngrok para testes mobile |
| **Análise** | `npm run analyze` | Analisa bundle size e dependências |
| **Reset** | `npm run test:reset` | Reset completo para desenvolvimento |

---

## 🌐 API & Integração

### Endpoints Principais

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `GET` | `/api/products` | Lista todos os produtos | Pública |
| `GET` | `/api/products/[slug]` | Detalhes de um produto | Pública |
| `POST` | `/api/checkout` | Cria pedido e gera PDF | Pública |
| `GET` | `/api/orders` | Lista pedidos | Admin |
| `POST` | `/api/auth/login` | Login admin | Pública |
| `GET` | `/api/health` | Healthcheck | Pública |

### Exemplo de Integração ERP

```javascript
// Exemplo: Node.js
const axios = require('axios');

class VytalleAPI {
  constructor(baseURL, token) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getProducts(category = null) {
    const params = category ? { category } : {};
    const response = await this.api.get('/products', { params });
    return response.data.products;
  }

  async createOrder(orderData) {
    const response = await this.api.post('/checkout', orderData);
    return response.data;
  }
}

// Uso
const vytalle = new VytalleAPI(
  'https://vytalle-estetica.vercel.app/api',
  'YOUR_TOKEN'
);

const products = await vytalle.getProducts('Toxina Botulínica');
```

### Testando a API Localmente

```bash
# Health check
curl http://localhost:3000/api/health

# Listar produtos
curl http://localhost:3000/api/products

# Criar pedido
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"customer":{"name":"Dr. Silva","email":"dr@clinic.com"},"products":[{"id":"1","quantity":2}]}'
```

### Exemplo de Mensagem WhatsApp

```
*PEDIDO VYTALE ESTÉTICA & VISCOSUPLEMENTAÇÃO*

*DADOS DO CLIENTE*
Nome: Dra. Ana Paula

CEP: 21361-020

*PRODUTOS SOLICITADOS*
1. Botox 50U
   Quantidade: 2x
   Valor unit.: R$ 530,00
   Subtotal: R$ 1.060,00
2. Ellansé M
   Quantidade: 1x
   Valor unit.: R$ 1.200,00
   Subtotal: R$ 1.200,00

*VALOR TOTAL:* R$ 2.260,00

*PRÓXIMOS PASSOS*
- Confirmar disponibilidade
- Calcular frete para o CEP
- Definir forma de pagamento
- Agendar entrega

_Vytalle Estética & Viscosuplementação - Produtos Premium para Profissionais_
_Pedido via Catálogo Digital_
```

---

## 📊 Testes & Qualidade

### Status dos Testes

| Tipo de Teste | Total | Passando | Cobertura |
|---------------|-------|----------|-----------|
| **Unitário (Vitest)** | 640 | 640 | 96%+ |
| **Integração** | 40 | 40 | 100% |
| **E2E (Playwright)** | 7 | 7 | 100% |

### Comandos de Teste

```bash
# Todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Testes E2E
npm run test:e2e

# Testes específicos
npm run test ProductCard

# Reset completo
npm run test:reset
```

### Exemplo de Teste

```typescript
describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Botox 50U',
    price_pix: 530,
    price_card: 580,
    price_prazo: 580,
    images: ['/images/botox.jpg'],
    category: 'Toxina Botulínica',
    active: true
  };

  it('deve renderizar produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Botox 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 530,00')).toBeInTheDocument();
  });

  it('deve chamar onAddToCart ao clicar no botão', async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();
    
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);
    
    await user.click(screen.getByRole('button', { name: /adicionar/i }));
    
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

---

## 🔒 Segurança & Compliance

### Medidas de Segurança

- **🔐 RLS (Row Level Security)**: Ativado em todas as tabelas sensíveis
- **🛡️ Policies Explícitas**: CRUD só autenticado, leitura pública controlada
- **🔒 Headers de Segurança**: CSP, HSTS, X-Frame-Options, XSS Protection
- **🧹 Sanitização Rigorosa**: Todos inputs validados e limpos
- **📝 Auditoria Completa**: Logs de todas as operações críticas
- **🔐 HTTPS Obrigatório**: Sempre ativo em produção

### Compliance

- **📋 LGPD**: Estrutura pronta para compliance
- **🏆 ISO 27001**: Preparado para certificação
- **🔍 Auditoria**: Logs de auditoria, dados sensíveis protegidos
- **📊 Backup**: Scripts e instruções de backup/restore

### Exemplo de Policy RLS

```sql
-- Política para produtos
CREATE POLICY "Produtos públicos" ON products
  FOR SELECT USING (active = true);

-- Política para pedidos (apenas admin)
CREATE POLICY "Pedidos admin" ON orders
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    auth.jwt() ->> 'role' = 'admin'
  );
```

---

## 📱 PWA & Mobile

### Progressive Web App

- **📱 Manifest**: Instalação mobile, ícones, splash screen
- **⚡ Service Worker**: Offline-ready, cache inteligente
- **🎨 Design Mobile-First**: UI otimizada para toque
- **📲 Push Notifications**: Roadmap para próxima release

### Performance Mobile

- **📊 Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **🖼️ Imagens Otimizadas**: WebP/AVIF, lazy loading
- **📦 Bundle Otimizado**: < 350kB total
- **⚡ Carregamento Rápido**: SSR, streaming, cache

### Exemplo de Manifest

```json
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

---

## 📈 Performance

### Métricas de Performance

| Métrica | Meta | Atual | Status |
|---------|------|-------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 1.8s | ✅ Excelente |
| **FID** (First Input Delay) | < 100ms | 45ms | ✅ Excelente |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.03 | ✅ Excelente |
| **Bundle Size** | < 350kB | 280kB | ✅ Excelente |
| **TTFB** (Time to First Byte) | < 600ms | 350ms | ✅ Excelente |

### Otimizações Implementadas

- **🖼️ Image Optimization**: Next.js Image, WebP/AVIF, lazy loading
- **📦 Code Splitting**: Dynamic imports, route-based splitting
- **💾 Caching Strategy**: Multi-layer cache, HTTP headers
- **⚡ Bundle Optimization**: Tree shaking, minification
- **🎯 Core Web Vitals**: Monitoramento e otimização contínua

### Como Medir Performance

```bash
# Lighthouse local
npm run lighthouse

# Bundle analyzer
npm run analyze

# Core Web Vitals
npm run vitals
```

---

## 📚 Documentação Detalhada

### Guias Específicos

- **[🤝 Contribuição](./docs/CONTRIBUTING.md)** - Como contribuir para o projeto
- **[🚀 Deploy](./docs/DEPLOYMENT.md)** - Guia completo de deploy
- **[🌐 API](./docs/API.md)** - Documentação detalhada da API
- **[🔧 Troubleshooting](./docs/TROUBLESHOOTING.md)** - Resolução de problemas
- **[🏗️ Arquitetura](./docs/ARCHITECTURE.md)** - Documentação técnica
- **[⚡ Performance](./docs/PERFORMANCE.md)** - Guia de otimização
- **[🛡️ Compliance & LGPD](./docs/COMPLIANCE.md)** - Conformidade e proteção de dados
- **[🤖 Automação](./docs/AUTOMATION.md)** - Scripts e automações

### Recursos Adicionais

- **[📊 Relatório de Testes](./RELATORIO_FINAL_TESTES.md)** - Cobertura completa
- **[📝 Changelog](./CHANGELOG.md)** - Histórico de mudanças
- **[🔗 Demo ao Vivo](https://vytalle-estetica.vercel.app)** - Aplicação em produção

---

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Desenvolva** seguindo os padrões do projeto
5. **Teste** suas mudanças
6. **Commit** seguindo Conventional Commits
7. **Push** e abra um Pull Request

### Padrões de Commit

```bash
# Estrutura: <tipo>(<escopo>): <descrição>

# Funcionalidades
git commit -m "feat: adiciona sistema de carrinho"
git commit -m "feat(admin): implementa painel de relatórios"

# Correções
git commit -m "fix: corrige validação de formulário"
git commit -m "fix(auth): resolve problema de login"

# Refatoração
git commit -m "refactor: melhora performance do carrinho"
git commit -m "refactor(api): simplifica endpoints"

# Documentação
git commit -m "docs: atualiza README"
git commit -m "docs(api): adiciona exemplos de uso"

# Testes
git commit -m "test: adiciona testes para checkout"
git commit -m "test(unit): cobre cenários de erro"
```

### Checklist de PR

- [ ] Código segue padrões do projeto
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Build de produção sem warnings
- [ ] Variáveis de ambiente documentadas
- [ ] Cobertura de testes mantida >95%

---

## 📞 Suporte

### Contatos

- **📧 E-mail**: [contato.ferreirag@outlook.com](mailto:contato.ferreirag@outlook.com)
- **💼 LinkedIn**: [RET Consultoria](https://www.linkedin.com/company/ret-consultoria/)
- **🐛 Issues**: [GitHub Issues](https://github.com/FuturoDevJunior/codafofo/issues)

### Recursos de Ajuda

- **[🔧 Troubleshooting](./docs/TROUBLESHOOTING.md)** - Problemas comuns e soluções
- **[📖 Documentação](./docs/)** - Guias detalhados
- **[🌐 Demo](https://vytalle-estetica.vercel.app)** - Aplicação em produção
- **[📊 Status](https://vytalle-estetica.vercel.app/api/health)** - Health check da API

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

## 🏆 Créditos

<p align="center" style="margin-top: 2em; font-size: 1.15em;">
  <span style="display: inline-flex; align-items: center; gap: 16px;">
    <img src="./public/icons/ret-logo.png" alt="Logo RET Consultoria" width="40" style="vertical-align: middle; margin-right: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);"/>
    <img src="./public/icons/ret-qr.png" alt="QR Code LinkedIn RET Consultoria" width="60" style="margin-top: 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);"/>
  </span><br/>
  <strong>Projeto desenvolvido e mantido por <a href="https://www.linkedin.com/company/ret-consultoria/?viewAsMember=true" target="_blank" rel="noopener noreferrer">RET CONSULTORIA LTDA</a><br/>
  <em>Automação, Software e Inovação para o seu negócio.</em></strong>
</p>

---

## 📜 Licença

Este projeto é proprietário, todos os direitos reservados à **RET CONSULTORIA LTDA**. Proibida a distribuição, cópia ou uso comercial sem autorização expressa.

---

## 🚀 Roadmap

### ✅ Concluído

- [x] Catálogo dinâmico, imagens reais, descrições detalhadas
- [x] Checkout WhatsApp, upsell, painel admin, auditoria
- [x] Seeds automatizadas, integração Supabase, PWA, CI/CD
- [x] Testes unitários, integração, e2e, cobertura >95%
- [x] Deploy automático, changelog, releases, versionamento

### 🔄 Em Desenvolvimento

- [ ] Analytics dashboard avançado
- [ ] Notificações push
- [ ] Integração ERP médico
- [ ] API pública REST/GraphQL

### 📋 Planejado

- [ ] Mobile app nativo (React Native/Expo)
- [ ] Marketplace de fornecedores
- [ ] Certificação LGPD/ISO 27001
- [ ] Internacionalização (i18n)
- [ ] IA para recomendação de produtos

---

**Vytalle Estética - Excelência em cada detalhe! 🚀**

