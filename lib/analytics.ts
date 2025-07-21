/**
 * SISTEMA DE ANALYTICS AVANÇADO - VYTALLE ESTÉTICA
 * ===============================================
 * 
 * Sistema completo de tracking, analytics e monitoramento
 */

interface VisitorInfo {
  ip: string;
  userAgent: string;
  timestamp: Date;
  page: string;
  referrer?: string;
  sessionId: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

interface PageView {
  id: string;
  page: string;
  timestamp: Date;
  ip: string;
  userAgent: string;
  sessionId: string;
  duration?: number;
  interactions?: number;
}

interface CartEvent {
  id: string;
  type: 'add' | 'remove' | 'checkout_attempt' | 'whatsapp_redirect';
  productId?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  timestamp: Date;
  ip: string;
  sessionId: string;
}

interface LeadEvent {
  id: string;
  name: string;
  whatsapp: string;
  cep: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalValue: number;
  timestamp: Date;
  ip: string;
  sessionId: string;
  converted: boolean;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private sessionId: string;
  private pageStartTime: number;
  private interactions: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.pageStartTime = Date.now();
    
    if (typeof window !== 'undefined') {
      this.initializeTracking();
    }
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async getClientIP(): Promise<string> {
    try {
      // Tentar obter IP através de serviços públicos
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch (error) {
      // Fallback para IP local
      return 'unknown';
    }
  }

  private getUserAgent(): string {
    return typeof window !== 'undefined' ? navigator.userAgent : 'unknown';
  }

  private initializeTracking(): void {
    // Track page unload para calcular tempo na página
    window.addEventListener('beforeunload', () => {
      this.trackPageExit();
    });

    // Track interactions gerais
    ['click', 'scroll', 'keydown'].forEach(event => {
      window.addEventListener(event, () => {
        this.interactions++;
      });
    });

    // Track mudanças de página
    const originalPushState = history.pushState;
    history.pushState = (...args) => {
      this.trackPageExit();
      originalPushState.apply(history, args);
      setTimeout(() => this.trackPageView(), 100);
    };
  }

  async trackPageView(page?: string): Promise<void> {
    const currentPage = page || (typeof window !== 'undefined' ? window.location.pathname : 'unknown');
    const ip = await this.getClientIP();
    
    const pageView: PageView = {
      id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      page: currentPage,
      timestamp: new Date(),
      ip,
      userAgent: this.getUserAgent(),
      sessionId: this.sessionId,
      interactions: 0
    };

    this.saveToStorage('pageViews', pageView);
    this.pageStartTime = Date.now();
    this.interactions = 0;
  }

  private trackPageExit(): void {
    const duration = Date.now() - this.pageStartTime;
    const pageViews = this.getFromStorage('pageViews') || [];
    
    if (pageViews.length > 0) {
      const lastView = pageViews[pageViews.length - 1];
      lastView.duration = duration;
      lastView.interactions = this.interactions;
      this.saveToStorage('pageViews', lastView, true);
    }
  }

  async trackCartEvent(event: Omit<CartEvent, 'id' | 'timestamp' | 'ip' | 'sessionId'>): Promise<void> {
    const ip = await this.getClientIP();
    
    const cartEvent: CartEvent = {
      ...event,
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ip,
      sessionId: this.sessionId
    };

    this.saveToStorage('cartEvents', cartEvent);
  }

  async trackLead(lead: Omit<LeadEvent, 'id' | 'timestamp' | 'ip' | 'sessionId'>): Promise<void> {
    const ip = await this.getClientIP();
    
    const leadEvent: LeadEvent = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ip,
      sessionId: this.sessionId
    };

    this.saveToStorage('leads', leadEvent);
  }

