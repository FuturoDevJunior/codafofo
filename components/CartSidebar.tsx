"use client";

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <div className="fixed bottom-6 left-6 z-toast">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-vitale-primary hover:bg-vitale-primary/90 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white interactive"
            aria-label={`Abrir carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>

          {/* Counter Badge */}
          {itemCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center shadow-lg border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              key={itemCount}
            >
              {itemCount > 99 ? '99+' : itemCount}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Sidebar */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-vitale-primary text-white">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6" />
                  <h2 className="text-xl font-bold">
                    Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                      Carrinho vazio
                    </h3>
                    <p className="text-neutral-500 mb-6">
                      Adicione produtos para começar seu pedido
                    </p>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="border-vitale-primary text-vitale-primary hover:bg-vitale-primary hover:text-white"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-white border rounded-lg p-4 shadow-sm"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0 w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden">
                            {item.images && item.images[0] && (
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-neutral-800 truncate">
                              {item.name}
                            </h4>
                            <p className="text-vitale-primary font-bold text-lg">
                              {formatCurrency(item.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0 border-neutral-300 hover:border-vitale-primary"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="font-semibold text-sm min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0 border-neutral-300 hover:border-vitale-primary"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="text-error-500 hover:text-error-600 hover:bg-error-50 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right mt-2">
                              <span className="text-xs text-neutral-500">Subtotal: </span>
                              <span className="font-semibold text-sm">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Clear Cart Button */}
                    {items.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-error-500 hover:text-error-600 hover:bg-error-50 w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Limpar Carrinho
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer with Total and Checkout */}
              {items.length > 0 && (
                <div className="border-t bg-neutral-50 p-6 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-700">Total:</span>
                    <span className="text-2xl font-bold text-vitale-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  {/* Discount Info */}
                  <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                    <p className="text-xs text-success-700 text-center">
                      💳 Preços à vista no PIX • 📱 Parcelamos no cartão
                    </p>
                  </div>

                  {/* Continue Shopping Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full border-vitale-primary text-vitale-primary hover:bg-vitale-primary hover:text-white"
                  >
                    Continuar Comprando
                  </Button>

                  {/* Note */}
                  <p className="text-xs text-center text-neutral-500">
                    Finalize seu pedido via WhatsApp para calcular frete e confirmar disponibilidade
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}