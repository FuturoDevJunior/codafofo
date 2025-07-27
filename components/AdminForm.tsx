'use client';

import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import ImageUploader from '@/components/admin/ImageUploader';
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
  const images = data.images ? data.images.split(',').map(img => img.trim()) : [];
  const { error } = product
    ? await supabase
        .from('products')
        .update({ ...data, images })
        .eq('id', product.id)
    : await supabase.from('products').insert({ ...data, images });
  if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
  else toast({ title: 'Sucesso', description: 'Produto salvo!' });
}

export default function AdminForm({
  product,
  onCancel,
}: {
  product?: ProductForm;
  onCancel?: () => void;
}) {
  const { register, handleSubmit, setValue } = useForm<ProductForm>({ defaultValues: product });
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);

  // Carregar fornecedores com useCallback para evitar loops
  const loadSuppliers = useCallback(async () => {
    try {
      const { data } = await supabase.from('suppliers').select('id, name');
      if (data) setSuppliers(data);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  }, []);

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  // Configurar supplier_id quando produto é fornecido
  useEffect(() => {
    if (product?.supplier_id) {
      setValue('supplier_id', product.supplier_id);
    }
  }, [product?.supplier_id, setValue]);

  const onSubmit = useCallback(
    (data: ProductForm) => {
      return adminFormOnSubmit(data, product);
    },
    [product]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' data-testid='admin-form'>
      {/* Informações Básicas */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-2'>
          <Label htmlFor='name' variant='required'>
            Nome
          </Label>
          <Input id='name' {...register('name')} inputSize='md' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='slug' variant='required'>
            Slug
          </Label>
          <Input id='slug' {...register('slug')} inputSize='md' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='category' variant='required'>
            Categoria
          </Label>
          <Select defaultValue={product?.category} {...register('category')}>
            <SelectTrigger id='category'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Botox'>Botox</SelectItem>
              <SelectItem value='Dysport'>Dysport</SelectItem>
              <SelectItem value='Xeomin'>Xeomin</SelectItem>
              <SelectItem value='Visco-supl.'>Visco-supl.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preços */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-2'>
          <Label htmlFor='price' variant='required'>
            Preço Base
          </Label>
          <Input id='price' type='number' {...register('price')} inputSize='md' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='price_pix' variant='required'>
            Preço PIX
          </Label>
          <Input
            id='price_pix'
            type='number'
            step='0.01'
            {...register('price_pix', { valueAsNumber: true })}
            inputSize='md'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='price_card' variant='required'>
            Preço Cartão
          </Label>
          <Input
            id='price_card'
            type='number'
            step='0.01'
            {...register('price_card', { valueAsNumber: true })}
            inputSize='md'
          />
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='currency' variant='required'>
            Moeda
          </Label>
          <Input id='currency' {...register('currency')} placeholder='BRL' inputSize='md' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='supplier_id' variant='required'>
            Fornecedor
          </Label>
          <Select defaultValue={product?.supplier_id} {...register('supplier_id')}>
            <SelectTrigger id='supplier_id'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(s => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Descrição */}
      <div className='space-y-2'>
        <Label htmlFor='description' variant='required'>
          Descrição
        </Label>
        <Input id='description' {...register('description')} inputSize='md' />
      </div>

      {/* Imagens */}
      <div className='space-y-2'>
        <Label htmlFor='images' variant='required'>
          Imagens (separadas por vírgula)
        </Label>
        <Input
          id='images'
          {...register('images')}
          placeholder='Ex: /images/botox-50u.png, /images/botox-100u.png'
          inputSize='md'
        />
        <span className='text-xs text-neutral-500'>
          Use imagens reais do diretório <code>public/images/</code>.
        </span>
      </div>

      {/* ImageUploader */}
      <ImageUploader
        productId={product?.id || 'new'}
        productName={product?.name || 'Novo Produto'}
        currentImages={Array.isArray(product?.images) ? product.images : []}
        onImagesUpdate={newImages => {
          setValue('images', newImages.join(', '));
        }}
      />

      {/* Status */}
      <div className='flex items-center space-x-2'>
        <Input
          id='active'
          type='checkbox'
          {...register('active')}
          defaultChecked
          className='h-4 w-4'
        />
        <Label htmlFor='active' variant='default'>
          Ativo
        </Label>
      </div>

      <div className='flex gap-4'>
        <Button type='submit' className='w-full sm:w-auto'>
          Salvar
        </Button>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel} className='w-full sm:w-auto'>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
