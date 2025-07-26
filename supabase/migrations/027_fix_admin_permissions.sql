-- ============================================================================
-- MIGRAÇÃO 027: CORREÇÃO COMPLETA DE PERMISSÕES ADMIN
-- ============================================================================
-- Esta migração resolve TODOS os problemas de permissão para o sistema admin
-- ============================================================================

-- 1. CRIAR TABELA DE PERFIS DE USUÁRIO (se não existir)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. HABILITAR RLS NA TABELA DE PERFIS
-- ============================================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. REMOVER POLÍTICAS EXISTENTES CONFLITANTES
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Service role can do everything" ON user_profiles;
DROP POLICY IF EXISTS "Admin full access" ON user_profiles;

-- 4. CRIAR POLÍTICAS PARA TABELA user_profiles
-- ============================================================================

-- Política para usuários verem apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para usuários atualizarem apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para service role fazer tudo
CREATE POLICY "Service role can do everything" ON user_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Política para admins terem acesso completo
CREATE POLICY "Admin full access" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles up 
      WHERE up.id = auth.uid() 
      AND up.role = 'admin'
    )
  );

-- 5. CORRIGIR POLÍTICAS DA TABELA PRODUCTS
-- ============================================================================

-- Verificar se RLS está habilitado na tabela products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Remover políticas conflitantes na tabela products
DROP POLICY IF EXISTS "Everyone can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view products" ON products;
DROP POLICY IF EXISTS "Admin can manage products" ON products;
DROP POLICY IF EXISTS "Service role can do everything on products" ON products;

-- Criar políticas adequadas para products
-- Todos podem ver produtos (incluindo usuários não autenticados)
CREATE POLICY "Everyone can view products" ON products
  FOR SELECT USING (true);

-- Apenas admins podem gerenciar produtos
CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (
    auth.role() = 'service_role' OR
    EXISTS (
      SELECT 1 FROM user_profiles up 
      WHERE up.id = auth.uid() 
      AND up.role = 'admin'
    )
  );

-- 6. CONFIGURAR FUNÇÃO PARA CRIAR PERFIL AUTOMATICAMENTE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, name)
  VALUES (
    new.id, 
    new.email, 
    CASE 
      WHEN new.email = 'admin@vytalle.com.br' THEN 'admin'
      ELSE 'user'
    END,
    COALESCE(new.raw_user_meta_data->>'name', 'Usuário')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. CRIAR TRIGGER PARA NOVOS USUÁRIOS
-- ============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 8. GARANTIR QUE O ADMIN TENHA PERFIL CORRETO
-- ============================================================================
INSERT INTO user_profiles (id, email, role, name)
SELECT 
  au.id,
  au.email,
  'admin',
  'Administrador Vytalle'
FROM auth.users au
WHERE au.email = 'admin@vytalle.com.br'
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  name = 'Administrador Vytalle',
  updated_at = NOW();

-- 9. CONFIGURAR POLÍTICAS PARA OUTRAS TABELAS IMPORTANTES
-- ============================================================================

-- Tabela orders (se existir)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders') THEN
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
    CREATE POLICY "Admin can view all orders" ON orders
      FOR ALL USING (
        auth.role() = 'service_role' OR
        EXISTS (
          SELECT 1 FROM user_profiles up 
          WHERE up.id = auth.uid() 
          AND up.role = 'admin'
        )
      );
  END IF;
END $$;

-- 10. FUNÇÃO HELPER PARA VERIFICAR SE USUÁRIO É ADMIN
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = user_id 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. CRIAR FUNÇÃO PARA LISTAR USUÁRIOS (APENAS PARA ADMINS)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  role TEXT,
  name TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ
) AS $$
BEGIN
  -- Verificar se o usuário atual é admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem listar usuários';
  END IF;
  
  RETURN QUERY
  SELECT 
    up.id,
    up.email,
    up.role,
    up.name,
    up.created_at,
    au.last_sign_in_at
  FROM user_profiles up
  LEFT JOIN auth.users au ON au.id = up.id
  ORDER BY up.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. CRIAR FUNÇÃO PARA ESTATÍSTICAS DO DASHBOARD
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Verificar se o usuário atual é admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem ver estatísticas';
  END IF;
  
  SELECT json_build_object(
    'total_products', (SELECT COUNT(*) FROM products),
    'total_users', (SELECT COUNT(*) FROM user_profiles),
    'total_orders', COALESCE((
      SELECT COUNT(*) FROM orders 
      WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders')
    ), 0),
    'admin_users', (SELECT COUNT(*) FROM user_profiles WHERE role = 'admin'),
    'last_updated', NOW()
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. GRANT NECESSÁRIOS
-- ============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_stats TO authenticated;

-- 14. COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================================================
COMMENT ON TABLE user_profiles IS 'Perfis de usuários com roles e permissões';
COMMENT ON FUNCTION public.is_admin IS 'Verifica se o usuário atual é administrador';
COMMENT ON FUNCTION public.get_all_users IS 'Lista todos os usuários (apenas para admins)';
COMMENT ON FUNCTION public.get_admin_stats IS 'Retorna estatísticas do sistema (apenas para admins)';

-- 15. LOG DA MIGRAÇÃO (COMENTADO - TABELA NÃO EXISTE)
-- ============================================================================
-- INSERT INTO public.migration_log (migration_name, applied_at, description)
-- VALUES (
--   '027_fix_admin_permissions',
--   NOW(),
--   'Correção completa de permissões admin: RLS, policies, functions e triggers'
-- ) ON CONFLICT DO NOTHING;

-- ============================================================================
-- FIM DA MIGRAÇÃO 027
-- ============================================================================
-- Problemas resolvidos:
-- ✅ Políticas RLS configuradas corretamente
-- ✅ Tabela user_profiles criada com triggers
-- ✅ Permissões admin configuradas
-- ✅ Funções helper para dashboard
-- ✅ Segurança adequada mantida
-- ============================================================================