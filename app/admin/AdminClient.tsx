'use client';

import { useState } from 'react';

import AdminForm from '@/components/AdminForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';

export default function AdminClient({ products, suppliers }: { products: any[]; suppliers: any[] }) {
  const [filterSupplier, setFilterSupplier] = useState('');

  const filteredProducts = filterSupplier
    ? products.filter((p) => p.supplier_id === filterSupplier)
    : products;

  return (
    <>
      <Input 
        placeholder="Filtrar por Supplier ID" 
        value={filterSupplier} 
        onChange={(e) => setFilterSupplier(e.target.value)} 
        className="mb-4"
      />
      <Button onClick={() => exportToCSV(filteredProducts)}>Exportar CSV</Button>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{formatCurrency(p.price)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="border">Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Editar Produto - {p.name}</DialogTitle>
                      <DialogDescription>
                        Modifique as informações do produto abaixo. Todos os campos são obrigatórios.
                      </DialogDescription>
                      <AdminForm product={p} />
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-destructive text-destructive-foreground" onClick={async () => {
                    await supabase.from('products').delete().eq('id', p.id);
                    // Refresh ou use realtime se precisar
                  }}>Excluir</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function exportToCSV(products: any[]) {
  const csv = ['Nome,Preço,Categoria'].concat(products.map(p => `${p.name},${p.price},${p.category}`)).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'produtos.csv';
  a.click();
} 