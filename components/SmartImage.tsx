"use client";

import {
  useEffect,
  useState,
} from 'react';

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
  productName
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
    if (process.env.NODE_ENV === 'development') {
      console.log('SmartImage error loading:', src, 'retryCount:', retryCount);
    }
    if (retryCount < maxRetries && currentSrc !== fallback) {
      // Retry com delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setCurrentSrc(src); // Retry original src
      }, 1000 * (retryCount + 1));
    } else {
      // Use fallback
      setCurrentSrc(fallback);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SmartImage loaded successfully:', currentSrc);
    }
    setIsLoading(false);
    setHasError(false);
  };

  // Skeleton loading component
  const LoadingSkeleton = () => (
    <div 
      className={`
        animate-pulse bg-gradient-to-r from-vitale-neutral via-vitale-light to-vitale-neutral
        flex items-center justify-center
        ${borderRadius} ${className}
        relative overflow-hidden
        ${fill ? 'absolute inset-0' : ''}
      `}
      style={!fill ? { width, height } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vitale-primary/10 to-transparent animate-shimmer" />
      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-vitale-primary/30 z-10 flex-shrink-0" />
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div 
      className={`
        bg-gradient-to-br from-vitale-neutral to-vitale-light
        border-2 border-dashed border-vitale-primary/20
        flex flex-col items-center justify-center p-2 sm:p-4
        ${borderRadius} ${className}
        ${fill ? 'absolute inset-0' : ''}
      `}
      style={!fill ? { width, height } : undefined}
    >
      <Package className="w-4 h-4 sm:w-6 sm:h-6 text-vitale-primary/40 mb-1 flex-shrink-0" />
      <span className="text-xs text-vitale-dark/60 text-center line-clamp-2">
        {productName || alt || 'Produto'}
      </span>
    </div>
  );

  // Renderização condicional mais robusta
  if (hasError && currentSrc === fallback) {
    return <ErrorState />;
  }

  return (
    <div className={fill ? 'relative w-full h-full' : 'relative'} style={!fill ? { width, height } : undefined}>
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