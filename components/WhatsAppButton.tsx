"use client";

import { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  MapPin,
  MessageCircle,
  Phone,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/lib/analytics';
import { useCartStore } from '@/lib/store';

interface ContactForm {
  name: string;
  whatsapp: string;
  cep: string;
}

export default function WhatsAppButton() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({ name: '', whatsapp: '', cep: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { toast } = useToast();
  const { trackWhatsAppRedirect, trackLead } = useAnalytics();

  const generateWhatsAppMessage = (contact?: ContactForm) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = "🛒 *PEDIDO VYTALLE ESTÉTICA*\n\n";
    
    // Dados do cliente
    if (contact) {
      message += "👤 *DADOS DO CLIENTE:*\n";
      message += `📝 Nome: ${contact.name}\n`;
      message += `📱 WhatsApp: ${contact.whatsapp}\n`;
      message += `📍 CEP: ${contact.cep}\n\n`;
    }
    
    if (items.length > 0) {
      message += "🛍️ *PRODUTOS SOLICITADOS:*\n";
      message += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      
      items.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   • Quantidade: ${item.quantity}x\n`;
        message += `   • Valor unit.: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
        message += `   • Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
      });
      
      message += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      message += `💰 *VALOR TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    }
    
    message += "📞 *PRÓXIMOS PASSOS:*\n";
    message += "✅ Confirmar disponibilidade\n";
    message += "✅ Calcular frete para o CEP\n";
    message += "✅ Definir forma de pagamento\n";
    message += "✅ Agendar entrega\n\n";
    
    message += "🏥 _Vytalle Estética - Produtos Premium para Profissionais_\n";
    message += "📧 _Pedido via Catálogo Digital_";
    
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validações
    if (!formData.name.trim()) {
      toast({ title: "Nome obrigatório", description: "Por favor, informe seu nome completo", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10 || !/^(\d{2})9?\d{8}$/.test(cleanPhone)) {
      toast({ title: "WhatsApp inválido", description: "Por favor, informe um número válido com DDD (ex: 11999887766)", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    if (!formData.cep.trim() || formData.cep.length < 8) {
      toast({ title: "CEP inválido", description: "Por favor, informe um CEP válido para cálculo do frete", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappNumber = "5562999404495"; // Número da Vytalle
      const message = generateWhatsAppMessage(formData);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // Track analytics
      trackWhatsAppRedirect();
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      trackLead({
        name: formData.name,
        whatsapp: formData.whatsapp,
        cep: formData.cep,
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalValue: total,
        converted: true
      });

      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Feedback de sucesso
      toast({ 
        title: "Pedido enviado!", 
        description: "Seu pedido foi enviado via WhatsApp. Em breve entraremos em contato!", 
        variant: "default" 
      });
      
      // Limpar formulário e fechar modal
      setFormData({ name: '', whatsapp: '', cep: '' });
      setShowForm(false);
      
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível enviar o pedido. Tente novamente.", variant: "destructive" });
    }
    
    setIsSubmitting(false);
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').substr(0, 15);
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2').substr(0, 9);
  };

  const handleQuickContact = () => {
    const whatsappNumber = "5562999404495";
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Track quick contact analytics
    trackWhatsAppRedirect();
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-vitale-primary">Finalizar Pedido</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowForm(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: formatWhatsApp(e.target.value) }))}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    CEP para Entrega *
                  </Label>
                  <Input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => setFormData(prev => ({ ...prev, cep: formatCEP(e.target.value) }))}
                    className="w-full"
                    required
                  />
                </div>

                {itemCount > 0 && (
                  <div className="bg-vitale-neutral p-4 rounded-lg">
                    <p className="text-sm font-medium text-vitale-primary mb-2">
                      Resumo do Pedido ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                    </p>
                    <p className="text-xs text-neutral-600">
                      Valor total será confirmado com frete após envio do pedido
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-success-500 hover:bg-success-600 text-white font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Pedido via WhatsApp'}
                </Button>

                <p className="text-xs text-center text-neutral-500">
                  Seus dados são seguros e usados apenas para processar seu pedido
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-toast"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5
        }}
      >
        <div className="relative group">
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-success-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Main button */}
          <a
            href={itemCount > 0 ? undefined : `https://wa.me/5562999404495?text=${generateWhatsAppMessage()}`}
            target={itemCount > 0 ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-testid="whatsapp-link"
          >
            <Button 
              onClick={itemCount > 0 ? () => setShowForm(true) : handleQuickContact}
              className="relative bg-success-500 hover:bg-success-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white interactive"
              aria-label={itemCount > 0 ? 
                `Finalizar pedido com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}` : 
                'Entrar em contato via WhatsApp'
              }
            >
              {itemCount > 0 ? (
                <ShoppingCart className="h-6 w-6" />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
            </Button>
          </a>

          {/* Cart counter badge */}
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

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
              {itemCount > 0 ? 'Finalizar Pedido' : 'Falar no WhatsApp'}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
