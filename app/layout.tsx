import './globals.css';

import { Instagram } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AnalyticsProvider from '@/components/AnalyticsProvider';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from '@/components/ui/toaster';

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
        <AnalyticsProvider>
        {/* Header Elegante e Responsivo */}
        <header className="sticky top-0 z-fixed w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-medical focus-ring"
                role="banner" 
                aria-label="Cabeçalho principal">
          <div className="container px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo e Nome - Mobile-First Design - CLICÁVEL */}
              <Link href="/" className="flex items-center gap-3 sm:gap-4 group transition-all duration-200 hover:opacity-90 focus-ring rounded-xl">
                <div className="relative">
                  <Image 
                    src="/Vytalle_Logo_Gold.webp" 
                    alt="Logo Vytalle Estética - Voltar ao início" 
                    width={48}
                    height={48}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shadow-md ring-2 ring-vitale-primary/20 transition-all duration-200 group-hover:ring-vitale-primary/40 group-hover:scale-105 interactive cursor-pointer" 
                    priority
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-success-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs text-white font-bold" aria-hidden="true">✓</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-vitale-primary leading-tight group-hover:text-vitale-secondary transition-colors">
                    Vytalle Estética & Viscosuplementação
                  </h1>
                  <p className="text-xs text-neutral-500 font-medium tracking-wide hidden sm:block group-hover:text-vitale-primary transition-colors">
                    Excelência em Estética & Tratamentos
                  </p>
                </div>
              </Link>

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
        <footer className="w-full border-t border-vitale-primary/20 bg-gradient-to-br from-white to-vitale-primary/5 py-8 lg:py-12"
                role="contentinfo">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Informações da Empresa */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/Vytalle_Logo_Gold.webp" 
                    alt="Logo Vytalle Estética & Viscosuplementação" 
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl shadow-lg" 
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-vitale-primary">
                      Vytalle Estética & Viscosuplementação
                    </span>
                    <span className="text-sm text-vitale-secondary font-medium">
                      Excelência em Tratamentos Estéticos
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="leading-relaxed">
                    Distribuidor especializado em produtos estéticos e viscosuplementação. 
                    Produtos originais certificados, atendimento personalizado e entrega segura.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                      <span className="text-xs font-medium">Produtos Originais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-vitale-primary rounded-full"></div>
                      <span className="text-xs font-medium">Vendas B2B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-info-500 rounded-full"></div>
                      <span className="text-xs font-medium">Entrega em Todo Brasil</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-vitale-primary">Contato</h3>
                <div className="space-y-3 text-sm">
                  <a 
                    href="https://wa.me/5521996192890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-vitale-primary transition-colors focus-ring rounded-lg p-2 -m-2"
                  >
                    <div className="bg-green-600 p-1.5 rounded-lg">
                      <span className="text-white text-xs">💬</span>
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-xs">(21) 99619-2890</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+5521996192890"
                    className="flex items-center gap-3 text-muted-foreground hover:text-vitale-primary transition-colors focus-ring rounded-lg p-2 -m-2"
                  >
                    <div className="bg-vitale-primary p-1.5 rounded-lg">
                      <span className="text-white text-xs">📞</span>
                    </div>
                    <div>
                      <div className="font-medium">Telefone</div>
                      <div className="text-xs">(21) 99619-2890</div>
                    </div>
                  </a>

                  <a 
                    href="https://www.instagram.com/vytalle.estetica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-vitale-primary transition-colors focus-ring rounded-lg p-2 -m-2"
                  >
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-lg">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Instagram</div>
                      <div className="text-xs">@vytalle.estetica</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Horário e Localização */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-vitale-primary">Atendimento</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">Horários</div>
                    <div className="text-xs space-y-1">
                      <div>Segunda a Sexta: 9h às 18h</div>
                      <div>Sábado: 9h às 14h</div>
                      <div className="text-warning-600">Domingo: Fechado</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">Localização</div>
                    <div className="text-xs">
                      Rio de Janeiro, RJ<br/>
                      Atendimento em toda região
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright e Créditos */}
            <div className="mt-8 pt-6 border-t border-vitale-primary/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                <div className="text-muted-foreground text-center sm:text-left">
                  &copy; {new Date().getFullYear()} Vytalle Estética & Viscosuplementação. Todos os direitos reservados.
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Desenvolvido por</span>
                  <a 
                    href="mailto:contato.ferreirag@outlook.com" 
                    className="font-semibold text-vitale-primary hover:text-vitale-secondary transition-colors duration-200 underline decoration-vitale-primary/30 hover:decoration-vitale-secondary focus-ring-inset"
                    aria-label="Contato da empresa desenvolvedora"
                  >
                    RET TECNOLOGIA LTDA
                  </a>
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
      </body>
    </html>
  );
}
