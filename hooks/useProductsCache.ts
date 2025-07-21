"use client";

import { useEffect, useState } from 'react';
import { getMockProducts, getMockProductsCached, type MockProduct } from '@/lib/mockData';
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
  const [products, setProducts] = useState<MockProduct[]>(() => getMockProducts());
  const [isLoading, setIsLoading] = useState(false);
  const [cacheMetrics, setCacheMetrics] = useState(() => smartCache.getMetrics());

  useEffect(() => {
    const loadCachedProducts = async () => {
      setIsLoading(true);
      try {
        const cachedProducts = await getMockProductsCached();
        setProducts(cachedProducts);
        setCacheMetrics(smartCache.getMetrics());
      } catch (error) {
        console.warn('Cache fallback:', error);
        // Fallback para dados síncronos em caso de erro
        setProducts(getMockProducts());
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
      const freshProducts = await getMockProductsCached();
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
  const [product, setProduct] = useState<MockProduct | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const cachedProduct = await smartCache.getOrSet(
          `product:slug:${slug}`,
          async () => {
            const mockProducts = getMockProducts();
            return mockProducts.find(p => p.slug === slug && p.active);
          },
          15 * 60 * 1000 // 15 minutos
        );
        setProduct(cachedProduct);
      } catch (error) {
        console.warn('Product cache error:', error);
        // Fallback síncrono
        const mockProducts = getMockProducts();
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