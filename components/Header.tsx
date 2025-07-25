'use client';

import React, { useState } from 'react';

import { MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import * as Dialog from '@radix-ui/react-dialog';

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/products', label: 'Catálogo' },
  { href: '/cart', label: 'Carrinho' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="from-white shadow-2xl sticky top-0 z-50 w-full border-b border-vitale-primary/20 bg-gradient-to-r to-neutral-50/95 backdrop-blur-xl">
      <div className="container mx-auto flex min-h-[72px] items-center justify-between px-4 py-4 sm:px-6 md:min-h-[80px] md:py-5 lg:px-8">
        {/* Logo - Redesign com maior destaque */}
        <Link
          href="/"
          className="group flex items-center gap-4 rounded-xl p-2 transition-all duration-300 hover:bg-vitale-primary/5 focus:outline-none focus:ring-2 focus:ring-vitale-primary"
          aria-label="Ir para página inicial"
        >
          <div className="relative">
            <Image
              src="/Vytalle_Logo_Gold.webp"
              alt="Vytalle Estética & Viscosuplementação - Logo Oficial"
              width={60}
              height={60}
              className="logo-image h-12 w-12 object-contain transition-all duration-300 group-hover:rotate-1 group-hover:scale-110 sm:h-14 sm:w-14 md:h-16 md:w-16"
              priority
              sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
            />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-vitale-primary/20 to-vitale-secondary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="hidden sm:block">
            <span className="block font-heading text-xl font-bold tracking-wide text-vitale-primary transition-colors group-hover:text-vitale-secondary md:text-2xl md:tracking-wide lg:text-3xl lg:tracking-wide">
              Vytalle
            </span>
            <span className="block text-sm font-medium tracking-wide text-vitale-primary/80 transition-colors group-hover:text-vitale-secondary/80 md:text-base md:tracking-wide">
              Estética & Viscosuplementação
            </span>
          </div>
        </Link>

        {/* Navegação Desktop - Redesign mais elegante */}
        <nav
          className="hidden items-center gap-2 md:flex lg:gap-4"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white relative flex min-h-[48px] items-center rounded-2xl px-5 py-3 text-base font-semibold tracking-wide text-vitale-primary transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-vitale-primary hover:to-vitale-secondary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-vitale-primary focus:ring-offset-2 lg:px-6 lg:text-lg lg:tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5521996192890?text=Olá! Gostaria de informações sobre os produtos da Vytalle."
            target="_blank"
            rel="noopener noreferrer"
            className="from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-600 ml-4 flex min-h-[48px] items-center rounded-2xl bg-gradient-to-r px-6 py-3 text-base font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 lg:px-8 lg:text-lg lg:tracking-wide"
          >
            📱 WhatsApp
          </a>
        </nav>

        {/* Menu Mobile - Sempre visível no mobile */}
        <div className="flex items-center md:hidden">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Abrir menu de navegação"
                className="bg-white/80 hover:bg-white relative flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl p-3 text-vitale-primary shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-vitale-primary focus:ring-offset-2"
              >
                <MenuIcon className="h-7 w-7" aria-hidden="true" />
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-vitale-primary/10 to-vitale-secondary/10 opacity-0 transition-opacity duration-200 hover:opacity-100" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 fixed inset-0 z-50 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="bg-white shadow-2xl fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col p-6 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                <div className="mb-8 flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src="/Vytalle_Logo_Gold.webp"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="logo-image h-8 w-8 object-contain sm:h-10 sm:w-10"
                      sizes="(max-width: 640px) 32px, 40px"
                    />
                    <span className="font-heading text-xl font-bold tracking-wide text-vitale-primary">
                      Vytalle Estética & Viscosuplementação
                    </span>
                  </Link>
                  <button
                    aria-label="Fechar menu"
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl p-3 text-vitale-primary hover:bg-vitale-primary/10 focus:outline-none focus:ring-2 focus:ring-vitale-primary"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-4" aria-label="Menu mobile">
                  {NAV_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-white flex min-h-[56px] items-center rounded-xl px-4 py-4 text-xl font-bold tracking-wide text-vitale-primary transition-colors hover:bg-vitale-primary focus:outline-none focus:ring-2 focus:ring-vitale-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="https://wa.me/5521996192890?text=Olá! Gostaria de informações sobre os produtos da Vytalle."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 mt-4 flex min-h-[56px] items-center justify-center rounded-xl px-6 py-4 text-xl font-bold tracking-wide shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2"
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
