"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';

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
  sizes
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
  }, [src]);

  const handleError = () => {
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
    setIsLoading(false);
    setHasError(false);
  };

  // Skeleton loading component
  const LoadingSkeleton = () => (
    <div 
      className={`
        animate-pulse bg-gradient-to-r from-vitale-neutral via-vitale-light to-vitale-neutral
        flex items-center justify-center
        ${className}
      `}
      style={!fill ? { width, height } : undefined}
    >
      <Package className="w-8 h-8 text-vitale-primary/30" />
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div 
      className={`
        bg-gradient-to-br from-vitale-neutral to-vitale-light
        border-2 border-dashed border-vitale-primary/20
        flex flex-col items-center justify-center p-4
        ${className}
      `}
      style={!fill ? { width, height } : undefined}
    >
      <Package className="w-6 h-6 text-vitale-primary/40 mb-1" />
      <span className="text-xs text-vitale-dark/60 text-center">
        Produto
      </span>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (hasError && currentSrc === fallback) {
    return <ErrorState />;
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={`transition-opacity duration-300 ${className}`}
      onError={handleError}
      onLoad={handleLoad}
      priority={priority}
      loading={loading}
      sizes={sizes}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEnyLWT83GzN2zPZ7N2bsaTKKJWjkjkhj0eK9p9n9g8lMqeegJ1lYjA6T6F6aJaRfzV/rh7/q3KVnIyZGiJKXoNK6nQb9uXAUmhqJxKHRwP/Z"
    />
  );
}