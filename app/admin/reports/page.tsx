import { redirect } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export default async function Reports() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: popular } = await supabase.from('popular_products').select('*');
  const { data: summary } = await supabase.from('order_summary').select('*');

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-3xl font-bold'>Relatórios</h1>
      <h2 className='mb-2 mt-4 text-xl font-semibold'>Produtos Mais Populares</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Estoque</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {popular?.map(p => (
            <TableRow key={p.name}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.views_count}</TableCell>
              <TableCell>{p.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className='mb-2 mt-8 text-xl font-semibold'>Resumo de Pedidos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Receita Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary?.map(s => (
            <TableRow key={s.status}>
              <TableCell>{s.status}</TableCell>
              <TableCell>{s.count}</TableCell>
              <TableCell>R$ {Number(s.revenue).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
