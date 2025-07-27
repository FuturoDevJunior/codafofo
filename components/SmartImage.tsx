'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  productName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  productName,
  onLoad,
  onError,
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    // Em ambiente de teste, renderizar imediatamente
    if (process.env.NODE_ENV === 'test') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fallback para imagem com erro
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Sucesso no carregamento
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  // Gerar alt text descritivo se não fornecido
  const generateAltText = () => {
    if (alt) return alt;
    if (productName) return `${productName} - Produto médico estético`;
    return 'Imagem do produto';
  };

  // Fallback image para produtos médicos
  const _fallbackSrc = '/images/products/product-placeholder.jpg';

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={generateAltText()}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-100 to-neutral-200">
          <div className="absolute inset-0 animate-pulse-soft bg-neutral-300" />
        </div>
      )}

      {/* Imagem principal */}
      {isInView && !hasError && (
        <div>
          <Image
            src={src}
            alt={generateAltText()}
            {...(fill && { fill: true })}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } ${className}`}
            priority={priority}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            data-testid="next-image"
          />
        </div>
      )}

      {/* Fallback image */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-200">
              <svg
                className="h-8 w-8 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="sr-only text-sm text-neutral-500">Imagem não disponível</p>
          </div>
        </div>
      )}

      {/* Overlay de loading */}
      {isLoading && (
        <div className="bg-white/50 absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-vitale-primary" />
        </div>
      )}

      {/* Indicador de produto médico */}
      {productName && (
        <div className="text-white absolute right-2 top-2 rounded-full bg-vitale-primary/90 px-2 py-1 text-xs font-medium">
          Médico
        </div>
      )}
    </div>
  );
}