  private saveToStorage(key: string, data: any, update = false): void {
    if (typeof window === 'undefined') return;

    try {
      const existing = JSON.parse(localStorage.getItem(`vytalle_${key}`) || '[]');
      
      if (update && existing.length > 0) {
        existing[existing.length - 1] = data;
      } else {
        existing.push(data);
      }

      // Manter apenas os últimos 1000 registros
      if (existing.length > 1000) {
        existing.splice(0, existing.length - 1000);
      }

      localStorage.setItem(`vytalle_${key}`, JSON.stringify(existing));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  private getFromStorage(key: string): any[] {
    if (typeof window === 'undefined') return [];

    try {
      return JSON.parse(localStorage.getItem(`vytalle_${key}`) || '[]');
    } catch (error) {
      console.error('Error reading analytics data:', error);
      return [];
    }
  }

  // Métodos para o painel admin
  getAnalyticsData() {
    return {
      pageViews: this.getFromStorage('pageViews'),
      cartEvents: this.getFromStorage('cartEvents'),
      leads: this.getFromStorage('leads'),
      currentSession: {
        sessionId: this.sessionId,
        startTime: new Date(this.pageStartTime),
        interactions: this.interactions
      }
    };
  }

  getRecentActivity(hours = 24) {
    const cutoff = new Date(Date.now() - (hours * 60 * 60 * 1000));
    const data = this.getAnalyticsData();

    return {
      pageViews: data.pageViews.filter(pv => new Date(pv.timestamp) > cutoff),
      cartEvents: data.cartEvents.filter(ce => new Date(ce.timestamp) > cutoff),
      leads: data.leads.filter(l => new Date(l.timestamp) > cutoff)
    };
  }

  getTopPages(limit = 10) {
    const pageViews = this.getFromStorage('pageViews');
    const pageCounts = pageViews.reduce((acc, pv) => {
      acc[pv.page] = (acc[pv.page] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, limit)
      .map(([page, count]) => ({ page, count }));
  }

  getConversionMetrics() {
    const cartEvents = this.getFromStorage('cartEvents');
    const leads = this.getFromStorage('leads');
    const pageViews = this.getFromStorage('pageViews');

    const uniqueVisitors = new Set(pageViews.map(pv => pv.sessionId)).size;
    const cartAdds = cartEvents.filter(ce => ce.type === 'add').length;
    const checkoutAttempts = cartEvents.filter(ce => ce.type === 'whatsapp_redirect').length;
    const conversions = leads.length;

    return {
      uniqueVisitors,
      cartAdds,
      checkoutAttempts,
      conversions,
      cartAddRate: uniqueVisitors > 0 ? (cartAdds / uniqueVisitors * 100).toFixed(2) + '%' : '0%',
      checkoutRate: cartAdds > 0 ? (checkoutAttempts / cartAdds * 100).toFixed(2) + '%' : '0%',
      conversionRate: checkoutAttempts > 0 ? (conversions / checkoutAttempts * 100).toFixed(2) + '%' : '0%'
    };
  }

  clearOldData(days = 30): void {
    const cutoff = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
    
    ['pageViews', 'cartEvents', 'leads'].forEach(key => {
      const data = this.getFromStorage(key);
      const filtered = data.filter(item => new Date(item.timestamp) > cutoff);
      localStorage.setItem(`vytalle_${key}`, JSON.stringify(filtered));
    });
  }

  exportData() {
    const data = this.getAnalyticsData();
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString(),
      totalRecords: data.pageViews.length + data.cartEvents.length + data.leads.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vytalle-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Instância singleton
export const analytics = AnalyticsManager.getInstance();

// Hooks para React
export function useAnalytics() {
  const trackPageView = (page?: string) => analytics.trackPageView(page);
  const trackCartAdd = (productId: string, productName: string, price: number) => 
    analytics.trackCartEvent({ type: 'add', productId, productName, quantity: 1, price });
  const trackCartRemove = (productId: string, productName: string) =>
    analytics.trackCartEvent({ type: 'remove', productId, productName });
  const trackWhatsAppRedirect = () =>
    analytics.trackCartEvent({ type: 'whatsapp_redirect' });
  const trackLead = (lead: Omit<LeadEvent, 'id' | 'timestamp' | 'ip' | 'sessionId'>) =>
    analytics.trackLead(lead);

  return {
    trackPageView,
    trackCartAdd,
    trackCartRemove,
    trackWhatsAppRedirect,
    trackLead
  };
}

export default analytics;