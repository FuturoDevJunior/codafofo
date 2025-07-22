/**
 * TESTES FUNCIONAIS - VYTALLE ESTÉTICA
 * =====================================
 * 
 * Validação completa de funcionalidades do sistema
 */

import { describe, expect, it, vi } from 'vitest';
import { mockProductsAdmin, getProducts, getProductsAdmin, getProductsVendor } from '../lib/mockData';
import { ProductService } from '../lib/productService';
import { AuthService } from '../lib/auth';

describe('Testes Funcionais', () => {
  it('valida dados dos produtos admin', () => {
    const products = mockProductsAdmin;
    
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
    
    // Validações de estrutura Admin
    products.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price_pix_original).toBeGreaterThan(0);
      expect(product.price_card_original).toBeGreaterThan(0);
      expect(product.commission_percent).toBeGreaterThan(0);
      expect(product.slug).toBeDefined();
      expect(product.category).toBeDefined();
    });
  });

  it('valida busca por slug', async () => {
    const product = await ProductService.getProductBySlug('dl-botox-50ui');
    
    expect(product).toBeDefined();
    expect(product?.name).toContain('BOTOX');
    expect('price_pix' in product! || 'price_pix_original' in product!).toBe(true);
  });

  it('valida categorias de produtos', () => {
    const products = getProducts(); // Usar a função ao invés do array diretamente
    const categories = [...new Set(products.map(p => p.category))];
    
    expect(categories).toContain('Toxina Botulínica');
    expect(categories).toContain('Bioestimuladores');
    expect(categories.length).toBeGreaterThan(3);
  });

  it('valida preços e moedas admin', () => {
    const products = getProductsAdmin(); // Usar a função
    
    products.forEach(product => {
      expect(product.price_pix_original).toBeGreaterThan(0);
      expect(product.price_card_original).toBeGreaterThan(0);
      expect(product.currency).toBe('BRL');
      expect(product.commission_percent).toBeGreaterThanOrEqual(0);
      expect(product.commission_percent).toBeLessThanOrEqual(100);
    });
  });

  it('valida disponibilidade dos produtos', () => {
    const products = getProductsAdmin(); // Usar a função
    
    products.forEach(product => {
      // Modelo representante: produtos sempre disponíveis sob consulta
      if (product.active !== undefined) {
        expect(typeof product.active).toBe('boolean');
      }
    });
  });

  it('valida cálculo de comissão para vendedor', async () => {
    // Mock user vendedor
    const mockUser = {
      id: '2',
      name: 'Vendedor Teste',
      email: 'teste@vendedor.com',
      role: 'vendedor' as const,
      commission_percent: 5,
      active: true,
      created_at: new Date().toISOString()
    };

    // Mock auth service
    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(mockUser);
    
    const products = getProductsVendor(); // Usar função vendor diretamente
    expect(products.length).toBeGreaterThan(0);
    
    // Verificar se produtos têm comissão calculada
    products.forEach(product => {
      expect(product.your_commission).toBeDefined();
      expect(product.your_commission).toBeGreaterThan(0);
      expect(product.price_pix).toBeGreaterThan(product.your_commission);
    });
  });

  it('valida separação de dados sensíveis', async () => {
    // Admin deve ver preços originais
    const mockAdmin = {
      id: '1',
      name: 'Admin Teste',
      email: 'admin@teste.com',
      role: 'admin' as const,
      active: true,
      created_at: new Date().toISOString()
    };

    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(mockAdmin);
    
    const adminProducts = getProductsAdmin(); // Usar função admin diretamente
    expect(adminProducts[0]).toHaveProperty('price_pix_original');
    expect(adminProducts[0]).toHaveProperty('commission_percent');
    
    // Vendedor NÃO deve ver preços originais
    const mockVendedor = {
      id: '2',
      name: 'Vendedor Teste',
      email: 'vendedor@teste.com',
      role: 'vendedor' as const,
      commission_percent: 3,
      active: true,
      created_at: new Date().toISOString()
    };

    vi.spyOn(AuthService, 'getCurrentUser').mockReturnValue(mockVendedor);
    
    const vendedorProducts = getProductsVendor(); // Usar função vendor diretamente
    expect(vendedorProducts[0]).not.toHaveProperty('price_pix_original');
    expect(vendedorProducts[0]).toHaveProperty('commission_percent'); // vendor tem essa info
    expect(vendedorProducts[0]).toHaveProperty('your_commission');
  });
});