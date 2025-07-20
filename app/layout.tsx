import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Vytalle Estética - Catálogo',
  description: 'Tratamentos estéticos e viscosuplementação',
  openGraph: {
    title: 'Vytalle Estética',
    description: 'Alta performance com Botox, Dysport, Xeomin e mais.',
    images: 'https://img.freepik.com/free-photo/estetica-og_23-2148479533.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-[#f8e6ff] via-[#f5f5f5] to-[#e6e6fa] text-foreground font-sans">
        <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-border shadow-sm">
          <div className="container mx-auto flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-3">
              <img src="/icons/icon-192.png" alt="Logo Vytalle" className="h-10 w-10 rounded-full shadow" />
              <span className="text-2xl font-bold tracking-tight text-primary">Vytalle Estética</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Catálogo & WhatsApp</span>
          </div>
        </header>
        <main className="container mx-auto max-w-4xl px-4 py-8 min-h-[70vh]">
          {children}
        </main>
        <footer className="w-full border-t border-border bg-white/80 backdrop-blur py-4 text-center text-sm text-muted-foreground font-medium">
          &copy; {new Date().getFullYear()} Vytalle Estética · Powered by <a href="https://rettecnologia.com.br" className="underline hover:text-primary transition">RET TECNOLOGIA</a>
        </footer>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
