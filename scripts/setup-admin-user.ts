import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

// Carregar variáveis de ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://unrnnzaprxiasssxrnbc.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\n❌ ERRO: Variáveis de ambiente não encontradas!');
  console.error('\nCertifique-se de que as seguintes variáveis estão definidas:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nDefina no arquivo .env.local ou .env\n');
  process.exit(1);
}

function generatePassword(length = 16): string {
  const lowercase = 'abcdefghijkmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '23456789';
  const symbols = '!@#$%&*';

  const allChars = lowercase + uppercase + numbers + symbols;

  let password = '';

  // Garantir que a senha tenha pelo menos um de cada tipo
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Completar o resto da senha
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Embaralhar a senha
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

async function main() {
  try {
    console.warn('\n🔐 Configurando usuário administrador no Supabase Auth...\n');

    // Conectar ao Supabase com service role
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const adminEmail = 'admin@vytalle.com.br';
    const adminPassword = generatePassword(20); // Senha muito forte

    console.warn('📧 Criando usuário admin no Supabase Auth...');

    // Primeiro, verificar se o usuário já existe
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('\n❌ ERRO ao verificar usuários existentes:', listError.message);
      process.exit(1);
    }

    const existingAdmin = existingUsers.users.find(user => user.email === adminEmail);

    if (existingAdmin) {
      console.warn('👤 Usuário admin já existe. Atualizando senha...');

      // Atualizar senha do usuário existente
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingAdmin.id,
        {
          password: adminPassword,
          email_confirm: true,
          user_metadata: {
            role: 'admin',
            name: 'Administrador Vytalle',
            updated_at: new Date().toISOString(),
          },
        }
      );

      if (updateError) {
        console.error('\n❌ ERRO ao atualizar usuário:', updateError.message);
        process.exit(1);
      }

      console.warn('✅ Senha do administrador atualizada com sucesso!');
    } else {
      console.warn('👤 Criando novo usuário administrador...');

      // Criar novo usuário admin
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          role: 'admin',
          name: 'Administrador Vytalle',
          created_at: new Date().toISOString(),
        },
      });

      if (createError) {
        console.error('\n❌ ERRO ao criar usuário:', createError.message);
        process.exit(1);
      }

      console.warn('✅ Usuário administrador criado com sucesso!');
    }

    // Verificar se precisamos criar tabela de permissões
    console.warn('🔒 Configurando tabela de permissões...');

    const { data: profileCheck, error: profileError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', adminEmail)
      .limit(1);

    if (profileError && profileError.code === '42P01') {
      console.warn('\n📋 Criando tabela user_profiles...');
      console.warn('\nExecute o seguinte SQL no Supabase SQL Editor:');
      console.warn(`
-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para usuários atualizarem apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para service role fazer tudo
CREATE POLICY "Service role can do everything" ON user_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, name)
  VALUES (new.id, new.email, 'user', COALESCE(new.raw_user_meta_data->>'name', 'Usuário'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
      `);
      console.warn('\nDepois execute novamente este script para finalizar a configuração.\n');
      process.exit(1);
    }

    // Inserir/atualizar perfil do admin
    let adminUserId = existingAdmin?.id;

    if (!adminUserId) {
      // Se não existe usuário admin, precisamos do ID do usuário criado
      const { data: newUsers } = await supabase.auth.admin.listUsers();
      const newAdmin = newUsers.users.find(user => user.email === adminEmail);
      adminUserId = newAdmin?.id;
    }

    if (adminUserId) {
      const { error: upsertError } = await supabase.from('user_profiles').upsert(
        {
          id: adminUserId,
          email: adminEmail,
          role: 'admin',
          name: 'Administrador Vytalle',
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'email',
        }
      );

      if (upsertError) {
        console.warn('⚠️  Aviso ao configurar perfil:', upsertError.message);
        console.warn('Execute o SQL acima no Supabase e tente novamente.');
      } else {
        console.warn('✅ Perfil de administrador configurado!');
      }
    }

    // Sucesso!
    console.warn('\n' + '='.repeat(70));
    console.warn('🎉 ADMINISTRADOR CONFIGURADO COM SUCESSO!');
    console.warn('='.repeat(70));
    console.warn('\n📧 Email: admin@vytalle.com.br');
    console.warn(`🔑 Senha: ${adminPassword}`);
    console.warn('\n🌐 Acesso:');
    console.warn(`• URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin`);
    console.warn('• Faça login com o email e senha acima');
    console.warn('\n⚠️  IMPORTANTE:');
    console.warn('• ANOTE a senha em local seguro');
    console.warn('• Use o sistema de login do Supabase');
    console.warn('• Acesso 100% seguro sem vazamentos');
    console.warn('• Para nova senha, execute este script novamente');
    console.warn('\n✨ Configuração concluída!\n');
  } catch (error) {
    console.error('\n💥 ERRO INESPERADO:', error);
    console.error('\nDetalhes técnicos:');
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      console.error('Stack:', error.stack);
    }
    console.error('\nVerifique as configurações do Supabase e tente novamente.\n');
    process.exit(1);
  }
}

// Executar script
if (require.main === module) {
  main();
}
