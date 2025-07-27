'use client';

import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';

interface CatalogButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export default function CatalogButton({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  href = '/products',
}: CatalogButtonProps) {
  const { navigate, prefetch, isNavigating } = useNavigation({
    fallbackUrl: '/',
    onError: error => {
      console.error('Erro na navegação do catálogo:', error);
    },
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(href);
    },
    [navigate, href]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(href);
      }
    },
    [navigate, href]
  );

  // Fazer prefetch quando componente monta
  useCallback(() => {
    prefetch(href);
  }, [prefetch, href]);

  const buttonClasses = {
    primary:
      size === 'large'
        ? 'group w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl lg:text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-vitale-primary text-white hover:bg-vitale-secondary rounded-xl md:rounded-2xl transform hover:scale-105 min-h-[56px] md:min-h-[64px]'
        : 'px-12 py-6 text-xl font-bold bg-gradient-to-r from-vitale-primary to-vitale-secondary text-white hover:from-vitale-secondary hover:to-vitale-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105',
    secondary:
      'px-12 py-6 text-xl font-bold shadow-2xl bg-vitale-primary text-white hover:bg-vitale-secondary rounded-2xl transition-all duration-300 transform hover:scale-105 group',
  };

  const content = children || (
    <span className='flex items-center justify-center gap-3 md:gap-4'>
      <Package className='h-6 w-6 md:h-7 md:w-7' />
      <span className='font-extrabold'>Explorar Catálogo Completo</span>
      <ArrowRight className='h-6 w-6 transition-transform group-hover:translate-x-2 md:h-7 md:w-7' />
    </span>
  );

  return (
    <Link href={href} className={`${size === 'large' ? 'w-full sm:w-auto' : ''}`} prefetch={true}>
      <Button
        className={`${buttonClasses[variant]} ${className} ${isNavigating ? 'cursor-wait opacity-75' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={isNavigating}
        data-testid='catalog-button'
        aria-label='Navegar para página de produtos'
        role='link'
        tabIndex={0}
      >
        {isNavigating ? (
          <span className='flex items-center justify-center gap-3'>
            <div className='border-white border-t-transparent h-5 w-5 animate-spin rounded-full border-2' />
            <span>Carregando...</span>
          </span>
        ) : (
          content
        )}
      </Button>
    </Link>
  );
}
