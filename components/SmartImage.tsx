'use client';

import { useEffect, useState } from 'react';

import { Package } from 'lucide-react';
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  borderRadius?: string; // Novo: customização de borda
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; // Novo: customização de object-fit
  productName?: string; // Novo: para fallback
}

/**
 * COMPONENTE DE IMAGEM INTELIGENTE
 * ===============================
 *
 * Supera expectativas com:
 * - Fallback automático
 * - Loading graceful
 * - Retry inteligente
 * - Performance otimizada
 */
export default function SmartImage({
  src,
  alt,
  fallback = '/icons/icon-192.png',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  loading = 'lazy',
  sizes,
  borderRadius = 'rounded-xl',
  objectFit = 'cover',
  productName,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setRetryCount(0);
    setIsLoading(true); // Mostrar skeleton até carregar
  }, [src]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Log apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('SmartImage error loading:', src, 'retryCount:', retryCount);
      }
      setRetryCount(prev => prev + 1);
      setCurrentSrc(`${src}?retry=${retryCount + 1}`);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    // Log apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('SmartImage loaded successfully:', currentSrc);
    }
    setIsLoading(false);
    setHasError(false);
  };

  // Skeleton loading component - Enhanced with better animation
  const LoadingSkeleton = () => (
    <div
      className={`flex items-center justify-center bg-gradient-to-r from-vitale-neutral/60 via-vitale-light to-vitale-neutral/60 ${borderRadius} ${className} relative overflow-hidden ${fill ? 'absolute inset-0' : ''} `}
      style={!fill ? { width, height } : undefined}
    >
      {/* Shimmer effect */}
      <div className="from-transparent to-transparent absolute inset-0 animate-shimmer bg-gradient-to-r via-vitale-primary/15" />

      {/* Pulsing icon */}
      <div className="relative z-10 animate-pulse-soft rounded-full bg-vitale-primary/10 p-2 sm:p-3">
        <Package className="h-4 w-4 flex-shrink-0 text-vitale-primary/40 sm:h-6 sm:w-6" />
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-1 right-1 flex space-x-1">
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-vitale-primary/40"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-vitale-primary/40"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-vitale-primary/40"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );

  // Error state component - Enhanced for better visual appeal
  const ErrorState = () => (
    <div
      className={`flex flex-col items-center justify-center border-2 border-vitale-primary/30 bg-gradient-to-br from-vitale-primary/10 via-vitale-neutral/80 to-vitale-secondary/10 p-2 sm:p-4 ${borderRadius} ${className} ${fill ? 'absolute inset-0' : ''} relative overflow-hidden`}
      style={!fill ? { width, height } : undefined}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="via-transparent absolute inset-0 rotate-45 scale-150 transform bg-gradient-to-r from-vitale-primary/20 to-vitale-secondary/20" />
      </div>

      {/* Icon with enhanced styling */}
      <div className="relative z-10 mb-2 rounded-full bg-vitale-primary/15 p-2 sm:p-3">
        <Package className="h-4 w-4 flex-shrink-0 text-vitale-primary/70 sm:h-6 sm:w-6" />
      </div>

      {/* Product name with better typography */}
      <span className="relative z-10 line-clamp-2 max-w-full text-center text-xs font-medium text-vitale-primary/80 sm:text-sm">
        {productName || alt || 'Produto Vytalle'}
      </span>

      {/* Subtle badge */}
      <div className="absolute right-1 top-1 rounded-full bg-vitale-primary/20 px-1.5 py-0.5 text-[8px] font-bold text-vitale-primary sm:text-[10px]">
        IMG
      </div>
    </div>
  );

  // Renderização condicional mais robusta
  if (hasError && currentSrc === fallback) {
    return <ErrorState />;
  }

  return (
    <div
      className={fill ? 'relative h-full w-full' : 'relative'}
      style={!fill ? { width, height } : undefined}
    >
      {isLoading && <LoadingSkeleton />}
      <Image
        src={currentSrc || fallback}
        alt={alt || productName || 'Imagem do produto'}
        fill={fill || undefined} // ✅ CORRIGIDO: Evita warning de prop booleana
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`transition-all duration-300 ${borderRadius} object-${objectFit} ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority || undefined} // ✅ CORRIGIDO: Evita warning de prop booleana
        loading={priority ? undefined : loading} // ✅ CORRIGIDO: Não usar loading quando priority=true
        sizes={sizes}
        quality={85}
        unoptimized={currentSrc?.includes('.svg') || undefined} // ✅ CORRIGIDO: Evita warning de prop booleana
      />
    </div>
  );
}
