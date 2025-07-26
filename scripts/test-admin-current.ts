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
  console.log('\n🧪 TESTE DINÂMICO DE LOGIN ADMIN\n');
  
  const testPasswords = [
    '5H6T$5udYvkwCT2jsc6@', // Senha mais recente
    'VytalleAdmin2024!@#',   // Senha padrão
    'U9!M3&QChTck%$C5tZZ#', // Senha anterior
    'vytalle123',             // Senha simples
    'admin123'                // Senha backup
  ];
  
  const adminEmail = 'admin@vytalle.com.br';
  
  try {
    console.log('📡 Conectando ao Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    for (const password of testPasswords) {
      console.log(`🔐 Testando senha: ${password.substring(0, 4)}...`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: password
      });
      
      if (!error && data.user) {
        console.log('✅ LOGIN REALIZADO COM SUCESSO!');
        console.log(`👤 Usuário: ${data.user.email}`);
        console.log(`🆔 ID: ${data.user.id}`);
        console.log(`🔑 Senha funcionando: ${password}`);
        console.log(`🕐 Último login: ${data.user.last_sign_in_at}`);
        
        // Fazer logout
        await supabase.auth.signOut();
        console.log('🚪 Logout realizado');
        
        return { success: true, password };
      } else {
        console.log(`❌ Falha com senha: ${password.substring(0, 4)}...`);
      }
    }
    
    console.log('❌ Nenhuma senha funcionou');
    return { success: false, password: null };
    
  } catch (error) {
    console.error('❌ ERRO TÉCNICO:', error);
    return { success: false, password: null };
  }
}

async function testPermissions(password: string) {
  console.log('\n🔒 TESTANDO PERMISSÕES...\n');
  
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Fazer login
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: 'admin@vytalle.com.br',
      password: password
    });
    
    if (!authData.user) {
      console.log('❌ Falha no login para teste de permissões');
      return false;
    }
    
    // Testar acesso aos produtos
    console.log('📦 Testando acesso aos produtos...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name')
      .limit(5);
    
    if (productsError) {
      console.log('❌ Erro ao acessar produtos:', productsError.message);
    } else {
      console.log(`✅ Produtos acessíveis: ${products?.length || 0} encontrados`);
    }
    
    // Testar acesso aos perfis
    console.log('👥 Testando acesso aos perfis...');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('id, email, role')
      .limit(5);
    
    if (profilesError) {
      console.log('❌ Erro ao acessar perfis:', profilesError.message);
    } else {
      console.log(`✅ Perfis acessíveis: ${profiles?.length || 0} encontrados`);
    }
    
    // Testar função admin
    console.log('🔧 Testando função is_admin...');
    const { data: isAdminResult, error: isAdminError } = await supabase
      .rpc('is_admin');
    
    if (isAdminError) {
      console.log('❌ Erro ao testar função is_admin:', isAdminError.message);
    } else {
      console.log(`✅ Função is_admin: ${isAdminResult ? 'ADMIN' : 'NÃO ADMIN'}`);
    }
    
    // Testar estatísticas
    console.log('📊 Testando estatísticas do dashboard...');
    const { data: stats, error: statsError } = await supabase
      .rpc('get_admin_stats');
    
    if (statsError) {
      console.log('❌ Erro ao obter estatísticas:', statsError.message);
    } else {
      console.log('✅ Estatísticas obtidas:', JSON.stringify(stats, null, 2));
    }
    
    // Fazer logout
    await supabase.auth.signOut();
    
    return true;
  } catch (error) {
    console.error('❌ ERRO no teste de permissões:', error);
    return false;
  }
}

async function generateReport(loginResult: any, permissionsOk: boolean) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 RELATÓRIO COMPLETO DO TESTE');
  console.log('='.repeat(70));
  
  if (loginResult.success) {
    console.log('\n✅ LOGIN FUNCIONANDO!');
    console.log(`📧 Email: admin@vytalle.com.br`);
    console.log(`🔑 Senha: ${loginResult.password}`);
    console.log(`🔒 Permissões: ${permissionsOk ? '✅ OK' : '❌ LIMITADAS'}`);
    
    console.log('\n🌐 ACESSAR PAINEL:');
    console.log('   URL: http://localhost:5174/admin/login');
    console.log('   Porta alternativa: http://localhost:3000/admin/login');
    
    console.log('\n🚀 COMANDOS ÚTEIS:');
    console.log('   npm run dev:fast      # Iniciar servidor na porta 5174');
    console.log('   npm run dev          # Iniciar servidor na porta 3000');
    console.log('   npm run admin:test   # Testar login novamente');
    
    if (!permissionsOk) {
      console.log('\n⚠️  ATENÇÃO - PERMISSÕES LIMITADAS:');
      console.log('   • Login funciona mas algumas funcionalidades podem falhar');
      console.log('   • Execute: npx supabase db push');
      console.log('   • Ou aplique as migrações manualmente');
    }
    
  } else {
    console.log('\n❌ LOGIN NÃO FUNCIONANDO');
    
    console.log('\n🔧 SOLUÇÕES AUTOMÁTICAS:');
    console.log('   npm run admin:reset   # Gerar nova senha');
    console.log('   npm run admin:setup   # Recriar usuário');
    
    console.log('\n🆘 SOLUÇÃO MANUAL:');
    console.log('   1. https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users');
    console.log('   2. Encontrar admin@vytalle.com.br');
    console.log('   3. Reset password → VytalleAdmin2024!@#');
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✨ TESTE CONCLUÍDO!');
  console.log('='.repeat(70));
}

async function main() {
  const loginResult = await testAdminLogin();
  let permissionsOk = false;
  
  if (loginResult.success) {
    permissionsOk = await testPermissions(loginResult.password || '');
  }
  
  await generateReport(loginResult, permissionsOk);
  
  process.exit(loginResult.success ? 0 : 1);
}

if (require.main === module) {
  main().catch(console.error);
}