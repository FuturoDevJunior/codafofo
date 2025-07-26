'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Package, ShoppingCart, Truck } from 'lucide-react';
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
    <div className="to-white min-h-screen bg-gradient-to-br from-neutral-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-vitale-primary transition-colors hover:text-vitale-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Continuar Comprando</span>
          </Link>
          <div className="flex flex-1 items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-vitale-primary" />
            <h1 className="text-2xl font-bold text-neutral-800 lg:text-3xl">Meu Carrinho</h1>
            {itemCount > 0 && (
              <span className="text-white rounded-full bg-vitale-primary px-3 py-1 text-sm font-semibold">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </span>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 shadow-sm">
              <ShoppingCart className="mx-auto mb-6 h-24 w-24 text-neutral-400" />
              <h2 className="mb-4 text-2xl font-bold text-neutral-600">Seu carrinho está vazio</h2>
              <p className="mx-auto mb-8 max-w-md text-neutral-500">
                Que tal explorar nosso catálogo e adicionar alguns produtos incríveis?
              </p>
              <Link href="/products">
                <Button className="text-white bg-vitale-primary px-8 py-3 text-lg hover:bg-vitale-secondary">
                  Explorar Produtos
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Items List */}
            <div className="space-y-4 lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-700">Produtos Selecionados</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-error-500 hover:bg-error-50 hover:text-error-600"
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
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <CartItem item={item} onRemove={removeItem} onUpdateQty={updateQuantity} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white sticky top-8 rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
                  <Package className="h-5 w-5" />
                  Resumo do Pedido
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                    </span>
                    <span className="font-semibold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Frete</span>
                    <span>Calculado no WhatsApp</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-lg font-bold text-vitale-primary">
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
                      className="hover:text-white w-full border-vitale-primary text-vitale-primary hover:bg-vitale-primary"
                    >
                      Adicionar Mais Produtos
                    </Button>
                  </Link>

                  <Link href="/checkout">
                    <Button
                      className="text-white w-full bg-vitale-primary py-3 text-base font-semibold hover:bg-vitale-secondary"
                      disabled={items.length === 0}
                    >
                      Avançar para Checkout
                    </Button>
                  </Link>
                  <div className="mt-2 text-center text-xs text-neutral-500">
                    Você revisará seus dados e finalizará o pedido na próxima etapa.
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-xs text-neutral-500">Pagamento: PIX, Link ou Boleto</p>
                    <p className="text-xs font-medium text-success-600">
                      ✓ Atendimento personalizado
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="border-success-200 rounded-xl border bg-gradient-to-r from-success-50 to-vitale-secondary/5 p-4">
                <div className="text-center">
                  <div className="mb-1 text-sm font-semibold text-success-600">
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
