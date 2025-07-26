#!/usr/bin/env npx tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function testAdminLogin() {
  console.warn('\n🧪 TESTE AUTOMÁTICO DE LOGIN ADMIN\n');

  const credentials = {
    email: 'admin@vytalle.com.br',
    password: 'U9!M3&QChTck%$C5tZZ#', // Senha gerada no último setup
  };

  try {
    console.warn('📡 Conectando ao Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.warn('🔐 Testando login...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.warn('❌ ERRO NO LOGIN:', error.message);

      if (error.message.includes('Invalid login credentials')) {
        console.warn('\n💡 SOLUÇÕES:');
        console.warn('1. Execute: npm run admin:reset');
        console.warn('2. Use a nova senha gerada');
        console.warn('3. Ou configure manualmente no painel Supabase');
      }

      return false;
    }

    if (data.user) {
      console.warn('✅ LOGIN REALIZADO COM SUCESSO!');
      console.warn(`👤 Usuário: ${data.user.email}`);
      console.warn(`🆔 ID: ${data.user.id}`);
      console.warn(`🕐 Último login: ${data.user.last_sign_in_at}`);

      // Fazer logout
      await supabase.auth.signOut();
      console.warn('🚪 Logout realizado');

      return true;
    }

    console.warn('❌ Falha inesperada no login');
    return false;
  } catch (error) {
    console.error('❌ ERRO TÉCNICO:', error);
    return false;
  }
}

async function generateAccessInstructions(loginSuccess: boolean) {
  console.warn('\n' + '='.repeat(70));
  console.warn('📋 INSTRUÇÕES DE ACESSO');
  console.warn('='.repeat(70));

  if (loginSuccess) {
    console.warn('\n✅ SISTEMA FUNCIONANDO PERFEITAMENTE!\n');

    console.warn('🌐 ACESSAR PAINEL ADMIN:');
    console.warn('   URL: http://localhost:5174/admin/login');
    console.warn('   Email: admin@vytalle.com.br');
    console.warn('   Senha: U9!M3&QChTck%$C5tZZ#\n');

    console.warn('🚀 COMANDOS ÚTEIS:');
    console.warn('   npm run dev:fast    # Iniciar servidor');
    console.warn('   npm run admin:reset # Gerar nova senha');
    console.warn('   npm run admin:test  # Testar login');
  } else {
    console.warn('\n❌ SISTEMA PRECISA DE CONFIGURAÇÃO\n');

    console.warn('🔧 PASSOS PARA CORRIGIR:');
    console.warn('1. npm run admin:reset');
    console.warn('2. Anote a nova senha gerada');
    console.warn('3. npm run admin:test');
    console.warn('4. Acesse: http://localhost:5174/admin/login\n');

    console.warn('🆘 MÉTODO ALTERNATIVO:');
    console.warn(
      '1. Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users'
    );
    console.warn('2. Encontre o usuário admin@vytalle.com.br');
    console.warn('3. Clique em "..." > "Reset Password"');
    console.warn('4. Defina nova senha: VytalleAdmin2024!@#');
  }

  console.warn('\n' + '='.repeat(70));
  console.warn('✨ TESTE CONCLUÍDO!');
  console.warn('='.repeat(70));
}

async function main() {
  const success = await testAdminLogin();
  await generateAccessInstructions(success);

  process.exit(success ? 0 : 1);
}

// Executar teste
if (require.main === module) {
  main().catch(console.error);
}
