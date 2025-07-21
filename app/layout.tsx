import './globals.css';

import type { Metadata } from 'next';
import Image from 'next/image';

import AnalyticsProvider from '@/components/AnalyticsProvider';
import CartSidebar from '@/components/CartSidebar';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Vytalle Estética - Catálogo Premium | Botox, Preenchimento, Bioestimuladores',
  description: 'Produtos médicos estéticos premium para profissionais: Botox, Dysport, Xeomin, ácido hialurônico, bioestimuladores. Entrega em todo Brasil, preços especiais para clínicas.',
  openGraph: {
    title: 'Vytalle Estética - Excelência em Estética',
    description: 'Alta performance com Botox, Dysport, Xeomin e tratamentos premium.',
    images: 'https://img.freepik.com/free-photo/estetica-og_23-2148479533.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-secondary/5 text-neutral-800 font-sans antialiased">
        <ErrorBoundary>
          <AnalyticsProvider>
        {/* Header Elegante e Responsivo */}
        <header className="sticky top-0 z-fixed w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-medical focus-ring"
                role="banner" 
                aria-label="Cabeçalho principal">
          <div className="container px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo e Nome - Mobile-First Design */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative group">
                  <Image 
                    src="/icons/icon-192.png" 
                    alt="Logo Vytalle Estética" 
                    width={48}
                    height={48}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shadow-md ring-2 ring-vitale-primary/20 transition-all duration-200 group-hover:ring-vitale-primary/40 group-hover:scale-105 interactive" 
                    priority
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-success-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs text-white font-bold" aria-hidden="true">✓</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-vitale-primary leading-tight">
                    Vytalle Estética
                  </h1>
                  <p className="text-xs text-neutral-500 font-medium tracking-wide hidden sm:block">
                    Excelência em Estética
                  </p>
                </div>
              </div>

              {/* Navegação Central - Desktop */}
              <nav className="hidden lg:flex items-center gap-8" 
                   role="navigation" 
                   aria-label="Navegação principal">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center group">
                    <span className="text-sm font-semibold text-vitale-primary group-hover:text-vitale-secondary transition-colors">
                      Catálogo Digital
                    </span>
                    <span className="text-xs text-neutral-500">Produtos Premium</span>
                  </div>
                  <div className="w-px h-8 bg-neutral-200"></div>
                  <div className="flex flex-col items-center group">
                    <span className="text-sm font-semibold text-vitale-primary group-hover:text-vitale-secondary transition-colors">
                      WhatsApp
                    </span>
                    <span className="text-xs text-neutral-500">Pedidos Online</span>
                  </div>
                </div>
              </nav>

              {/* Status e Indicadores - Responsive */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success-50 border border-success-200 rounded-full">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft" 
                       aria-label="Status online"></div>
                  <span className="text-xs font-medium text-success-700">Online</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-medium text-neutral-500">Catálogo</span>
                  <span className="text-xs text-vitale-primary font-semibold">Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="container max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 min-h-[75vh]"
              role="main">
          {children}
        </main>

        {/* Footer Moderno e Acessível */}
        <footer className="w-full border-t border-neutral-200 bg-white/95 backdrop-blur-md py-6 lg:py-8"
                role="contentinfo">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
              {/* Informações da Empresa */}
              <div className="flex items-center gap-3">
                <Image 
                  src="/icons/icon-192.png" 
                  alt="Logo Vytalle no rodapé" 
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg shadow-sm" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-vitale-primary">
                    Vytalle Estética
                  </span>
                  <span className="text-xs text-neutral-500">
                    &copy; {new Date().getFullYear()} Todos os direitos reservados
                  </span>
                </div>
              </div>

              {/* Links e Créditos */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
                <p className="text-neutral-600 text-center sm:text-left">
                  Desenvolvido por{' '}
                  <a 
                    href="mailto:contato.ferreirag@outlook.com" 
                    className="font-semibold text-vitale-primary hover:text-vitale-secondary transition-colors duration-200 underline decoration-vitale-primary/30 hover:decoration-vitale-secondary focus-ring-inset"
                    aria-label="Contato do desenvolvedor - Gabriel Ferreira"
                  >
                    Gabriel Ferreira
                  </a>
                </p>
                <div className="hidden sm:flex items-center gap-2 text-neutral-400">
                  <span aria-hidden="true">•</span>
                  <span>contato.ferreirag@outlook.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Componentes Flutuantes */}
        <CartSidebar />
        <WhatsAppButton />
        <Toaster />
          </AnalyticsProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
