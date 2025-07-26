import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useNavigation } from './useNavigation';

const mockPush = vi.fn();
const mockPrefetch = vi.fn();
const mockBack = vi.fn();
const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: mockPrefetch,
    back: mockBack,
    refresh: mockRefresh,
  }),
}));

describe('useNavigation - Testes Essenciais', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve ter estado inicial correto', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.isNavigating).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.navigate).toBe('function');
    expect(typeof result.current.prefetch).toBe('function');
    expect(typeof result.current.goBack).toBe('function');
    expect(typeof result.current.refresh).toBe('function');
  });

  it('deve chamar router.push ao navegar', async () => {
    const { result } = renderHook(() => useNavigation());

    await act(async () => {
      await result.current.navigate('/products');
    });

    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('deve chamar router.prefetch', () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.prefetch('/products');
    });

    expect(mockPrefetch).toHaveBeenCalledWith('/products');
  });

  it('deve chamar router.back', () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.goBack();
    });

    expect(mockBack).toHaveBeenCalled();
  });

  it('deve chamar router.refresh', () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.refresh();
    });

    expect(mockRefresh).toHaveBeenCalled();
  });

  it('deve chamar onSuccess quando navegação é bem-sucedida', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useNavigation({ onSuccess }));

    await act(async () => {
      await result.current.navigate('/products');
      // Aguardar o timeout do setTimeout
      await new Promise(resolve => setTimeout(resolve, 60));
    });

    expect(onSuccess).toHaveBeenCalledWith('/products');
  });

  it('deve lidar com erro no prefetch silenciosamente', () => {
    mockPrefetch.mockImplementation(() => {
      throw new Error('Prefetch failed');
    });

    const { result } = renderHook(() => useNavigation());

    expect(() => {
      act(() => {
        result.current.prefetch('/products');
      });
    }).not.toThrow();
  });

  it('deve definir isNavigating como true durante navegação', () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.navigate('/products');
    });

    expect(result.current.isNavigating).toBe(true);
  });

  it('deve aceitar callback de erro personalizado', () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useNavigation({ onError }));

    expect(result.current).toBeDefined();
    expect(typeof result.current.navigate).toBe('function');
  });
});
