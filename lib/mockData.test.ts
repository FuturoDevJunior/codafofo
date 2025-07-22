import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  getProducts,
  getProductBySlug,
  mockProducts,
} from './mockData';

describe('mockData', () => {
  it('getProducts retorna apenas produtos ativos', () => {
    const ativos = getProducts();
    expect(ativos.every(p => p.active !== false)).toBe(true);
  });

  it('getProductBySlug retorna produto correto', () => {
    const slug = mockProducts[0].slug;
    const prod = getProductBySlug(slug);
    expect(prod).toBeTruthy();
    expect(prod?.slug).toBe(slug);
  });

  it('getProductBySlug retorna null para slug inexistente', () => {
    const prod = getProductBySlug('slug-inexistente');
    expect(prod).toBeNull();
  });

  it('mockProducts têm preços PIX e cartão', () => {
    mockProducts.forEach(product => {
      expect(product.price_pix).toBeGreaterThan(0);
      expect(product.price_card).toBeGreaterThan(0);
      expect(product.slug).toBeTruthy();
      expect(product.category).toBeTruthy();
    });
  });

  it('todos os produtos têm estrutura correta', () => {
    mockProducts.forEach(product => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.images).toBeInstanceOf(Array);
      expect(product.currency).toBe('BRL');
    });
  });
}); 