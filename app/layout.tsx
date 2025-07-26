import './globals.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AccessibilityProvider from '@/components/AccessibilityProvider';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import CartSidebar from '@/components/CartSidebar';
import CustomizationProvider from '@/components/CustomizationProvider';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vytalle-estetica.vercel.app'),
  title: 'Vytalle Estética & Viscosuplementação - Catálogo Premium',
  description:
    'Produtos médicos estéticos premium para profissionais: Toxinas botulínicas (Botox, Dysport, Xeomin), preenchedores de ácido hialurônico, bioestimuladores certificados ANVISA. Entrega expressa em todo Brasil.',
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
    'viscosuplementação',
  ].join(', '),
  authors: [{ name: 'Vytalle Estética & Viscosuplementação' }],
  openGraph: {
    title: 'Vytalle Estética & Viscosuplementação - Produtos Premium',
    description:
      'Toxinas botulínicas, preenchedores e bioestimuladores certificados ANVISA. Entrega expressa, suporte especializado.',
    images: [
      {
        url: '/Vytalle_Logo_Gold.png',
        width: 1200,
        height: 630,
        alt: 'Vytalle Estética & Viscosuplementação - Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Vytalle Estética & Viscosuplementação',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vytalle Estética & Viscosuplementação - Produtos Premium',
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
              sameAs: ['https://www.instagram.com/vytalle.estetica/'],
              areaServed: 'BR',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-secondary/5 font-sans text-neutral-800 antialiased">
        <CustomizationProvider>
          <AccessibilityProvider>
            <AnalyticsProvider>
              {/* Header Profissional Otimizado */}
              <Header />
              {/* Conteúdo Principal */}
              <main role="main">{children}</main>
              {/* Footer Otimizado */}
              <footer
                className="bg-white/95 mt-12 w-full border-t border-neutral-200 backdrop-blur-md"
                role="contentinfo"
              >
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Informações da Empresa */}
                    <div className="space-y-6 lg:col-span-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/Vytalle_Logo_Gold.png"
                          alt="Logo Vytalle Estética"
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain drop-shadow-lg"
                        />
                        <div className="flex flex-col justify-center">
                          <span className="text-xl font-bold text-vitale-primary">
                            Vytalle Estética & Viscosuplementação
                          </span>
                          <span className="text-sm font-medium text-vitale-secondary">
                            Excelência em Produtos Médicos
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 text-neutral-700">
                        <p className="max-w-md text-sm leading-relaxed">
                          <strong className="text-vitale-primary">
                            Distribuidora especializada
                          </strong>{' '}
                          em produtos médicos estéticos premium. Mais de 5 anos servindo
                          profissionais da área da saúde com produtos certificados ANVISA.
                        </p>

                        {/* Certificações */}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-green-100 text-green-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                            ✓ ANVISA Certificado
                          </span>
                          <span className="bg-blue-100 text-blue-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                            ✓ LGPD Conforme
                          </span>
                          <span className="bg-purple-100 text-purple-800 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
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
                          <Link
                            href="/"
                            className="text-sm text-neutral-700 transition-colors hover:text-vitale-primary"
                          >
                            Início
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products"
                            className="text-sm text-neutral-700 transition-colors hover:text-vitale-primary"
                          >
                            Catálogo Completo
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/cart"
                            className="text-sm text-neutral-700 transition-colors hover:text-vitale-primary"
                          >
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
                            className="text-pink-600 hover:text-pink-700 font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @vytalle.estetica
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé Inferior */}
                  <div className="mt-8 border-t border-neutral-200 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                      <div className="text-sm text-neutral-600">
                        © 2024 Vytalle Estética & Viscosuplementação. Todos os direitos reservados.
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <Link
                          href="/termos"
                          className="text-neutral-600 transition-colors hover:text-vitale-primary"
                        >
                          Termos de Uso
                        </Link>
                        <Link
                          href="/privacidade"
                          className="text-neutral-600 transition-colors hover:text-vitale-primary"
                        >
                          Política de Privacidade
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>

              {/* Carrinho Lateral */}
              <CartSidebar />

              {/* Toaster para notificações */}
              <Toaster />
            </AnalyticsProvider>
          </AccessibilityProvider>
        </CustomizationProvider>
      </body>
    </html>
  );
}
