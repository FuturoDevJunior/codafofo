import { ArrowLeft, Home, MessageCircle, Package, Phone, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

import AdvancedProductCatalog from '@/components/AdvancedProductCatalog';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/mockData';

export const revalidate = 3600; // ISR

export default async function Products() {
  // Usar apenas mockData para garantir SSG
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground">Nenhum produto disponível</h2>
          <p className="text-muted-foreground">Volte em breve para novos produtos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Linha de benefícios enxuta */}
      <div className="mb-6 mt-4 flex flex-wrap items-center justify-center gap-4 px-2 text-sm sm:gap-6 sm:px-0">
        <span className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-success-600" /> Compra Segura
        </span>
        <span className="flex items-center gap-2">
          <Package className="h-4 w-4 text-vitale-primary" /> Produtos Originais
        </span>
        <span className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-vitale-secondary" /> Entrega Rápida
        </span>
      </div>

      {/* Bloco de autoridade e prova social */}
      <div className="mx-auto mb-8 max-w-2xl space-y-2 px-2 text-center sm:px-0">
        <div className="flex flex-wrap items-center justify-center gap-3 text-base font-medium text-vitale-primary sm:gap-4">
          <span className="border-success-200 flex items-center gap-2 rounded-xl border bg-success-50 px-3 py-1">
            <Shield className="h-4 w-4 text-success-600" /> Distribuidor Oficial
          </span>
          <span className="border-info-200 flex items-center gap-2 rounded-xl border bg-info-50 px-3 py-1">
            <Package className="h-4 w-4 text-info-600" /> Registro ANVISA
          </span>
          <span className="flex items-center gap-2 rounded-xl border border-vitale-primary/20 bg-vitale-primary/5 px-3 py-1">
            <Phone className="h-4 w-4 text-vitale-primary" /> Atendimento Personalizado
          </span>
        </div>
        <div className="mt-2 px-1 text-sm text-neutral-600 sm:px-0">
          Exclusivo para clínicas e profissionais. Produtos certificados, suporte consultivo e
          entrega rápida.
        </div>
      </div>

      {/* Container principal com espaçamento otimizado */}
      <div className="mx-auto max-w-7xl space-y-6 px-2 sm:space-y-8 sm:px-4 md:px-6 lg:px-8">
        {/* Breadcrumb e Navegação - Compacto */}
        <div className="flex flex-col items-start justify-between gap-3 pt-2 sm:flex-row sm:items-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1 text-sm text-muted-foreground"
          >
            <Link
              href="/"
              className="flex items-center gap-1 rounded px-1 transition-colors focus-ring hover:text-vitale-primary"
              aria-label="Voltar para página inicial"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <span className="text-muted-foreground/50" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-vitale-primary">Catálogo</span>
          </nav>

          {/* Botão Voltar - Mobile First */}
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="hover:text-white flex items-center gap-2 border-vitale-primary/30 text-vitale-primary transition-all focus-ring hover:bg-vitale-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar ao Início</span>
              <span className="sm:hidden">Início</span>
            </Button>
          </Link>
        </div>

        {/* Header da Página - Compacto */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-vitale-primary sm:text-4xl lg:text-5xl">
              Catálogo Vytalle Estética & Viscosuplementação
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Descubra nossa seleção premium de produtos estéticos e viscosuplementação para
              profissionais
            </p>
          </div>

          {/* Indicadores de status - Melhorados */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="border-success-200 flex items-center gap-2 rounded-full border bg-success-50 px-3 py-1.5">
              <div className="h-2 w-2 animate-pulse-soft rounded-full bg-success-500"></div>
              <span className="font-medium text-success-700">
                {products.length} produtos disponíveis
              </span>
            </div>
          </div>
        </div>

        {/* Catálogo Avançado com Filtros */}
        <AdvancedProductCatalog products={products} enableAdvancedFilters={true} />

        {/* CTA Final - Repositionado e melhorado */}
        <section className="py-8 sm:py-12">
          <div className="from-vitale-primary/8 to-vitale-primary/8 rounded-3xl border border-vitale-primary/10 bg-gradient-to-br via-vitale-secondary/5 p-6 text-center shadow-vitale sm:p-8 lg:p-12">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-vitale-primary sm:text-3xl">
                  Fale com nosso time e garanta condições especiais para sua clínica.
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Atendimento consultivo, entrega rápida e produtos certificados.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://wa.me/5521996192890?text=Olá! Gostaria de saber mais sobre os produtos estéticos e viscosuplementação da Vytalle."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white hover:bg-green-700 inline-flex min-w-[200px] items-center gap-3 rounded-xl px-8 py-4 font-semibold shadow-lg transition-all duration-200 focus-ring interactive hover:shadow-xl"
                >
                  <MessageCircle className="text-xl" />
                  <span>Falar no WhatsApp</span>
                </a>
                <a
                  href="tel:+5521996192890"
                  className="text-white inline-flex min-w-[200px] items-center gap-3 rounded-xl bg-vitale-primary px-8 py-4 font-semibold shadow-lg transition-all duration-200 focus-ring interactive hover:bg-vitale-secondary hover:shadow-xl"
                >
                  <Phone className="text-xl" />
                  <span>Ligar Agora</span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success-500"></div>
                  <span>Atendimento especializado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-vitale-primary"></div>
                  <span>Produtos originais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-info-500"></div>
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
