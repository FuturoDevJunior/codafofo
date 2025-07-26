'use client';

import { useState } from 'react';

import { AlertCircle, Building2, Eye, MessageSquare, Palette, RotateCcw, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useCustomization } from '@/hooks/useCustomization';

interface CustomizationData {
  // Branding
  companyName: string;
  logoUrl: string;
  faviconUrl: string;

  // Cores
  primaryColor: string;
  secondaryColor: string;

  // Contatos
  whatsapp: string;
  email: string;
  emailPrivacidade: string;
  emailDpo: string;
  instagram: string;
  website: string;

  // Configurações
  mensagemDestaque: string;
  infoEntrega: string;
  formasPagamento: string;
  contatoSuporte: string;
}

export default function CustomizationPage() {
  const { customization, saveCustomization, resetCustomization } = useCustomization();
  const [data, setData] = useState<CustomizationData>(customization);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Sincronizar com o hook quando carregar
  useState(() => {
    setData(customization);
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Salvar usando o hook
      saveCustomization(data);

      toast({
        title: '✅ Personalização salva!',
        description: 'As mudanças foram aplicadas com sucesso.',
      });
    } catch {
      toast({
        title: '❌ Erro ao salvar',
        description: 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetCustomization();
    setData(customization);

    toast({
      title: '🔄 Configurações resetadas',
      description: 'Voltou para as configurações padrão.',
    });
  };

  // Remover função applyCustomization pois agora está no hook

  const handleInputChange = (field: keyof CustomizationData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vitale-primary">
              <Palette className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-vitale-primary">Personalização</h1>
              <p className="text-neutral-600">Customize o visual e informações do seu site</p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="text-white bg-vitale-primary hover:bg-vitale-secondary"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Salvando...' : 'Salvar Mudanças'}
            </Button>

            <Button
              onClick={() => setPreviewMode(!previewMode)}
              variant="outline"
              className="border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              {previewMode ? 'Ocultar Preview' : 'Ver Preview'}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Resetar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="branding" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="contatos">Contatos</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                <TabsTrigger value="cores">Cores</TabsTrigger>
              </TabsList>

              {/* Branding */}
              <TabsContent value="branding" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Informações da Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        value={data.companyName}
                        onChange={e => handleInputChange('companyName', e.target.value)}
                        placeholder="Nome da sua empresa"
                      />
                    </div>

                    <div>
                      <Label htmlFor="logoUrl">URL do Logo</Label>
                      <Input
                        id="logoUrl"
                        value={data.logoUrl}
                        onChange={e => handleInputChange('logoUrl', e.target.value)}
                        placeholder="/caminho/para/logo.png"
                      />
                    </div>

                    <div>
                      <Label htmlFor="faviconUrl">URL do Favicon</Label>
                      <Input
                        id="faviconUrl"
                        value={data.faviconUrl}
                        onChange={e => handleInputChange('faviconUrl', e.target.value)}
                        placeholder="/caminho/para/favicon.png"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contatos */}
              <TabsContent value="contatos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp (apenas números)</Label>
                      <Input
                        id="whatsapp"
                        value={data.whatsapp}
                        onChange={e => handleInputChange('whatsapp', e.target.value)}
                        placeholder="5521996192890"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail Principal</Label>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="admin@suaempresa.com.br"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emailPrivacidade">E-mail Privacidade</Label>
                      <Input
                        id="emailPrivacidade"
                        type="email"
                        value={data.emailPrivacidade}
                        onChange={e => handleInputChange('emailPrivacidade', e.target.value)}
                        placeholder="privacidade@suaempresa.com.br"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emailDpo">E-mail DPO</Label>
                      <Input
                        id="emailDpo"
                        type="email"
                        value={data.emailDpo}
                        onChange={e => handleInputChange('emailDpo', e.target.value)}
                        placeholder="dpo@suaempresa.com.br"
                      />
                    </div>

                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={data.instagram}
                        onChange={e => handleInputChange('instagram', e.target.value)}
                        placeholder="@suaempresa"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={data.website}
                        onChange={e => handleInputChange('website', e.target.value)}
                        placeholder="https://suaempresa.com.br"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Configurações */}
              <TabsContent value="configuracoes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Configurações do Site
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="mensagemDestaque">Mensagem de Destaque</Label>
                      <Input
                        id="mensagemDestaque"
                        value={data.mensagemDestaque}
                        onChange={e => handleInputChange('mensagemDestaque', e.target.value)}
                        placeholder="Sua mensagem de destaque"
                      />
                    </div>

                    <div>
                      <Label htmlFor="infoEntrega">Informações de Entrega</Label>
                      <Input
                        id="infoEntrega"
                        value={data.infoEntrega}
                        onChange={e => handleInputChange('infoEntrega', e.target.value)}
                        placeholder="Informações sobre entrega"
                      />
                    </div>

                    <div>
                      <Label htmlFor="formasPagamento">Formas de Pagamento</Label>
                      <Input
                        id="formasPagamento"
                        value={data.formasPagamento}
                        onChange={e => handleInputChange('formasPagamento', e.target.value)}
                        placeholder="PIX • Cartão • Boleto"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contatoSuporte">Contato de Suporte</Label>
                      <Input
                        id="contatoSuporte"
                        value={data.contatoSuporte}
                        onChange={e => handleInputChange('contatoSuporte', e.target.value)}
                        placeholder="Informações de suporte"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Cores */}
              <TabsContent value="cores" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Cores da Marca
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="primaryColor">Cor Principal</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={data.primaryColor}
                          onChange={e => handleInputChange('primaryColor', e.target.value)}
                          className="h-10 w-16"
                        />
                        <Input
                          value={data.primaryColor}
                          onChange={e => handleInputChange('primaryColor', e.target.value)}
                          placeholder="#d8a75b"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={data.secondaryColor}
                          onChange={e => handleInputChange('secondaryColor', e.target.value)}
                          className="h-10 w-16"
                        />
                        <Input
                          value={data.secondaryColor}
                          onChange={e => handleInputChange('secondaryColor', e.target.value)}
                          placeholder="#e79632"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previewMode ? (
                  <>
                    {/* Logo Preview */}
                    <div className="text-center">
                      <img
                        src={data.logoUrl}
                        alt="Logo Preview"
                        className="mx-auto mb-2 h-16"
                        onError={e => {
                          e.currentTarget.src = '/Vytalle_Logo_Gold.png';
                        }}
                      />
                      <p className="text-sm font-semibold text-vitale-primary">
                        {data.companyName}
                      </p>
                    </div>

                    {/* Cores Preview */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Cores da Marca:</p>
                      <div className="flex gap-2">
                        <div
                          className="h-8 w-8 rounded border"
                          style={{ backgroundColor: data.primaryColor }}
                          title="Cor Principal"
                        />
                        <div
                          className="h-8 w-8 rounded border"
                          style={{ backgroundColor: data.secondaryColor }}
                          title="Cor Secundária"
                        />
                      </div>
                    </div>

                    {/* Contatos Preview */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Contatos:</p>
                      <div className="space-y-1 text-xs">
                        <p>📱 {data.whatsapp}</p>
                        <p>📧 {data.email}</p>
                        <p>📷 {data.instagram}</p>
                      </div>
                    </div>

                    {/* Configurações Preview */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Configurações:</p>
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">{data.mensagemDestaque}</p>
                        <p>{data.infoEntrega}</p>
                        <p>{data.formasPagamento}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-neutral-500">
                    <Eye className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p className="text-sm">
                      Clique em &quot;Ver Preview&quot; para visualizar as mudanças
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dicas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="text-amber-500 h-5 w-5" />
              Dicas de Personalização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">📝 Textos</h4>
                <ul className="space-y-1 text-neutral-600">
                  <li>• Use nomes claros e profissionais</li>
                  <li>• Mantenha contatos atualizados</li>
                  <li>• Teste as mensagens antes de salvar</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">🎨 Cores</h4>
                <ul className="space-y-1 text-neutral-600">
                  <li>• Escolha cores que combinem</li>
                  <li>• Mantenha bom contraste</li>
                  <li>• Use cores da sua marca</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
