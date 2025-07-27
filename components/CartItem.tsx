import { useState } from 'react';

import { motion } from 'framer-motion';
import { Minus, Package, Plus, Tag, Trash2 } from 'lucide-react';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  onRemove: (_id: string) => void;
  onUpdateQty: (_id: string, _qty: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQty }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity > 0) {
      setIsUpdating(true);
      try {
        onUpdateQty(item.id, newQuantity);
      } finally {
        setTimeout(() => setIsUpdating(false), 500);
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
        description: `${item.name} foi removido do carrinho`,
      });
    } finally {
      setTimeout(() => setIsRemoving(false), 500);
    }
  };

  const totalItemPrice = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        className={`transition-all duration-300 ${
          isRemoving ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        } rounded-xl border-l-4 border-l-vitale-primary/20 hover:shadow-md`}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Imagem do Produto */}
            <div className="flex-shrink-0">
              <div className="h-20 w-20 overflow-hidden rounded-lg border-2 border-vitale-primary/10 bg-gradient-to-br from-vitale-neutral to-vitale-light">
                {item.images?.[0] ? (
                  <SmartImage
                    src={item.images[0]}
                    alt={`Foto do produto ${item.name}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    productName={item.name}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-8 w-8 text-vitale-primary/30" />
                  </div>
                )}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="flex-1 space-y-2">
              {/* Nome e Categoria */}
              <div className="space-y-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-vitale-primary md:text-base">
                  {item.name}
                </h3>
                {item.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                )}
              </div>

              {/* Preços */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.price)} por unidade
                  </span>
                  <span className="text-lg font-bold text-vitale-primary">
                    {formatCurrency(totalItemPrice)}
                  </span>
                </div>
                {item.quantity > 1 && (
                  <p className="text-xs text-muted-foreground">
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
                      onClick={() => handleQuantityChange(item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="hover:text-white h-8 w-8 border-vitale-primary/20 p-0 hover:bg-vitale-primary"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </Tooltip>

                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={handleDirectQuantityChange}
                    min={1}
                    disabled={false}
                    className="h-8 w-16 border-vitale-primary/20 text-center text-sm font-semibold focus:border-vitale-primary"
                  />

                  <Tooltip content="Aumentar quantidade" side="top">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.quantity + 1)}
                      disabled={false}
                      className="hover:text-white h-8 w-8 border-vitale-primary/20 p-0 hover:bg-vitale-primary"
                    >
                      <Plus className="h-3 w-3" />
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
                    <Trash2 className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Remover</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Loading States */}
          {(isRemoving || isUpdating) && (
            <div className="bg-white/60 absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-200">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-vitale-primary"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
