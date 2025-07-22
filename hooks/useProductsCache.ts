"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/mockData';
import { Product } from '@/types/product';
import { smartCache } from '@/lib/smartCache';

/**
 * HOOK DE PRODUTOS COM CACHE INTELIGENTE
 * ====================================
 * 
 * Hook que combina o melhor dos dois mundos:
 * - Carregamento imediato com dados síncronos
 * - Performance otimizada com cache inteligente
 */
export function useProductsCache() {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [isLoading, setIsLoading] = useState(false);
  const [cacheMetrics, setCacheMetrics] = useState(() => smartCache.getMetrics());

  useEffect(() => {
    const loadCachedProducts = async () => {
      setIsLoading(true);
      try {
        const cachedProducts = await getProducts();
        setProducts(cachedProducts);
        setCacheMetrics(smartCache.getMetrics());
      } catch (error) {
        console.warn('Cache fallback:', error);
        // Fallback para dados síncronos em caso de erro
        setProducts(getProducts());
      } finally {
        setIsLoading(false);
      }
    };

    loadCachedProducts();
  }, []);

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      // Limpar cache e recarregar
      smartCache.delete('products:all:active');
      const freshProducts = await getProducts();
      setProducts(freshProducts);
      setCacheMetrics(smartCache.getMetrics());
    } catch (error) {
      console.warn('Refresh error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    cacheMetrics,
    refreshProducts,
    // Estatísticas úteis
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
  };
}

/**
 * HOOK DE PRODUTO INDIVIDUAL COM CACHE
 * ===================================
 */
export function useProductCache(slug: string) {
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const cachedProduct = await smartCache.getOrSet(
          `product:slug:${slug}`,
          async () => {
            const mockProducts = getProducts();
            return mockProducts.find(p => p.slug === slug && p.active);
          },
          15 * 60 * 1000 // 15 minutos
        );
        setProduct(cachedProduct);
      } catch (error) {
        console.warn('Product cache error:', error);
        // Fallback síncrono
        const mockProducts = getProducts();
        setProduct(mockProducts.find(p => p.slug === slug && p.active));
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  return { product, isLoading };
}