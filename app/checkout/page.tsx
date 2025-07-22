'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

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
    clinicName: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pix',
      name: 'PIX',
      description: '5% desconto • Aprovação instantânea',
      discount: 5,
      icon: '🟢',
      color: 'green'
    },
    {
      id: 'link',
      name: 'Link de Pagamento',
      description: 'Cartão até 12x sem juros • Débito e crédito',
      icon: '🔵',
      color: 'blue'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Vencimento 3 dias úteis • Ideal para PJ',
      icon: '🟡',
      color: 'amber'
    }
  ];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total > 1000 ? 0 : 50; // Frete grátis acima de R$ 1000
  const discountAmount = selectedPayment?.discount ? (total * selectedPayment.discount / 100) : 0;
  const totalWithDiscount = total - discountAmount;
  const finalTotal = totalWithDiscount + shipping;

  const steps: OrderStep[] = [
    { step: 1, title: 'Dados Pessoais', description: 'Informações básicas', completed: currentStep > 1 },
    { step: 2, title: 'Dados Profissionais', description: 'CRM e Clínica', completed: currentStep > 2 },
    { step: 3, title: 'Endereço de Entrega', description: 'Local de recebimento', completed: currentStep > 3 },
    { step: 4, title: 'Pagamento', description: 'Escolha da forma', completed: currentStep > 4 },
    { step: 5, title: 'Confirmação', description: 'Revisar e finalizar', completed: false }
  ];

  // Verificar se carrinho está vazio
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: '❌ Carrinho vazio',
        description: 'Adicione produtos antes de finalizar',
        variant: 'destructive'
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
        return !!(customerData.cep && customerData.address && customerData.city && customerData.state);
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
        title: '❌ Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive'
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCheckout = async () => {
    if (!validateCurrentStep()) {
      toast({
        title: '❌ Dados incompletos',
        description: 'Verifique os dados informados',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Preparar mensagem profissional para WhatsApp
      const orderItems = items.map(item => 
        `• ${item.name} - Qtd: ${item.quantity} - ${formatCurrency(item.price)}`
      ).join('\n');

      const whatsappMessage = `🏥 *PEDIDO VYTALLE ESTÉTICA - PROFISSIONAL*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍⚕️ *DADOS DO PROFISSIONAL:*
• Nome: ${customerData.name}
• CRM: ${customerData.crm} (verificar registro ativo)
• Clínica: ${customerData.clinicName}
${customerData.cnpj ? `• CNPJ: ${customerData.cnpj}` : ''}
• WhatsApp: ${customerData.phone}
• E-mail: ${customerData.email}

📍 *ENDEREÇO COMPLETO DE ENTREGA:*
${customerData.address}
${customerData.city} - ${customerData.state}
CEP: ${customerData.cep}

🛒 *PRODUTOS SOLICITADOS:*
${orderItems}

💰 *RESUMO FINANCEIRO:*
• Subtotal: ${formatCurrency(total)}${discountAmount > 0 ? `\n• Desconto ${selectedPayment?.name}: -${formatCurrency(discountAmount)}` : ''}
• Frete: ${shipping === 0 ? '✅ GRÁTIS (compra acima R$ 1.000)' : formatCurrency(shipping)}
• *TOTAL GERAL: ${formatCurrency(finalTotal)}*

💳 *FORMA DE PAGAMENTO ESCOLHIDA:*
${selectedPayment?.icon} *${selectedPayment?.name}*
${selectedPayment?.description}

📋 *DADOS PARA NOTA FISCAL:*
• Nome/Razão: ${customerData.name}
• E-mail NF: ${customerData.email}
• Telefone: ${customerData.phone}
• Endereço: ${customerData.address}, ${customerData.city}/${customerData.state}, CEP: ${customerData.cep}
${customerData.cnpj ? `• CNPJ: ${customerData.cnpj}` : ''}
• CRM Profissional: ${customerData.crm}

✅ *PROCESSO DE FINALIZAÇÃO:*
1️⃣ ✅ Dados profissionais confirmados
2️⃣ ✅ Forma de pagamento: ${selectedPayment?.name}
3️⃣ 📤 Envio dos dados de pagamento (próximo passo)
4️⃣ 💰 Confirmação do pagamento
5️⃣ 📄 Emissão da nota fiscal
6️⃣ 🚛 Despacho via transportadora refrigerada
7️⃣ 📦 Código de rastreamento enviado

📦 *INFORMAÇÕES DE ENTREGA:*
• Prazo: 1-3 dias úteis (após confirmação do pagamento)
• Transporte: Refrigerado especializado
• Horário: 8h às 18h (dias úteis)
• Embalagem: Lacrada e com lacre de segurança

🔒 *CERTIFICAÇÕES E GARANTIAS:*
• ✅ Produtos 100% originais
• ✅ Registro ANVISA ativo
• ✅ Armazenamento controlado (2-8°C)
• ✅ Nota fiscal médica
• ✅ Certificado de análise incluso
• ✅ Prazo de validade mínimo 12 meses
• ✅ Atendimento médico especializado

⚕️ *CONFORMIDADE MÉDICA:*
• Produtos de uso exclusivo profissional
• Exige comprovação de registro ativo
• Armazenamento em ambiente controlado
• Transporte conforme RDC 430/2020

🎯 *PEDIDO PRONTO PARA PROCESSAMENTO:*
✅ Todos os dados coletados
✅ Forma de pagamento definida
✅ Endereço de entrega confirmado
✅ Dados para nota fiscal completos

*PRÓXIMO PASSO: Aguardando envio dos dados de pagamento*

*Vytalle Estética & Viscosuplementação - Excelência em Produtos Médicos*
📱 WhatsApp: +55 21 99619-2890
📍 Rio de Janeiro, RJ

Pedido completo e pronto para processamento! 👨‍⚕️✨`;

      // Enviar para WhatsApp
      const whatsappNumber = '5521996192890'; // Número correto da Vytalle
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');

      // Limpar carrinho e mostrar sucesso
      clearCart();
      
      toast({
        title: '✅ Pedido enviado com sucesso!',
        description: 'Abrindo WhatsApp para finalizar...'
      });

      // Redirecionar para página de sucesso
      setTimeout(() => {
        router.push('/products?success=order-sent');
      }, 2000);

    } catch (error) {
      console.error('Erro no checkout:', error);
      toast({
        title: '❌ Erro no pedido',
        description: 'Tente novamente ou entre em contato',
        variant: 'destructive'
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
            <h3 className="text-lg font-semibold text-vitale-primary mb-4">Dados Pessoais</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nome Completo *</Label>
              <Input 
                id="name"
                value={customerData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Dr(a). João Silva"
                className="focus:ring-vitale-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">WhatsApp *</Label>
              <Input 
                id="phone"
                value={customerData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="focus:ring-vitale-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">E-mail Profissional *</Label>
              <Input 
                id="email"
                type="email"
                value={customerData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="dr.joao@clinica.com.br"
                className="focus:ring-vitale-primary"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-vitale-primary mb-4">Dados Profissionais</h3>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <p className="text-sm text-amber-700">
                  <strong>Produtos de uso exclusivo profissional.</strong> Exigimos CRM ativo.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm" className="text-sm font-medium">CRM (Registro Profissional) *</Label>
              <Input 
                id="crm"
                value={customerData.crm}
                onChange={(e) => handleInputChange('crm', e.target.value)}
                placeholder="123456/SP"
                className="focus:ring-vitale-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicName" className="text-sm font-medium">Nome da Clínica/Consultório *</Label>
              <Input 
                id="clinicName"
                value={customerData.clinicName}
                onChange={(e) => handleInputChange('clinicName', e.target.value)}
                placeholder="Clínica de Estética Avançada"
                className="focus:ring-vitale-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj" className="text-sm font-medium">CNPJ (Opcional)</Label>
              <Input 
                id="cnpj"
                value={customerData.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                placeholder="00.000.000/0001-00"
                className="focus:ring-vitale-primary"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-vitale-primary mb-4">Endereço de Entrega</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-700">
                  <strong>Entrega refrigerada especializada.</strong> Produtos chegam nas condições ideais.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-sm font-medium">CEP *</Label>
                <Input 
                  id="cep"
                  value={customerData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  placeholder="00000-000"
                  className="focus:ring-vitale-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">Cidade *</Label>
                <Input 
                  id="city"
                  value={customerData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="São Paulo"
                  className="focus:ring-vitale-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">Estado *</Label>
              <Input 
                id="state"
                value={customerData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="SP"
                className="focus:ring-vitale-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Endereço Completo *</Label>
              <Input 
                id="address"
                value={customerData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua Example, 123 - Centro"
                className="focus:ring-vitale-primary"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-vitale-primary mb-4">Escolha a Forma de Pagamento</h3>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  className={`
                    border-2 rounded-lg p-4 cursor-pointer transition-all
                    ${selectedPayment?.id === method.id 
                      ? `border-${method.color}-500 bg-${method.color}-50` 
                      : 'border-neutral-200 hover:border-neutral-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-base">{method.name}</h4>
                        {method.discount && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            -{method.discount}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">{method.description}</p>
                      {method.discount && (
                        <p className="text-sm text-green-600 font-medium">
                          Economia de {formatCurrency(total * method.discount / 100)}
                        </p>
                      )}
                    </div>
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedPayment?.id === method.id 
                        ? `border-${method.color}-500 bg-${method.color}-500`
                        : 'border-neutral-300'
                      }
                    `}>
                      {selectedPayment?.id === method.id && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedPayment && (
              <div className={`bg-${selectedPayment.color}-50 border border-${selectedPayment.color}-200 rounded-lg p-4`}>
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
            <h3 className="text-lg font-semibold text-vitale-primary mb-4">Confirmação do Pedido</h3>
            
            {/* Resumo do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Dados do Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p><strong>Nome:</strong> {customerData.name}</p>
                <p><strong>CRM:</strong> {customerData.crm}</p>
                <p><strong>Clínica:</strong> {customerData.clinicName}</p>
                <p><strong>WhatsApp:</strong> {customerData.phone}</p>
                <p><strong>E-mail:</strong> {customerData.email}</p>
              </CardContent>
            </Card>

            {/* Resumo de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>{customerData.address}</p>
                <p>{customerData.city} - {customerData.state}</p>
                <p>CEP: {customerData.cep}</p>
              </CardContent>
            </Card>

            {/* Forma de Pagamento Escolhida */}
            {selectedPayment && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{selectedPayment.icon}</span>
                    <span className="font-semibold">{selectedPayment.name}</span>
                    {selectedPayment.discount && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        -{selectedPayment.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600">{selectedPayment.description}</p>
                  {selectedPayment.discount && (
                    <p className="text-green-600 font-medium mt-1">
                      Desconto: -{formatCurrency(discountAmount)}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Garantias */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🔒 Suas Garantias:</h4>
              <div className="text-sm text-green-700 space-y-1">
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
            <h1 className="text-2xl font-bold text-neutral-600 mb-4">Carrinho vazio</h1>
            <Button onClick={() => router.push('/products')}>
              Explorar Produtos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Carrinho
          </Button>
          <h1 className="text-3xl font-bold text-vitale-primary">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-2">
          {/* Formulário Principal */}
          <div className="md:col-span-1 lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                      ${currentStep >= step.step 
                        ? 'bg-vitale-primary text-white' 
                        : 'bg-neutral-200 text-neutral-500'
                      }
                    `}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        w-20 h-0.5 mx-2
                        ${currentStep > step.step ? 'bg-vitale-primary' : 'bg-neutral-200'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-neutral-600">
                  Etapa {currentStep} de {steps.length}: {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>

            {/* Formulário */}
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 mt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={currentStep === 1}
                  >
                    Voltar
                  </Button>

                  {currentStep < 5 ? (
                    <Button 
                      onClick={nextStep}
                      className="bg-vitale-primary hover:bg-vitale-secondary"
                      disabled={!validateCurrentStep()}
                    >
                      {currentStep === 4 ? 'Revisar Pedido' : 'Próximo'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCheckout}
                      disabled={isLoading || !selectedPayment}
                      className="bg-vitale-primary hover:bg-vitale-secondary"
                    >
                      {isLoading ? 'Enviando...' : 'Finalizar via WhatsApp'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="md:col-span-1 lg:col-span-1 space-y-6">
            {/* Resumo de Produtos */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto {selectedPayment?.name}:</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'GRÁTIS' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-vitale-primary">{formatCurrency(finalTotal)}</span>
                  </div>
                  {selectedPayment && (
                    <div className="text-xs text-center text-neutral-500 pt-2">
                      {selectedPayment.icon} Pagamento via {selectedPayment.name}
                    </div>
                  )}
                </div>

                {total < 1000 && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-700">
                    <p className="font-semibold">💡 Dica:</p>
                    <p>Adicione mais {formatCurrency(1000 - total)} para ganhar frete grátis!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Informações de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-vitale-primary" />
                  <span>Entrega em 1-3 dias úteis</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-vitale-primary" />
                  <span>Transporte refrigerado</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Produtos de uso profissional</span>
                </div>
              </CardContent>
            </Card>

            {/* Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Opções de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="flex items-center gap-2 font-semibold text-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    PIX (Recomendado)
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    • 5% desconto adicional
                    • Aprovação instantânea
                    • Processamento imediato
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="flex items-center gap-2 font-semibold text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Link de Pagamento
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    • Cartão até 12x sem juros
                    • Débito e crédito
                    • Processamento seguro
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="flex items-center gap-2 font-semibold text-amber-800">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    Boleto Bancário
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    • Vencimento em 3 dias úteis
                    • Para empresas/PJ
                    • Sem taxas adicionais
                  </p>
                </div>

                <div className="text-center pt-2 border-t">
                  <p className="text-xs text-neutral-500">
                    ⚡ Pagamento processado via WhatsApp Business
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}