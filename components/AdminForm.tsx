'use client';

import {
  useEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import type { ProductForm } from '@/types/product-form';

// Exportar a função de submit para teste unitário
export async function adminFormOnSubmit(data: ProductForm, product?: any) {
  const images = data.images.split(',').map(img => img.trim());
  const { error } = product 
    ? await supabase.from('products').update({ ...data, images }).eq('id', product.id)
    : await supabase.from('products').insert({ ...data, images });
  if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
  else toast({ title: "Sucesso", description: "Produto salvo!" });
}

export default function AdminForm({ product }: { product?: ProductForm }) {
  const { register, handleSubmit, setValue } = useForm<ProductForm>({ defaultValues: product });
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    supabase.from('suppliers').select('id, name').then(({ data }) => {
      if (data) setSuppliers(data);
    });
    if (product) {
      setValue('supplier_id', product.supplier_id);
    }
  }, [product, setValue]);

  const onSubmit = (data: ProductForm) => adminFormOnSubmit(data, product);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="admin-form">
      <Label htmlFor="name">Nome</Label><Input id="name" {...register('name')} />
      <Label htmlFor="slug">Slug</Label><Input id="slug" {...register('slug')} />
      <Label htmlFor="price">Preço</Label><Input id="price" type="number" {...register('price')} />
      <Label htmlFor="price_pix">Preço PIX</Label>
      <Input id="price_pix" type="number" step="0.01" {...register('price_pix', { valueAsNumber: true })} />
      <Label htmlFor="price_card">Preço Cartão</Label>
      <Input id="price_card" type="number" step="0.01" {...register('price_card', { valueAsNumber: true })} />
      <Label htmlFor="description">Descrição</Label><Input id="description" {...register('description')} />
      <Label htmlFor="images">Imagens (separadas por vírgula)</Label><Input id="images" {...register('images')} placeholder="Ex: /images/botox-50u.png, /images/botox-100u.png" />
      <span className="text-xs text-muted-foreground">Use imagens reais do diretório <code>public/images/</code>.</span>
      <Label htmlFor="category">Categoria</Label>
      <Select defaultValue={product?.category} {...register('category')}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Botox">Botox</SelectItem>
          <SelectItem value="Dysport">Dysport</SelectItem>
          <SelectItem value="Xeomin">Xeomin</SelectItem>
          <SelectItem value="Visco-supl.">Visco-supl.</SelectItem>
        </SelectContent>
      </Select>
      <Label htmlFor="currency">Moeda</Label><Input id="currency" {...register('currency')} placeholder="BRL" />
      <Label htmlFor="supplier_id">Fornecedor</Label>
      <Select defaultValue={product?.supplier_id} {...register('supplier_id')}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {suppliers.map(s => (
            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="active">Ativo</Label><Input id="active" type="checkbox" {...register('active')} defaultChecked />
      <Button type="submit">Salvar</Button>
    </form>
  );
}
