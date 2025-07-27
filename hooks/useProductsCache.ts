'use client';

import { useEffect, useState } from 'react';

import { getProducts } from '@/lib/mockData';
import { smartCache } from '@/lib/smartCache';
import { Product } from '@/types/product';

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
  const [cacheMetrics, setCacheMetrics] = useState(() => ({ hits: 0, misses: 0, size: 0 }));

  useEffect(() => {
    const loadCachedProducts = async () => {
      setIsLoading(true);
      try {
        const cachedProducts = await getProducts();
        setProducts(cachedProducts);
        // Usar métricas do smartCache
        const metrics = (smartCache as any).getMetrics?.() || { hits: 0, misses: 0, size: 0 };
        setCacheMetrics(metrics);
      } catch (error) {
        console.warn('Cache fallback:', error);
        // Fallback para dados síncronos em caso de erro
        setProducts(getProducts());
        const metrics = (smartCache as any).getMetrics?.() || { hits: 0, misses: 0, size: 0 };
        setCacheMetrics(metrics);
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
      setCacheMetrics({ hits: 0, misses: 0, size: 0 });
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
    activeProducts: Array.isArray(products) ? products.filter(p => p.active).length : 0,
  };
}

/**
 * HOOK DE PRODUTO INDIVIDUAL COM CACHE
 * ===================================
 */
export function useProductCache(slug: string) {
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(() => Boolean(slug));

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const mockProducts = getProducts();
        const cachedProduct = mockProducts.find(p => p.slug === slug && p.active);
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
