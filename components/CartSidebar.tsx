'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    // Badge pulse effect handled by CSS animations
  }, [itemCount]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const generateWhatsAppMessage = () => {
    const baseMessage =
      'Olá! Gostaria de solicitar os seguintes produtos da Vytalle Estética & Viscosuplementação:\n\n';
    const itemsList = items.map(item => `- ${item.name} (Qtd: ${item.quantity})`).join('\n');
    const totalMessage = `\n\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}`;
    const footerMessage =
      '\n\nPor favor, confirme disponibilidade, valores finais e calcule o frete para minha região. Obrigado!';

    return encodeURIComponent(baseMessage + itemsList + totalMessage + footerMessage);
  };

  return (
    <>
      {/* Cart Button - sempre visível, com ícone e badge de quantidade */}
      <div className="fixed bottom-20 right-4 z-toast sm:bottom-6 sm:right-6">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="text-white hover:shadow-2xl border-white relative rounded-full border-4 bg-vitale-primary p-4 shadow-xl transition-all duration-300 focus-ring interactive hover:bg-vitale-secondary"
            aria-label={`Abrir carrinho com ${itemCount} itens`}
          >
            <ShoppingCart className="h-6 w-6" />
            <span
              className={`text-white border-white absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full border-2 bg-error-500 text-xs font-bold shadow-lg transition-opacity duration-200 ${itemCount === 0 ? 'opacity-0' : 'opacity-100'}`}
            >
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-modal">
            {/* Backdrop */}
            <motion.div
              className="bg-black/70 absolute inset-0 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="bg-white shadow-2xl absolute right-0 top-0 z-10 flex h-full w-full max-w-lg flex-col overflow-hidden border-l-4 border-vitale-primary/20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header - Redesigned */}
              <div className="text-white flex items-center justify-between bg-vitale-primary p-4 shadow-lg sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-vitale-primary/10 p-2">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold sm:text-xl">Seu Carrinho</h2>
                    <p className="text-white/90 text-sm font-medium">
                      {itemCount} {itemCount === 1 ? 'produto' : 'produtos'} selecionado
                      {itemCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-10 min-h-[40px] w-10 min-w-[40px] rounded-full p-2 focus-ring"
                  aria-label="Fechar carrinho"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-vitale-primary/20 p-4">
                      <ShoppingCart className="h-12 w-12 text-vitale-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-vitale-primary">
                      Seu carrinho está vazio
                    </h3>
                    <p className="mb-6 max-w-sm font-medium text-neutral-600">
                      Adicione produtos para solicitar orçamento.
                    </p>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="text-white rounded-xl bg-vitale-primary px-6 py-3 font-medium focus-ring interactive hover:bg-vitale-secondary"
                    >
                      Explorar Catálogo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 p-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-white rounded-xl border border-vitale-primary/10 p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="bg-white h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-vitale-primary/10">
                            {item.images && item.images[0] ? (
                              <SmartImage
                                src={item.images[0]}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                                borderRadius="rounded-xl"
                                objectFit="cover"
                                productName={item.name}
                                fallback={
                                  item.category === 'Botox' ||
                                  item.category === 'Dysport' ||
                                  item.category === 'Xeomin'
                                    ? '/icons/medicine-bottle.png'
                                    : item.category === 'Visco-supl.'
                                      ? '/icons/syringe.png'
                                      : '/icons/pill-bottle.png'
                                }
                              />
                            ) : (
                              <SmartImage
                                src={''}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                                borderRadius="rounded-xl"
                                objectFit="cover"
                                productName={item.name}
                                fallback={
                                  item.category === 'Botox' ||
                                  item.category === 'Dysport' ||
                                  item.category === 'Xeomin'
                                    ? '/icons/medicine-bottle.png'
                                    : item.category === 'Visco-supl.'
                                      ? '/icons/syringe.png'
                                      : '/icons/pill-bottle.png'
                                }
                              />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-vitale-primary">
                              {item.name}
                            </h4>
                            <p className="text-lg font-bold text-vitale-secondary">
                              {formatCurrency(item.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="mt-3 flex items-center justify-between">
                              <div className="bg-white/80 flex items-center gap-2 rounded-lg p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="h-7 w-7 p-0 text-vitale-primary hover:bg-vitale-primary/20"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>

                                <span className="min-w-[2rem] text-center text-sm font-semibold text-vitale-primary">
                                  {item.quantity}
                                </span>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="h-7 w-7 p-0 text-vitale-primary hover:bg-vitale-primary/20"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 rounded-lg p-0 text-error-500 hover:bg-error-50 hover:text-error-600"
                                aria-label="Remover item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Subtotal */}
                            <div className="mt-2 rounded-lg bg-vitale-primary/5 px-2 py-1 text-right">
                              <span className="text-xs text-muted-foreground">Subtotal: </span>
                              <span className="text-sm font-bold text-vitale-primary">
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
                        className="mt-4 w-full rounded-xl text-error-500 focus-ring hover:bg-error-50 hover:text-error-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Limpar Carrinho
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer with Total and Checkout */}
              {items.length > 0 && (
                <div className="bg-white space-y-4 border-t p-4 sm:p-6">
                  {/* Total */}
                  <div className="bg-white rounded-xl border border-vitale-primary/10 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-vitale-primary">
                        Total Estimado:
                      </span>
                      <span className="text-2xl font-bold text-vitale-secondary">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Valores sujeitos à confirmação e frete.
                    </p>
                  </div>

                  {/* WhatsApp CTA - Primary */}
                  <a
                    href={`https://wa.me/5521996192890?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-semibold shadow-lg transition-all duration-200 focus-ring interactive hover:shadow-xl"
                  >
                    <MessageCircle className="text-xl" />
                    <span>Enviar Pedido via WhatsApp</span>
                  </a>

                  {/* Continue Shopping Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white w-full rounded-xl border-vitale-primary/30 py-3 font-medium text-vitale-primary focus-ring interactive hover:bg-vitale-primary"
                  >
                    Continuar Explorando
                  </Button>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-success-500"></div>
                      <span>Consulta gratuita</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-vitale-primary"></div>
                      <span>Produtos originais</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-info-500"></div>
                      <span>Atendimento especializado</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
