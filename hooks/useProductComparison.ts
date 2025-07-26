'use client';

import { useCallback, useState } from 'react';

import { Product } from '@/types/product';

interface ComparisonProduct extends Product {
  comparisonId: string;
}

export function useProductComparison() {
  const [comparisonProducts, setComparisonProducts] = useState<ComparisonProduct[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const addToComparison = useCallback(
    (product: Product) => {
      if (comparisonProducts.length >= 4) {
        return { success: false, message: 'Máximo de 4 produtos para comparação' };
      }

      const alreadyExists = comparisonProducts.find(p => p.id === product.id);
      if (alreadyExists) {
        return { success: false, message: 'Produto já está na comparação' };
      }

      const comparisonProduct: ComparisonProduct = {
        ...product,
        comparisonId: `${product.id}-${Date.now()}`,
      };

      setComparisonProducts(prev => [...prev, comparisonProduct]);
      return { success: true, message: 'Produto adicionado à comparação' };
    },
    [comparisonProducts]
  );

  const removeFromComparison = useCallback((comparisonId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.comparisonId !== comparisonId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonProducts([]);
    setIsComparing(false);
  }, []);

  const toggleComparison = useCallback(() => {
    setIsComparing(prev => !prev);
  }, []);

  const getComparisonData = useCallback(() => {
    if (comparisonProducts.length === 0) return null;

    const categories = [...new Set(comparisonProducts.map(p => p.category))];
    const priceRange = {
      min: Math.min(...comparisonProducts.map(p => p.price_pix || 0)),
      max: Math.max(...comparisonProducts.map(p => p.price_pix || 0)),
    };

    return {
      products: comparisonProducts,
      categories,
      priceRange,
      totalProducts: comparisonProducts.length,
    };
  }, [comparisonProducts]);

  return {
    comparisonProducts,
    isComparing,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleComparison,
    getComparisonData,
    canAddMore: comparisonProducts.length < 4,
  };
}
