'use client';

import { useEffect, useState } from 'react';

import { CheckCircle, Clock, ShoppingCart, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
  onPurchase: (_product: UpsellProduct) => Promise<void>;
  timeLimit?: number; // em segundos
}

export default function UpsellModal({
  isOpen,
  onClose,
  onPurchase,
  timeLimit = 600, // 10 minutos default
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
    originalPrice: 1899.0,
    discountPrice: 1139.4,
    discount: 40,
    category: 'Oferta Especial',
    description: 'Combinação perfeita para maximizar seus resultados profissionais',
    benefits: [
      'Botox Allergan 100U Original',
      'Ácido Hialurônico Premium 1ml',
      'Curso Online Completo (R$ 499)',
      'Certificado Reconhecido',
      'Suporte VIP por 30 dias',
      'Frete Grátis Garantido',
    ],
    urgency: 'Apenas 5 kits restantes!',
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(upsellProduct);
      onClose();
    } catch {
      console.error('Erro no upsell');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='bg-black/50 absolute inset-0 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div className='relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto'>
        <Card className='bg-white shadow-2xl relative border-2 border-vitale-primary'>
          {/* Close button */}
          <Button
            onClick={onClose}
            variant='ghost'
            size='sm'
            className='absolute right-2 top-2 text-neutral-500 hover:text-neutral-700'
            aria-label='Fechar modal'
          >
            <X className='h-5 w-5' />
          </Button>

          {/* Header com urgência */}
          <div className='from-red-500 to-red-600 text-white bg-gradient-to-r p-6 text-center'>
            <div className='mb-2 flex items-center justify-center gap-2'>
              <ShoppingCart className='h-6 w-6' />
              <span className='text-lg font-bold'>OFERTA EXCLUSIVA!</span>
            </div>
            <h2 className='mb-2 text-2xl font-bold'>Não Perca Esta Oportunidade Única!</h2>
            <div className='bg-white/20 inline-flex items-center gap-2 rounded-full px-4 py-2'>
              <Clock className='h-5 w-5' />
              <span className='text-xl font-bold'>{formatTime(timeLeft)}</span>
            </div>
            <p className='mt-2 text-sm opacity-90'>{upsellProduct.urgency}</p>
          </div>

          <CardContent className='p-6'>
            {/* Produto */}
            <div className='mb-6 text-center'>
              <div className='mb-3 inline-flex items-center rounded-full bg-vitale-primary/10 px-3 py-1 text-sm font-semibold text-vitale-primary'>
                {upsellProduct.category}
              </div>
              <h3 className='mb-2 text-2xl font-bold text-neutral-800'>{upsellProduct.name}</h3>
              <p className='text-neutral-600'>{upsellProduct.description}</p>
            </div>

            {/* Preços em destaque */}
            <div className='from-green-50 to-green-100 border-green-200 mb-6 rounded-xl border-2 bg-gradient-to-br p-6 text-center'>
              <div className='mb-4 flex items-center justify-center gap-4'>
                <div>
                  <p className='text-sm text-neutral-500'>De:</p>
                  <p className='text-xl text-neutral-500 line-through'>
                    {upsellProduct.originalPrice.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className='bg-red-500 text-white rounded-full px-4 py-2 font-bold'>
                  -{upsellProduct.discount}% OFF
                </div>
                <div>
                  <p className='text-green-700 text-sm'>Por apenas:</p>
                  <p className='text-green-600 text-3xl font-bold'>
                    {upsellProduct.discountPrice.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className='text-center'>
                <p className='text-green-700 mb-1 text-lg font-bold'>
                  Você Economiza: {upsellProduct.originalPrice - upsellProduct.discountPrice}
                </p>
                <p className='text-green-600 text-sm'>
                  ou 12x de {upsellProduct.discountPrice / 12} sem juros
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <div className='mb-6'>
              <h4 className='mb-4 text-center text-lg font-bold text-vitale-primary'>
                ✨ O Que Você Vai Receber:
              </h4>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {upsellProduct.benefits.map((benefit, index) => (
                  <div key={index} className='flex items-center gap-3 rounded-lg bg-neutral-50 p-3'>
                    <CheckCircle className='text-green-500 h-5 w-5 flex-shrink-0' />
                    <span className='text-sm font-medium text-neutral-700'>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Garantias */}
            <div className='bg-blue-50 border-blue-200 mb-6 rounded-lg border p-4'>
              <h4 className='text-blue-800 mb-2 font-bold'>🛡️ Suas Garantias:</h4>
              <div className='text-blue-700 space-y-1 text-sm'>
                <p>✅ Produtos 100% originais certificados</p>
                <p>✅ Frete grátis em todo Brasil</p>
                <p>✅ Suporte VIP prioritário</p>
                <p>✅ Entrega refrigerada especializada</p>
              </div>
            </div>

            {/* Urgência e escassez */}
            <div className='bg-amber-50 border-amber-200 mb-6 rounded-lg border p-4 text-center'>
              <p className='text-amber-800 font-bold'>
                ⚠️ Esta oferta é válida apenas para os próximos {formatTime(timeLeft)}
              </p>
              <p className='text-amber-700 mt-1 text-sm'>
                Após este tempo, você pagará o preço normal de{' '}
                {upsellProduct.originalPrice.toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* Botões */}
            <div className='space-y-4'>
              <Button
                onClick={handlePurchase}
                disabled={isLoading || timeLeft <= 0}
                className='from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full transform bg-gradient-to-r py-4 text-lg font-bold transition-all duration-300 hover:scale-105'
              >
                {isLoading ? (
                  'Processando...'
                ) : (
                  <>
                    Sim! Quero Aproveitar Esta Oferta
                    <ShoppingCart className='ml-2 h-5 w-5' />
                  </>
                )}
              </Button>

              <Button
                variant='outline'
                onClick={onClose}
                className='w-full border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              >
                Não, obrigado. Continuar sem a oferta
              </Button>
            </div>

            {/* Testemunho social */}
            <div className='mt-6 text-center'>
              <div className='rounded-lg bg-neutral-50 p-4'>
                <p className='mb-2 text-sm italic text-neutral-600'>
                  &quot;Investimento que se paga em poucos procedimentos. O curso online vale
                  muito!&quot;
                </p>
                <p className='text-xs text-neutral-500'>- Dr. Marina Silva, Dermatologista</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
