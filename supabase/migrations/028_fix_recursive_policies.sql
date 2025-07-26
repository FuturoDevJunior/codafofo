-- ============================================================================
-- MIGRAÇÃO 028: CORREÇÃO DE RECURSÃO INFINITA NAS POLÍTICAS
-- ============================================================================
-- Esta migração corrige o problema de recursão infinita detectado
-- ============================================================================

-- 1. REMOVER POLÍTICAS PROBLEMÁTICAS
-- ============================================================================
DROP POLICY IF EXISTS "Admin full access" ON user_profiles;
DROP POLICY IF EXISTS "Admin can manage products" ON products;

-- 2. RECRIAR POLÍTICAS SEM RECURSÃO
-- ============================================================================

-- Política para admins na tabela user_profiles (usando raw_user_meta_data)
CREATE POLICY "Admin full access via metadata" ON user_profiles
  FOR ALL USING (
    auth.role() = 'service_role' OR
    (auth.uid() IS NOT NULL AND 
     (auth.jwt()->>'email' = 'admin@vytalle.com.br' OR
      (auth.jwt()->>'user_metadata')::jsonb->>'role' = 'admin'))
  );

-- Política para admins na tabela products (usando raw_user_meta_data)
CREATE POLICY "Admin can manage products via metadata" ON products
  FOR ALL USING (
    auth.role() = 'service_role' OR
    (auth.uid() IS NOT NULL AND 
     (auth.jwt()->>'email' = 'admin@vytalle.com.br' OR
      (auth.jwt()->>'user_metadata')::jsonb->>'role' = 'admin'))
  );

-- 3. POLÍTICA ALTERNATIVA PARA ADMINS (usando função não-recursiva)
-- ============================================================================

-- Função simples para verificar admin sem recursão
CREATE OR REPLACE FUNCTION public.is_admin_simple()
RETURNS BOOLEAN AS $$
BEGIN
  -- Verificar se é service role
  IF auth.role() = 'service_role' THEN
    RETURN TRUE;
  END IF;
  
  -- Verificar se é o email admin específico
  IF auth.jwt()->>'email' = 'admin@vytalle.com.br' THEN
    RETURN TRUE;
  END IF;
  
  -- Verificar metadata de admin
  IF (auth.jwt()->>'user_metadata')::jsonb->>'role' = 'admin' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RECRIAR POLÍTICAS USANDO A FUNÇÃO SIMPLES
-- ============================================================================

-- Remover políticas problemáticas
DROP POLICY IF EXISTS "Admin full access via metadata" ON user_profiles;
DROP POLICY IF EXISTS "Admin can manage products via metadata" ON products;

-- Políticas corrigidas para user_profiles
CREATE POLICY "Admin access simple" ON user_profiles
  FOR ALL USING (public.is_admin_simple());

-- Políticas corrigidas para products  
CREATE POLICY "Admin manage products simple" ON products
  FOR ALL USING (public.is_admin_simple());

-- 5. POLÍTICA PARA ORDERS (se existir)
-- ============================================================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders') THEN
    DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
    CREATE POLICY "Admin access orders simple" ON orders
      FOR ALL USING (public.is_admin_simple());
  END IF;
END $$;

-- 6. ATUALIZAR FUNÇÃO is_admin PARA NÃO SER RECURSIVA
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  -- Se não há user_id, usar função simples
  IF user_id IS NULL THEN
    RETURN public.is_admin_simple();
  END IF;
  
  -- Verificar se é service role
  IF auth.role() = 'service_role' THEN
    RETURN TRUE;
  END IF;
  
  -- Verificar diretamente na tabela auth.users sem usar user_profiles
  RETURN EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = user_id 
    AND (
      au.email = 'admin@vytalle.com.br' OR
      au.raw_user_meta_data->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. ATUALIZAR FUNÇÃO get_all_users
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
  -- Verificar se o usuário atual é admin usando função simples
  IF NOT public.is_admin_simple() THEN
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

-- 8. ATUALIZAR FUNÇÃO get_admin_stats
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Verificar se o usuário atual é admin usando função simples
  IF NOT public.is_admin_simple() THEN
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

-- 9. GARANTIR PERMISSÕES CORRETAS
-- ============================================================================
GRANT EXECUTE ON FUNCTION public.is_admin_simple TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_stats TO authenticated;

-- 10. COMENTÁRIOS
-- ============================================================================
COMMENT ON FUNCTION public.is_admin_simple IS 'Verifica se usuário é admin sem recursão';
COMMENT ON POLICY "Admin access simple" ON user_profiles IS 'Acesso admin sem recursão';
COMMENT ON POLICY "Admin manage products simple" ON products IS 'Gerenciamento admin de produtos sem recursão';

-- ============================================================================
-- FIM DA MIGRAÇÃO 028
-- ============================================================================
-- Problemas resolvidos:
-- ✅ Recursão infinita nas políticas RLS corrigida
-- ✅ Função is_admin_simple criada para evitar loops
-- ✅ Políticas recreadas sem dependências circulares
-- ✅ Permissões admin funcionando corretamente
-- ============================================================================