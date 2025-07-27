/**
 * CACHE OTIMIZADO DE PRODUTOS - VYTALLE ESTÉTICA
 * ==============================================
 *
 * Sistema de cache com carregamento sob demanda para reduzir uso de memória
 * Carrega apenas produtos necessários e libera memória automaticamente
 */

import { Product } from '@/types/product';
import { getProductImages } from '@/lib/productImages';
import { productsMinimalData, type ProductMinimal } from '@/lib/productsMinimal';

// Cache em memória com TTL
const productCache = new Map<string, Product>();
const cacheExpiry = new Map<string, number>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Função para limpar cache expirado
const clearExpiredCache = () => {
  const now = Date.now();
  for (const [key, expiry] of cacheExpiry) {
    if (now > expiry) {
      productCache.delete(key);
      cacheExpiry.delete(key);
    }
  }
};

// Usar dados extraídos automaticamente
const productsData: ProductMinimal[] = productsMinimalData;

// Função para carregar produto completo sob demanda
const loadFullProduct = (minimal: ProductMinimal): Product => {
  const cacheKey = minimal.id;

  // Verificar cache primeiro
  if (productCache.has(cacheKey)) {
    const expiry = cacheExpiry.get(cacheKey)!;
    if (Date.now() < expiry) {
      return productCache.get(cacheKey)!;
    }
  }

  // Criar produto completo
  const fullProduct: Product = {
    ...minimal,
    currency: 'BRL',
    images: getProductImages(minimal.slug, minimal.category),
    description: `Produto premium ${minimal.name} da categoria ${minimal.category}`,
  };

  // Armazenar no cache
  productCache.set(cacheKey, fullProduct);
  cacheExpiry.set(cacheKey, Date.now() + CACHE_TTL);

  return fullProduct;
};

// Funções públicas otimizadas
export const getProducts = (): Product[] => {
  clearExpiredCache();
  return productsData.filter(p => p.active).map(loadFullProduct);
};

export const getProductBySlug = (slug: string): Product | null => {
  clearExpiredCache();
  const minimal = productsData.find(p => p.slug === slug && p.active);
  return minimal ? loadFullProduct(minimal) : null;
};

export const getProductById = (id: string): Product | null => {
  clearExpiredCache();
  const minimal = productsData.find(p => p.id === id && p.active);
  return minimal ? loadFullProduct(minimal) : null;
};

// Função para obter apenas dados essenciais (sem imagens)
export const getProductsMinimal = (): ProductMinimal[] => {
  return productsData.filter(p => p.active);
};

// Função para limpar cache manualmente
export const clearProductCache = () => {
  productCache.clear();
  cacheExpiry.clear();
};

// Função para estatísticas do cache
export const getCacheStats = () => {
  clearExpiredCache();
  return {
    size: productCache.size,
    totalProducts: productsData.length,
    cacheHitRate: productCache.size > 0 ? (productCache.size / productsData.length) * 100 : 0,
  };
};
