'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/products"
            className="flex items-center gap-2 text-vitale-primary hover:text-vitale-secondary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Continuar Comprando</span>
          </Link>
          <div className="flex-1 flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-vitale-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">
              Meu Carrinho
            </h1>
            {itemCount > 0 && (
              <span className="bg-vitale-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </span>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-neutral-100">
              <ShoppingCart className="h-24 w-24 text-neutral-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-neutral-600 mb-4">
                Seu carrinho está vazio
              </h2>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Que tal explorar nosso catálogo e adicionar alguns produtos incríveis?
              </p>
              <Link href="/products">
                <Button className="bg-vitale-primary hover:bg-vitale-secondary text-white px-8 py-3 text-lg">
                  Explorar Produtos
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-700">
                  Produtos Selecionados
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-error-500 hover:text-error-600 hover:bg-error-50"
                >
                  Limpar Carrinho
                </Button>
              </div>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <CartItem 
                      item={item} 
                      onRemove={removeItem} 
                      onUpdateQty={updateQuantity} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 sticky top-8">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Resumo do Pedido
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                    <span className="font-semibold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Frete</span>
                    <span>Calculado no WhatsApp</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-vitale-primary">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-6 space-y-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-success-500" />
                    <span>Preços à vista no PIX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-vitale-primary" />
                    <span>Entrega para todo Brasil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-vitale-secondary" />
                    <span>Produtos originais e lacrados</span>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 space-y-3">
                  <Link href="/products">
                    <Button 
                      variant="outline" 
                      className="w-full border-vitale-primary text-vitale-primary hover:bg-vitale-primary hover:text-white"
                    >
                      Adicionar Mais Produtos
                    </Button>
                  </Link>
                  
                  <Link href="/checkout">
                    <Button 
                      className="w-full bg-vitale-primary hover:bg-vitale-secondary text-white font-semibold py-3 text-base"
                      disabled={items.length === 0}
                    >
                      Avançar para Checkout
                    </Button>
                  </Link>
                  <div className="text-xs text-neutral-500 text-center mt-2">
                    Você revisará seus dados e finalizará o pedido na próxima etapa.
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-neutral-500 mb-2">
                      Pagamento: PIX, Link ou Boleto
                    </p>
                    <p className="text-xs text-success-600 font-medium">
                      ✓ Atendimento personalizado
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-success-50 to-vitale-secondary/5 border border-success-200 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-success-600 font-semibold text-sm mb-1">
                    🔒 Compra 100% Segura
                  </div>
                  <div className="text-xs text-neutral-600">
                    Seus dados são protegidos e o pagamento é processado de forma segura
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
