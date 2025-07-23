import './globals.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AccessibilityProvider from '@/components/AccessibilityProvider';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
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
        url: '/Vytalle_Logo_Gold.png',
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
    images: ['/Vytalle_Logo_Gold.png'],
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
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vytalle-estetica.vercel.app'}/Vytalle_Logo_Gold.png`,
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
        <Header />
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
                    src="/Vytalle_Logo_Gold.png" 
                    alt="Logo Vytalle Estética" 
                    width={64}
                    height={64}
                    className="h-16 w-16 drop-shadow-lg object-contain" 
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