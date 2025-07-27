# Automações do Projeto Vytalle

Este documento descreve todas as automações implementadas no projeto Vytalle para garantir qualidade, segurança e eficiência operacional.

## 📋 Índice

1. [Scripts de Sincronização](#scripts-de-sincronização)
2. [Sistema de Backup](#sistema-de-backup)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Testes E2E](#testes-e2e)
5. [Monitoramento](#monitoramento)
6. [Segurança](#segurança)
7. [Performance](#performance)
8. [SEO](#seo)
9. [Manutenção](#manutenção)
10. [Como Usar](#como-usar)

## 🔄 Scripts de Sincronização

### `scripts/sync-products.js`

**Funcionalidades:**

- ✅ Sincronização automática com Supabase
- ✅ Atualização de preços em tempo real
- ✅ Geração automática de slugs
- ✅ Backup automático dos dados
- ✅ Validação automática de produtos

**Como usar:**

```bash
npm run sync:products
```

**Recursos:**

- Validação de produtos (nome, descrição, preços, categorias)
- Geração automática de slugs únicos
- Verificação de desconto PIX
- Logs detalhados de operações
- Tratamento de erros robusto

## 💾 Sistema de Backup

### `scripts/backup.sh`

**Funcionalidades:**

- ✅ Backup automático do Supabase (diário)
- ✅ Backup de imagens (semanal)
- ✅ Rotação de logs (automático)
- ✅ Verificação de vulnerabilidades (semanal)
- ✅ Backup de configurações

**Como usar:**

```bash
npm run backup
npm run backup:manual
```

**Agendamento:**

```bash
# Configurar cron job para backup diário às 2h da manhã
0 2 * * * cd /path/to/project && npm run backup
```

**Recursos:**

- Retenção configurável (30 dias para backups diários, 12 semanas para imagens)
- Verificação de espaço em disco
- Compressão automática
- Logs coloridos e detalhados
- Verificação de vulnerabilidades

## 🚀 CI/CD Pipeline

### `.github/workflows/ci-cd.yml`

**Funcionalidades:**

- ✅ Testes automáticos em cada PR
- ✅ Deploy automático em staging
- ✅ Deploy em produção após merge
- ✅ Notificações no Slack/Discord
- ✅ Rollback automático em caso de erro

**Jobs:**

1. **Testes Automáticos**
   - Linting
   - Type checking
   - Testes unitários
   - Cobertura de código
   - Comentários automáticos em PRs

2. **Deploy Staging**
   - Deploy automático para branch `develop`
   - Notificações de sucesso/falha

3. **Deploy Produção**
   - Deploy automático para branch `main`
   - Auditoria de segurança
   - Testes pós-deploy

4. **Rollback**
   - Rollback automático em caso de falha
   - Notificações de alerta

5. **Monitoramento**
   - Health checks
   - Testes de performance
   - Verificação de links quebrados

6. **Backup Automático**
   - Backup do banco de dados
   - Upload de artifacts

## 🧪 Testes E2E

### Configuração Playwright

**Arquivos:**

- `playwright.config.ts` - Configuração principal
- `tests/e2e/global-setup.ts` - Setup global
- `tests/e2e/global-teardown.ts` - Teardown global

### Testes Implementados

#### 1. Fluxo Completo de Compra (`tests/e2e/purchase-flow.test.ts`)

- ✅ Navegação para produtos
- ✅ Filtros e busca
- ✅ Adição ao carrinho
- ✅ Checkout completo
- ✅ Validação de formulários
- ✅ Cupons de desconto
- ✅ Cálculo de frete
- ✅ Modal de upsell
- ✅ Persistência do carrinho
- ✅ Loading states
- ✅ Tratamento de erros

#### 2. Login Admin (`tests/e2e/admin-login.test.ts`)

- ✅ Login com credenciais válidas
- ✅ Validação de credenciais inválidas
- ✅ Campos obrigatórios
- ✅ Logout
- ✅ Proteção de rotas
- ✅ Manutenção de sessão
- ✅ Loading states
- ✅ Recuperação de senha
- ✅ Acessibilidade
- ✅ Responsividade
- ✅ Rate limiting

#### 3. Upload de Imagens (`tests/e2e/image-upload.test.ts`)

- ✅ Upload de imagem única
- ✅ Validação de tipos de arquivo
- ✅ Validação de tamanho
- ✅ Upload múltiplo
- ✅ Reordenação por drag & drop
- ✅ Remoção de imagens
- ✅ Crop de imagens
- ✅ Otimização automática
- ✅ Geração de thumbnails
- ✅ Upload por URL
- ✅ Progresso de upload
- ✅ Tratamento de erros

#### 4. Responsividade (`tests/e2e/responsiveness.test.ts`)

- ✅ Mobile (375x667)
- ✅ Tablet (768x1024)
- ✅ Desktop (1920x1080)
- ✅ Menu mobile
- ✅ Carrinho responsivo
- ✅ Formulários responsivos
- ✅ Filtros responsivos
- ✅ Detalhes de produto
- ✅ Busca responsiva
- ✅ Paginação
- ✅ Footer
- ✅ Loading states
- ✅ Modais
- ✅ Orientação landscape

#### 5. Acessibilidade (`tests/e2e/accessibility.test.ts`)

- ✅ Navegação por teclado
- ✅ Labels e descrições
- ✅ Contraste adequado
- ✅ Tamanho de fonte
- ✅ Foco visível
- ✅ Skip links
- ✅ Landmarks semânticos
- ✅ Headings hierárquicos
- ✅ Alt text em imagens
- ✅ Botões descritivos
- ✅ Formulários acessíveis
- ✅ Carrossel acessível
- ✅ Modal acessível
- ✅ Tabelas acessíveis
- ✅ Listas acessíveis
- ✅ Busca acessível
- ✅ Filtros acessíveis
- ✅ Paginação acessível
- ✅ Breadcrumbs acessíveis
- ✅ Loading states acessíveis
- ✅ Mensagens de erro acessíveis
- ✅ Zoom adequado
- ✅ Redução de movimento

### Comandos E2E

```bash
# Executar todos os testes E2E
npm run test:e2e

# Interface visual
npm run test:e2e:ui

# Modo headed (ver navegador)
npm run test:e2e:headed

# Debug
npm run test:e2e:debug

# Instalar navegadores
npm run test:e2e:install

# Gerar relatório
npm run test:e2e:report

# Gerar código
npm run test:e2e:codegen
```

## 📊 Monitoramento

### Health Checks

```bash
npm run monitor:health
```

### Performance

```bash
npm run monitor:performance
```

### Acessibilidade

```bash
npm run monitor:accessibility
```

## 🔒 Segurança

### Auditoria

```bash
npm run security:audit
```

### Correção Automática

```bash
npm run security:fix
```

### Atualizações

```bash
npm run security:update
```

## ⚡ Performance

### Lighthouse

```bash
npm run performance:lighthouse
```

### Budget de Performance

```bash
npm run performance:budget
```

## 🔍 SEO

### Verificação SEO

```bash
npm run seo:check
```

### Sitemap

```bash
npm run seo:sitemap
```

### Robots.txt

```bash
npm run seo:robots
```

## 🛠️ Manutenção

### Limpeza

```bash
npm run maintenance:cleanup
```

### Manutenção Completa

```bash
npm run maintenance:full
```

### Logs

```bash
npm run logs:view
npm run logs:clear
npm run logs:analyze
```

## 🗄️ Banco de Dados

### Migrações

```bash
npm run db:migrate
```

### Reset

```bash
npm run db:reset
```

### Seed

```bash
npm run db:seed
```

### Backup

```bash
npm run db:backup
```

## 🖼️ Imagens

### Otimização

```bash
npm run image:optimize
```

### Download

```bash
npm run image:download
```

## 🚀 Deploy

### Staging

```bash
npm run deploy:staging
```

### Produção

```bash
npm run deploy:production
```

### Rollback

```bash
npm run deploy:rollback
```

## 🔄 CI/CD

### Pipeline Completo

```bash
npm run ci:full
```

### Pipeline Rápido

```bash
npm run ci:fast
```

### Pipeline E2E

```bash
npm run ci:e2e
```

### Pipeline com Cobertura

```bash
npm run ci:coverage
```

## 🤖 Automação

### Setup

```bash
npm run automation:setup
```

### Testes Automatizados

```bash
npm run automation:test
```

### Deploy Automatizado

```bash
npm run automation:deploy
```

### Produção Automatizada

```bash
npm run automation:production
```

## 📋 Como Usar

### 1. Configuração Inicial

```bash
# Instalar dependências
npm install

# Instalar navegadores para E2E
npm run test:e2e:install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### 2. Desenvolvimento

```bash
# Desenvolvimento local
npm run dev

# Testes durante desenvolvimento
npm run test
npm run test:e2e -- --project=chromium
```

### 3. Qualidade

```bash
# Verificação completa de qualidade
npm run quality:check

# Correção automática
npm run quality:fix
```

### 4. Deploy

```bash
# Deploy para staging
npm run automation:deploy

# Deploy para produção
npm run automation:production
```

### 5. Monitoramento

```bash
# Verificar saúde da aplicação
npm run monitor:health

# Verificar performance
npm run performance:lighthouse

# Verificar SEO
npm run seo:check
```

### 6. Manutenção

```bash
# Limpeza e backup
npm run maintenance:cleanup

# Manutenção completa
npm run maintenance:full
```

## 🔧 Configuração de Variáveis de Ambiente

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password

# Notificações
SLACK_WEBHOOK_URL=your_slack_webhook
DISCORD_WEBHOOK_URL=your_discord_webhook

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Monitoramento
UPTIME_ROBOT_API_KEY=your_uptime_robot_key
SENTRY_DSN=your_sentry_dsn
```

## 📈 Métricas e Relatórios

### Cobertura de Testes

- Testes unitários: 100%
- Testes E2E: Cobertura completa dos fluxos críticos
- Testes de acessibilidade: WCAG 2.1 AA
- Testes de responsividade: Mobile, Tablet, Desktop

### Performance

- Lighthouse Score: >90
- Core Web Vitals: Pass
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

### Segurança

- Vulnerabilidades: 0 críticas
- Auditoria de dependências: Pass
- Headers de segurança: Configurados
- Rate limiting: Implementado

## 🚨 Alertas e Notificações

### Slack/Discord

- Deploy de staging/produção
- Falhas de teste
- Rollbacks
- Alertas de performance
- Alertas de segurança

### Email

- Relatórios diários de backup
- Alertas de vulnerabilidades
- Relatórios de performance
- Relatórios de SEO

## 📚 Recursos Adicionais

- [Documentação do Playwright](https://playwright.dev/)
- [Documentação do Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contribuição

Para contribuir com as automações:

1. Crie uma branch para sua feature
2. Implemente as automações necessárias
3. Adicione testes E2E correspondentes
4. Atualize a documentação
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas sobre as automações:

1. Consulte a documentação
2. Verifique os logs de erro
3. Execute os testes de diagnóstico
4. Abra uma issue no repositório

---

**Última atualização:** Dezembro de 2024
**Versão:** 1.0.0
**Status:** ✅ Implementado e Funcionando
