import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  applyCustomizationToDOM,
  getDefaultCustomization,
  getWhatsAppUrl,
  replacePlaceholders,
} from './useCustomization';

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock do document
const mockDocument = {
  documentElement: {
    style: {
      setProperty: vi.fn(),
    },
  },
  title: '',
  querySelector: vi.fn(),
  head: {
    appendChild: vi.fn(),
  },
  createElement: vi.fn((tagName: string) => {
    const element = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(),
      appendChild: vi.fn(),
      removeChild: vi.fn(),
      click: vi.fn(),
      href: '',
      download: '',
    };

    // Simular propriedades específicas baseadas no tagName
    if (tagName === 'a') {
      element.href = '';
      element.download = '';
    }

    return element;
  }),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

// Mock do window
const mockWindow = {
  confirm: vi.fn(),
  alert: vi.fn(),
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
});

describe('useCustomization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Funções Puras', () => {
    it('deve retornar configurações padrão', () => {
      const defaultConfig = getDefaultCustomization();
      expect(defaultConfig.companyName).toBe('Vytalle Estética & Viscosuplementação');
      expect(defaultConfig.logoUrl).toBe('/Vytalle_Logo_Gold.png');
      expect(defaultConfig.primaryColor).toBe('#d8a75b');
      expect(defaultConfig.whatsapp).toBe('5521996192890');
    });

    it('deve aplicar customizações ao DOM', () => {
      const customData = {
        companyName: 'Empresa Teste',
        logoUrl: '/logo-teste.png',
        faviconUrl: '/favicon-teste.png',
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
        whatsapp: '1234567890',
        email: 'teste@empresa.com',
        emailPrivacidade: 'privacidade@empresa.com',
        emailDpo: 'dpo@empresa.com',
        instagram: '@empresa.teste',
        website: 'https://empresa.com',
        mensagemDestaque: 'Mensagem de teste',
        infoEntrega: 'Entrega teste',
        formasPagamento: 'PIX teste',
        contatoSuporte: 'Suporte teste',
      };

      applyCustomizationToDOM(customData);

      expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--vitale-primary',
        '#ff0000'
      );
      expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--vitale-secondary',
        '#00ff00'
      );
      expect(mockDocument.title).toBe('Empresa Teste - Catálogo Premium');
    });

    it('deve substituir placeholders em textos', () => {
      const customData = getDefaultCustomization();
      const text = 'Olá {companyName}, entre em contato pelo {whatsapp} ou {email}';
      const resultText = replacePlaceholders(text, customData);

      expect(resultText).toBe(
        'Olá Vytalle Estética & Viscosuplementação, entre em contato pelo 5521996192890 ou admin@vytalle.com.br'
      );
    });

    it('deve gerar URL do WhatsApp corretamente', () => {
      const customData = getDefaultCustomization();
      const url = getWhatsAppUrl(customData, 'Mensagem personalizada');
      expect(url).toContain('https://wa.me/5521996192890');
      expect(url).toContain('text=');
      expect(url).toContain(encodeURIComponent('Mensagem personalizada'));
    });

    it('deve gerar URL do WhatsApp com mensagem padrão', () => {
      const customData = getDefaultCustomization();
      const url = getWhatsAppUrl(customData);
      expect(url).toContain('https://wa.me/5521996192890');
      expect(url).toContain('text=');
      expect(url).toContain(
        encodeURIComponent(
          'Olá! Gostaria de informações sobre os produtos da Vytalle Estética & Viscosuplementação.'
        )
      );
    });

    it('deve substituir múltiplos placeholders', () => {
      const customData = getDefaultCustomization();
      const text = '{companyName} - {mensagemDestaque} - {whatsapp} - {email}';
      const resultText = replacePlaceholders(text, customData);

      expect(resultText).toBe(
        'Vytalle Estética & Viscosuplementação - Produtos Premium para Profissionais - 5521996192890 - admin@vytalle.com.br'
      );
    });

    it('deve lidar com placeholders inexistentes', () => {
      const customData = getDefaultCustomization();
      const text = 'Texto com {placeholderInexistente}';
      const resultText = replacePlaceholders(text, customData);

      expect(resultText).toBe('Texto com {placeholderInexistente}');
    });

    it('deve lidar com ambiente server-side', () => {
      // Mock para ambiente server-side (window undefined)
      const originalWindow = global.window;
      delete (global as any).window;

      const customData = getDefaultCustomization();
      const text = 'Teste {companyName}';
      const resultText = replacePlaceholders(text, customData);

      // Deve funcionar sem erro
      expect(resultText).toBe('Teste Vytalle Estética & Viscosuplementação');

      // Restaurar window
      global.window = originalWindow;
    });

    it('deve aplicar customizações sem DOM em server-side', () => {
      // Mock para ambiente server-side (window undefined)
      const originalWindow = global.window;
      delete (global as any).window;

      const customData = getDefaultCustomization();

      // Deve executar sem erro
      expect(() => applyCustomizationToDOM(customData)).not.toThrow();

      // Restaurar window
      global.window = originalWindow;
    });

    it('deve gerar URL do WhatsApp sem DOM', () => {
      // Mock para ambiente server-side (window undefined)
      const originalWindow = global.window;
      delete (global as any).window;

      const customData = getDefaultCustomization();
      const url = getWhatsAppUrl(customData, 'Teste');

      // Deve funcionar sem erro
      expect(url).toContain('https://wa.me/5521996192890');

      // Restaurar window
      global.window = originalWindow;
    });

    it('deve lidar com customização vazia', () => {
      const emptyCustomization = {
        companyName: '',
        logoUrl: '',
        faviconUrl: '',
        primaryColor: '',
        secondaryColor: '',
        whatsapp: '',
        email: '',
        emailPrivacidade: '',
        emailDpo: '',
        instagram: '',
        website: '',
        mensagemDestaque: '',
        infoEntrega: '',
        formasPagamento: '',
        contatoSuporte: '',
      };

      const text = 'Teste {companyName}';
      const resultText = replacePlaceholders(text, emptyCustomization);
      expect(resultText).toBe('Teste ');

      const url = getWhatsAppUrl(emptyCustomization);
      expect(url).toContain('https://wa.me/?text=');
    });

    it('deve lidar com customização parcial', () => {
      const partialCustomization = {
        companyName: 'Empresa Teste',
        logoUrl: '/logo.png',
        faviconUrl: '/favicon.png',
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
        whatsapp: '1234567890',
        email: 'teste@empresa.com',
        emailPrivacidade: 'privacidade@empresa.com',
        emailDpo: 'dpo@empresa.com',
        instagram: '@empresa',
        website: 'https://empresa.com',
        mensagemDestaque: 'Mensagem teste',
        infoEntrega: 'Entrega teste',
        formasPagamento: 'PIX teste',
        contatoSuporte: 'Suporte teste',
      };

      const text = 'Olá {companyName}, entre em contato pelo {whatsapp}';
      const resultText = replacePlaceholders(text, partialCustomization);
      expect(resultText).toBe('Olá Empresa Teste, entre em contato pelo 1234567890');

      const url = getWhatsAppUrl(partialCustomization, 'Mensagem personalizada');
      expect(url).toContain('https://wa.me/1234567890');
      expect(url).toContain(encodeURIComponent('Mensagem personalizada'));
    });
  });
});
