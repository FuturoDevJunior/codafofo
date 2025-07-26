/**
 * TRATAMENTO ROBUSTO DE ERROS DE REDE E API
 * ========================================
 *
 * Sistema avançado para superar as expectativas
 */

export interface NetworkConfig {
  retries: number;
  timeout: number;
  backoff: 'linear' | 'exponential';
  fallback?: () => any;
}

export class NetworkHandler {
  private static defaultConfig: NetworkConfig = {
    retries: 3,
    timeout: 10000,
    backoff: 'exponential',
  };

  /**
   * Fetch robusto com retry automático
   */
  static async robustFetch(
    url: string,
    options: RequestInit = {},
    config: Partial<NetworkConfig> = {}
  ): Promise<any> {
    const finalConfig = { ...this.defaultConfig, ...config };

    for (let attempt = 0; attempt < finalConfig.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        const isLastAttempt = attempt === finalConfig.retries - 1;

        if (isLastAttempt) {
          if (finalConfig.fallback) {
            console.warn(`Network fallback activated for ${url}`);
            return finalConfig.fallback();
          }
          throw error;
        }

        // Backoff strategy
        const delay =
          finalConfig.backoff === 'exponential'
            ? Math.pow(2, attempt) * 1000
            : (attempt + 1) * 1000;

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Verificador de conectividade
   */
  static async checkConnectivity(): Promise<boolean> {
    try {
      await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-cache',
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Preload de imagens com fallback
   */
  static async preloadImage(src: string, fallback = '/icons/icon-192.png'): Promise<string> {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => resolve(fallback);
      img.src = src;
    });
  }

  /**
   * Batch de requisições com controle de concorrência
   */
  static async batchRequests<T>(requests: (() => Promise<T>)[], concurrency = 3): Promise<T[]> {
    const results: T[] = [];

    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);
      const batchResults = await Promise.allSettled(batch.map(request => request()));

      results.push(
        ...batchResults
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<T>).value)
      );
    }

    return results;
  }
}

/**
 * Hook React para network handling
 */
export function useNetworkHandler() {
  return {
    robustFetch: NetworkHandler.robustFetch,
    checkConnectivity: NetworkHandler.checkConnectivity,
    preloadImage: NetworkHandler.preloadImage,
    batchRequests: NetworkHandler.batchRequests,
  };
}
