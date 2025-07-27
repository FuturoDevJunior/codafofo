'use client';

import { useEffect, useState } from 'react';

import { Instagram, Menu, Phone, Search, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.header-menu')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Busca integrada
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 border-b border-neutral-200 shadow-lg backdrop-blur-md'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      role="banner"
    >
      {/* Skip link para acessibilidade */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <div className="container mx-auto px-4">
        {/* Header superior - Contatos */}
        <div className="via-white hidden items-center justify-between border-b border-neutral-200/80 bg-gradient-to-r from-vitale-neutral/30 to-vitale-neutral/30 py-3 lg:flex">
          <div className="flex items-center gap-6 text-sm text-neutral-700">
            <a
              href="https://wa.me/5521996192890"
              className="hover:text-green-600 flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-200 focus-ring hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (21) 99619-2890"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">(21) 99619-2890</span>
            </a>
            <a
              href="https://www.instagram.com/vytalle.estetica/"
              className="hover:text-pink-600 flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-200 focus-ring hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @vytalle.estetica"
            >
              <Instagram className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">@vytalle.estetica</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="border-success-200 bg-success-50 text-success-700 shadow-sm transition-shadow hover:shadow-md"
            >
              ✓ ANVISA Certificado
            </Badge>
            <Badge
              variant="secondary"
              className="border-info-200 bg-info-50 text-info-700 shadow-sm transition-shadow hover:shadow-md"
            >
              ✓ Entrega 24-48h
            </Badge>
          </div>
        </div>

        {/* Header principal */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="logo-container group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <Image
                src="/Vytalle_Logo_Gold.png"
                alt="Vytalle Estética & Viscosuplementação"
                width={48}
                height={48}
                className="logo-image h-auto max-h-12 w-auto max-w-12 object-contain transition-all duration-300 group-hover:scale-110"
                priority
                style={{
                  objectPosition: 'center',
                  transform: 'rotate(0deg)', // Garantir que não está torta
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg font-bold leading-tight tracking-tight text-vitale-primary">
                Vytalle Estética
              </h1>
              <p className="text-xs font-medium text-vitale-secondary">& Viscosuplementação</p>
            </div>
          </Link>

          {/* Busca desktop */}
          <div className="mx-8 hidden max-w-lg flex-1 md:flex">
            <form onSubmit={handleSearch} className="group relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-vitale-primary" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas ou categorias..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="focus:bg-white h-11 rounded-lg border-neutral-200 bg-neutral-50 pl-10 pr-4 text-neutral-800 shadow-sm transition-all duration-200 placeholder:text-neutral-500 focus:border-vitale-primary focus:shadow-md"
                aria-label="Buscar produtos no catálogo"
              />
            </form>
          </div>

          {/* Navegação desktop */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            role="navigation"
            aria-label="Navegação principal"
          >
            <Link
              href="/"
              className="group relative rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:scale-105 hover:text-vitale-primary"
            >
              Início
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-vitale-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products"
              className="group relative rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:scale-105 hover:text-vitale-primary"
            >
              Catálogo
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-vitale-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/cart"
              className="group relative rounded-md p-2 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:scale-105 hover:text-vitale-primary"
              aria-label="Ir para o carrinho de compras"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
              {/* Badge de quantidade futura */}
              <span className="text-white absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-vitale-accent text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100">
                0
              </span>
            </Link>
            <Button
              asChild
              className="text-white bg-gradient-to-r from-vitale-primary to-vitale-secondary shadow-md transition-all duration-300 focus-ring hover:scale-105 hover:from-vitale-secondary hover:to-vitale-primary hover:shadow-lg"
            >
              <a
                href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatar via WhatsApp"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contato
              </a>
            </Button>
          </nav>

          {/* Menu mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              className="relative rounded-md p-2 text-neutral-700 transition-all duration-200 focus-ring hover:scale-105 hover:text-vitale-primary"
              aria-label="Ir para o carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-all duration-200 hover:bg-vitale-neutral/50"
              aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMenuOpen}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-neutral-700" />
                ) : (
                  <Menu className="h-5 w-5 text-neutral-700" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        {isMenuOpen && (
          <div className="header-menu from-white animate-slide-down border-t border-neutral-200/80 bg-gradient-to-b to-vitale-neutral/20 py-6 lg:hidden">
            {/* Busca mobile */}
            <form onSubmit={handleSearch} className="group relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-vitale-primary" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="focus:bg-white h-11 rounded-lg border-neutral-200 bg-neutral-50 pl-10 pr-4 text-neutral-800 shadow-sm transition-all duration-200 placeholder:text-neutral-500 focus:border-vitale-primary focus:shadow-md"
                aria-label="Buscar produtos no catálogo"
              />
            </form>

            {/* Navegação mobile */}
            <nav className="mb-6 space-y-1" role="navigation" aria-label="Navegação mobile">
              <Link
                href="/"
                className="flex items-center rounded-lg px-4 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:bg-vitale-neutral/30 hover:text-vitale-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-vitale-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Início
              </Link>
              <Link
                href="/products"
                className="group flex items-center rounded-lg px-4 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:bg-vitale-neutral/30 hover:text-vitale-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-vitale-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Catálogo Completo
              </Link>
              <Link
                href="/cart"
                className="group flex items-center rounded-lg px-4 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 focus-ring hover:bg-vitale-neutral/30 hover:text-vitale-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-vitale-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Carrinho de Compras
              </Link>
            </nav>

            {/* Contatos mobile */}
            <div className="space-y-2 border-t border-neutral-200/60 pt-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Contatos
              </h3>
              <a
                href="https://wa.me/5521996192890"
                className="hover:text-green-600 hover:bg-green-50 group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-all duration-200 focus-ring"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span>(21) 99619-2890</span>
              </a>
              <a
                href="https://www.instagram.com/vytalle.estetica/"
                className="hover:text-pink-600 hover:bg-pink-50 group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-all duration-200 focus-ring"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span>@vytalle.estetica</span>
              </a>
            </div>

            {/* CTA Button mobile */}
            <div className="pt-4">
              <Button
                asChild
                className="text-white h-12 w-full bg-gradient-to-r from-vitale-primary to-vitale-secondary shadow-md transition-all duration-300 hover:from-vitale-secondary hover:to-vitale-primary hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <a
                  href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contatar via WhatsApp"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contato Direto
                </a>
              </Button>
            </div>

            {/* Badges mobile */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge
                variant="secondary"
                className="border-success-200 bg-success-50 text-xs text-success-700 shadow-sm"
              >
                ✓ ANVISA Certificado
              </Badge>
              <Badge
                variant="secondary"
                className="border-info-200 bg-info-50 text-xs text-info-700 shadow-sm"
              >
                ✓ Entrega 24-48h
              </Badge>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
