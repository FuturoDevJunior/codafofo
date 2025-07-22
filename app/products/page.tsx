import {
  ArrowLeft,
  Home,
  MessageCircle,
  Package,
  Phone,
  Shield,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/mockData';
import { Product } from '@/types/product';

export const revalidate = 3600; // ISR

export default async function Products() {
  // Usar apenas mockData para garantir SSG
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground">Nenhum produto disponível</h2>
          <p className="text-muted-foreground">Volte em breve para novos produtos</p>
        </div>
      </div>
    );
  }

  // Agrupar produtos por categoria
  const productsByCategory: Record<string, Product[]> = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen">
      {/* Linha de benefícios enxuta */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm mt-4 mb-6 px-2 sm:px-0">
        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-success-600" /> Compra Segura</span>
        <span className="flex items-center gap-2"><Package className="w-4 h-4 text-vitale-primary" /> Produtos Originais</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-vitale-secondary" /> Entrega Rápida</span>
      </div>

      {/* Bloco de autoridade e prova social */}
      <div className="max-w-2xl mx-auto mb-8 text-center space-y-2 px-2 sm:px-0">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 items-center text-base font-medium text-vitale-primary">
          <span className="flex items-center gap-2 border border-success-200 bg-success-50 rounded-xl px-3 py-1"><Shield className="w-4 h-4 text-success-600" /> Distribuidor Oficial</span>
          <span className="flex items-center gap-2 border border-info-200 bg-info-50 rounded-xl px-3 py-1"><Package className="w-4 h-4 text-info-600" /> Registro ANVISA</span>
          <span className="flex items-center gap-2 border border-vitale-primary/20 bg-vitale-primary/5 rounded-xl px-3 py-1"><Phone className="w-4 h-4 text-vitale-primary" /> Atendimento Personalizado</span>
        </div>
        <div className="text-sm text-neutral-600 mt-2 px-1 sm:px-0">
          Exclusivo para clínicas e profissionais. Produtos certificados, suporte consultivo e entrega rápida.
        </div>
      </div>
      {/* Container principal com espaçamento otimizado */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Breadcrumb e Navegação - Compacto */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Link 
              href="/" 
              className="flex items-center gap-1 hover:text-vitale-primary transition-colors focus-ring rounded px-1"
              aria-label="Voltar para página inicial"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <span className="text-muted-foreground/50" aria-hidden="true">/</span>
            <span className="text-vitale-primary font-medium">Catálogo</span>
          </nav>

          {/* Botão Voltar - Mobile First */}
          <Link href="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary hover:text-white transition-all focus-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar ao Início</span>
              <span className="sm:hidden">Início</span>
            </Button>
          </Link>
        </div>

        {/* Header da Página - Compacto */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-vitale-primary tracking-tight">
              Catálogo Vytalle Estética & Viscosuplementação
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubra nossa seleção premium de produtos estéticos e viscosuplementação para profissionais
            </p>
          </div>
          
          {/* Indicadores de status - Melhorados */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-success-50 px-3 py-1.5 rounded-full border border-success-200">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft"></div>
              <span className="text-success-700 font-medium">{products.length} produtos disponíveis</span>
            </div>
            <div className="flex items-center gap-2 bg-vitale-primary/5 px-3 py-1.5 rounded-full border border-vitale-primary/20">
              <div className="w-2 h-2 bg-vitale-primary rounded-full"></div>
              <span className="text-vitale-primary font-medium">{Object.keys(productsByCategory).length} categorias</span>
            </div>
          </div>
        </div>

        {/* Produtos por Categoria - Grid otimizado */}
        <div className="space-y-12">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <section key={category} className="space-y-6">
              {/* Header da categoria */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-vitale-primary">{category}</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto text-base leading-relaxed">
                  {category === 'Toxina Botulínica' && 'Produtos originais de toxina botulínica das principais marcas mundiais'}
                  {category === 'Bioestimulador' && 'Bioestimuladores certificados para regeneração celular e estímulo de colágeno'}
                  {category === 'Preenchedor' && 'Preenchedores com ácido hialurônico de marcas renomadas e certificadas'}
                  {category === 'Fio Bioestimulação' && 'Fios de bioestimulação profissionais para procedimentos estéticos'}
                  {category === 'Microcânula' && 'Microcânulas profissionais de alta qualidade para aplicações precisas'}
                  {category === 'Enzima' && 'Enzimas especializadas para dissolução e correção de procedimentos'}
                  {category === 'Skinbooster' && 'Skinboosters premium para hidratação e melhora da qualidade da pele'}
                  {category === 'Bioremodelador' && 'Bioremodeladores avançados para regeneração e rejuvenescimento tecidual'}
                </p>
              </div>

              {/* Grid responsivo melhorado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {categoryProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
                
                {/* Skeleton cards para preencher grid quando há poucos produtos */}
                {categoryProducts.length < 5 && Array.from({ length: 5 - categoryProducts.length }).map((_, i) => (
                  <div
                    key={`skeleton-${category}-${i}`}
                    className="hidden xl:block opacity-30"
                  >
                    <div className="bg-gradient-to-br from-vitale-neutral/50 to-vitale-light/50 rounded-2xl h-96 border-2 border-dashed border-vitale-primary/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-8 h-8 bg-vitale-primary/20 rounded-full mx-auto"></div>
                        <p className="text-xs text-vitale-primary/60 font-medium">Em breve</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Final - Repositionado e melhorado */}
        <section className="py-8 sm:py-12">
          <div className="bg-gradient-to-br from-vitale-primary/8 via-vitale-secondary/5 to-vitale-primary/8 rounded-3xl p-6 sm:p-8 lg:p-12 text-center border border-vitale-primary/10 shadow-vitale">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-vitale-primary">
                  Fale com nosso time e garanta condições especiais para sua clínica.
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Atendimento consultivo, entrega rápida e produtos certificados.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/5521996192890?text=Olá! Gostaria de saber mais sobre os produtos estéticos e viscosuplementação da Vytalle."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl focus-ring min-w-[200px] interactive"
                >
                  <MessageCircle className="text-xl" />
                  <span>Falar no WhatsApp</span>
                </a>
                <a
                  href="tel:+5521996192890"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-vitale-primary text-white font-semibold rounded-xl hover:bg-vitale-secondary transition-all duration-200 shadow-lg hover:shadow-xl focus-ring min-w-[200px] interactive"
                >
                  <Phone className="text-xl" />
                  <span>Ligar Agora</span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Atendimento especializado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-vitale-primary rounded-full"></div>
                  <span>Produtos originais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-info-500 rounded-full"></div>
                  <span>Entrega em todo Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
