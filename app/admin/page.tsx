import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AdminForm from '@/components/AdminForm';
import AdminClient from './AdminClient';

export default async function Admin() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: suppliers } = await supabase.from('suppliers').select('id, name');
  const { data: products } = await supabase.from('products').select('*');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin - Produtos</h1>
      <Dialog>
        <DialogTrigger asChild><Button>Adicionar Produto</Button></DialogTrigger>
        <DialogContent><AdminForm /></DialogContent>
      </Dialog>
      <AdminClient products={products || []} suppliers={suppliers || []} />
    </div>
  );
}
