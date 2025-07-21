'use client';

import { useState, useEffect } from 'react';
import { Settings, DollarSign, Package, Phone, MapPin, Save, Eye, EyeOff, BarChart3, TrendingUp, Users, ShoppingCart, Activity, Globe, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';
import { getMockProducts } from '@/lib/mockData';
import analyticsManager from '@/lib/analytics';

interface AdminSettings {
  whatsappNumber: string;
  companyName: string;
  companyAddress: string;
  defaultDiscount: number;
  pixDiscount: number;
  deliveryFee: number;
}

export default function AdminDashboard() {
  const [settings, setSettings] = useState<AdminSettings>({
    whatsappNumber: '5562999404495',
    companyName: 'Vytalle Estética',
    companyAddress: 'Goiânia - GO',
    defaultDiscount: 0,
    pixDiscount: 5,
    deliveryFee: 0
  });
  
  const [products, setProducts] = useState(getMockProducts());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrices, setShowPrices] = useState(true);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  // Analytics simulados
  const analytics = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveSettings = () => {
    // Aqui você salvaria no localStorage ou backend
    localStorage.setItem('vytalle-admin-settings', JSON.stringify(settings));
    toast({
      title: "✅ Configurações salvas!",
      description: "Todas as alterações foram aplicadas com sucesso.",
    });
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, price: newPrice } : p
    ));
    setEditingProduct(null);
    toast({
      title: "💰 Preço atualizado!",
      description: "O preço do produto foi alterado com sucesso.",
    });
  };

  const handleBulkPriceUpdate = (percentage: number) => {
    setProducts(prev => prev.map(p => ({
      ...p,
      price: Math.round(p.price * (1 + percentage / 100) * 100) / 100
    })));
    toast({
      title: `📈 Preços ${percentage > 0 ? 'aumentados' : 'reduzidos'}!`,
      description: `Todos os preços foram ${percentage > 0 ? 'aumentados' : 'reduzidos'} em ${Math.abs(percentage)}%`,
    });
  };

  const loadAnalyticsData = () => {
    try {
      const data = analyticsManager.getAnalyticsData();
      const recentActivity = analyticsManager.getRecentActivity(24);
      const conversionMetrics = analyticsManager.getConversionMetrics();
      const topPages = analyticsManager.getTopPages(5);

      setAnalyticsData({
        ...data,
        conversionMetrics,
        topPages,
        totalEvents: data.pageViews.length + data.cartEvents.length + data.leads.length
      });

      setRealTimeData(recentActivity);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('vytalle-admin-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Carregar dados de analytics
    loadAnalyticsData();

    // Timer para atualizar dados em tempo real
    const analyticsInterval = setInterval(() => {
      loadAnalyticsData();
    }, 30000); // Atualizar a cada 30 segundos

    // Timer para atualizar timestamp
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(analyticsInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-vitale-primary" />
              <div>
                <h1 className="text-3xl font-bold text-neutral-800">
                  Painel Administrativo
                </h1>
                <p className="text-neutral-600">
                  Gerencie preços, configurações e monitore o desempenho do seu catálogo
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                <Clock className="h-4 w-4" />
                <span>Última atualização</span>
              </div>
              <div className="font-mono text-sm text-neutral-700">
                {currentTime.toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="border-l-4 border-l-vitale-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total de Produtos</p>
                  <p className="text-2xl font-bold text-vitale-primary">{analytics.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-vitale-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Produtos Ativos</p>
                  <p className="text-2xl font-bold text-success-600">{analytics.activeProducts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-vitale-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Preço Médio</p>
                  <p className="text-2xl font-bold text-vitale-secondary">
                    {formatCurrency(analytics.averagePrice)}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-vitale-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Valor Total Estoque</p>
                  <p className="text-2xl font-bold text-warning-600">
                    {formatCurrency(analytics.totalValue)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-warning-500" />
              </div>
            </CardContent>
          </Card>

          {/* Visitantes Online (24h) */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Visitantes (24h)</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analyticsData?.conversionMetrics?.uniqueVisitors || 0}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Taxa de Conversão */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {analyticsData?.conversionMetrics?.conversionRate || '0%'}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics em Tempo Real */}
        {analyticsData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Atividade em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {realTimeData?.pageViews?.slice(-10).reverse().map((pv: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{pv.page}</p>
                        <p className="text-xs text-neutral-500">
                          IP: {pv.ip} • {new Date(pv.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-xs text-neutral-400">
                        {pv.duration ? `${(pv.duration / 1000).toFixed(0)}s` : 'Ativo'}
                      </div>
                    </div>
                  )) || []}
                  {(!realTimeData?.pageViews || realTimeData.pageViews.length === 0) && (
                    <div className="text-center py-8 text-neutral-500">
                      Nenhuma atividade recente
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Eventos do Carrinho */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Eventos do Carrinho
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {realTimeData?.cartEvents?.slice(-10).reverse().map((ce: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {ce.type === 'add' && '➕ Produto Adicionado'}
                          {ce.type === 'remove' && '➖ Produto Removido'}
                          {ce.type === 'whatsapp_redirect' && '📱 Redirecionamento WhatsApp'}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {ce.productName && `${ce.productName} • `}
                          IP: {ce.ip}
                        </p>
                      </div>
                      <div className="text-xs text-neutral-400">
                        {new Date(ce.timestamp).toLocaleTimeString('pt-BR')}
                      </div>
                    </div>
                  )) || []}
                  {(!realTimeData?.cartEvents || realTimeData.cartEvents.length === 0) && (
                    <div className="text-center py-8 text-neutral-500">
                      Nenhum evento de carrinho
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Configurações Gerais */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* WhatsApp */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Número WhatsApp
                </Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                  placeholder="5562999999999"
                />
              </div>

              {/* Nome da Empresa */}
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                />
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço/Cidade
                </Label>
                <Input
                  value={settings.companyAddress}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyAddress: e.target.value }))}
                />
              </div>

              {/* Desconto PIX */}
              <div className="space-y-2">
                <Label>Desconto PIX (%)</Label>
                <Input
                  type="number"
                  value={settings.pixDiscount}
                  onChange={(e) => setSettings(prev => ({ ...prev, pixDiscount: Number(e.target.value) }))}
                />
              </div>

              {/* Ações Rápidas de Preço */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold">Ações Rápidas de Preço</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkPriceUpdate(5)}
                    className="text-xs"
                  >
                    +5% Todos
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkPriceUpdate(10)}
                    className="text-xs"
                  >
                    +10% Todos
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkPriceUpdate(-5)}
                    className="text-xs"
                  >
                    -5% Todos
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkPriceUpdate(-10)}
                    className="text-xs"
                  >
                    -10% Todos
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleSaveSettings}
                className="w-full bg-vitale-primary hover:bg-vitale-secondary"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>

          {/* Gerenciamento de Produtos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Gerenciar Preços dos Produtos
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrices(!showPrices)}
                >
                  {showPrices ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              
              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-white min-w-[200px]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Todas as Categorias' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lista de Produtos */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border hover:border-vitale-primary/30 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-800 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {product.category} • Estoque: {product.stock}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {editingProduct === product.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-24 h-8 text-sm"
                            step="0.01"
                          />
                          <Button
                            size="sm"
                            onClick={() => handlePriceUpdate(product.id, tempPrice)}
                            className="h-8 px-2"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingProduct(null)}
                            className="h-8 px-2"
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {showPrices && (
                            <span className="font-semibold text-vitale-primary min-w-[80px] text-right">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProduct(product.id);
                              setTempPrice(product.price);
                            }}
                            className="h-8 px-3 text-xs"
                          >
                            Editar
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  Nenhum produto encontrado com os filtros aplicados.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Footer */}
        <div className="mt-8 p-4 bg-vitale-primary/5 border border-vitale-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-vitale-primary/10 p-2 rounded-full">
              <Settings className="h-5 w-5 text-vitale-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-vitale-primary mb-2">
                💡 Painel &quot;No-Code&quot; - Fácil de Usar
              </h3>
              <div className="text-sm text-neutral-600 space-y-1">
                <p>• <strong>Preços:</strong> Clique em &quot;Editar&quot; ao lado de qualquer produto para alterar o preço</p>
                <p>• <strong>Ações Rápidas:</strong> Use os botões para aumentar ou diminuir todos os preços de uma vez</p>
                <p>• <strong>WhatsApp:</strong> Configure o número para onde os pedidos serão enviados</p>
                <p>• <strong>Busca:</strong> Use a barra de pesquisa para encontrar produtos rapidamente</p>
                <p>• <strong>Categorias:</strong> Filtre por categoria para gerenciar grupos específicos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}