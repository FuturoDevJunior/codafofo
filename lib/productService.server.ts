import { Product } from '@/types/product';

import {
  getProductBySlug,
  getProducts,
} from './mockData';

// Por enquanto usando mocks - depois migrar para Supabase
export async function getProductsFromSupabase(): Promise<Product[]> {
  return getProducts();
}

export async function getProductBySlugFromSupabase(slug: string): Promise<Product | null> {
  return getProductBySlug(slug);
} 