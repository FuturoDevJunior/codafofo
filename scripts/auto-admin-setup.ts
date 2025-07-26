#!/usr/bin/env npx tsx

import { config } from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

console.log('\n🚀 CONFIGURAÇÃO AUTOMÁTICA DO ADMIN - VYTALLE\n');

function displayServiceRoleInstructions() {
  console.log('📋 INSTRUÇÕES PARA OBTER A CHAVE SERVICE ROLE:\n');
  
  console.log('1. 🌐 ACESSAR PAINEL SUPABASE:');
  console.log('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/settings/api\n');
  
  console.log('2. 🔑 COPIAR SERVICE ROLE KEY:');
  console.log('   • Na seção "Project API keys"');
  console.log('   • Procure por "service_role" (key secreta)');
  console.log('   • Clique em "Reveal" e copie a chave\n');
  
  console.log('3. 📝 ADICIONAR AO .env.local:');
  console.log('   • Abra o arquivo .env.local');
  console.log('   • Adicione: SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui\n');
}

function displayManualUserCreation() {
  console.log('👤 CRIAR USUÁRIO ADMIN MANUALMENTE:\n');
  
  console.log('1. 🌐 ACESSAR GERENCIAMENTO DE USUÁRIOS:');
  console.log('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users\n');
  
  console.log('2. ➕ ADICIONAR NOVO USUÁRIO:');
  console.log('   • Clique no botão "Add user"');
  console.log('   • Email: admin@vytalle.com.br');
  console.log('   • Senha: VytalleAdmin2024!@#');
  console.log('   • ✅ Marque "Auto Confirm User"');
  console.log('   • Clique em "Create User"\n');
}

function displaySQLMethod() {
  console.log('🔧 MÉTODO ALTERNATIVO - SQL DIRETO:\n');
  
  console.log('1. 🌐 ACESSAR SQL EDITOR:');
  console.log('   https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/sql/new\n');
  
  console.log('2. 📝 EXECUTAR SQL:');
  console.log(`
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
  console.log('🧪 TESTAR O LOGIN:\n');
  
  console.log('1. 🌐 ACESSAR PÁGINA DE LOGIN:');
  console.log('   http://localhost:3000/admin/login\n');
  
  console.log('2. 🔐 CREDENCIAIS:');
  console.log('   📧 Email: admin@vytalle.com.br');
  console.log('   🔑 Senha: VytalleAdmin2024!@#\n');
  
  console.log('3. ✅ VERIFICAR ACESSO:');
  console.log('   • Se o login funcionar, você será redirecionado para /admin');
  console.log('   • O painel administrativo deve carregar normalmente\n');
}

function displayEnvironmentStatus() {
  console.log('📊 STATUS DAS VARIÁVEIS DE AMBIENTE:\n');
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log(`NEXT_PUBLIC_SUPABASE_URL: ${url ? '✅ Configurada' : '❌ Faltando'}`);
  console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? '✅ Configurada' : '❌ Faltando'}`);
  console.log(`SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? '✅ Configurada' : '❌ Faltando'}\n`);
  
  if (url) {
    console.log(`🔗 Projeto Supabase: ${url}`);
  }
}

function displayAutomationScript() {
  console.log('🤖 AUTOMATIZAR CONFIGURAÇÃO:\n');
  
  console.log('Para automatizar completamente, execute os seguintes passos:\n');
  
  console.log('1. 📋 COPIAR COMANDOS:');
  console.log(`
# 1. Obter a service role key e adicionar ao .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui" >> .env.local

# 2. Executar script de configuração automática
npm run setup:admin

# 3. Iniciar servidor
npm run dev

# 4. Testar login
curl -X POST http://localhost:3000/api/admin-setup | jq .
`);
  
  console.log('2. 📜 ADICIONAR AO package.json:');
  console.log(`
"scripts": {
  "setup:admin": "npx tsx scripts/setup-admin-user.ts",
  "fix:admin": "npx tsx scripts/fix-admin-auth.ts",
  "test:admin": "curl -X POST http://localhost:3000/api/admin-setup | jq ."
}
`);
}

function main() {
  console.log('='.repeat(70));
  console.log('🎯 GUIA COMPLETO DE CONFIGURAÇÃO DO ADMIN');
  console.log('='.repeat(70));
  
  displayEnvironmentStatus();
  displayServiceRoleInstructions();
  displayManualUserCreation();
  displaySQLMethod();
  displayTestInstructions();
  displayAutomationScript();
  
  console.log('='.repeat(70));
  console.log('✨ CONFIGURAÇÃO FINALIZADA!');
  console.log('='.repeat(70));
  console.log('');
  console.log('📞 SUPORTE:');
  console.log('• Execute qualquer um dos métodos acima');
  console.log('• O mais rápido é o método manual via painel Supabase');
  console.log('• Para dúvidas, verifique a documentação do Supabase Auth');
  console.log('');
}

// Executar
if (require.main === module) {
  main();
}