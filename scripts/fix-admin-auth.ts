import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('\n🔧 Configuração de Autenticação Admin - Vytalle\n');

async function testConnection() {
  try {
    // Testar conexão básica com o Supabase
    console.log('📡 Testando conexão com Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase.from('products').select('count').limit(1);
    
    if (error) {
      console.log('❌ Erro na conexão:', error.message);
      return false;
    }
    
    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error);
    return false;
  }
}

async function testAuthentication() {
  try {
    console.log('\n🔐 Testando autenticação existente...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Tentar fazer login com credenciais padrão
    const testCredentials = [
      { email: 'admin@vytalle.com.br', password: 'VytalleAdmin2024!@#' },
      { email: 'admin@vytalle.com.br', password: 'vytalle123' },
      { email: 'admin@vytalle.com.br', password: 'admin123' },
      { email: 'admin@vytalle.com.br', password: '123456' }
    ];
    
    for (const cred of testCredentials) {
      console.log(`🔍 Testando login: ${cred.email}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password
      });
      
      if (data.user && !error) {
        console.log('✅ Login bem-sucedido!');
        console.log(`📧 Email: ${cred.email}`);
        console.log(`🔑 Senha: ${cred.password}`);
        console.log(`👤 User ID: ${data.user.id}`);
        
        // Fazer logout
        await supabase.auth.signOut();
        return cred;
      } else if (error) {
        console.log(`❌ Falha: ${error.message}`);
      }
    }
    
    console.log('❌ Nenhuma credencial funcionou. Usuário admin não encontrado.');
    return null;
  } catch (error) {
    console.error('❌ Erro ao testar autenticação:', error);
    return null;
  }
}

async function suggestSolution() {
  console.log('\n💡 SOLUÇÕES RECOMENDADAS:\n');
  
  console.log('1. 🔑 OBTER CHAVE SERVICE ROLE:');
  console.log('   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/settings/api');
  console.log('   • Copie a "service_role" key (secreta)');
  console.log('   • Adicione ao .env.local: SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui');
  
  console.log('\n2. 🎯 CRIAR USUÁRIO ADMIN MANUALMENTE:');
  console.log('   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users');
  console.log('   • Clique em "Add user"');
  console.log('   • Email: admin@vytalle.com.br');
  console.log('   • Senha: VytalleAdmin2024!@#');
  console.log('   • Confirme email automaticamente');
  
  console.log('\n3. 🔧 EXECUTAR VIA SQL EDITOR:');
  console.log('   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/sql/new');
  console.log('   • Execute o seguinte SQL:');
  console.log(`
  -- Inserir usuário admin diretamente
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@vytalle.com.br',
    crypt('VytalleAdmin2024!@#', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin","name":"Administrador Vytalle"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );`);
  
  console.log('\n4. 🚀 TESTAR LOGIN:');
  console.log('   • URL: http://localhost:3000/admin/login');
  console.log('   • Email: admin@vytalle.com.br');
  console.log('   • Senha: VytalleAdmin2024!@#');
}

async function main() {
  console.log('📋 Diagnóstico do Sistema de Autenticação Admin\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.log('\n❌ Falha na conexão básica. Verifique as credenciais do Supabase.');
    return;
  }
  
  const credentials = await testAuthentication();
  if (credentials) {
    console.log('\n🎉 SUCESSO! Sistema de login admin está funcionando!');
    console.log(`\n🔗 Acesse: http://localhost:3000/admin/login`);
    console.log(`📧 Email: ${credentials.email}`);
    console.log(`🔑 Senha: ${credentials.password}`);
  } else {
    await suggestSolution();
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('🔧 Diagnóstico concluído!');
  console.log('='.repeat(70));
  console.log('');
}

// Executar diagnóstico
if (require.main === module) {
  main().catch(console.error);
}