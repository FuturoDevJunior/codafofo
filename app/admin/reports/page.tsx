import { redirect } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export default async function Reports() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: popular } = await supabase.from('popular_products').select('*');
  const { data: summary } = await supabase.from('order_summary').select('*');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      <h2 className="text-xl font-semibold mt-4 mb-2">Produtos Mais Populares</h2>
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
          {popular?.map((p) => (
            <TableRow key={p.name}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.views_count}</TableCell>
              <TableCell>{p.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-xl font-semibold mt-8 mb-2">Resumo de Pedidos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Receita Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary?.map((s) => (
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