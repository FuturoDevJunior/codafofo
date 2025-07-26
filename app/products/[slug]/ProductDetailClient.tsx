'use client';

import { useState } from 'react';

import ProductCarousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types/product';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState<'pix' | 'prazo'>('pix');
  const addItem = useCartStore(state => state.addItem);

  const price = payment === 'pix' ? product.price_pix : product.price_prazo;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price,
      price_pix: product.price_pix,
      price_card: product.price_prazo,
      quantity,
      images: product.images || [],
      category: product.category,
    });
  };

  return (
    <div>
      <ProductCarousel images={product.images} />
      <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
      <p className="mb-2">Categoria: {product.category}</p>
      <p className="mb-2">{product.description}</p>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            name="payment"
            value="pix"
            checked={payment === 'pix'}
            onChange={() => setPayment('pix')}
          />{' '}
          PIX ({formatCurrency(product.price_pix)})
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="payment"
            value="prazo"
            checked={payment === 'prazo'}
            onChange={() => setPayment('prazo')}
          />{' '}
          Cartão ({formatCurrency(product.price_prazo)})
        </label>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-20"
        />
        <Button onClick={handleAdd}>Adicionar ao Carrinho</Button>
      </div>
    </div>
  );
}
