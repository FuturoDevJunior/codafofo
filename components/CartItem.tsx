import { useState } from 'react';

import {
  Minus,
  Package,
  Plus,
  Tag,
  Trash2,
} from 'lucide-react';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: { 
    id: string; 
    name: string; 
    price: number; 
    quantity: number; 
    images?: string[];
    category?: string;
  };
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQty }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity !== item.quantity) {
      setIsUpdating(true);
      try {
        onUpdateQty(item.id, newQuantity);
        await new Promise(resolve => setTimeout(resolve, 200)); // Smooth feedback
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDirectQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value) || 1);
    onUpdateQty(item.id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      onRemove(item.id);
      toast({
        title: '🗑️ Produto removido',
        description: `${item.name} foi removido do carrinho`
      });
    } catch (error) {
      toast({
        title: '❌ Erro',
        description: 'Não foi possível remover o produto',
        variant: 'destructive'
      });
      setIsRemoving(false);
    }
  };

  const totalItemPrice = item.price * item.quantity;

  return (
    <Card className={`transition-all duration-300 ${
      isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    } hover:shadow-md border-l-4 border-l-vitale-primary/20`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Imagem do Produto */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-vitale-neutral to-vitale-light rounded-lg overflow-hidden border-2 border-vitale-primary/10">
              {item.images?.[0] ? (
                <SmartImage 
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  fallback="/api/placeholder/80/80"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-vitale-primary/30" />
                </div>
              )}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="flex-1 space-y-2">
            {/* Nome e Categoria */}
            <div className="space-y-1">
              <h3 className="font-semibold text-vitale-primary line-clamp-2 text-sm md:text-base">
                {item.name}
              </h3>
              {item.category && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">{item.category}</span>
                </div>
              )}
            </div>

            {/* Preços */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                  {formatCurrency(item.price)} por unidade
                </span>
                <span className="text-lg font-bold text-vitale-primary">
                  {formatCurrency(totalItemPrice)}
                </span>
              </div>
              {item.quantity > 1 && (
                <p className="text-xs text-neutral-500">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              )}
            </div>

            {/* Controles de Quantidade e Ações */}
            <div className="flex items-center justify-between pt-2">
              {/* Controles de Quantidade */}
              <div className="flex items-center gap-2">
                <Tooltip content="Diminuir quantidade" side="top">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="h-8 w-8 p-0 border-vitale-primary/20 hover:bg-vitale-primary hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                </Tooltip>
                
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={handleDirectQuantityChange}
                  min={1}
                  disabled={isUpdating}
                  className="w-16 h-8 text-center font-semibold text-sm border-vitale-primary/20 focus:border-vitale-primary"
                />
                
                <Tooltip content="Aumentar quantidade" side="top">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={isUpdating}
                    className="h-8 w-8 p-0 border-vitale-primary/20 hover:bg-vitale-primary hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </Tooltip>
              </div>

              {/* Botão Remover */}
              <Tooltip content="Remover item" side="top">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Remover</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Loading States */}
        {(isUpdating || isRemoving) && (
          <div className="absolute inset-0 bg-white/60 rounded-lg flex items-center justify-center transition-all duration-200">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-vitale-primary"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
