import { describe, expect, it } from 'vitest';

import { act, renderHook, waitFor } from '@testing-library/react';

import { Product } from '../types';
import { useProductComparison } from './useProductComparison';

const mockProduct1 = {
  id: '1',
  name: 'Produto 1',
  category: 'Categoria A',
  price_pix: 100,
  price_prazo: 110,
  images: ['/test1.jpg'],
  slug: 'produto-1',
  description: 'Teste',
  brand: 'Marca',
  unit: 'ml',
  volume: '1',
  active: true,
  price_card: 120,
};

const mockProduct2 = {
  id: '2',
  name: 'Produto 2',
  category: 'Categoria B',
  price_pix: 200,
  price_prazo: 220,
  images: ['/test2.jpg'],
  slug: 'produto-2',
  description: 'Teste 2',
  brand: 'Marca',
  unit: 'ml',
  volume: '1',
  active: true,
  price_card: 220,
};

describe('useProductComparison', () => {
  it('deve inicializar com estado vazio', () => {
    const { result } = renderHook(() => useProductComparison());

    expect(result.current.comparisonProducts).toEqual([]);
    expect(result.current.isComparing).toBe(false);
    expect(result.current.canAddMore).toBe(true);
    expect(result.current.getComparisonData()).toBeNull();
  });

  it('deve adicionar produto à comparação', () => {
    const { result } = renderHook(() => useProductComparison());

    act(() => {
      const response = result.current.addToComparison(mockProduct1);
      expect(response.success).toBe(true);
      expect(response.message).toBe('Produto adicionado à comparação');
    });

    expect(result.current.comparisonProducts).toHaveLength(1);
    expect(result.current.comparisonProducts[0].id).toBe('1');
  });

  it('deve impedir adicionar produto duplicado', () => {
    const { result } = renderHook(() => useProductComparison());

    act(() => {
      result.current.addToComparison(mockProduct1);
    });

    act(() => {
      const response = result.current.addToComparison(mockProduct1);
      expect(response.success).toBe(false);
      expect(response.message).toBe('Produto já está na comparação');
    });

    expect(result.current.comparisonProducts).toHaveLength(1);
  });

  it('deve limitar a 4 produtos', () => {
    const { result } = renderHook(() => useProductComparison());

    // Adicionar 4 produtos
    act(() => {
      result.current.addToComparison(mockProduct1);
      result.current.addToComparison(mockProduct2);
      result.current.addToComparison({ ...mockProduct1, id: '3' });
      result.current.addToComparison({ ...mockProduct1, id: '4' });
    });

    expect(result.current.comparisonProducts).toHaveLength(4);
    expect(result.current.canAddMore).toBe(false);

    // Tentar adicionar o 5º produto
    act(() => {
      const response = result.current.addToComparison({ ...mockProduct1, id: '5' });
      expect(response.success).toBe(false);
      expect(response.message).toBe('Máximo de 4 produtos para comparação');
    });

    expect(result.current.comparisonProducts).toHaveLength(4);
  });

  it('deve remover produto por comparisonId', () => {
    const { result } = renderHook(() => useProductComparison());

    act(() => {
      result.current.addToComparison(mockProduct1);
      result.current.addToComparison(mockProduct2);
    });

    const comparisonId = result.current.comparisonProducts[0].comparisonId;

    act(() => {
      result.current.removeFromComparison(comparisonId);
    });

    expect(result.current.comparisonProducts).toHaveLength(1);
    expect(result.current.comparisonProducts[0].id).toBe('2');
  });

  it('deve limpar todos os produtos', () => {
    const { result } = renderHook(() => useProductComparison());

    act(() => {
      result.current.addToComparison(mockProduct1);
      result.current.addToComparison(mockProduct2);
      result.current.toggleComparison();
    });

    expect(result.current.comparisonProducts).toHaveLength(2);
    expect(result.current.isComparing).toBe(true);

    act(() => {
      result.current.clearComparison();
    });

    expect(result.current.comparisonProducts).toHaveLength(0);
    expect(result.current.isComparing).toBe(false);
  });

  it('deve calcular dados de comparação corretamente', () => {
    const { result } = renderHook(() => useProductComparison());

    act(() => {
      result.current.addToComparison(mockProduct1);
      result.current.addToComparison(mockProduct2);
    });

    const data = result.current.getComparisonData();

    expect(data).not.toBeNull();
    expect(data?.totalProducts).toBe(2);
    expect(data?.categories).toEqual(['Categoria A', 'Categoria B']);
    expect(data?.priceRange.min).toBe(100);
    expect(data?.priceRange.max).toBe(200);
  });

  it('deve alternar estado de comparação', () => {
    const { result } = renderHook(() => useProductComparison());

    expect(result.current.isComparing).toBe(false);

    act(() => {
      result.current.toggleComparison();
    });

    expect(result.current.isComparing).toBe(true);

    act(() => {
      result.current.toggleComparison();
    });

    expect(result.current.isComparing).toBe(false);
  });

  it('deve gerar comparisonId único para cada produto', async () => {
    const product1 = { id: '1', name: 'Produto 1' } as Product;
    const product2 = { id: '2', name: 'Produto 2' } as Product;

    const { result } = renderHook(() => useProductComparison());

    act(() => {
      result.current.addToComparison(product1);
      result.current.addToComparison(product2);
    });

    await waitFor(() => {
      expect(result.current.comparisonProducts.length).toBe(2);
    });

    const [comparison1, comparison2] = result.current.comparisonProducts;

    expect(comparison1).toBeDefined();
    expect(comparison2).toBeDefined();
    if (comparison1 && comparison2) {
      expect(comparison1.comparisonId).toBeDefined();
      expect(comparison2.comparisonId).toBeDefined();
      expect(comparison1.comparisonId).not.toBe(comparison2.comparisonId);
    }
  });
});
