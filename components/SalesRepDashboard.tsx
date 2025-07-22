"use client";

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  Award,
  Calculator,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

interface SalesRepDashboardProps {
  salesRep: {
    name: string;
    id: string;
    commission_rate: number;
    level: 'bronze' | 'silver' | 'gold' | 'diamond';
    sales_this_month: number;
    total_commission: number;
  };
}

export default function SalesRepDashboard({ salesRep }: SalesRepDashboardProps) {
  const [showCommissionCalculator, setShowCommissionCalculator] = useState(false);
  const { items } = useCartStore();
  
  const cartTotal = items.reduce((sum, item) => sum + (item.price_pix * item.quantity), 0);
  const estimatedCommission = cartTotal * (salesRep.commission_rate / 100);

  const levelConfig = {
    bronze: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🥉' },
    silver: { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: '🥈' },
    gold: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🥇' },
    diamond: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: '💎' },
  };

  const currentLevel = levelConfig[salesRep.level];

  return (
    <div className="space-y-6">
      {/* Header do Vendedor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-vitale-primary to-vitale-secondary rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${currentLevel.bg} rounded-full flex items-center justify-center text-2xl`}>
              {currentLevel.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, {salesRep.name}!</h2>
              <p className="text-white/80 capitalize">
                Vendedor {salesRep.level} • {salesRep.commission_rate}% de comissão
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatCurrency(salesRep.total_commission)}
            </div>
            <p className="text-white/80 text-sm">Total em comissões</p>
          </div>
        </div>
      </motion.div>

      {/* Cards de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-vitale-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-vitale-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vitale-primary">
              {formatCurrency(salesRep.sales_this_month)}
            </div>
            <p className="text-xs text-muted-foreground">
              Meta: {formatCurrency(50000)} • {Math.round((salesRep.sales_this_month / 50000) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carrinho Atual</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(cartTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? 'produto' : 'produtos'} • Comissão: {formatCurrency(estimatedCommission)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Nível</CardTitle>
            <Award className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {salesRep.level === 'diamond' ? 'MAX' : 
               salesRep.level === 'gold' ? 'Diamond' :
               salesRep.level === 'silver' ? 'Gold' : 'Silver'}
            </div>
            <p className="text-xs text-muted-foreground">
              {salesRep.level === 'diamond' ? 'Nível máximo alcançado!' : 
               `Venda mais ${formatCurrency(20000)} para subir de nível`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calculadora de Comissão */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculadora de Comissão
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommissionCalculator(!showCommissionCalculator)}
            >
              {showCommissionCalculator ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </CardHeader>
        {showCommissionCalculator && (
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Valor da Venda (PIX)</label>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(cartTotal)}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sua Comissão ({salesRep.commission_rate}%)</label>
                  <div className="text-lg font-bold text-vitale-primary">
                    {formatCurrency(estimatedCommission)}
                  </div>
                </div>
              </div>
              
              <div className="bg-vitale-primary/5 border border-vitale-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-vitale-primary" />
                  <span className="font-semibold text-vitale-primary">Detalhamento</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Produtos no carrinho: {items.length}</div>
                  <div>Total (PIX): {formatCurrency(cartTotal)}</div>
                  <div>Taxa de comissão: {salesRep.commission_rate}%</div>
                  <div className="font-bold">Sua comissão: {formatCurrency(estimatedCommission)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Dicas para Vendedores */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Star className="h-5 w-5" />
            Dicas para Aumentar suas Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Produtos Premium</span>
              </div>
              <p className="text-sm text-blue-700">
                Foque em produtos de maior valor agregado como Botox e preenchedores.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Atendimento Personalizado</span>
              </div>
              <p className="text-sm text-blue-700">
                Use o WhatsApp para oferecer consultoria e esclarecer dúvidas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}