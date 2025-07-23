import './globals.css';

import { MenuIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AccessibilityProvider from '@/components/AccessibilityProvider';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vytalle-estetica.vercel.app'),
  title: 'Vytalle Estética - Catálogo Premium | Produtos Médicos Estéticos Profissionais',
  description: 'Produtos médicos estéticos premium para profissionais: Toxinas botulínicas (Botox, Dysport, Xeomin), preenchedores de ácido hialurônico, bioestimuladores certificados ANVISA. Entrega expressa em todo Brasil.',
  keywords: [
    'toxina botulínica',
    'preenchedores',
    'ácido hialurônico',
    'bioestimuladores',
    'vytalle',
    'estética profissional',
    'produtos médicos estéticos',
    'ANVISA',
    'clínica estética',
    'viscosuplementação'
  ].join(', '),
  authors: [{ name: 'Vytalle Estética' }],
  openGraph: {
    title: 'Vytalle Estética - Produtos Premium para Profissionais',
    description: 'Toxinas botulínicas, preenchedores e bioestimuladores certificados ANVISA. Entrega expressa, suporte especializado.',
    images: [
      {
        url: '/vytalle-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Vytalle Estética - Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Vytalle Estética',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vytalle Estética - Produtos Premium',
    description: 'Produtos médicos estéticos certificados para profissionais',
    images: ['/vytalle-logo.svg'],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Adicionar quando configurar GSC
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vytalle Estética & Viscosuplementação',
              description: 'Distribuidora de produtos médicos estéticos premium para profissionais',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vytalle-estetica.vercel.app',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vytalle-estetica.vercel.app'}/vytalle-logo.svg`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+55-21-99619-2890',
                contactType: 'Atendimento ao Cliente',
                availableLanguage: 'Portuguese',
              },
              sameAs: [
                'https://www.instagram.com/vytalle.estetica/',
              ],
              areaServed: 'BR',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-secondary/5 text-neutral-800 font-sans antialiased">
        <AccessibilityProvider>
        <AnalyticsProvider>
        {/* Header Profissional Otimizado */}
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg"
                role="banner" 
                aria-label="Cabeçalho principal">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              {/* Logo e Nome - Centralizado e responsivo */}
              <Link href="/" className="flex items-center gap-4 group transition-all duration-200 hover:opacity-90 focus-ring rounded-xl" aria-label="Ir para página inicial">
                <div className="relative flex items-center justify-center">
                  <Image 
                    src="/vytalle-logo.svg" 
                    alt="Vytalle Estética & Viscosuplementação - Logo Oficial" 
                    width={64}
                    height={64}
                    className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-lg transition-all duration-200 group-hover:scale-105" 
                    priority
                  />
                  {/* Selo ANVISA */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[8px] sm:text-[10px] text-white font-bold">✓</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-vitale-primary leading-tight group-hover:text-vitale-secondary transition-colors">
                    Vytalle Estética
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium tracking-wide group-hover:text-vitale-primary transition-colors">
                    Produtos Premium Certificados
                  </p>
                </div>
              </Link>

              {/* Navegação Desktop */}
              <nav className="hidden lg:flex items-center gap-8" 
                   role="navigation" 
                   aria-label="Navegação principal">
                <div className="flex items-center gap-8">
                  <Link href="/" className="text-vitale-primary hover:text-vitale-secondary font-semibold transition-colors focus-ring px-3 py-2 rounded-lg">
                    Início
                  </Link>
                  <Link href="/products" className="text-vitale-primary hover:text-vitale-secondary font-semibold transition-colors focus-ring px-3 py-2 rounded-lg">
                    Catálogo
                  </Link>
                  <a 
                    href="https://wa.me/5521996192890?text=Olá! Gostaria de informações sobre os produtos da Vytalle."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg focus-ring"
                  >
                    WhatsApp
                  </a>
                </div>
              </nav>

              {/* Status e Indicadores Mobile */}
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                       aria-label="Status online"></div>
                  <span className="text-xs font-medium text-green-700">Online</span>
                </div>
                
                {/* Menu Mobile Button */}
                <button 
                  className="lg:hidden p-2 text-vitale-primary hover:text-vitale-secondary transition-colors focus-ring rounded-lg"
                  aria-label="Menu de navegação móvel"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Status Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" 
                       aria-label="Status online"></div>
                  <span className="text-sm font-medium text-green-700">Catálogo Online</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-vitale-primary">+2000 Profissionais</div>
                  <div className="text-xs text-neutral-600">Confiança Comprovada</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main role="main">
          {children}
        </main>

        {/* Footer Otimizado */}
        <footer className="w-full border-t border-neutral-200 bg-white/95 backdrop-blur-md mt-12"
                role="contentinfo">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Informações da Empresa */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <Image 
                    src="/vytalle-logo.svg" 
                    alt="Logo Vytalle Estética" 
                    width={64}
                    height={64}
                    className="h-16 w-16 drop-shadow-lg" 
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-xl font-bold text-vitale-primary">
                      Vytalle Estética
                    </span>
                    <span className="text-sm text-vitale-secondary font-medium">
                      Excelência em Produtos Médicos
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 text-neutral-700">
                  <p className="text-sm leading-relaxed max-w-md">
                    <strong className="text-vitale-primary">Distribuidora especializada</strong> em produtos médicos estéticos premium. 
                    Mais de 5 anos servindo profissionais da área da saúde com produtos certificados ANVISA.
                  </p>
                  
                  {/* Certificações */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ ANVISA Certificado
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ✓ LGPD Conforme
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      ✓ ISO 13485
                    </span>
                  </div>
                </div>
              </div>

              {/* Links Rápidos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-vitale-primary">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-vitale-primary transition-colors text-sm">
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-neutral-700 hover:text-vitale-primary transition-colors text-sm">
                      Catálogo Completo
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-neutral-700 hover:text-vitale-primary transition-colors text-sm">
                      Carrinho
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-vitale-primary">Contato</h3>
                <div className="space-y-3">
                  <div className="text-sm text-neutral-700">
                    <strong>WhatsApp:</strong>
                    <br />
                    <a 
                      href="https://wa.me/5521996192890" 
                      className="text-green-600 hover:text-green-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (21) 99619-2890
                    </a>
                  </div>
                  <div className="text-sm text-neutral-700">
                    <strong>Instagram:</strong>
                    <br />
                    <a 
                      href="https://www.instagram.com/vytalle.estetica/" 
                      className="text-purple-600 hover:text-purple-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @vytalle.estetica
                    </a>
                  </div>
                  <div className="text-sm text-neutral-700">
                    <strong>Atendimento:</strong>
                    <br />
                    Segunda a Sexta, 8h às 18h
                  </div>
                </div>
              </div>
            </div>

            {/* Linha de Separação */}
            <div className="border-t border-vitale-primary/20 mt-8 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-neutral-600 text-center sm:text-left">
                  © {new Date().getFullYear()} <strong className="text-vitale-primary">Vytalle Estética & Viscosuplementação</strong>. 
                  Todos os direitos reservados.
                </div>
                <div className="flex gap-4 text-sm">
                  <Link href="/privacidade" className="text-neutral-600 hover:text-vitale-primary transition-colors">
                    Política de Privacidade
                  </Link>
                  <Link href="/termos" className="text-neutral-600 hover:text-vitale-primary transition-colors">
                    Termos de Uso
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Componentes Flutuantes */}
        <CartSidebar />
        <Toaster />
        </AnalyticsProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}