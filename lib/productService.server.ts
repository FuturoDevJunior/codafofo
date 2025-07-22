import { Product } from '@/types/product';
import { getProducts, getProductBySlug } from './mockData';

// Por enquanto usando mocks - depois migrar para Supabase
export async function getProductsFromSupabase(): Promise<Product[]> {
  console.log('🔄 Usando dados mock - Supabase será configurado depois');
  return getProducts();
}

export async function getProductBySlugFromSupabase(slug: string): Promise<Product | null> {
  console.log('🔄 Usando dados mock - Supabase será configurado depois');
  return getProductBySlug(slug);
} 