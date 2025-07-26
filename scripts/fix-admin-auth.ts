import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.warn('\n🔧 Configuração de Autenticação Admin - Vytalle\n');

async function testConnection() {
  try {
    // Testar conexão básica com o Supabase
    console.warn('📡 Testando conexão com Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase.from('products').select('count').limit(1);

    if (error) {
      console.warn('❌ Erro na conexão:', error.message);
      return false;
    }

    console.warn('✅ Conexão com Supabase estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error);
    return false;
  }
}

async function testAuthentication() {
  try {
    console.warn('\n🔐 Testando autenticação existente...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Tentar fazer login com credenciais padrão
    const testCredentials = [
      { email: 'admin@vytalle.com.br', password: 'VytalleAdmin2024!@#' },
      { email: 'admin@vytalle.com.br', password: 'vytalle123' },
      { email: 'admin@vytalle.com.br', password: 'admin123' },
      { email: 'admin@vytalle.com.br', password: '123456' },
    ];

    for (const cred of testCredentials) {
      console.warn(`🔍 Testando login: ${cred.email}`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password,
      });

      if (data.user && !error) {
        console.warn('✅ Login bem-sucedido!');
        console.warn(`📧 Email: ${cred.email}`);
        console.warn(`🔑 Senha: ${cred.password}`);
        console.warn(`👤 User ID: ${data.user.id}`);

        // Fazer logout
        await supabase.auth.signOut();
        return cred;
      } else if (error) {
        console.warn(`❌ Falha: ${error.message}`);
      }
    }

    console.warn('❌ Nenhuma credencial funcionou. Usuário admin não encontrado.');
    return null;
  } catch (error) {
    console.error('❌ Erro ao testar autenticação:', error);
    return null;
  }
}

async function suggestSolution() {
  console.warn('\n💡 SOLUÇÕES RECOMENDADAS:\n');

  console.warn('1. 🔑 OBTER CHAVE SERVICE ROLE:');
  console.warn(
    '   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/settings/api'
  );
  console.warn('   • Copie a "service_role" key (secreta)');
  console.warn('   • Adicione ao .env.local: SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui');

  console.warn('\n2. 🎯 CRIAR USUÁRIO ADMIN MANUALMENTE:');
  console.warn(
    '   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/auth/users'
  );
  console.warn('   • Clique em "Add user"');
  console.warn('   • Email: admin@vytalle.com.br');
  console.warn('   • Senha: VytalleAdmin2024!@#');
  console.warn('   • Confirme email automaticamente');

  console.warn('\n3. 🔧 EXECUTAR VIA SQL EDITOR:');
  console.warn('   • Acesse: https://supabase.com/dashboard/project/unrnnzaprxiasssxrnbc/sql/new');
  console.warn('   • Execute o seguinte SQL:');
  console.warn(`
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

  console.warn('\n4. 🚀 TESTAR LOGIN:');
  console.warn('   • URL: http://localhost:3000/admin/login');
  console.warn('   • Email: admin@vytalle.com.br');
  console.warn('   • Senha: VytalleAdmin2024!@#');
}

async function main() {
  console.warn('📋 Diagnóstico do Sistema de Autenticação Admin\n');

  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.warn('\n❌ Falha na conexão básica. Verifique as credenciais do Supabase.');
    return;
  }

  const credentials = await testAuthentication();
  if (credentials) {
    console.warn('\n🎉 SUCESSO! Sistema de login admin está funcionando!');
    console.warn(`\n🔗 Acesse: http://localhost:3000/admin/login`);
    console.warn(`📧 Email: ${credentials.email}`);
    console.warn(`🔑 Senha: ${credentials.password}`);
  } else {
    await suggestSolution();
  }

  console.warn('\n' + '='.repeat(70));
  console.warn('🔧 Diagnóstico concluído!');
  console.warn('='.repeat(70));
  console.warn('');
}

// Executar diagnóstico
if (require.main === module) {
  main().catch(console.error);
}
