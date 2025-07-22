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

  // Skeleton loading component - Enhanced with better animation
  const LoadingSkeleton = () => (
    <div 
      className={`
        bg-gradient-to-r from-vitale-neutral/60 via-vitale-light to-vitale-neutral/60
        flex items-center justify-center
        ${borderRadius} ${className}
        relative overflow-hidden
        ${fill ? 'absolute inset-0' : ''}
      `}
      style={!fill ? { width, height } : undefined}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vitale-primary/15 to-transparent animate-shimmer" />
      
      {/* Pulsing icon */}
      <div className="bg-vitale-primary/10 p-2 sm:p-3 rounded-full animate-pulse-soft relative z-10">
        <Package className="w-4 h-4 sm:w-6 sm:h-6 text-vitale-primary/40 flex-shrink-0" />
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-1 right-1 flex space-x-1">
        <div className="w-1 h-1 bg-vitale-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1 h-1 bg-vitale-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1 h-1 bg-vitale-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  // Error state component - Enhanced for better visual appeal
  const ErrorState = () => (
    <div 
      className={`
        bg-gradient-to-br from-vitale-primary/10 via-vitale-neutral/80 to-vitale-secondary/10
        border-2 border-vitale-primary/30
        flex flex-col items-center justify-center p-2 sm:p-4
        ${borderRadius} ${className}
        ${fill ? 'absolute inset-0' : ''}
        relative overflow-hidden
      `}
      style={!fill ? { width, height } : undefined}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-vitale-primary/20 via-transparent to-vitale-secondary/20 transform rotate-45 scale-150" />
      </div>
      
      {/* Icon with enhanced styling */}
      <div className="bg-vitale-primary/15 p-2 sm:p-3 rounded-full mb-2 relative z-10">
        <Package className="w-4 h-4 sm:w-6 sm:h-6 text-vitale-primary/70 flex-shrink-0" />
      </div>
      
      {/* Product name with better typography */}
      <span className="text-xs sm:text-sm font-medium text-vitale-primary/80 text-center line-clamp-2 relative z-10 max-w-full">
        {productName || alt || 'Produto Vytalle'}
      </span>
      
      {/* Subtle badge */}
      <div className="absolute top-1 right-1 bg-vitale-primary/20 text-vitale-primary text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        IMG
      </div>
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