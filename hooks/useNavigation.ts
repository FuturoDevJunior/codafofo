'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface NavigationOptions {
  fallbackUrl?: string;
  onError?: (error: Error) => void;
  onSuccess?: (url: string) => void;
}

interface NavigationState {
  isNavigating: boolean;
  error: string | null;
}

/**
 * Hook customizado para navegação robusta com fallbacks
 */
export function useNavigation(options: NavigationOptions = {}) {
  const router = useRouter();
  const [state, setState] = useState<NavigationState>({
    isNavigating: false,
    error: null,
  });

  const navigate = useCallback(
    async (url: string) => {
      setState({ isNavigating: true, error: null });

      try {
        // Tentar navegação programática do Next.js primeiro
        router.push(url);

        // Simular delay mínimo para evitar flicker
        setTimeout(() => {
          setState({ isNavigating: false, error: null });
          options.onSuccess?.(url);
        }, 50);
      } catch (error) {
        console.warn('Erro na navegação programática, usando fallback:', error);

        try {
          // Fallback: navegação nativa do browser
          if (typeof window !== 'undefined') {
            window.location.href = url;
          }
          options.onSuccess?.(url);
        } catch (nativeError) {
          const errorMessage = `Erro na navegação para ${url}`;
          setState({ isNavigating: false, error: errorMessage });
          options.onError?.(new Error(errorMessage));
        }
      }
    },
    [router, options]
  );

  const prefetch = useCallback(
    (url: string) => {
      try {
        router.prefetch(url);
      } catch (error) {
        console.warn('Erro ao fazer prefetch:', error);
      }
    },
    [router]
  );

  const goBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      navigate('/');
    }
  }, [router, navigate]);

  const refresh = useCallback(() => {
    try {
      router.refresh();
    } catch (error) {
      window.location.reload();
    }
  }, [router]);

  return {
    navigate,
    prefetch,
    goBack,
    refresh,
    ...state,
  };
}
