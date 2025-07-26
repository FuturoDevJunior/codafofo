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
  console.log('\n🧪 TESTE AUTOMÁTICO DE LOGIN ADMIN\n');
  
  const credentials = {
    email: 'admin@vytalle.com.br',
    password: 'U9!M3&QChTck%$C5tZZ#' // Senha gerada no último setup
  };
  
  try {
    console.log('📡 Conectando ao Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    console.log('🔐 Testando login...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    
    if (error) {
      console.log('❌ ERRO NO LOGIN:', error.message);
      
      if (error.message.includes('Invalid login credentials')) {
        console.log('\n💡 SOLUÇÕES:');
        console.log('1. Execute: npm run admin:reset');
        console.log('2. Use a nova senha gerada');
        console.log('3. Ou configure manualmente no painel Supabase');
      }
      
      return false;
    }
    
    if (data.user) {
      console.log('✅ LOGIN REALIZADO COM SUCESSO!');
      console.log(`👤 Usuário: ${data.user.email}`);
      console.log(`🆔 ID: ${data.user.id}`);
      console.log(`🕐 Último login: ${data.user.last_sign_in_at}`);
      
      // Fazer logout
      await supabase.auth.signOut();
      console.log('🚪 Logout realizado');
      
      return true;
    }
    
    console.log('❌ Falha inesperada no login');
    return false;
    
  } catch (error) {
    console.error('❌ ERRO TÉCNICO:', error);
    return false;
  }
}

async function generateAccessInstructions(loginSuccess: boolean) {
  console.log('\n' + '='.repeat(70));
  console.log('📋 INSTRUÇÕES DE ACESSO');
  console.log('='.repeat(70));
  
  if (loginSuccess) {
    console.log('\n✅ SISTEMA FUNCIONANDO PERFEITAMENTE!\n');
    
    console.log('🌐 ACESSAR PAINEL ADMIN:');
    console.log('   URL: http://localhost:5174/admin/login');
    console.log('   Email: admin@vytalle.com.br');
    console.log('   Senha: U9!M3&QChTck%$C5tZZ#\n');
    
    console.log('🚀 COMANDOS ÚTEIS:');
    console.log('   npm run dev:fast    # Iniciar servidor');
    console.log('   npm run admin:reset # Gerar nova senha');
    console.log('   npm run admin:test  # Testar login');
    
  } else {
    console.log('\n❌ SISTEMA PRECISA DE CONFIGURAÇÃO\n');
    
    console.log('🔧 PASSOS PARA CORRIGIR:');
    console.log('1. npm run admin:reset');
    console.log('2. Anote a nova senha gerada');
    console.log('3. npm run admin:test');
    console.log('4. Acesse: http://localhost:5174/admin/login\n');
    
    console.log('🆘 MÉTODO ALTERNATIVO:');
    console.log('1. Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users');
    console.log('2. Encontre o usuário admin@vytalle.com.br');
    console.log('3. Clique em "..." > "Reset Password"');
    console.log('4. Defina nova senha: VytalleAdmin2024!@#');
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✨ TESTE CONCLUÍDO!');
  console.log('='.repeat(70));
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