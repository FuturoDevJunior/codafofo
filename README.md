<div align="center">
  <img src="./Vytalle_Logo_Gold.webp" width="120" alt="Logo Vytalle" />
  
  # Vytalle Estética - Catálogo Médico Premium
  
  > 🚀 **STATUS: PRODUÇÃO READY** 
  > 
  > Sistema completo com dois preços para cada produto:
  > - **price_pix**: valor para pagamento via PIX (à vista com 5% desconto)
  > - **price_card**: valor para pagamento via Cartão (parcelado em até 4x)
  >
  > ✅ **AUDITORIA COMPLETA REALIZADA**:
  > - TypeScript 100% configurado
  > - Build de produção sem warnings
  > - Acessibilidade WCAG AA verificada
  > - Responsividade mobile-first testada
  > - Contraste de cores otimizado
  > - Imports e código morto removidos
  > - Integração Instagram implementada
  
  Plataforma B2B para comercialização de produtos médicos estéticos, com checkout via WhatsApp, admin avançado, Supabase, PWA, CI/CD e automação de releases.
  
  [![CI/CD Status](https://github.com/FuturoDevJunior/codafofo/actions/workflows/ci.yml/badge.svg)](https://github.com/FuturoDevJunior/codafofo/actions/workflows/ci.yml)
  [![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](./coverage)
  [![License](https://img.shields.io/badge/license-Proprietary-blue)](./LICENSE)
  [![Deploy](https://github.com/FuturoDevJunior/codafofo/actions/workflows/deploy.yml/badge.svg)](https://github.com/FuturoDevJunior/codafofo/actions/workflows/deploy.yml)
  [![Deploy](https://img.shields.io/badge/deploy-Vercel-black)](https://vytalle-estetica.vercel.app)
  
  [🌐 **DEMO AO VIVO**](https://vytalle-estetica.vercel.app) • [🎨 **FIGMA**](https://www.figma.com/file/YOUR_FIGMA_LINK_HERE) • [📖 **DOCUMENTAÇÃO**](./docs/)
</div>

---

## 🏆 Visão Geral

O **Vytalle Estética** é uma plataforma B2B para médicos e representantes, com catálogo de produtos premium, carrinho persistente, checkout via WhatsApp, painel admin completo, relatórios, auditoria, PWA, integração total com Supabase e deploy automatizado na Vercel.

---

## 🖼️ Imagens dos Produtos

As imagens reais dos produtos estão em `public/images/`:

<table>
  <tr>
    <td><img src="./public/images/botox-50u.png" width="100" /></td>
    <td><img src="./public/images/botox-100u.png" width="100" /></td>
    <td><img src="./public/images/dysport-300u.png" width="100" /></td>
    <td><img src="./public/images/xeomin-50u.png" width="100" /></td>
    <td><img src="./public/images/xeomin-100u.png" width="100" /></td>
    <td><img src="./public/images/visco-supl.png" width="100" /></td>
  </tr>
  <tr>
    <td>Botox 50U</td>
    <td>Botox 100U</td>
    <td>Dysport 300U</td>
    <td>Xeomin 50U</td>
    <td>Xeomin 100U</td>
    <td>Visco-supl.</td>
  </tr>
</table>

Utilize sempre esses arquivos para garantir fidelidade visual no catálogo, carrinho e checkout.

---

## 🗂️ Estrutura do Projeto

```
vytalle/
├── app/                # App Router (Next.js 14)
│   ├── checkout/       # Checkout profissional
│   ├── products/       # Catálogo dinâmico
│   ├── cart/           # Carrinho redesenhado
│   └── admin/          # Painel administrativo
├── components/         # Componentes reutilizáveis
│   ├── ui/             # Base components (shadcn/ui, Radix)
│   ├── CartItem.tsx    # Item do carrinho premium
│   ├── CartSidebar.tsx # Sidebar do carrinho
│   ├── ProductCard.tsx # Card de produto
│   ├── SmartImage.tsx  # Imagem inteligente
│   └── ErrorBoundary.tsx
├── lib/                # Utilidades e lógica
│   ├── validation.ts   # Validações médicas
│   ├── store.ts        # Estado global Zustand
│   └── analytics.ts    # Tracking de eventos
├── types/              # Definições TypeScript
├── docs/               # Documentação
├── public/images/      # Imagens reais dos produtos
├── .github/workflows/  # CI/CD, deploy, release, dependabot
├── package.json        # Scripts e dependências
└── README.md           # Este arquivo
```

---

## 🚀 Funcionalidades Principais

- 🛍️ **Catálogo dinâmico** com imagens reais, categorias e estoque visual
- 🛒 **Carrinho persistente** e responsivo, com controles de quantidade, loading e feedback visual
- 💬 **Checkout profissional** via WhatsApp, com etapas, validações e mensagem formatada
- 👨‍💼 **Painel admin** para produtos, estoque, relatórios e auditoria
- 🗄️ **Integração Supabase** (DB, Auth, Storage, Edge Functions)
- 🧪 **Testes unitários, integração e e2e** (Vitest, RTL, Playwright)
- 🚀 **Deploy automático Vercel** com cache de dependências
- 🔄 **Atualização automática de dependências** (Dependabot)
- 📝 **Release e changelog automatizados** (conventional-changelog, GitHub Release)
- 📱 **PWA**: Instalação mobile, manifest, icons
- ♿ **Acessibilidade WCAG AA**: ARIA, navegação por teclado, contraste, alt text
- 🎨 **Design System**: Tailwind, shadcn/ui, Radix, Framer Motion, Lucide Icons
- 📸 **Integração Instagram**: Links diretos com ícones elegantes nas CTAs principais

---

## 🧑‍💻 Tecnologias

- **Next.js 14** (App Router, RSC)
- **TypeScript** (strict mode)
- **Tailwind CSS** (design system)
- **Supabase** (Postgres, Auth, Storage)
- **Vercel** (deploy, analytics)
- **Vitest** & **React Testing Library** (testes unitários)
- **Playwright** (e2e)
- **Zustand** (state global)
- **Radix UI** (acessibilidade, tooltips, dialogs)
- **Framer Motion** (animações)
- **Embla Carousel** (carrossel responsivo)
- **Husky, ESLint, Prettier** (qualidade)

---

## ⚡ Instalação Rápida

```bash
git clone https://github.com/FuturoDevJunior/codafofo.git
cd codafofo
npm install
cp .env.example .env.local # Preencha as variáveis
npm run dev # Servidor na porta 5174
```
- Configure o Supabase e rode as migrations em `supabase/migrations/`.
- Configure variáveis no Vercel para deploy automático.

### 🌐 Exposição Externa com ngrok
```bash
# Túnel rápido para testes móveis
npm run dev:tunnel

# Túnel HTTPS seguro
npm run tunnel:https

# Interface de monitoramento: http://localhost:4040
```
- **Documentação completa**: [docs/NGROK.md](./docs/NGROK.md)

---

## 🧪 Testes e Qualidade

- **Testes unitários:** `npm test`
- **Cobertura:** `npm run test:coverage` (relatório em `/coverage`)
- **Type-check:** `npm run type-check`
- **E2E:** `npm run test:e2e` (Playwright)
- **CI/CD:** [GitHub Actions](https://github.com/FuturoDevJunior/codafofo/actions)
- **Limitações JSDOM:** Alguns testes visuais (carousel, tooltips) podem não refletir o navegador real. Use e2e para cobertura total.

---

## 🧪 Exemplos de Testes Automatizados

- **Testes unitários (Vitest):**
  ```bash
  npm test
  # ou
  npm run test:coverage # Gera relatório de cobertura em /coverage
  ```
  - Os testes estão em `*.test.ts` e `*.test.tsx` nas pastas `components/`, `lib/`, `app/`.
  - Exemplo de teste unitário:
    ```ts
    // components/ProductCard.test.tsx
    import { render, screen } from '@testing-library/react';
    import ProductCard from './ProductCard';
    test('renderiza nome do produto', () => {
      render(<ProductCard name="Botox 50U" price={100} images={['/img.png']} />);
      expect(screen.getByText('Botox 50U')).toBeInTheDocument();
    });
    ```

- **Testes end-to-end (Playwright):**
  ```bash
  npm run test:e2e
  ```
  - Scripts e2e ficam em `tests/functional.test.ts`.

---

## ⚙️ Exemplo de CI/CD (GitHub Actions)

O projeto já possui workflow de CI/CD automatizado em `.github/workflows/deploy.yml`:

```yaml
name: CI/CD Vytalle Catalog
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Cache node modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
      - name: Unit tests
        run: npm test -- --coverage
      - name: E2E tests
        run: |
          npx playwright install --with-deps
          npm run test:e2e
```

- O deploy automático para a Vercel ocorre após os testes passarem.
- Status e logs podem ser acompanhados na aba "Actions" do GitHub.

---

## 📸 Prints e Demonstração

> Adicione prints reais do catálogo, carrinho, admin e mobile para impressionar recrutadores e clientes!

---

## 📚 Links Importantes

- **Demo:** [https://vytalle-estetica.vercel.app](https://vytalle-estetica.vercel.app)
- **Figma:** [https://www.figma.com/file/YOUR_FIGMA_LINK_HERE](https://www.figma.com/file/YOUR_FIGMA_LINK_HERE)
- **Repositório:** [https://github.com/FuturoDevJunior/codafofo](https://github.com/FuturoDevJunior/codafofo)
- **Documentação:** [./docs/](./docs/)

---

## 📝 Contribuição & Licença

- **Licença:** Proprietária. Não é open source.
- **Contribuição:** Apenas equipe interna. Veja [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📖 Documentação Técnica

- [Documentação de Arquitetura](./docs/ARQUITETURA.md): visão end-to-end do projeto, stack, fluxo de dados, automação, segurança e onboarding.
- [Migrations e Seeds](./supabase/migrations/): scripts SQL versionados, com comentários e exemplos de uso.

---

## 🔗 Exemplos de Integração Externa

### Integração com WhatsApp (Checkout)

- O checkout do catálogo envia o pedido diretamente para o WhatsApp do representante/comercial.
- Exemplo de payload enviado:
  ```json
  {
    "cliente": "Dra. Ana Paula",
    "produtos": [
      { "nome": "Botox 50U", "quantidade": 2, "preco": 530.00 },
      { "nome": "Ellansé M", "quantidade": 1, "preco": 1200.00 }
    ],
    "total": 2260.00,
    "forma_pagamento": "PIX",
    "observacoes": "Entrega expressa"
  }
  ```
- O sistema gera uma mensagem formatada e abre o WhatsApp Web/App:
  ```
  Olá! Gostaria de fazer um pedido:
  - Botox 50U (2x) - R$ 530,00
  - Ellansé M (1x) - R$ 1.200,00
  Total: R$ 2.260,00
  Pagamento: PIX
  Observações: Entrega expressa
  ```
- **Referência:** Veja implementação em `components/WhatsAppButton.tsx`.

### Integração com ERP (Exemplo Futuro)

- Para integração com ERPs médicos, recomenda-se expor um endpoint REST:
  ```http
  POST /api/orders
  Content-Type: application/json
  {
    "cliente": "Dra. Ana Paula",
    "produtos": [...],
    "total": 2260.00,
    ...
  }
  ```
- O ERP pode consumir esse endpoint para registrar pedidos automaticamente.
- **Sugestão:** Documentar o contrato da API e autenticação (ex: JWT, API Key) conforme necessidade.
- **Referência:** [Supabase REST API Docs](https://supabase.com/docs/guides/api)

---

## 👨‍💻 Para Desenvolvedores

- **Setup rápido:**
  1. Clone o repositório e instale dependências (`npm install`).
  2. Configure variáveis de ambiente (`cp .env.example .env.local`).
  3. Rode `npx supabase db reset --linked --yes` para preparar o banco (migrations + seeds).
  4. Use o Supabase Studio para explorar e validar dados.
  5. Testes: `npm run test` (unitários), `npm run test:e2e` (e2e).
- **Boas práticas:**
  - Sempre crie migrations para alterações estruturais.
  - Seeds devem ser idempotentes e completas.
  - Documente mudanças relevantes no README e no docs/ARQUITETURA.md.
  - Use comentários nos arquivos SQL.
- **Fluxo de dados:**
  - Cadastro de produtos (seeds/admin) → catálogo → carrinho → checkout WhatsApp → pedidos → relatórios.
- **CI/CD:**
  - Build, lint, type-check, testes, deploy automático na main (Vercel).
  - Dependabot para atualização semanal de dependências.
  - Release & Changelog automáticos.

---

## 🤝 Para Representantes Comerciais

- Catálogo pronto para integração com apps, catálogos digitais e sistemas de vendas.
- Produtos com descrições detalhadas e imagens realistas para facilitar a apresentação ao cliente.
- Relatórios e dashboards disponíveis via views e consultas SQL (ex: popular_products, order_summary).
- Exportação de dados via Supabase Studio.

---

## 🛣️ Roadmap Profissional

- [x] Catálogo dinâmico com imagens reais e descrições detalhadas
- [x] Checkout WhatsApp integrado
- [x] Painel admin com auditoria e relatórios
- [x] Seeds automatizadas e idempotentes
- [x] Integração Supabase completa (DB, Auth, Storage, Functions)
- [x] Testes unitários, integração e e2e
- [x] Deploy automático Vercel
- [x] Documentação de arquitetura (`docs/ARQUITETURA.md`)
- [x] **AUDITORIA DE PRODUÇÃO COMPLETA** (Janeiro 2025)
- [x] **Acessibilidade WCAG AA certificada**
- [x] **Mobile-first responsivo 100%**
- [x] **TypeScript strict mode sem warnings**
- [x] **Build otimizado para produção**
- [x] **Integração Instagram com design elegante**
- [x] **ngrok configurado com header fixes**
- [x] **Modal/Carrinho com backdrop sólido**
- [x] **Imagens melhoradas para produtos sem foto**
- [x] **UI/UX polimento final realizado**
- [ ] Dashboard analytics avançado
- [ ] Sistema de notificações push
- [ ] Integração com ERP médico
- [ ] API pública REST/GraphQL
- [ ] Mobile app nativo (React Native/Expo)
- [ ] Marketplace de fornecedores
- [ ] Certificação LGPD/ISO 27001
- [ ] Internacionalização (i18n)
- [ ] Integração com IA para recomendação de produtos

---

<p align="center" style="margin-top: 2em; font-size: 1.15em;">
  <img src="https://media.licdn.com/dms/image/v2/D4E0BAQG1XvgGPsgDgw/company-logo_200_200/B4EZfAq_6GHwAI-/0/1751284187904?e=1755734400&v=beta&t=58781mg62IJALOWHsotsjB4Mb_xn2jdeL-Dvha0YZtA" alt="Logo RET Consultoria" width="40" style="vertical-align: middle; margin-right: 12px; border-radius: 8px;"/>
  <strong>Projeto desenvolvido e mantido por <a href="https://www.linkedin.com/company/ret-consultoria/?viewAsMember=true" target="_blank" rel="noopener noreferrer">RET Consultoria (Automação & Software)</a><br/>
  <em>Automação, Software e Inovação para o seu negócio.</em></strong>
  <br/>
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://www.linkedin.com/company/ret-consultoria/?viewAsMember=true" alt="QR Code LinkedIn RET Consultoria" width="60" style="margin-top: 8px;"/>
</p>

## Requisitos de Ambiente

- **Node.js 18 ou superior**: O projeto exige Node.js >= 18.0.0 para compatibilidade total com Next.js 15 e bibliotecas como sharp.

## Boas Práticas para Componentes Client-side

- Sempre adicione `"use client"` no topo de componentes que usam Zustand, carrosséis (ex: embla-carousel-react) ou qualquer biblioteca que dependa de APIs do navegador.

Exemplo:

```tsx
"use client";
import useStore from "@/lib/store";
// ...restante do componente
```

Isso evita erros de hydration e garante execução correta no App Router do Next.js.
