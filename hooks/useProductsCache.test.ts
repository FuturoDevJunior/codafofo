import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from '@testing-library/react';

import { useProductCache, useProductsCache } from './useProductsCache';

// Mock do smartCache
vi.mock('@/lib/smartCache', () => ({
  smartCache: {
    getMetrics: vi.fn(() => ({
      hits: 10,
      misses: 2,
      hitRate: 0.83,
    })),
    getOrSet: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock do mockData
vi.mock('@/lib/mockData', () => ({
  getProducts: vi.fn(() => [
    {
      id: '1',
      name: 'Produto Teste 1',
      price_pix: 100,
      price_card: 110,
      price_prazo: 120,
      category: 'Categoria 1',
      images: ['image1.jpg'],
      slug: 'produto-teste-1',
      active: true,
    },
    {
      id: '2',
      name: 'Produto Teste 2',
      price_pix: 200,
      price_card: 220,
      price_prazo: 240,
      category: 'Categoria 2',
      images: ['image2.jpg'],
      slug: 'produto-teste-2',
      active: true,
    },
  ]),
}));

describe('useProductsCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar estado inicial com produtos', async () => {
    const { result } = renderHook(() => useProductsCache());

    // Aguardar o carregamento assíncrono
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.totalProducts).toBe(2);
    expect(result.current.activeProducts).toBe(2);
  });

  it('deve ter métricas de cache', async () => {
    const { result } = renderHook(() => useProductsCache());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.cacheMetrics).toEqual({
      hits: 10,
      misses: 2,
      hitRate: 0.83,
    });
  });

  it('deve ter função de refresh', async () => {
    const { result } = renderHook(() => useProductsCache());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refreshProducts).toBe('function');
  });

  it('deve lidar com erro no carregamento', async () => {
    const { getProducts } = await import('@/lib/mockData');
    (getProducts as any).mockRejectedValueOnce(new Error('Erro de rede'));

    const { result } = renderHook(() => useProductsCache());

    // Deve ter fallback para dados síncronos
    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
    });
  });

  it('deve filtrar produtos ativos', async () => {
    const { getProducts } = await import('@/lib/mockData');
    const mockProducts = [
      { id: '1', name: 'Ativo', active: true },
      { id: '2', name: 'Inativo', active: false },
    ];
    (getProducts as any).mockReturnValue(mockProducts);

    const { result } = renderHook(() => useProductsCache());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verificar se os produtos foram atualizados
    expect(result.current.products).toHaveLength(2);
    expect(result.current.activeProducts).toBe(1);
  });
});

describe('useProductCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar produto individual', async () => {
    const { smartCache } = await import('@/lib/smartCache');
    const { getProducts } = await import('@/lib/mockData');

    const mockProduct = {
      id: '1',
      name: 'Produto Teste',
      slug: 'produto-teste',
      active: true,
    };

    (smartCache.getOrSet as any).mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProductCache('produto-teste'));

    // Estado inicial
    expect(result.current.isLoading).toBe(true);
    expect(result.current.product).toBeUndefined();

    // Aguardar carregamento
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
  });

  it('deve lidar com produto não encontrado', async () => {
    const { smartCache } = await import('@/lib/smartCache');
    (smartCache.getOrSet as any).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useProductCache('produto-inexistente'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toBeUndefined();
  });

  it('deve lidar com erro no carregamento', async () => {
    const { smartCache } = await import('@/lib/smartCache');
    (smartCache.getOrSet as any).mockRejectedValueOnce(new Error('Erro de cache'));

    const { result } = renderHook(() => useProductCache('produto-teste'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Deve ter fallback
    expect(result.current.isLoading).toBe(false);
  });

  it('deve recarregar quando slug muda', async () => {
    const { smartCache } = await import('@/lib/smartCache');

    const { result, rerender } = renderHook(({ slug }) => useProductCache(slug), {
      initialProps: { slug: 'produto-1' },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Mudar slug
    rerender({ slug: 'produto-2' });

    // Verificar se o smartCache foi chamado duas vezes
    expect(smartCache.getOrSet).toHaveBeenCalledTimes(2);
  });
});
