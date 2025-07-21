'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store';

export default function ProductDetailClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      quantity,
      images: product.images || [],
      category: product.category
    });
  };

  return (
    <div className="flex items-center mt-4">
      <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} className="w-20 mr-4" />
      <Button onClick={handleAdd}>Adicionar ao Carrinho</Button>
    </div>
  );
} 