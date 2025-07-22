"use client";

import {
  useEffect,
  useState,
} from 'react';

import { MessageCircle } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'prazo'>('pix');
  
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { toast } = useToast();
  const { trackWhatsAppRedirect, trackLead } = useAnalytics();

  const generateWhatsAppMessage = (contact?: ContactForm) => {
    const total = items.reduce((sum, item) => sum + ((paymentMethod === 'pix' ? item.price_pix : item.price_card) * item.quantity), 0);

    if (items.length === 0 && !contact) {
      let message =
        "Olá! Gostaria de atendimento ou informações sobre os produtos Vytalle.";
      return encodeURIComponent(message);
    }

    let message = '';
    message += '*PEDIDO VYTALE ESTÉTICA & VISCOSUPLEMENTAÇÃO*%0A%0A';

    // Dados do cliente
    if (contact) {
      message += '*DADOS DO CLIENTE*%0A';
      message += `Nome: ${contact.name}%0A`;
      message += `WhatsApp: ${contact.whatsapp}%0A`;
      message += `CEP: ${contact.cep}%0A%0A`;
    }

    if (items.length > 0) {
      message += '*PRODUTOS SOLICITADOS*%0A';
      items.forEach((item, index) => {
        const price = paymentMethod === 'pix' ? item.price_pix : item.price_card;
        message += `${index + 1}. ${item.name}%0A`;
        message += `   Quantidade: ${item.quantity}x%0A`;
        message += `   Valor unit.: R$ ${price.toFixed(2).replace('.', ',')}%0A`;
        message += `   Subtotal: R$ ${(price * item.quantity).toFixed(2).replace('.', ',')}%0A%0A`;
      });
      message += `*VALOR TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}%0A%0A`;
    }

    message += '*PRÓXIMOS PASSOS*%0A';
    message += '- Confirmar disponibilidade%0A';
    message += '- Calcular frete para o CEP%0A';
    message += '- Definir forma de pagamento%0A';
    message += '- Agendar entrega%0A%0A';

    message += '_Vytalle Estética & Viscosuplementação - Produtos Premium para Profissionais_%0A';
    message += '_Pedido via Catálogo Digital_';

    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validações
    if (!formData.name.trim()) {
      toast({ title: "Informe seu nome completo.", description: "", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10 || !/^(\d{2})9?\d{8}$/.test(cleanPhone)) {
      toast({ title: "Informe um WhatsApp válido com DDD.", description: "", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    if (!formData.cep.trim() || formData.cep.length < 8) {
      toast({ title: "Informe um CEP válido para entrega.", description: "", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappNumber = "5521996192890"; // Número correto da Vytalle
      const message = generateWhatsAppMessage(formData);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // Track analytics
      trackWhatsAppRedirect();
      const total = items.reduce((sum, item) => sum + ((paymentMethod === 'pix' ? item.price_pix : item.price_card) * item.quantity), 0);
      
      trackLead({
        name: formData.name,
        whatsapp: formData.whatsapp,
        cep: formData.cep,
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: paymentMethod === 'pix' ? item.price_pix : item.price_card
        })),
        totalValue: total,
        converted: true
      });

      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Feedback de sucesso
      toast({ 
        title: "Pedido enviado!", 
        description: "Em breve entraremos em contato.", 
        variant: "default" 
      });
      
      // Limpar formulário e fechar modal
      setFormData({ name: '', whatsapp: '', cep: '' });
      setShowForm(false);
      
    } catch (error) {
      toast({ title: "Erro ao enviar pedido.", description: "Tente novamente.", variant: "destructive" });
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
    const whatsappNumber = "5521996192890";
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Track quick contact analytics
    trackWhatsAppRedirect();
    
    window.open(whatsappUrl, '_blank');
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null; // Não renderiza nada no SSR

  return (
    <a
      href="https://api.whatsapp.com/send/?phone=5521996192890&text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20os%20produtos%20da%20Vytalle%20Est%C3%A9tica&type=phone_number&app_absent=0"
      target="_blank"
            rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-toast flex items-center gap-3 bg-success-500 hover:bg-success-600 text-white rounded-full px-5 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white interactive text-base font-semibold"
    >
      <MessageCircle className="w-7 h-7" />
      <span>Fale no WhatsApp</span>
    </a>
  );
}
