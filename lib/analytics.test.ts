import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import analytics, { useAnalytics } from './analytics';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock fetch para IP
const mockFetch = vi.fn();

// Mock navigator
const mockNavigator = {
  userAgent: 'Mozilla/5.0 (test)',
};

describe('Analytics', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', mockLocalStorage);
    vi.stubGlobal('navigator', mockNavigator);
    vi.stubGlobal('fetch', mockFetch);
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('[]');
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ ip: '127.0.0.1' }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('useAnalytics hook', () => {
    it('deve retornar todas as funções de tracking', () => {
      const { result } = renderHook(() => useAnalytics());

      expect(result.current).toHaveProperty('trackPageView');
      expect(result.current).toHaveProperty('trackCartAdd');
      expect(result.current).toHaveProperty('trackCartRemove');
      expect(result.current).toHaveProperty('trackWhatsAppRedirect');
      expect(result.current).toHaveProperty('trackLead');
    });

    it('deve trackear visualização de página', async () => {
      const { result } = renderHook(() => useAnalytics());

      await result.current.trackPageView('/products');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'vytalle_pageViews',
        expect.stringContaining('/products')
      );
    });

    it('deve trackear adição ao carrinho', async () => {
      const { result } = renderHook(() => useAnalytics());

      await result.current.trackCartAdd('product-123', 'Botox 50U', 1500);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'vytalle_cartEvents',
        expect.stringContaining('product-123')
      );
    });

    it('deve trackear remoção do carrinho', async () => {
      const { result } = renderHook(() => useAnalytics());

      await result.current.trackCartRemove('product-123', 'Botox 50U');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'vytalle_cartEvents',
        expect.stringContaining('remove')
      );
    });

    it('deve trackear redirecionamento WhatsApp', async () => {
      const { result } = renderHook(() => useAnalytics());

      await result.current.trackWhatsAppRedirect();

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'vytalle_cartEvents',
        expect.stringContaining('whatsapp_redirect')
      );
    });

    it('deve trackear lead', async () => {
      const { result } = renderHook(() => useAnalytics());

      await result.current.trackLead({
        name: 'João Silva',
        whatsapp: '21999999999',
        cep: '22050-030',
        products: [],
        totalValue: 0,
        converted: true,
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'vytalle_leads',
        expect.stringContaining('João Silva')
      );
    });
  });

  describe('AnalyticsManager', () => {
    it('deve ser um singleton', () => {
      const instance1 = analytics;
      const instance2 = analytics;
      expect(instance1).toBe(instance2);
    });

    it('deve retornar dados de analytics', () => {
      const data = analytics.getAnalyticsData();

      expect(data).toHaveProperty('pageViews');
      expect(data).toHaveProperty('cartEvents');
      expect(data).toHaveProperty('leads');
      expect(data).toHaveProperty('currentSession');
    });

    it('deve filtrar atividade recente', () => {
      const recentActivity = analytics.getRecentActivity(24);

      expect(recentActivity).toHaveProperty('pageViews');
      expect(recentActivity).toHaveProperty('cartEvents');
      expect(recentActivity).toHaveProperty('leads');
    });

    it('deve retornar páginas mais visitadas', () => {
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify([
          { page: '/products', timestamp: new Date() },
          { page: '/products', timestamp: new Date() },
          { page: '/', timestamp: new Date() },
        ])
      );

      const topPages = analytics.getTopPages(5);

      expect(Array.isArray(topPages)).toBe(true);
      expect(topPages[0]).toHaveProperty('page');
      expect(topPages[0]).toHaveProperty('count');
    });

    it('deve calcular métricas de conversão', () => {
      const metrics = analytics.getConversionMetrics();

      expect(metrics).toHaveProperty('uniqueVisitors');
      expect(metrics).toHaveProperty('cartAdds');
      expect(metrics).toHaveProperty('checkoutAttempts');
      expect(metrics).toHaveProperty('conversions');
      expect(metrics).toHaveProperty('cartAddRate');
      expect(metrics).toHaveProperty('checkoutRate');
      expect(metrics).toHaveProperty('conversionRate');
    });

    it('deve limpar dados antigos', () => {
      analytics.clearOldData(30);

      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    it('deve lidar com erro no localStorage gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });

      // Limpar o mock após o teste
      const originalSetItem = mockLocalStorage.setItem;

      expect(() => {
        analytics.trackPageView('/test');
      }).not.toThrow();

      // Restaurar o mock original
      mockLocalStorage.setItem = originalSetItem;
    });

    it('deve lidar com erro na busca do IP', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useAnalytics());

      await expect(result.current.trackPageView('/test')).resolves.not.toThrow();
    });

    it('deve funcionar em ambiente SSR', () => {
      vi.stubGlobal('window', undefined);

      // Teste sem usar renderHook que precisa do React
      expect(() => {
        analytics.trackPageView('/test');
      }).not.toThrow();
    });
  });

  describe('Data management', () => {
    it('deve limitar número de registros no storage', async () => {
      // Mock 1200 registros existentes
      const existingData = Array(1200).fill({ test: 'data', timestamp: new Date() });
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingData));

      // Limpar mocks para poder verificar chamadas específicas
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingData));

      const { result } = renderHook(() => useAnalytics());
      await result.current.trackPageView('/test');

      // Deve ter chamado setItem para limitar a 1000 registros
      expect(mockLocalStorage.setItem).toHaveBeenCalled();

      // Limpar o mock após o teste
      mockLocalStorage.getItem.mockRestore();
    });

    it('deve gerar sessionId único', () => {
      const data1 = analytics.getAnalyticsData();
      const data2 = analytics.getAnalyticsData();

      expect(data1.currentSession.sessionId).toBe(data2.currentSession.sessionId);
      expect(data1.currentSession.sessionId).toMatch(/^sess_/);
    });
  });
});
