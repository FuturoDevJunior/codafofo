'use client';

import { Product } from '@/types/product';
import { getProducts, getProductBySlug, getProductsAdmin, getProductsVendor } from '@/lib/mockData';
import { AuthService } from './auth';

export class ProductService {
  // Retorna produtos baseado no tipo de usuário
  static async getProducts(): Promise<Product[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const user = AuthService.getCurrentUser();
    
    if (!user) {
      // Usuário anônimo - dados públicos
      return getProducts();
    }
    
    if (user.role === 'admin') {
      // Admin - dados completos com preços originais
      return getProductsAdmin();
    }
    
    if (user.role === 'vendedor') {
      // Vendedor - dados com comissão
      return getProductsVendor();
    }
    
    // Padrão - dados públicos
    return getProducts();
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    return getProductBySlug(slug);
  }

  // Cache simples
  private static cachedProducts: Product[] | null = null;
  private static lastCacheTime = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  static async getProductsCached(): Promise<Product[]> {
    const now = Date.now();
    
    if (this.cachedProducts && (now - this.lastCacheTime) < this.CACHE_DURATION) {
      return this.cachedProducts;
    }
    
    const products = await this.getProducts();
    this.cachedProducts = products;
    this.lastCacheTime = now;
    
    return products;
  }

  static clearCache() {
    this.cachedProducts = null;
    this.lastCacheTime = 0;
  }
}