"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setBadgePulse(true);
      const timeout = setTimeout(() => setBadgePulse(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const generateWhatsAppMessage = () => {
    const baseMessage = "Olá! Gostaria de solicitar os seguintes produtos da Vytalle Estética & Viscosuplementação:\n\n";
    const itemsList = items.map(item => 
      `- ${item.name} (Qtd: ${item.quantity})`
    ).join('\n');
    const totalMessage = `\n\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}`;
    const footerMessage = "\n\nPor favor, confirme disponibilidade, valores finais e calcule o frete para minha região. Obrigado!";
    
    return encodeURIComponent(baseMessage + itemsList + totalMessage + footerMessage);
  };

  return (
    <>
      {/* Cart Button - sempre visível, com ícone e badge de quantidade */}
      <div className="fixed bottom-6 right-6 z-toast">
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
            className="bg-vitale-primary hover:bg-vitale-secondary text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white interactive focus-ring relative"
            aria-label={`Abrir carrinho com ${itemCount} itens`}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className={`absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center shadow-lg border-2 border-white transition-opacity duration-200 ${itemCount === 0 ? 'opacity-0' : 'opacity-100'}`}>
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
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col z-10 border-l-4 border-vitale-primary/20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Redesigned */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-vitale-primary text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-vitale-primary/10 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">
                      Seu Carrinho
                    </h2>
                    <p className="text-sm text-white/90 font-medium">
                      {itemCount} {itemCount === 1 ? 'produto' : 'produtos'} selecionado{itemCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 p-2 min-w-[40px] min-h-[40px] text-white hover:bg-white/20 rounded-full focus-ring"
                  aria-label="Fechar carrinho"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="bg-vitale-primary/20 p-4 rounded-full mb-4">
                      <ShoppingCart className="h-12 w-12 text-vitale-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-vitale-primary mb-2">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-neutral-600 mb-6 max-w-sm font-medium">
                      Adicione produtos para solicitar orçamento.
                    </p>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-vitale-primary hover:bg-vitale-secondary text-white px-6 py-3 rounded-xl font-medium interactive focus-ring"
                    >
                      Explorar Catálogo
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-white border border-vitale-primary/10 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden border-2 border-vitale-primary/10">
                            {item.images && item.images[0] ? (
                              <SmartImage
                                src={item.images[0]}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                                borderRadius="rounded-xl"
                                objectFit="cover"
                                productName={item.name}
                                fallback={
                                  item.category === 'Botox' || item.category === 'Dysport' || item.category === 'Xeomin'
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
                                className="w-full h-full object-cover"
                                borderRadius="rounded-xl"
                                objectFit="cover"
                                productName={item.name}
                                fallback={
                                  item.category === 'Botox' || item.category === 'Dysport' || item.category === 'Xeomin'
                                    ? '/icons/medicine-bottle.png'
                                    : item.category === 'Visco-supl.'
                                    ? '/icons/syringe.png'
                                    : '/icons/pill-bottle.png'
                                }
                              />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-vitale-primary line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-vitale-secondary font-bold text-lg">
                              {formatCurrency(item.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 bg-white/80 rounded-lg p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="h-7 w-7 p-0 hover:bg-vitale-primary/20 text-vitale-primary"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="font-semibold text-sm min-w-[2rem] text-center text-vitale-primary">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="h-7 w-7 p-0 hover:bg-vitale-primary/20 text-vitale-primary"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="text-error-500 hover:text-error-600 hover:bg-error-50 h-8 w-8 p-0 rounded-lg"
                                aria-label="Remover item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right mt-2 bg-vitale-primary/5 rounded-lg px-2 py-1">
                              <span className="text-xs text-muted-foreground">Subtotal: </span>
                              <span className="font-bold text-sm text-vitale-primary">
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
                        className="text-error-500 hover:text-error-600 hover:bg-error-50 w-full mt-4 rounded-xl focus-ring"
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
                <div className="border-t bg-white p-4 sm:p-6 space-y-4">
                  {/* Total */}
                  <div className="bg-white rounded-xl p-4 border border-vitale-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-vitale-primary">Total Estimado:</span>
                      <span className="text-2xl font-bold text-vitale-secondary">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Valores sujeitos à confirmação e frete.
                    </p>
                  </div>

                  {/* WhatsApp CTA - Primary */}
                  <a
                    href={`https://wa.me/5521996192890?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl interactive focus-ring"
                  >
                    <MessageCircle className="text-xl" />
                    <span>Enviar Pedido via WhatsApp</span>
                  </a>

                  {/* Continue Shopping Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary hover:text-white rounded-xl py-3 font-medium interactive focus-ring"
                  >
                    Continuar Explorando
                  </Button>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                      <span>Consulta gratuita</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-vitale-primary rounded-full"></div>
                      <span>Produtos originais</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-info-500 rounded-full"></div>
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