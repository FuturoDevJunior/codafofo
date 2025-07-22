'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface UpsellProduct {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  category: string;
  description: string;
  benefits: string[];
  urgency?: string;
}

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (product: UpsellProduct) => void;
  timeLimit?: number; // em segundos
}

export default function UpsellModal({ 
  isOpen, 
  onClose, 
  onPurchase, 
  timeLimit = 600 // 10 minutos default
}: UpsellModalProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose(); // Auto fecha quando tempo acaba
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  // Reset timer quando abre
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(timeLimit);
    }
  }, [isOpen, timeLimit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Produto de upsell principal (pode ser dinâmico)
  const upsellProduct: UpsellProduct = {
    id: 'modal-upsell-1',
    name: 'Kit Profissional Premium + Curso Online',
    originalPrice: 1899.00,
    discountPrice: 1139.40,
    discount: 40,
    category: 'Oferta Especial',
    description: 'Combinação perfeita para maximizar seus resultados profissionais',
    benefits: [
      'Botox Allergan 100U Original',
      'Ácido Hialurônico Premium 1ml',
      'Curso Online Completo (R$ 499)',
      'Certificado Reconhecido',
      'Suporte VIP por 30 dias',
      'Frete Grátis Garantido'
    ],
    urgency: 'Apenas 5 kits restantes!'
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(upsellProduct);
      onClose();
    } catch (error) {
      console.error('Erro no upsell:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="relative bg-white border-2 border-vitale-primary shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header com urgência */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="w-6 h-6" />
              <span className="font-bold text-lg">OFERTA EXCLUSIVA!</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Não Perca Esta Oportunidade Única!
            </h2>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-xl">
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm opacity-90 mt-2">
              {upsellProduct.urgency}
            </p>
          </div>

          <CardContent className="p-6">
            {/* Produto */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-vitale-primary/10 text-vitale-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {upsellProduct.category}
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                {upsellProduct.name}
              </h3>
              <p className="text-neutral-600">
                {upsellProduct.description}
              </p>
            </div>

            {/* Preços em destaque */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 mb-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-neutral-500">De:</p>
                  <p className="text-xl text-neutral-500 line-through">
                    {formatCurrency(upsellProduct.originalPrice)}
                  </p>
                </div>
                <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-full">
                  -{upsellProduct.discount}% OFF
                </div>
                <div>
                  <p className="text-sm text-green-700">Por apenas:</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(upsellProduct.discountPrice)}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-green-700 font-bold text-lg mb-1">
                  Você Economiza: {formatCurrency(upsellProduct.originalPrice - upsellProduct.discountPrice)}
                </p>
                <p className="text-sm text-green-600">
                  ou 12x de {formatCurrency(upsellProduct.discountPrice / 12)} sem juros
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <div className="mb-6">
              <h4 className="font-bold text-lg text-vitale-primary mb-4 text-center">
                ✨ O Que Você Vai Receber:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upsellProduct.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-neutral-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Garantias */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-blue-800 mb-2">🛡️ Suas Garantias:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>✅ Produtos 100% originais certificados</p>
                <p>✅ Frete grátis em todo Brasil</p>
                <p>✅ Suporte VIP prioritário</p>
                <p>✅ Entrega refrigerada especializada</p>
              </div>
            </div>

            {/* Urgência e escassez */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-amber-800 font-bold">
                ⚠️ Esta oferta é válida apenas para os próximos {formatTime(timeLeft)}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                Após este tempo, você pagará o preço normal de {formatCurrency(upsellProduct.originalPrice)}
              </p>
            </div>

            {/* Botões */}
            <div className="space-y-4">
              <Button 
                onClick={handlePurchase}
                disabled={isLoading || timeLeft <= 0}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  'Processando...'
                ) : (
                  <>
                    Sim! Quero Aproveitar Esta Oferta
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full border-neutral-300 text-neutral-600 hover:bg-neutral-50"
              >
                Não, obrigado. Continuar sem a oferta
              </Button>
            </div>

            {/* Testemunho social */}
            <div className="mt-6 text-center">
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm italic text-neutral-600 mb-2">
                  &quot;Investimento que se paga em poucos procedimentos. O curso online vale muito!&quot;
                </p>
                <p className="text-xs text-neutral-500">
                  - Dr. Marina Silva, Dermatologista
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}