'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Instagram,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
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
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
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
        <div className="hidden lg:flex items-center justify-between py-3 border-b border-neutral-200/80 bg-gradient-to-r from-vitale-neutral/30 via-white to-vitale-neutral/30">
          <div className="flex items-center gap-6 text-sm text-neutral-700">
            <a 
              href="https://wa.me/5521996192890" 
              className="flex items-center gap-2 hover:text-green-600 transition-all duration-200 hover:scale-105 focus-ring rounded-md px-2 py-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (21) 99619-2890"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">(21) 99619-2890</span>
            </a>
            <a 
              href="https://www.instagram.com/vytalle.estetica/" 
              className="flex items-center gap-2 hover:text-pink-600 transition-all duration-200 hover:scale-105 focus-ring rounded-md px-2 py-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @vytalle.estetica"
            >
              <Instagram className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">@vytalle.estetica</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-success-50 text-success-700 border-success-200 shadow-sm hover:shadow-md transition-shadow">
              ✓ ANVISA Certificado
            </Badge>
            <Badge variant="secondary" className="bg-info-50 text-info-700 border-info-200 shadow-sm hover:shadow-md transition-shadow">
              ✓ Entrega 24-48h
            </Badge>
          </div>
        </div>

        {/* Header principal */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group logo-container">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <Image
                src="/Vytalle_Logo_Gold.png"
                alt="Vytalle Estética & Viscosuplementação"
                width={48}
                height={48}
                className="h-auto w-auto max-h-12 max-w-12 object-contain transition-all duration-300 group-hover:scale-110 logo-image"
                priority
                style={{ 
                  objectPosition: 'center',
                  transform: 'rotate(0deg)' // Garantir que não está torta
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-vitale-primary leading-tight font-heading tracking-tight">
                Vytalle Estética
              </h1>
              <p className="text-xs text-vitale-secondary font-medium">
                & Viscosuplementação
              </p>
            </div>
          </Link>

          {/* Busca desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 group-focus-within:text-vitale-primary transition-colors" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas ou categorias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 bg-neutral-50 border-neutral-200 focus:border-vitale-primary focus:bg-white transition-all duration-200 rounded-lg shadow-sm focus:shadow-md text-neutral-800 placeholder:text-neutral-500"
                aria-label="Buscar produtos no catálogo"
              />
            </form>
          </div>

          {/* Navegação desktop */}
          <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Navegação principal">
            <Link 
              href="/" 
              className="text-sm font-semibold text-neutral-700 hover:text-vitale-primary transition-all duration-200 hover:scale-105 focus-ring rounded-md px-3 py-2 relative group"
            >
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vitale-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="text-sm font-semibold text-neutral-700 hover:text-vitale-primary transition-all duration-200 hover:scale-105 focus-ring rounded-md px-3 py-2 relative group"
            >
              Catálogo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vitale-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/cart" 
              className="relative text-sm font-semibold text-neutral-700 hover:text-vitale-primary transition-all duration-200 hover:scale-105 focus-ring rounded-md p-2 group"
              aria-label="Ir para o carrinho de compras"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
              {/* Badge de quantidade futura */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-vitale-accent text-white text-xs rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                0
              </span>
            </Link>
            <Button 
              asChild
              className="bg-gradient-to-r from-vitale-primary to-vitale-secondary hover:from-vitale-secondary hover:to-vitale-primary text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus-ring"
            >
              <a 
                href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatar via WhatsApp"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contato
              </a>
            </Button>
          </nav>

          {/* Menu mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <Link 
              href="/cart" 
              className="relative p-2 text-neutral-700 hover:text-vitale-primary transition-all duration-200 hover:scale-105 focus-ring rounded-md"
              aria-label="Ir para o carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-vitale-neutral/50 transition-all duration-200"
              aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMenuOpen}
            >
              <div className="relative">
                {isMenuOpen ? 
                  <X className="h-5 w-5 text-neutral-700" /> : 
                  <Menu className="h-5 w-5 text-neutral-700" />
                }
              </div>
            </Button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200/80 py-6 header-menu animate-slide-down bg-gradient-to-b from-white to-vitale-neutral/20">
            {/* Busca mobile */}
            <form onSubmit={handleSearch} className="relative mb-6 group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 group-focus-within:text-vitale-primary transition-colors" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 bg-neutral-50 border-neutral-200 focus:border-vitale-primary focus:bg-white transition-all duration-200 rounded-lg shadow-sm focus:shadow-md text-neutral-800 placeholder:text-neutral-500"
                aria-label="Buscar produtos no catálogo"
              />
            </form>

            {/* Navegação mobile */}
            <nav className="space-y-1 mb-6" role="navigation" aria-label="Navegação mobile">
              <Link 
                href="/" 
                className="flex items-center py-3 px-4 text-sm font-semibold text-neutral-700 hover:text-vitale-primary hover:bg-vitale-neutral/30 transition-all duration-200 rounded-lg focus-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-vitale-primary rounded-full mr-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Início
              </Link>
              <Link 
                href="/products" 
                className="flex items-center py-3 px-4 text-sm font-semibold text-neutral-700 hover:text-vitale-primary hover:bg-vitale-neutral/30 transition-all duration-200 rounded-lg focus-ring group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-vitale-primary rounded-full mr-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Catálogo Completo
              </Link>
              <Link 
                href="/cart" 
                className="flex items-center py-3 px-4 text-sm font-semibold text-neutral-700 hover:text-vitale-primary hover:bg-vitale-neutral/30 transition-all duration-200 rounded-lg focus-ring group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-vitale-primary rounded-full mr-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                Carrinho de Compras
              </Link>
            </nav>

            {/* Contatos mobile */}
            <div className="pt-4 border-t border-neutral-200/60 space-y-2">
              <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-3">Contatos</h3>
              <a 
                href="https://wa.me/5521996192890" 
                className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-neutral-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 rounded-lg focus-ring group"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>(21) 99619-2890</span>
              </a>
              <a 
                href="https://www.instagram.com/vytalle.estetica/" 
                className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-neutral-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 rounded-lg focus-ring group"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>@vytalle.estetica</span>
              </a>
            </div>

            {/* CTA Button mobile */}
            <div className="pt-4">
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-vitale-primary to-vitale-secondary hover:from-vitale-secondary hover:to-vitale-primary text-white shadow-md hover:shadow-lg transition-all duration-300 h-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <a 
                  href="https://wa.me/5521996192890?text=Olá! Gostaria de conhecer os produtos da Vytalle Estética."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contatar via WhatsApp"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contato Direto
                </a>
              </Button>
            </div>

            {/* Badges mobile */}
            <div className="pt-4 flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-success-50 text-success-700 border-success-200 text-xs shadow-sm">
                ✓ ANVISA Certificado
              </Badge>
              <Badge variant="secondary" className="bg-info-50 text-info-700 border-info-200 text-xs shadow-sm">
                ✓ Entrega 24-48h
              </Badge>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
