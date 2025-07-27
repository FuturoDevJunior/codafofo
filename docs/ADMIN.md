# 🔐 Sistema de Administração Vytalle

Sistema completo de autenticação e administração integrado com Supabase Auth.

## ✅ Status Atual

**FUNCIONANDO PERFEITAMENTE!** 🎉

- ✅ Usuário admin configurado
- ✅ Autenticação via Supabase
- ✅ Proteção de rotas implementada
- ✅ Painel administrativo funcional
- ✅ Scripts de automação configurados

## 🔑 Credenciais de Acesso

```
📧 Email: admin@vytalle.com.br
🔑 Senha: U9!M3&QChTck%$C5tZZ#
🌐 URL: http://localhost:5174/admin/login
```

## 🚀 Comandos Principais

### Gerenciamento do Admin

```bash
# Configurar usuário admin inicial
npm run admin:setup

# Resetar senha do admin (gera nova senha)
npm run admin:reset

# Testar login do admin
npm run admin:test

# Diagnosticar problemas
npm run admin:diagnose

# Ver guia completo de configuração
npm run admin:guide
```

### Servidor de Desenvolvimento

```bash
# Iniciar servidor (com inicialização do DB)
npm run dev

# Iniciar servidor rápido (sem inicialização do DB)
npm run dev:fast

# Iniciar com modo turbo
npm run dev:turbo
```

## 🛠️ Arquitetura do Sistema

### Estrutura de Arquivos

```
app/admin/
├── login/
│   ├── page.tsx              # Página de login
│   └── AdminLoginForm.tsx    # Formulário de login
├── page.tsx                  # Dashboard principal
├── reports/page.tsx          # Relatórios
├── audits/page.tsx          # Auditoria
└── customization/page.tsx   # Personalização

components/admin/
├── AdminDashboard.tsx        # Dashboard principal
└── ImageUploader.tsx         # Upload de imagens

scripts/
├── setup-admin-user.ts       # Configuração inicial
├── fix-admin-auth.ts         # Diagnóstico
├── auto-admin-setup.ts       # Guia automático
└── test-admin-login.ts       # Teste de login
```

### Configuração do Supabase

#### Variáveis de Ambiente (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://unrnnzaprxiasssxrnbc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Tabelas Relacionadas

- `auth.users` - Usuários do Supabase Auth
- `user_profiles` - Perfis e roles dos usuários (opcional)

## 🔒 Fluxo de Autenticação

1. **Login** (`/admin/login`)
   - Formulário com email/senha
   - Autenticação via `supabase.auth.signInWithPassword()`
   - Redirecionamento para `/admin` em caso de sucesso

2. **Proteção de Rotas** (`/admin/*`)
   - Verificação de sessão via `supabase.auth.getSession()`
   - Redirecionamento para login se não autenticado
   - Verificação opcional de role admin

3. **Dashboard** (`/admin`)
   - Carregamento de dados dos produtos
   - Interface administrativa completa
   - Controles de CRUD

## 🔧 Solução de Problemas

### Problema: "Permission denied"

```bash
# Verificar variáveis de ambiente
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Reconfigurar admin
npm run admin:reset
```

### Problema: "Invalid login credentials"

```bash
# Gerar nova senha
npm run admin:reset

# Ou configurar manualmente:
# 1. Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users
# 2. Encontre admin@vytalle.com.br
# 3. Reset password para: VytalleAdmin2024!@#
```

### Problema: "User not found"

```bash
# Criar usuário do zero
npm run admin:setup

# Ou método manual:
# 1. Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users
# 2. Add user: admin@vytalle.com.br
# 3. Senha: VytalleAdmin2024!@#
# 4. Auto-confirm: ✅
```

## 🧪 Testes Automatizados

### Teste de Login

```bash
npm run admin:test
```

Verifica:

- ✅ Conexão com Supabase
- ✅ Autenticação com credenciais
- ✅ Recebimento de token
- ✅ Logout correto

### Teste E2E

```bash
npm run test:e2e -- --grep="admin"
```

## 🚀 Deploy e Produção

### Variáveis de Ambiente (Vercel)

```bash
# Configurar no Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### URLs de Produção

- **Staging**: https://vytalle-staging.vercel.app/admin/login
- **Production**: https://vytalle.vercel.app/admin/login

## 📊 Monitoramento

### Health Check

```bash
# Verificar API
curl -f http://localhost:5174/api/admin-setup

# Verificar login
npm run admin:test
```

### Logs de Acesso

- Implementado via `lib/logger.ts`
- Logs de autenticação salvos automaticamente
- Auditoria disponível em `/admin/audits`

## 🔐 Segurança

### Boas Práticas Implementadas

- ✅ Autenticação via Supabase Auth (bcrypt)
- ✅ JWT tokens seguros
- ✅ Row Level Security (RLS) no banco
- ✅ Cookies httpOnly para sessões
- ✅ Proteção CSRF
- ✅ Rate limiting automático
- ✅ Sanitização de inputs

### Políticas de Segurança

- Senhas com 20+ caracteres
- Expiração automática de sessões
- Logs de tentativas de acesso
- Bloqueio por IP (via Supabase)

## 📱 Interface Administrativa

### Funcionalidades Disponíveis

- 📊 Dashboard com métricas
- 📦 Gerenciamento de produtos
- 🛒 Visualização de pedidos
- 📈 Relatórios de vendas
- 🔧 Personalização da loja
- 📋 Auditoria de ações
- 🖼️ Upload de imagens

### Próximas Funcionalidades

- [ ] Gerenciamento de usuários
- [ ] Configurações de email
- [ ] Backup automático
- [ ] Analytics avançado
- [ ] Notificações push

---

## 🎯 Resumo Executivo

**O sistema de administração está 100% funcional e pronto para uso!**

- **Acesso**: http://localhost:5174/admin/login
- **Credenciais**: admin@vytalle.com.br / U9!M3&QChTck%$C5tZZ#
- **Comandos**: `npm run admin:*` para automação
- **Segurança**: Implementação robusta via Supabase Auth
- **Monitoramento**: Logs e testes automatizados disponíveis

**Para usuários finais**: Apenas acesse a URL e faça login com as credenciais
fornecidas.

**Para desenvolvedores**: Use os comandos npm para gerenciar o sistema
automaticamente.
