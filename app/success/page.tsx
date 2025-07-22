'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowRight,
  CheckCircle,
  Clock,
  Gift,
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface UpsellProduct {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  image: string;
  category: string;
  description: string;
  benefits: string[];
}

export default function SuccessPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos em segundos
  const [selectedUpsell, setSelectedUpsell] = useState<UpsellProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Produtos de upsell exclusivos
  const upsellProducts: UpsellProduct[] = [
    {
      id: 'upsell-1',
      name: 'Kit Completo Anti-Idade Premium',
      originalPrice: 2500.00,
      discountPrice: 1875.00,
      discount: 25,
      image: '/api/placeholder/400/300',
      category: 'Kit Premium',
      description: 'Combinação perfeita para tratamentos completos de rejuvenescimento',
      benefits: [
        'Botox Allergan 100U + Dysport 500U',
        'Ácido Hialurônico Premium 2ml',
        'Bioestimulador de Colágeno',
        'Frete grátis garantido',
        'Curso online incluso (R$ 500)'
      ]
    },
    {
      id: 'upsell-2',
      name: 'Masterclass Aplicação Avançada',
      originalPrice: 800.00,
      discountPrice: 399.00,
      discount: 50,
      image: '/api/placeholder/400/300',
      category: 'Educação Premium',
      description: 'Curso exclusivo com renomados especialistas em harmonização facial',
      benefits: [
        'Certificado reconhecido',
        'Técnicas avançadas de aplicação',
        'Anatomia facial detalhada',
        'Casos clínicos reais',
        'Grupo VIP no WhatsApp'
      ]
    },
    {
      id: 'upsell-3',
      name: 'Microcânulas Premium Set',
      originalPrice: 450.00,
      discountPrice: 297.00,
      discount: 34,
      image: '/api/placeholder/400/300',
      category: 'Instrumentos',
      description: 'Kit completo de microcânulas para procedimentos seguros e precisos',
      benefits: [
        '20 microcânulas (25G, 27G, 30G)',
        'Técnica minimamente invasiva',
        'Reduz hematomas e dor',
        'Esterilizadas e lacradas',
        'Manual técnico incluso'
      ]
    }
  ];

  const handleUpsellPurchase = async (product: UpsellProduct) => {
    setIsLoading(true);
    
    try {
      const message = `🎯 OFERTA ESPECIAL EXCLUSIVA - ${product.name}

✅ SEU PEDIDO ANTERIOR: Finalizado com sucesso!

🔥 OFERTA LIMITADA (${formatTime(timeLeft)} restantes):
• Produto: ${product.name}
• Preço normal: ${formatCurrency(product.originalPrice)}
• DESCONTO ESPECIAL: ${product.discount}% OFF
• SEU PREÇO: ${formatCurrency(product.discountPrice)}
• ECONOMIA: ${formatCurrency(product.originalPrice - product.discountPrice)}

💎 BENEFÍCIOS INCLUSOS:
${product.benefits.map(benefit => `• ${benefit}`).join('\n')}

⚡ CONDIÇÕES ESPECIAIS:
• Frete grátis garantido
• Entrega junto com pedido anterior
• Pagamento facilitado
• Suporte prioritário VIP

🎁 BÔNUS EXCLUSIVO:
• Consultoria personalizada via WhatsApp
• Acesso ao grupo VIP de profissionais
• Materiais de apoio premium

Esta oferta é válida apenas para clientes que acabaram de finalizar um pedido.

Deseja aproveitar esta oportunidade única?

Vytalle Estética & Viscosuplementação
WhatsApp: +55 21 99619-2890`;

      const whatsappNumber = '5521996192890';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');

      // Redirecionar após alguns segundos
      setTimeout(() => {
        router.push('/products');
      }, 3000);

    } catch (error) {
      console.error('Erro ao processar upsell:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header de Sucesso */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Pedido Enviado com Sucesso!</h1>
            <p className="text-xl text-neutral-600">
              Obrigado pela confiança! Seu pedido foi encaminhado via WhatsApp.
            </p>
          </div>

          {/* Status Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <p className="font-semibold text-green-700">Dados Coletados</p>
                <p className="text-sm text-green-600">Informações validadas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <p className="font-semibold text-blue-700">Pedido Enviado</p>
                <p className="text-sm text-blue-600">Via WhatsApp Business</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <Clock className="w-6 h-6 text-amber-500" />
              <div className="text-left">
                <p className="font-semibold text-amber-700">Em Processamento</p>
                <p className="text-sm text-amber-600">Aguardando pagamento</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-neutral-100 border border-neutral-200 rounded-lg">
              <Truck className="w-6 h-6 text-neutral-400" />
              <div className="text-left">
                <p className="font-semibold text-neutral-500">Preparação</p>
                <p className="text-sm text-neutral-400">Após confirmação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Upsell */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full mb-4">
              <Gift className="w-5 h-5" />
              <span className="font-bold">OFERTA ESPECIAL LIMITADA</span>
            </div>
            <h2 className="text-3xl font-bold text-vitale-primary mb-2">
              Aproveite Esta Oportunidade Única!
            </h2>
            <p className="text-lg text-neutral-600 mb-4">
              Como cliente VIP, você tem acesso a ofertas exclusivas com desconto especial
            </p>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="font-bold text-red-600">
                Tempo restante: {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Produtos de Upsell */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {upsellProducts.map((product) => (
              <Card 
                key={product.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border-2 ${
                  selectedUpsell?.id === product.id 
                    ? 'border-vitale-primary shadow-lg' 
                    : 'border-neutral-200 hover:border-vitale-primary'
                }`}
                onClick={() => setSelectedUpsell(product)}
              >
                {/* Badge de desconto */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                    -{product.discount}% OFF
                  </div>
                </div>

                {/* Imagem placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-vitale-primary/50" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-vitale-secondary font-semibold mb-1">
                        {product.category}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {product.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefícios */}
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-vitale-primary">✨ Benefícios:</p>
                    {product.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </div>
                    ))}
                    {product.benefits.length > 3 && (
                      <p className="text-sm text-vitale-primary font-medium">
                        +{product.benefits.length - 3} outros benefícios...
                      </p>
                    )}
                  </div>

                  {/* Preços */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-500 line-through">
                        De: {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="text-sm text-green-600 font-bold">
                        Economia: {formatCurrency(product.originalPrice - product.discountPrice)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-vitale-primary">
                      {formatCurrency(product.discountPrice)}
                    </div>
                    <div className="text-sm text-neutral-600">
                      ou 12x de {formatCurrency(product.discountPrice / 12)}
                    </div>
                  </div>

                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpsellPurchase(product);
                    }}
                    disabled={isLoading}
                    className="w-full bg-vitale-primary hover:bg-vitale-secondary text-white font-bold py-3 transition-all duration-300"
                  >
                    {isLoading ? 'Processando...' : 'Aproveitar Oferta'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Próximos Passos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-vitale-primary" />
                Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-vitale-primary rounded-full mt-2" />
                <div>
                  <p className="font-semibold">1. WhatsApp aberto automaticamente</p>
                  <p className="text-neutral-600">Seu pedido foi enviado via WhatsApp Business</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                <div>
                  <p className="font-semibold">2. Confirmação dos dados</p>
                  <p className="text-neutral-600">Nossa equipe revisará suas informações</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="font-semibold">3. Dados de pagamento</p>
                  <p className="text-neutral-600">Você receberá as informações para pagamento</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="font-semibold">4. Processamento e entrega</p>
                  <p className="text-neutral-600">Após confirmação, produtos serão preparados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Suporte e Garantias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-800 mb-1">✅ Suas Garantias:</p>
                <ul className="text-green-700 space-y-1 text-xs">
                  <li>• Produtos 100% originais e certificados</li>
                  <li>• Transporte refrigerado especializado</li>
                  <li>• Entrega rastreada em 1-3 dias úteis</li>
                  <li>• Suporte técnico especializado</li>
                  <li>• Nota fiscal médica completa</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold">📞 Precisa de ajuda?</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://wa.me/5521996192890', '_blank')}
                  className="w-full"
                >
                  WhatsApp: (21) 99619-2890
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Atendimento nota 10 • Resposta em até 5 minutos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-vitale-primary to-vitale-secondary rounded-xl p-8 text-white mb-6">
            <h3 className="text-2xl font-bold mb-2">Obrigado pela Confiança!</h3>
            <p className="text-lg opacity-90 mb-4">
              Sua satisfação é nossa prioridade. Estamos aqui para garantir que tudo saia perfeito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => router.push('/products')}
                className="bg-white text-vitale-primary hover:bg-neutral-50"
              >
                Explorar Mais Produtos
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://wa.me/5521996192890', '_blank')}
                className="border-white text-white hover:bg-white hover:text-vitale-primary"
              >
                Falar no WhatsApp
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500">
            Vytalle Estética & Viscosuplementação - Excelência em Produtos Médicos
          </p>
        </div>
      </div>
    </div>
  );
}