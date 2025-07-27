# 🏷️ Configuração do Repositório Vytalle

## 📋 Informações do Repositório

**Nome:** Vytalle Estética - E-commerce B2B Premium  
**Descrição:** Catálogo B2B de produtos médicos estéticos premium - Next.js 14 + Supabase + Tailwind CSS. Distribuição de toxinas botulínicas, preenchedores e bioestimuladores certificados ANVISA.  
**URL:** https://github.com/FuturoDevJunior/codafofo  
**Website:** https://vytalle-estetica.vercel.app  

## 🏷️ Topics (Tags)

```
vytalle, estetica, ecommerce, b2b, nextjs, supabase, tailwindcss, typescript, pwa, medical-aesthetics, botox, preenchedores, bioestimuladores, anvisa, lgpd, vercel, vitest, playwright, github-actions, ci-cd
```

## ⚙️ Configurações

### Visibilidade
- **Público:** ✅ Sim
- **Issues:** ✅ Habilitado
- **Projects:** ✅ Habilitado
- **Wiki:** ❌ Desabilitado
- **Downloads:** ✅ Habilitado

### Branch Padrão
- **Default:** `main`
- **Proteção:** ✅ Habilitada

### Merge Options
- **Squash merge:** ✅ Habilitado
- **Merge commit:** ✅ Habilitado
- **Rebase merge:** ✅ Habilitado
- **Delete branch on merge:** ✅ Habilitado

### Segurança
- **Vulnerability alerts:** ✅ Habilitado
- **Automated security fixes:** ✅ Habilitado

## 🔧 Secrets Necessários

### Vercel
- `VERCEL_TOKEN` - Token de autenticação do Vercel
- `VERCEL_ORG_ID` - ID da organização no Vercel
- `VERCEL_PROJECT_ID` - ID do projeto no Vercel

### GitHub
- `GITHUB_TOKEN` - Token automático do GitHub (já configurado)

## 🚀 Workflows

### Pipeline Principal
- **Arquivo:** `.github/workflows/main.yml`
- **Triggers:** Push para main/develop, PRs, Manual dispatch
- **Jobs:**
  1. 🔍 Quality Check (lint, type-check, tests)
  2. 🏗️ Build Application
  3. 🌐 Deploy Staging (automático)
  4. 🎯 Deploy Production (manual/tags)
  5. 🧪 E2E Tests
  6. 📢 Notifications

## 📊 Métricas

- **Testes:** 931+ testes automatizados
- **Coverage:** >80%
- **Performance:** Otimizada
- **Deploy:** Automático via Vercel

## 🔗 Links Importantes

- **Produção:** https://vytalle-estetica.vercel.app
- **Documentação:** https://github.com/FuturoDevJunior/codafofo
- **Issues:** https://github.com/FuturoDevJunior/codafofo/issues
- **Actions:** https://github.com/FuturoDevJunior/codafofo/actions

---

*Configurado pela RET Consultoria - Vytalle Estética* 