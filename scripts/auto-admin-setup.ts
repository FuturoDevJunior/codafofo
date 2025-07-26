#!/usr/bin/env npx tsx

import { config } from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

console.warn('\n🚀 CONFIGURAÇÃO AUTOMÁTICA DO ADMIN - VYTALLE\n');

function displayServiceRoleInstructions() {
  console.warn('📋 INSTRUÇÕES PARA OBTER A CHAVE SERVICE ROLE:\n');

  console.warn('1. 🌐 ACESSAR PAINEL SUPABASE:');
  console.warn('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/settings/api\n');

  console.warn('2. 🔑 COPIAR SERVICE ROLE KEY:');
  console.warn('   • Na seção "Project API keys"');
  console.warn('   • Procure por "service_role" (key secreta)');
  console.warn('   • Clique em "Reveal" e copie a chave\n');

  console.warn('3. 📝 ADICIONAR AO .env.local:');
  console.warn('   • Abra o arquivo .env.local');
  console.warn('   • Adicione: SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui\n');
}

function displayManualUserCreation() {
  console.warn('👤 CRIAR USUÁRIO ADMIN MANUALMENTE:\n');

  console.warn('1. 🌐 ACESSAR GERENCIAMENTO DE USUÁRIOS:');
  console.warn('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users\n');

  console.warn('2. ➕ ADICIONAR NOVO USUÁRIO:');
  console.warn('   • Clique no botão "Add user"');
  console.warn('   • Email: admin@vytalle.com.br');
  console.warn('   • Senha: VytalleAdmin2024!@#');
  console.warn('   • ✅ Marque "Auto Confirm User"');
  console.warn('   • Clique em "Create User"\n');
}

function displaySQLMethod() {
  console.warn('🔧 MÉTODO ALTERNATIVO - SQL DIRETO:\n');

  console.warn('1. 🌐 ACESSAR SQL EDITOR:');
  console.warn('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/sql/new\n');

  console.warn('2. 📝 EXECUTAR SQL:');
  console.warn(`
-- Criar usuário admin diretamente na tabela auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@vytalle.com.br',
  crypt('VytalleAdmin2024!@#', gen_salt('bf')),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin","name":"Administrador Vytalle"}',
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  updated_at = NOW();

-- Opcional: Criar tabela de perfis se não existir
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir perfil do admin
INSERT INTO user_profiles (id, email, role, name)
SELECT id, email, 'admin', 'Administrador Vytalle'
FROM auth.users 
WHERE email = 'admin@vytalle.com.br'
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  updated_at = NOW();
`);
}

function displayTestInstructions() {
  console.warn('🧪 TESTAR O LOGIN:\n');

  console.warn('1. 🌐 ACESSAR PÁGINA DE LOGIN:');
  console.warn('   http://localhost:3000/admin/login\n');

  console.warn('2. 🔐 CREDENCIAIS:');
  console.warn('   📧 Email: admin@vytalle.com.br');
  console.warn('   🔑 Senha: VytalleAdmin2024!@#\n');

  console.warn('3. ✅ VERIFICAR ACESSO:');
  console.warn('   • Se o login funcionar, você será redirecionado para /admin');
  console.warn('   • O painel administrativo deve carregar normalmente\n');
}

function displayEnvironmentStatus() {
  console.warn('📊 STATUS DAS VARIÁVEIS DE AMBIENTE:\n');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.warn(`NEXT_PUBLIC_SUPABASE_URL: ${url ? '✅ Configurada' : '❌ Faltando'}`);
  console.warn(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? '✅ Configurada' : '❌ Faltando'}`);
  console.warn(`SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? '✅ Configurada' : '❌ Faltando'}\n`);

  if (url) {
    console.warn(`🔗 Projeto Supabase: ${url}`);
  }
}

function displayAutomationScript() {
  console.warn('🤖 AUTOMATIZAR CONFIGURAÇÃO:\n');

  console.warn('Para automatizar completamente, execute os seguintes passos:\n');

  console.warn('1. 📋 COPIAR COMANDOS:');
  console.warn(`
# 1. Obter a service role key e adicionar ao .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui" >> .env.local

# 2. Executar script de configuração automática
npm run setup:admin

# 3. Iniciar servidor
npm run dev

# 4. Testar login
curl -X POST http://localhost:3000/api/admin-setup | jq .
`);

  console.warn('2. 📜 ADICIONAR AO package.json:');
  console.warn(`
"scripts": {
  "setup:admin": "npx tsx scripts/setup-admin-user.ts",
  "fix:admin": "npx tsx scripts/fix-admin-auth.ts",
  "test:admin": "curl -X POST http://localhost:3000/api/admin-setup | jq ."
}
`);
}

function main() {
  console.warn('='.repeat(70));
  console.warn('🎯 GUIA COMPLETO DE CONFIGURAÇÃO DO ADMIN');
  console.warn('='.repeat(70));

  displayEnvironmentStatus();
  displayServiceRoleInstructions();
  displayManualUserCreation();
  displaySQLMethod();
  displayTestInstructions();
  displayAutomationScript();

  console.warn('='.repeat(70));
  console.warn('✨ CONFIGURAÇÃO FINALIZADA!');
  console.warn('='.repeat(70));
  console.warn('');
  console.warn('📞 SUPORTE:');
  console.warn('• Execute qualquer um dos métodos acima');
  console.warn('• O mais rápido é o método manual via painel Supabase');
  console.warn('• Para dúvidas, verifique a documentação do Supabase Auth');
  console.warn('');
}

// Executar
if (require.main === module) {
  main();
}
