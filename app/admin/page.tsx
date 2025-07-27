import { redirect } from 'next/navigation';

import AdminDashboard from '@/components/admin/AdminDashboard';
import { logger } from '@/lib/logger';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const supabase = await createServerSupabaseClient();

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Verificar se é admin (opcional, se você tiver tabela de perfis)
  try {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile && profile.role !== 'admin') {
      redirect('/admin/login');
    }
  } catch (error) {
    // Se não tiver tabela de perfis, continua (assumindo que é admin)
    logger.error('Perfil não encontrado, assumindo admin:', error as Error);
    // Assume admin role if profile not found
    return { role: 'admin' as const };
  }

  // Buscar dados para o dashboard
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: suppliers } = await supabase.from('suppliers').select('id, name');

  return (
    <div className='via-white min-h-screen bg-gradient-to-br from-vitale-primary/5 to-vitale-secondary/5'>
      <AdminDashboard
        products={products || []}
        suppliers={suppliers || []}
        user={{
          id: session.user.id,
          email: session.user.email || '',
          role: 'admin',
        }}
      />
    </div>
  );
}
