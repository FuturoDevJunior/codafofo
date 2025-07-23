import React, { useState } from 'react';

import {
  MenuIcon,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import * as Dialog from '@radix-ui/react-dialog';

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/products', label: 'Catálogo' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-vitale-primary rounded-xl" aria-label="Ir para página inicial">
          <Image 
            src="/Vytalle_Logo_Gold.png" 
            alt="Vytalle Estética & Viscosuplementação - Logo Oficial" 
            width={48}
            height={48}
            className="h-12 w-12 md:h-14 md:w-14 object-contain transition-all duration-200 group-hover:scale-105" 
            priority
          />
          <span className="hidden sm:block text-lg md:text-xl lg:text-2xl font-bold text-vitale-primary group-hover:text-vitale-secondary transition-colors">Vytalle Estética</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Navegação principal">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base lg:text-lg font-bold px-4 py-3 rounded-xl transition-colors text-vitale-primary hover:text-white hover:bg-vitale-primary focus:outline-none focus:ring-2 focus:ring-vitale-primary min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5521996192890?text=Olá! Gostaria de informações sobre os produtos da Vytalle."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-green-600 text-white px-4 lg:px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-base lg:text-lg min-h-[44px] flex items-center"
          >
            WhatsApp
          </a>
        </nav>

        {/* Menu Mobile - Sempre visível no mobile */}
        <div className="md:hidden flex items-center">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Abrir menu de navegação"
                className="p-3 rounded-xl text-vitale-primary hover:bg-vitale-primary/10 focus:outline-none focus:ring-2 focus:ring-vitale-primary min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <MenuIcon className="w-7 h-7" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                    <Image src="/Vytalle_Logo_Gold.png" alt="Logo" width={40} height={40} className="h-10 w-10 object-contain" />
                    <span className="text-xl font-bold text-vitale-primary">Vytalle</span>
                  </Link>
                  <button
                    aria-label="Fechar menu"
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-xl text-vitale-primary hover:bg-vitale-primary/10 focus:outline-none focus:ring-2 focus:ring-vitale-primary min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-4" aria-label="Menu mobile">
                  {NAV_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-xl font-bold px-4 py-4 rounded-xl transition-colors text-vitale-primary hover:text-white hover:bg-vitale-primary focus:outline-none focus:ring-2 focus:ring-vitale-primary min-h-[56px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="https://wa.me/5521996192890?text=Olá! Gostaria de informações sobre os produtos da Vytalle."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-xl min-h-[56px] flex items-center justify-center mt-4"
                    onClick={() => setMobileOpen(false)}
                  >
                    WhatsApp
                  </a>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
} 