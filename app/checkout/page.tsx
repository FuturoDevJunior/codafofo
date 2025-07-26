'use client';

import { useEffect, useState } from 'react';

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Shield,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import UpsellModal from '@/components/UpsellModal';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  cep: string;
  city: string;
  state: string;
  address: string;
  crm?: string;
  cnpj?: string;
  clinicName?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  discount?: number;
  icon: string;
  color: string;
}

interface OrderStep {
  step: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Checkout() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    cep: '',
    city: '',
    state: '',
    address: '',
    crm: '',
    cnpj: '',
    clinicName: '',
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pix',
      name: 'PIX',
      description: '5% desconto • Aprovação instantânea',
      discount: 5,
      icon: '🟢',
      color: 'green',
    },
    {
      id: 'link',
      name: 'Link de Pagamento',
      description: 'Cartão até 12x sem juros • Débito e crédito',
      icon: '🔵',
      color: 'blue',
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Vencimento 3 dias úteis • Ideal para PJ',
      icon: '🟡',
      color: 'amber',
    },
  ];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total > 1000 ? 0 : 50; // Frete grátis acima de R$ 1000
  const discountAmount = selectedPayment?.discount ? (total * selectedPayment.discount) / 100 : 0;
  const totalWithDiscount = total - discountAmount;
  const finalTotal = totalWithDiscount + shipping;

  const steps: OrderStep[] = [
    {
      step: 1,
      title: 'Dados Pessoais',
      description: 'Informações básicas',
      completed: currentStep > 1,
    },
    {
      step: 2,
      title: 'Dados Profissionais',
      description: 'CRM e Clínica',
      completed: currentStep > 2,
    },
    {
      step: 3,
      title: 'Endereço de Entrega',
      description: 'Local de recebimento',
      completed: currentStep > 3,
    },
    { step: 4, title: 'Pagamento', description: 'Escolha da forma', completed: currentStep > 4 },
    { step: 5, title: 'Confirmação', description: 'Revisar e finalizar', completed: false },
  ];

  // Verificar se carrinho está vazio
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: '❌ Carrinho vazio',
        description: 'Adicione produtos antes de finalizar',
        variant: 'destructive',
      });
      router.push('/products');
    }
  }, [items.length, router]);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(customerData.name && customerData.phone && customerData.email);
      case 2:
        return !!(customerData.crm && customerData.clinicName);
      case 3:
        return !!(
          customerData.cep &&
          customerData.address &&
          customerData.city &&
          customerData.state
        );
      case 4:
        return !!selectedPayment;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: 'Preencha todos os campos obrigatórios.',
        description: '',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleUpsellPurchase = async (product: Product) => {
    const message = `🎯 OFERTA ESPECIAL APROVEITADA!

📦 **${product.name}**
• Valor: ${formatCurrency(product.price_pix)}
• Categoria: ${product.category}
• Descrição: ${product.description || 'Sem descrição'}

🛒 **Adicionado ao carrinho!**
• Quantidade: 1 unidade
• Total: ${formatCurrency(product.price_pix)}

💳 **Formas de pagamento:**
• PIX: ${formatCurrency(product.price_pix)}
• Cartão: ${formatCurrency(product.price_card)}
• Prazo: ${formatCurrency(product.price_prazo)}

🚀 **Próximo passo:** Finalizar compra no WhatsApp!
    `;

    const whatsappNumber = '5521996192890';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: '🎯 Oferta adicionada!',
      description: 'Produto enviado via WhatsApp',
    });

    // Redirecionar para success após o upsell
    setTimeout(() => {
      router.push('/success');
    }, 2000);
  };

  const handleCheckout = async () => {
    if (!validateCurrentStep()) {
      toast({
        title: '❌ Dados incompletos',
        description: 'Verifique os dados informados',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Preparar mensagem profissional para WhatsApp
      const whatsappMessage = `

PROCESSO DE FINALIZAÇÃO:
1. Dados profissionais confirmados
2. Forma de pagamento: ${selectedPayment?.name}
3. Envio dos dados de pagamento (próximo passo)
4. Confirmação do pagamento
5. Emissão da nota fiscal
6. Despacho via transportadora refrigerada
7. Código de rastreamento enviado

INFORMAÇÕES DE ENTREGA:
• Prazo: 1-3 dias úteis (após confirmação do pagamento)
• Transporte: Refrigerado especializado
• Horário: 8h às 18h (dias úteis)
• Embalagem: Lacrada e com lacre de segurança

CERTIFICAÇÕES E GARANTIAS:
• Produtos 100% originais
• Registro ANVISA ativo
• Armazenamento controlado (2-8°C)
• Nota fiscal médica
• Certificado de análise incluso
• Prazo de validade mínimo 12 meses
• Atendimento médico especializado

CONFORMIDADE MÉDICA:
• Produtos de uso exclusivo profissional
• Exige comprovação de registro ativo
• Armazenamento em ambiente controlado
• Transporte conforme RDC 430/2020

PEDIDO PRONTO PARA PROCESSAMENTO:
- Todos os dados coletados
- Forma de pagamento definida
- Endereço de entrega confirmado
- Dados para nota fiscal completos

PRÓXIMO PASSO: Aguardando envio dos dados de pagamento

Vytalle Estética & Viscosuplementação - Excelência em Produtos Médicos
WhatsApp: +55 21 99619-2890
Rio de Janeiro, RJ

Pedido completo e pronto para processamento!`;

      // Enviar para WhatsApp
      const whatsappNumber = '5521996192890'; // Número correto da Vytalle
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      // Limpar carrinho e mostrar sucesso
      clearCart();

      toast({
        title: '✅ Pedido enviado com sucesso!',
        description: 'Abrindo WhatsApp para finalizar...',
      });

      // Mostrar modal de upsell após um breve delay
      setTimeout(() => {
        setShowUpsellModal(true);
      }, 1500);
    } catch (error) {
      console.error('Erro no checkout:', error);
      toast({
        title: '❌ Erro no pedido',
        description: 'Tente novamente ou entre em contato',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-vitale-primary">Dados Pessoais</h3>

            <div className="space-y-2">
              <Label htmlFor="name" variant="required" size="md">
                Nome Completo
              </Label>
              <Input
                id="name"
                name="name"
                value={customerData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Dr(a). João Silva"
                inputSize="md"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" variant="required" size="md">
                WhatsApp
              </Label>
              <Input
                id="phone"
                name="phone"
                value={customerData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                inputSize="md"
                autoComplete="tel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" variant="required" size="md">
                E-mail Profissional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="dr.joao@clinica.com.br"
                inputSize="md"
                autoComplete="email"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-vitale-primary">Dados Profissionais</h3>

            <div className="bg-amber-50 border-amber-200 mb-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-amber-600 h-5 w-5" />
                <p className="text-amber-700 text-sm">
                  <strong>Produtos de uso exclusivo profissional.</strong> Exigimos CRM ativo.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm" variant="required" size="md">
                CRM (Registro Profissional)
              </Label>
              <Input
                id="crm"
                name="crm"
                value={customerData.crm}
                onChange={e => handleInputChange('crm', e.target.value)}
                placeholder="123456/SP"
                inputSize="md"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicName" variant="required" size="md">
                Nome da Clínica/Consultório
              </Label>
              <Input
                id="clinicName"
                name="clinicName"
                value={customerData.clinicName}
                onChange={e => handleInputChange('clinicName', e.target.value)}
                placeholder="Clínica de Estética Avançada"
                inputSize="md"
                autoComplete="organization"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj" variant="optional" size="md">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={customerData.cnpj}
                onChange={e => handleInputChange('cnpj', e.target.value)}
                placeholder="00.000.000/0001-00"
                inputSize="md"
                autoComplete="off"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-vitale-primary">Endereço de Entrega</h3>

            <div className="bg-blue-50 border-blue-200 mb-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Truck className="text-blue-600 h-5 w-5" />
                <p className="text-blue-700 text-sm">
                  <strong>Entrega refrigerada especializada.</strong> Produtos chegam nas condições
                  ideais.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cep" variant="required" size="md">
                  CEP
                </Label>
                <Input
                  id="cep"
                  name="cep"
                  value={customerData.cep}
                  onChange={e => handleInputChange('cep', e.target.value)}
                  placeholder="00000-000"
                  inputSize="md"
                  autoComplete="postal-code"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" variant="required" size="md">
                  Cidade
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={customerData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  placeholder="São Paulo"
                  inputSize="md"
                  autoComplete="address-level2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" variant="required" size="md">
                Estado
              </Label>
              <Input
                id="state"
                name="state"
                value={customerData.state}
                onChange={e => handleInputChange('state', e.target.value)}
                placeholder="SP"
                inputSize="md"
                autoComplete="address-level1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" variant="required" size="md">
                Endereço Completo
              </Label>
              <Input
                id="address"
                name="address"
                value={customerData.address}
                onChange={e => handleInputChange('address', e.target.value)}
                placeholder="Rua Example, 123 - Centro"
                inputSize="md"
                autoComplete="street-address"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="mb-4 text-lg font-semibold text-vitale-primary">
              Escolha a Forma de Pagamento
            </h3>

            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    selectedPayment?.id === method.id
                      ? `border-${method.color}-500 bg-${method.color}-50`
                      : 'border-neutral-200 hover:border-neutral-300'
                  } `}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold">{method.name}</h4>
                        {method.discount && (
                          <span className="bg-green-500 text-white rounded px-2 py-1 text-xs">
                            -{method.discount}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">{method.description}</p>
                      {method.discount && (
                        <p className="text-green-600 text-sm font-medium">
                          Economia de {formatCurrency((total * method.discount) / 100)}
                        </p>
                      )}
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selectedPayment?.id === method.id
                          ? `border-${method.color}-500 bg-${method.color}-500`
                          : 'border-neutral-300'
                      } `}
                    >
                      {selectedPayment?.id === method.id && (
                        <CheckCircle className="text-white h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedPayment && (
              <div
                className={`bg-${selectedPayment.color}-50 border border-${selectedPayment.color}-200 rounded-lg p-4`}
              >
                <h4 className={`font-semibold text-${selectedPayment.color}-800 mb-2`}>
                  {selectedPayment.icon} Pagamento via {selectedPayment.name}
                </h4>
                <div className={`text-sm text-${selectedPayment.color}-700 space-y-1`}>
                  {selectedPayment.id === 'pix' && (
                    <>
                      <p>• Desconto de 5% já aplicado no total</p>
                      <p>• Você receberá o PIX após finalizar o pedido</p>
                      <p>• Pagamento confirmado em tempo real</p>
                    </>
                  )}
                  {selectedPayment.id === 'link' && (
                    <>
                      <p>• Link seguro enviado via WhatsApp</p>
                      <p>• Aceita todos os cartões de crédito e débito</p>
                      <p>• Parcelamento em até 12x sem juros</p>
                    </>
                  )}
                  {selectedPayment.id === 'boleto' && (
                    <>
                      <p>• Boleto enviado por e-mail</p>
                      <p>• Vencimento em 3 dias úteis</p>
                      <p>• Pagamento via internet banking</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="mb-4 text-lg font-semibold text-vitale-primary">
              Confirmação do Pedido
            </h3>

            {/* Resumo do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4" />
                  Dados do Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>
                  <strong>Nome:</strong> {customerData.name}
                </p>
                <p>
                  <strong>CRM:</strong> {customerData.crm}
                </p>
                <p>
                  <strong>Clínica:</strong> {customerData.clinicName}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {customerData.phone}
                </p>
                <p>
                  <strong>E-mail:</strong> {customerData.email}
                </p>
              </CardContent>
            </Card>

            {/* Resumo de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>{customerData.address}</p>
                <p>
                  {customerData.city} - {customerData.state}
                </p>
                <p>CEP: {customerData.cep}</p>
              </CardContent>
            </Card>

            {/* Forma de Pagamento Escolhida */}
            {selectedPayment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCard className="h-4 w-4" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">{selectedPayment.icon}</span>
                    <span className="font-semibold">{selectedPayment.name}</span>
                    {selectedPayment.discount && (
                      <span className="bg-green-500 text-white rounded px-2 py-1 text-xs">
                        -{selectedPayment.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600">{selectedPayment.description}</p>
                  {selectedPayment.discount && (
                    <p className="text-green-600 mt-1 font-medium">
                      Desconto: -{formatCurrency(discountAmount)}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Garantias */}
            <div className="bg-green-50 border-green-200 rounded-lg border p-4">
              <h4 className="text-green-800 mb-2 font-semibold">🔒 Suas Garantias:</h4>
              <div className="text-green-700 space-y-1 text-sm">
                <p>✅ Produtos originais e lacrados</p>
                <p>✅ Transporte refrigerado especializado</p>
                <p>✅ Entrega em 1-3 dias úteis</p>
                <p>✅ Atendimento médico especializado</p>
                <p>✅ Nota fiscal e documentação completa</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-neutral-600">Carrinho vazio</h1>
            <Button onClick={() => router.push('/products')}>Explorar Produtos</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/cart')}
            className="flex w-full items-center gap-2 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar ao Carrinho</span>
            <span className="sm:hidden">Voltar</span>
          </Button>
          <h1 className="text-2xl font-bold text-vitale-primary sm:text-3xl">Finalizar Pedido</h1>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-2 lg:grid-cols-3 lg:gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.step} className="flex flex-shrink-0 items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold sm:h-10 sm:w-10 sm:text-sm ${
                        currentStep >= step.step
                          ? 'text-white bg-vitale-primary'
                          : 'bg-neutral-200 text-neutral-500'
                      } `}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        step.step
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-1 h-0.5 w-12 sm:mx-2 sm:w-20 ${currentStep > step.step ? 'bg-vitale-primary' : 'bg-neutral-200'} `}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-600 sm:text-sm">
                  Etapa {currentStep} de {steps.length}: {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>

            {/* Formulário */}
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="order-2 w-full sm:order-1 sm:w-auto"
                  >
                    Voltar
                  </Button>

                  {currentStep < 5 ? (
                    <Button
                      onClick={nextStep}
                      className="order-1 w-full bg-vitale-primary hover:bg-vitale-secondary sm:order-2 sm:w-auto"
                      disabled={!validateCurrentStep()}
                    >
                      {currentStep === 4 ? 'Revisar Pedido' : 'Próximo'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCheckout}
                      disabled={isLoading || !selectedPayment}
                      className="order-1 w-full bg-vitale-primary hover:bg-vitale-secondary sm:order-2 sm:w-auto"
                    >
                      {isLoading ? 'Enviando...' : 'Finalizar via WhatsApp'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6 lg:col-span-1">
            {/* Resumo de Produtos */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-2 last:border-b-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qtd: {item.quantity}</p>
                    </div>
                    <p className="ml-2 text-sm font-semibold sm:text-base">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="text-green-600 flex justify-between text-sm sm:text-base">
                      <span>Desconto {selectedPayment?.name}:</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Frete:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'GRÁTIS' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-bold sm:text-lg">
                    <span>Total:</span>
                    <span className="text-vitale-primary">{formatCurrency(finalTotal)}</span>
                  </div>
                  {selectedPayment && (
                    <div className="pt-2 text-center text-xs text-neutral-500">
                      {selectedPayment.icon} Pagamento via {selectedPayment.name}
                    </div>
                  )}
                </div>

                {total < 1000 && (
                  <div className="bg-amber-50 border-amber-200 text-amber-700 rounded border p-3 text-xs sm:text-sm">
                    <p className="font-semibold">💡 Dica:</p>
                    <p>Adicione mais {formatCurrency(1000 - total)} para ganhar frete grátis!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Truck className="h-4 w-4" />
                  Informações de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-vitale-primary" />
                  <span>Entrega em 1-3 dias úteis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-vitale-primary" />
                  <span>Transporte refrigerado</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-500 h-4 w-4" />
                  <span>Produtos de uso profissional</span>
                </div>
              </CardContent>
            </Card>

            {/* Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <CreditCard className="h-4 w-4" />
                  Opções de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:space-y-4 sm:text-sm">
                <div className="bg-green-50 border-green-200 rounded-lg border p-2 sm:p-3">
                  <p className="text-green-800 flex items-center gap-2 text-xs font-semibold sm:text-sm">
                    <CheckCircle className="text-green-600 h-3 w-3 sm:h-4 sm:w-4" />
                    PIX (Recomendado)
                  </p>
                  <p className="text-green-700 mt-1 text-xs">
                    • 5% desconto adicional • Aprovação instantânea • Processamento imediato
                  </p>
                </div>

                <div className="bg-blue-50 border-blue-200 rounded-lg border p-2 sm:p-3">
                  <p className="text-blue-800 flex items-center gap-2 text-xs font-semibold sm:text-sm">
                    <CheckCircle className="text-blue-600 h-3 w-3 sm:h-4 sm:w-4" />
                    Link de Pagamento
                  </p>
                  <p className="text-blue-700 mt-1 text-xs">
                    • Cartão até 12x sem juros • Débito e crédito • Processamento seguro
                  </p>
                </div>

                <div className="bg-amber-50 border-amber-200 rounded-lg border p-2 sm:p-3">
                  <p className="text-amber-800 flex items-center gap-2 text-xs font-semibold sm:text-sm">
                    <CheckCircle className="text-amber-600 h-3 w-3 sm:h-4 sm:w-4" />
                    Boleto Bancário
                  </p>
                  <p className="text-amber-700 mt-1 text-xs">
                    • Vencimento em 3 dias úteis • Para empresas/PJ • Sem taxas adicionais
                  </p>
                </div>

                <div className="border-t pt-2 text-center">
                  <p className="text-xs text-neutral-500">
                    ⚡ Pagamento processado via WhatsApp Business
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Upsell */}
        <UpsellModal
          isOpen={showUpsellModal}
          onClose={() => {
            setShowUpsellModal(false);
            router.push('/success');
          }}
          onPurchase={product => handleUpsellPurchase(product as unknown as Product)}
          timeLimit={600}
        />
      </div>
    </div>
  );
}
