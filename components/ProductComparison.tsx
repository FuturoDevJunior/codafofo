'use client';

import { Scale, TrendingUp, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/product';

import SmartImage from './SmartImage';

interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export default function ProductComparison({ products, onRemove, onClear }: ProductComparisonProps) {
  if (products.length === 0) return null;

  const categories = [...new Set(products.map(p => p.category))];
  const priceRange = {
    min: Math.min(...products.map(p => p.price_pix || 0)),
    max: Math.max(...products.map(p => p.price_pix || 0)),
  };

  const handleRemove = (_productId: string) => {
    onRemove(_productId);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-4xl">
      <Card className="shadow-2xl border-vitale-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-vitale-primary" />
              <CardTitle className="text-lg">Comparação de Produtos</CardTitle>
              <span className="text-sm text-muted-foreground">({products.length}/4)</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onClear}>
                <X className="mr-1 h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
              <div key={product.id} className="relative rounded-lg border p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={() => handleRemove(product.id)}
                  aria-label={`Remover ${product.name} da comparação`}
                >
                  <X className="h-3 w-3" />
                </Button>

                <div className="space-y-3">
                  {/* Imagem */}
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <SmartImage
                      src={product.images?.[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      productName={product.name}
                    />
                  </div>

                  {/* Informações */}
                  <div className="space-y-2">
                    <h4 className="line-clamp-2 text-sm font-medium">{product.name}</h4>

                    <div className="text-xs text-muted-foreground">{product.category}</div>

                    <div className="font-bold text-vitale-primary">
                      {formatCurrency(product.price_pix || 0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo da Comparação */}
          {products.length > 1 && (
            <div className="mt-4 border-t pt-4">
              <h5 className="mb-3 flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                Resumo da Comparação
              </h5>

              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                <div>
                  <div className="text-muted-foreground">Categorias</div>
                  <div className="font-medium">{categories.length}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Faixa de Preço</div>
                  <div className="font-medium">
                    {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground">Preço Médio</div>
                  <div className="font-medium">
                    {formatCurrency(
                      products.reduce((sum, p) => sum + (p.price_pix || 0), 0) / products.length
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground">Economia</div>
                  <div className="text-green-600 font-medium">
                    {formatCurrency(priceRange.max - priceRange.min)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
