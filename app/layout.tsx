import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AnalyticsProvider from '@/components/AnalyticsProvider';
import CustomizationProvider from '@/components/CustomizationProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default:
      'Vytalle Estética & Viscosuplementação - Catálogo Premium de Produtos Médicos Estéticos',
    template: '%s | Vytalle Estética',
  },
  description:
    'Catálogo premium de produtos médicos estéticos certificados ANVISA: Toxinas botulínicas (Botox, Dysport, Xeomin), preenchedores de ácido hialurônico, bioestimuladores. Venda exclusiva para profissionais licenciados. Entrega expressa em todo Brasil.',
  keywords: [
    'toxina botulínica',
    'botox',
    'dysport',
    'xeomin',
    'preenchedores',
    'ácido hialurônico',
    'bioestimuladores',
    'vytalle',
    'estética profissional',
    'produtos médicos estéticos',
    'ANVISA',
    'clínica estética',
    'viscosuplementação',
    'produtos para médicos',
    'distribuidor estética',
    'toxina botulínica ANVISA',
    'botox certificado',
    'produtos estéticos profissionais',
  ],
  authors: [{ name: 'Vytalle Estética & Viscosuplementação' }],
  creator: 'Vytalle Estética & Viscosuplementação',
  publisher: 'Vytalle Estética & Viscosuplementação',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vytalle-estetica.vercel.app'),
  alternates: {
    canonical: '/',
  },
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
    google: 'google-site-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://vytalle-estetica.vercel.app',
    title: 'Vytalle Estética - Catálogo Premium de Produtos Médicos Estéticos',
    description:
      'Toxinas botulínicas, preenchedores e bioestimuladores certificados ANVISA. Venda exclusiva para profissionais licenciados. Entrega expressa, suporte especializado.',
    siteName: 'Vytalle Estética & Viscosuplementação',
    images: [
      {
        url: '/Vytalle_Logo_Gold.webp',
        width: 1200,
        height: 630,
        alt: 'Vytalle Estética & Viscosuplementação - Logo Oficial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vytalle Estética - Catálogo Premium de Produtos Médicos Estéticos',
    description: 'Produtos médicos estéticos certificados para profissionais licenciados',
    images: ['/Vytalle_Logo_Gold.png'],
  },
  category: 'medical',
  classification: 'medical supplies',
  other: {
    'medical-specialty': 'Estética Médica',
    'target-audience': 'Profissionais de Saúde',
    compliance: 'ANVISA, ISO 13485, LGPD',
    delivery: '24-48h',
    support: 'WhatsApp 24/7',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-BR' className='scroll-smooth'>
      <head>
        {/* Schema.org Medical Business Markup */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Vytalle Estética & Viscosuplementação',
              description:
                'Distribuidora especializada em produtos médicos estéticos premium para profissionais licenciados',
              url: 'https://vytalle-estetica.vercel.app',
              logo: 'https://vytalle-estetica.vercel.app/Vytalle_Logo_Gold.png',
              image: 'https://vytalle-estetica.vercel.app/Vytalle_Logo_Gold.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+55-21-99619-2890',
                contactType: 'Atendimento ao Cliente',
                availableLanguage: 'Portuguese',
                areaServed: 'BR',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Brasil',
              },
              serviceType: 'Distribuição de Produtos Médicos Estéticos',
              medicalSpecialty: 'Estética Médica',
              availableService: {
                '@type': 'MedicalService',
                name: 'Distribuição de Toxinas Botulínicas',
                description: 'Produtos certificados ANVISA para profissionais licenciados',
              },
              sameAs: ['https://www.instagram.com/vytalle.estetica/'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Catálogo de Produtos Médicos Estéticos',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Product',
                      name: 'Toxina Botulínica',
                      description: 'Produtos certificados ANVISA',
                    },
                  },
                ],
              },
              priceRange: 'R$ 199 - R$ 2.349',
              paymentAccepted: 'PIX, Cartão de Crédito',
            }),
          }}
        />

        {/* Product List Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Catálogo de Produtos Médicos Estéticos Vytalle',
              description: 'Produtos premium para profissionais de estética',
              url: 'https://vytalle-estetica.vercel.app/products',
              numberOfItems: 93,
              itemListElement: [
                {
                  '@type': 'Product',
                  position: 1,
                  name: 'DL BOTOX 100UI',
                  description: 'Toxina botulínica tipo A para tratamentos estéticos',
                  brand: {
                    '@type': 'Brand',
                    name: 'Allergan',
                  },
                  category: 'Toxina Botulínica',
                  offers: {
                    '@type': 'Offer',
                    price: '745.00',
                    priceCurrency: 'BRL',
                    availability: 'https://schema.org/InStock',
                    seller: {
                      '@type': 'Organization',
                      name: 'Vytalle Estética & Viscosuplementação',
                    },
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-secondary/5 font-sans text-neutral-800 antialiased`}
      >
        <GlobalErrorHandler>
          <ErrorBoundary>
            <CustomizationProvider>
              <AnalyticsProvider>
                <main role='main'>{children}</main>
                <Toaster />
              </AnalyticsProvider>
            </CustomizationProvider>
          </ErrorBoundary>
        </GlobalErrorHandler>
      </body>
    </html>
  );
}
