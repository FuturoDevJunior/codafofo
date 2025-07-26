# 🚀 Guia de Deploy - Vytalle Estética

> **Como publicar, monitorar e manter o projeto em produção com segurança**

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Checklist de Pré-Deploy](#checklist-de-pré-deploy)
- [Deploy em Produção (Vercel)](#deploy-em-produção-vercel)
- [Deploy do Banco (Supabase)](#deploy-do-banco-supabase)
- [Rollback de Deploy](#rollback-de-deploy)
- [Monitoramento e Logs](#monitoramento-e-logs)
- [Troubleshooting de Deploy](#troubleshooting-de-deploy)

---

## ✅ Pré-requisitos

- Conta no [Vercel](https://vercel.com/)
- Conta no [Supabase](https://supabase.com/)
- Variáveis de ambiente configuradas
- Banco migrado e seedado
- Testes passando localmente

---

## 📝 Checklist de Pré-Deploy

- [ ] Todos os testes passam (`npm run test`)
- [ ] Lint e type-check sem erros (`npm run lint && npm run type-check`)
- [ ] Variáveis de ambiente revisadas
- [ ] Banco migrado e seedado (`npm run db:init`)
- [ ] Documentação atualizada
- [ ] Build local sem warnings (`npm run build`)
- [ ] Cobertura de testes >95%

---

## 🚀 Deploy em Produção (Vercel)

```bash
# 1. Build local para garantir
npm run build

# 2. Login na Vercel
vercel login

# 3. Linkar projeto
vercel link

# 4. Adicionar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ...demais variáveis

# 5. Deploy
vercel --prod
```

- O deploy é automático em push na branch `main`.
- Use `vercel --prod --force` para forçar deploy.

---

## 🗄️ Deploy do Banco (Supabase)

```bash
# 1. Login Supabase
npx supabase login

# 2. Linkar projeto
npx supabase link --project-ref <PROJECT_REF>

# 3. Aplicar migrations
npx supabase db push

# 4. Rodar seeds (se necessário)
npm run db:init
```

---

## 🔄 Rollback de Deploy

```bash
# 1. Reverter último commit
git revert HEAD --no-edit
git push origin main

# 2. Deploy forçado
vercel --prod --force

# 3. Rollback via Vercel Dashboard
# Deployments > [deployment] > "Revert to this deployment"
```

---

## 📈 Monitoramento e Logs

- **Vercel:**
  - Deploys: https://vercel.com/dashboard
  - Logs: `vercel logs`
  - Status: https://vercel.com/status
- **Supabase:**
  - Status: https://status.supabase.com/
  - Logs: `npx supabase logs`
- **API Health:**
  - https://vytalle-estetica.vercel.app/api/health

---

## 🛠️ Troubleshooting de Deploy

| Problema | Solução |
|----------|---------|
| **Build falha** | `npm run build` local, verifique erros de lint/type-check |
| **Variáveis ausentes** | `vercel env ls` e adicione as faltantes |
| **Banco não conecta** | Verifique credenciais e status do Supabase |
| **Rollback necessário** | Use `git revert` e redeploy |
| **Domínio não funciona** | Verifique DNS e SSL no Vercel |
| **Deploy não atualiza** | `vercel --prod --force` |

---

**Deploy seguro, monitorado e reversível!** 