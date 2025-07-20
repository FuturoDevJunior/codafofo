import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  category: string;
  discount_percent: number;
  stock: number;
  currency: string;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discount_percent > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-2xl transition-shadow bg-white rounded-xl flex flex-col h-full">
        <CardHeader className="p-0 relative h-48 bg-neutral flex items-center justify-center">
          <Image
            src={product.images?.[0] || '/icons/icon-192.png'}
            alt={product.name}
            width={320}
            height={192}
            className="object-cover w-full h-48"
            style={{ background: '#f5f5f5' }}
            onError={(e) => { (e.target as HTMLImageElement).src = '/icons/icon-192.png'; }}
            priority
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
              -{product.discount_percent}%
            </span>
          )}
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-1">
          <CardTitle className="mb-1 text-lg font-semibold text-primary" data-testid="product-name">{product.name}</CardTitle>
          <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
          <div className="mb-2 flex items-end gap-2">
            {hasDiscount && (
              <span className="line-through text-gray-400 text-sm">
                {formatCurrency(product.price, product.currency)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              {formatCurrency(discountedPrice, product.currency)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-2">Estoque: {product.stock}</p>
          <div className="mt-auto flex gap-2">
            <Button
              className="w-full bg-primary text-white font-semibold rounded-lg py-2 hover:bg-primary/90 transition"
              onClick={() => addItem({ id: product.id, name: product.name, price: discountedPrice, quantity: 1 })}
              aria-label={`Adicionar ${product.name} ao carrinho`}
              disabled={product.stock < 1}
            >
              {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
            </Button>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-accent hover:underline border border-accent rounded-lg bg-accent/10 transition"
              aria-label={`Ver detalhes de ${product.name}`}
            >
              Detalhes
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
