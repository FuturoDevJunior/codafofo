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

export default async function Audits() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: audits } = await supabase.from('audits').select('*').order('timestamp', { ascending: false });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Auditoria</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tabela</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Quando</TableHead>
            <TableHead>Dados Antigos</TableHead>
            <TableHead>Dados Novos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits?.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.table_name}</TableCell>
              <TableCell>{a.action}</TableCell>
              <TableCell>{a.record_id}</TableCell>
              <TableCell>{a.user_id}</TableCell>
              <TableCell>{new Date(a.timestamp).toLocaleString('pt-BR')}</TableCell>
              <TableCell><pre className="whitespace-pre-wrap text-xs">{a.old_data ? JSON.stringify(a.old_data, null, 2) : '-'}</pre></TableCell>
              <TableCell><pre className="whitespace-pre-wrap text-xs">{a.new_data ? JSON.stringify(a.new_data, null, 2) : '-'}</pre></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 