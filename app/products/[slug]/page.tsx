import { notFound } from 'next/navigation';

import ProductCarousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { getMockProductBySlugCached, mockProducts } from '@/lib/mockData';

import { supabase } from '../../../lib/supabase';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from('products').select('slug');
    if (data && data.length > 0) {
      return data.map(({ slug }) => ({ slug }));
    }
  } catch (error) {
    // Fallback silencioso para mock data em produção
  }
  
  // Fallback para mock data
  return mockProducts.map(product => ({ slug: product.slug }));
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  let product = null;
  
  // Tentar buscar no Supabase primeiro
  try {
    const { data } = await supabase.from('products').select('*').eq('slug', params.slug).single();
    product = data;
  } catch (error) {
    // Fallback silencioso para mock data quando Supabase não disponível
  }
  
  // Fallback para mock data se Supabase falhar
  if (!product) {
    product = await getMockProductBySlugCached(params.slug);
  }
  
  // Se não encontrar nem no Supabase nem no mock, retorna 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <ProductCarousel images={product.images} />
        </div>
        
        {/* Informações do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-vitale-primary">{product.name}</h1>
            <p className="text-lg text-neutral-600 mb-4">{product.description}</p>
            
            {/* Categoria e Estoque */}
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-vitale-primary/10 text-vitale-primary">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Em estoque ({product.stock} unidades)
                </span>
              ) : (
                <span className="flex items-center text-sm text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Fora de estoque
                </span>
              )}
            </div>
          </div>
          
          {/* Preço e Ofertas */}
          <div className="bg-gradient-to-r from-vitale-primary/5 to-vitale-secondary/5 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Preço PIX</span>
                {product.discount_percent > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm line-through text-neutral-400">
                      {formatCurrency(product.price / (1 - product.discount_percent / 100))}
                    </span>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discount_percent}%
                    </span>
                  </div>
                )}
              </div>
              <span className="text-3xl font-bold text-vitale-primary">{formatCurrency(product.price)}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-neutral-600">
              <div className="flex items-center">
                <span className="mr-2">💳</span>
                <span>Até 12x sem juros</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>Pedidos via WhatsApp</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🚚</span>
                <span>Frete grátis acima R$ 1.000</span>
              </div>
            </div>
          </div>
          
          {/* Informações Médicas */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
              <span className="mr-2">⚕️</span>
              Uso Profissional
            </h3>
            <div className="text-sm text-amber-700 space-y-1">
              <p>• Produto de uso exclusivo para profissionais da saúde</p>
              <p>• Registro ANVISA ativo e certificado</p>
              <p>• Exigimos comprovação de CRM ou registro profissional</p>
              <p>• Armazenamento e transporte controlado</p>
            </div>
          </div>
          
          {/* Garantias e Segurança */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <span className="mr-2">🔒</span>
              Garantias
            </h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>✅ Produto original e lacrado</p>
              <p>✅ Nota fiscal e documentação completa</p>
              <p>✅ Transporte refrigerado especializado</p>
              <p>✅ Entrega em 1-3 dias úteis</p>
              <p>✅ Suporte técnico especializado</p>
            </div>
          </div>
          
          <ProductDetailClient product={product} />
          
          {/* Call to Action Adicional */}
          <div className="bg-vitale-primary/5 border border-vitale-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-vitale-primary mb-2">
              <strong>Dúvidas técnicas?</strong> Nossa equipe médica está disponível
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-vitale-primary text-vitale-primary hover:bg-vitale-primary hover:text-white"
              onClick={() => window.open('https://wa.me/556212345678?text=Olá! Tenho dúvidas sobre o produto: ' + encodeURIComponent(product.name), '_blank')}
            >
              📱 Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
