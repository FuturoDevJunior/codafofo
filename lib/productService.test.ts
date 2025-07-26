import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from './auth';
import { mockProductsAdmin } from './mockData';
import { ProductService } from './productService';

vi.mock('./auth', () => ({
  AuthService: {
    getCurrentUser: vi.fn(),
  },
}));

describe('ProductService', () => {
  beforeEach(() => {
    ProductService.clearCache();
    vi.clearAllMocks();
  });

  it('retorna produtos genéricos para usuário anônimo', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(null);
    const products = await ProductService.getProducts();
    expect(products[0]).toHaveProperty('price_pix');
    expect(products[0]).not.toHaveProperty('price_pix_original');
  });

  it('retorna produtos admin para usuário admin', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue({
      role: 'admin',
      id: 'admin1',
      name: 'Admin',
      email: 'admin@admin.com',
      active: true,
      created_at: new Date().toISOString(),
    });
    const products = await ProductService.getProducts();
    expect(products[0]).toHaveProperty('price_pix');
  });

  it('retorna produtos vendedor com comissão', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue({
      role: 'vendedor',
      id: 'vend1',
      name: 'Vendedor',
      email: 'vend@vend.com',
      active: true,
      created_at: new Date().toISOString(),
      commission_percent: 10,
    });
    const products = await ProductService.getProducts();
    expect(products[0]).toHaveProperty('your_commission');
    expect(products[0].price_pix).toBeGreaterThan(0);
  });

  it('usa cache corretamente', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(null);
    const first = await ProductService.getProductsCached();
    const second = await ProductService.getProductsCached();
    expect(first).toBe(second); // Mesmo objeto (cache)
  });

  it('limpa cache corretamente', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(null);
    await ProductService.getProductsCached();
    ProductService.clearCache();
    const afterClear = await ProductService.getProductsCached();
    expect(afterClear).not.toBe(null);
  });

  it('getProductBySlug retorna produto correto', async () => {
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(null);
    const prod = mockProductsAdmin[0];
    const found = await ProductService.getProductBySlug(prod.slug);
    expect(found).toBeTruthy();
    if (found) {
      expect(found.slug).toBe(prod.slug);
    }
  });
});
