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
  console.warn('\n🧪 TESTE DINÂMICO DE LOGIN ADMIN\n');

  const testPasswords = [
    '5H6T$5udYvkwCT2jsc6@', // Senha mais recente
    'VytalleAdmin2024!@#', // Senha padrão
    'U9!M3&QChTck%$C5tZZ#', // Senha anterior
    'vytalle123', // Senha simples
    'admin123', // Senha backup
  ];

  const adminEmail = 'admin@vytalle.com.br';

  try {
    console.warn('📡 Conectando ao Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    for (const password of testPasswords) {
      console.warn(`🔐 Testando senha: ${password.substring(0, 4)}...`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: password,
      });

      if (!error && data.user) {
        console.warn('✅ LOGIN REALIZADO COM SUCESSO!');
        console.warn(`👤 Usuário: ${data.user.email}`);
        console.warn(`🆔 ID: ${data.user.id}`);
        console.warn(`🔑 Senha funcionando: ${password}`);
        console.warn(`🕐 Último login: ${data.user.last_sign_in_at}`);

        // Fazer logout
        await supabase.auth.signOut();
        console.warn('🚪 Logout realizado');

        return { success: true, password };
      } else {
        console.warn(`❌ Falha com senha: ${password.substring(0, 4)}...`);
      }
    }

    console.warn('❌ Nenhuma senha funcionou');
    return { success: false, password: null };
  } catch (error) {
    console.error('❌ ERRO TÉCNICO:', error);
    return { success: false, password: null };
  }
}

async function testPermissions(password: string) {
  console.warn('\n🔒 TESTANDO PERMISSÕES...\n');

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Fazer login
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: 'admin@vytalle.com.br',
      password: password,
    });

    if (!authData.user) {
      console.warn('❌ Falha no login para teste de permissões');
      return false;
    }

    // Testar acesso aos produtos
    console.warn('📦 Testando acesso aos produtos...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name')
      .limit(5);

    if (productsError) {
      console.warn('❌ Erro ao acessar produtos:', productsError.message);
    } else {
      console.warn(`✅ Produtos acessíveis: ${products?.length || 0} encontrados`);
    }

    // Testar acesso aos perfis
    console.warn('👥 Testando acesso aos perfis...');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('id, email, role')
      .limit(5);

    if (profilesError) {
      console.warn('❌ Erro ao acessar perfis:', profilesError.message);
    } else {
      console.warn(`✅ Perfis acessíveis: ${profiles?.length || 0} encontrados`);
    }

    // Testar função admin
    console.warn('🔧 Testando função is_admin...');
    const { data: isAdminResult, error: isAdminError } = await supabase.rpc('is_admin');

    if (isAdminError) {
      console.warn('❌ Erro ao testar função is_admin:', isAdminError.message);
    } else {
      console.warn(`✅ Função is_admin: ${isAdminResult ? 'ADMIN' : 'NÃO ADMIN'}`);
    }

    // Testar estatísticas
    console.warn('📊 Testando estatísticas do dashboard...');
    const { data: stats, error: statsError } = await supabase.rpc('get_admin_stats');

    if (statsError) {
      console.warn('❌ Erro ao obter estatísticas:', statsError.message);
    } else {
      console.warn('✅ Estatísticas obtidas:', JSON.stringify(stats, null, 2));
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
  console.warn('\n' + '='.repeat(70));
  console.warn('📊 RELATÓRIO COMPLETO DO TESTE');
  console.warn('='.repeat(70));

  if (loginResult.success) {
    console.warn('\n✅ LOGIN FUNCIONANDO!');
    console.warn(`📧 Email: admin@vytalle.com.br`);
    console.warn(`🔑 Senha: ${loginResult.password}`);
    console.warn(`🔒 Permissões: ${permissionsOk ? '✅ OK' : '❌ LIMITADAS'}`);

    console.warn('\n🌐 ACESSAR PAINEL:');
    console.warn('   URL: http://localhost:5174/admin/login');
    console.warn('   Porta alternativa: http://localhost:3000/admin/login');

    console.warn('\n🚀 COMANDOS ÚTEIS:');
    console.warn('   npm run dev:fast      # Iniciar servidor na porta 5174');
    console.warn('   npm run dev          # Iniciar servidor na porta 3000');
    console.warn('   npm run admin:test   # Testar login novamente');

    if (!permissionsOk) {
      console.warn('\n⚠️  ATENÇÃO - PERMISSÕES LIMITADAS:');
      console.warn('   • Login funciona mas algumas funcionalidades podem falhar');
      console.warn('   • Execute: npx supabase db push');
      console.warn('   • Ou aplique as migrações manualmente');
    }
  } else {
    console.warn('\n❌ LOGIN NÃO FUNCIONANDO');

    console.warn('\n🔧 SOLUÇÕES AUTOMÁTICAS:');
    console.warn('   npm run admin:reset   # Gerar nova senha');
    console.warn('   npm run admin:setup   # Recriar usuário');

    console.warn('\n🆘 SOLUÇÃO MANUAL:');
    console.warn('   1. https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users');
    console.warn('   2. Encontrar admin@vytalle.com.br');
    console.warn('   3. Reset password → VytalleAdmin2024!@#');
  }

  console.warn('\n' + '='.repeat(70));
  console.warn('✨ TESTE CONCLUÍDO!');
  console.warn('='.repeat(70));
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
