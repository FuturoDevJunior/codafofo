/**
 * TESTES FUNCIONAIS - VYTALLE ESTÉTICA
 * =====================================
 * 
 * Validação completa de funcionalidades do sistema
 */

import { describe, expect, it } from 'vitest';
import { getMockProducts, getMockProductBySlug } from '../lib/mockData';

describe('Testes Funcionais', () => {
  it('valida dados dos produtos', () => {
    const products = getMockProducts();
    
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.active)).toBe(true);
    
    // Validações de estrutura
    products.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeGreaterThan(0);
      expect(product.slug).toBeDefined();
      expect(product.category).toBeDefined();
    });
  });

  it('valida busca por slug', () => {
    const product = getMockProductBySlug('dl-botox-50ui');
    
    expect(product).toBeDefined();
    expect(product?.name).toContain('BOTOX');
    expect(product?.price).toBeGreaterThan(0);
  });

  it('valida categorias de produtos', () => {
    const products = getMockProducts();
    const categories = [...new Set(products.map(p => p.category))];
    
    expect(categories).toContain('Toxina Botulínica');
    expect(categories).toContain('Bioestimulador');
    expect(categories.length).toBeGreaterThan(3);
  });

  it('valida preços e moedas', () => {
    const products = getMockProducts();
    
    products.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(product.currency).toBe('BRL');
      expect(product.discount_percent).toBeGreaterThanOrEqual(0);
      expect(product.discount_percent).toBeLessThanOrEqual(100);
    });
  });

  it('valida disponibilidade dos produtos', () => {
    const products = getMockProducts();
    
    products.forEach(product => {
      // Modelo representante: produtos sempre disponíveis sob consulta
      expect(product.active).toBeDefined();
      expect(typeof product.active).toBe('boolean');
    });
  });
});