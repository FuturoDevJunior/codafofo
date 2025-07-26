import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

import React from 'react';

import { afterAll, beforeAll, vi } from 'vitest';

// Mock de IntersectionObserver para bibliotecas como embla-carousel
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = () => null;
  observe = () => null;
  takeRecords = (): IntersectionObserverEntry[] => [];
  unobserve = () => null;
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock do document.body para garantir que existe
if (!document.body) {
  document.body = document.createElement('body');
}

// Garantir que document tem um elemento raiz
if (!document.getElementById('root')) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

// Mock de createRoot para React 18
const mockCreateRoot = vi.fn(container => {
  // Verificar se o container é válido
  if (!container || typeof container !== 'object') {
    throw new Error('Target container is not a DOM element.');
  }

  return {
    render: vi.fn(element => {
      // Simular renderização
      if (container && typeof container.appendChild === 'function') {
        container.appendChild = vi.fn();
      }
    }),
    unmount: vi.fn(),
  };
});

// Mock ReactDOM
vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock ReactDOM para renderHook
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createRoot: mockCreateRoot,
}));

// Mock adicional para renderHook - usar implementação original
vi.mock('@testing-library/react', async () => {
  const actual = await vi.importActual('@testing-library/react');
  return actual;
});

// Mock de ResizeObserver para bibliotecas como embla-carousel
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock de window.matchMedia para embla-carousel
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Definir variáveis de ambiente para testes
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-url';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';

// Mock window.open para jsdom
Object.defineProperty(window, 'open', {
  value: vi.fn(),
  writable: true,
});

// Mock window.confirm para jsdom
Object.defineProperty(window, 'confirm', {
  value: vi.fn().mockReturnValue(true),
  writable: true,
});

// Mock de FileList para testes de upload
class MockFileList extends Array {
  item(index: number) {
    return this[index] || null;
  }
}

Object.defineProperty(global, 'FileList', {
  value: MockFileList,
  writable: true,
});

// Mock de File para testes
class MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;

  constructor(name: string, size: number, type: string) {
    this.name = name;
    this.size = size;
    this.type = type;
    this.lastModified = Date.now();
  }

  // Adicionar métodos necessários para validação
  slice() {
    return new MockBlob();
  }
}

// Mock global do File
global.File = MockFile as any;
window.File = MockFile as any;

// Mock adicional para validação
Object.defineProperty(global, 'File', {
  value: MockFile,
  writable: true,
  configurable: true,
});

Object.defineProperty(window, 'File', {
  value: MockFile,
  writable: true,
  configurable: true,
});

// Mock específico para validação de imagens - simplificado
vi.mock('@/lib/validation', async () => {
  const actual = await vi.importActual('@/lib/validation');
  return {
    ...actual,
    validateImageFile: vi.fn((file: any) => {
      const errors: string[] = [];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!allowedTypes.includes(file.type)) {
        errors.push('Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.');
      }

      if (file.size > maxSize) {
        errors.push('Arquivo muito grande. Máximo 5MB.');
      }

      if (file.name && file.name.length > 255) {
        errors.push('Nome do arquivo muito longo.');
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    }),
  };
});

// Mock de Blob para testes
class MockBlob {
  size: number;
  type: string;

  constructor(parts?: any[], options?: any) {
    this.size = 0;
    this.type = options?.type || '';
  }
}

Object.defineProperty(global, 'Blob', {
  value: MockBlob,
  writable: true,
});

Object.defineProperty(window, 'Blob', {
  value: MockBlob,
  writable: true,
});

// Mock localStorage para testes
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

// Mock document.title
Object.defineProperty(document, 'title', {
  value: '',
  writable: true,
});

// Mock document.querySelector para favicon e meta tags
const originalQuerySelector = document.querySelector;
Object.defineProperty(document, 'querySelector', {
  value: vi.fn().mockImplementation(selector => {
    if (selector === 'link[rel="icon"]') {
      return { href: '' };
    }
    if (selector.includes('meta[')) {
      return { setAttribute: vi.fn(), getAttribute: vi.fn() };
    }
    return originalQuerySelector.call(document, selector);
  }),
  writable: true,
});

// Mock document.head.appendChild
Object.defineProperty(document.head, 'appendChild', {
  value: vi.fn(),
  writable: true,
});

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
  value: {
    style: {
      setProperty: vi.fn(),
    },
  },
  writable: true,
});

// Mock Supabase com cadeia completa
vi.mock('@/lib/supabase', () => {
  const mockSelect = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }),
    single: vi.fn().mockResolvedValue({ data: {}, error: null }),
    then: vi.fn().mockResolvedValue({ data: [], error: null }),
  });

  const mockSupabase = {
    from: vi.fn().mockReturnValue({
      select: mockSelect,
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
      update: vi.fn().mockResolvedValue({ data: {}, error: null }),
      delete: vi.fn().mockResolvedValue({ data: {}, error: null }),
    }),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'test-url' } }),
      }),
    },
  };

  return { supabase: mockSupabase };
});

// Mock adicional para AdminForm
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        then: vi.fn().mockImplementation(callback => {
          return Promise.resolve({ data: [], error: null }).then(callback);
        }),
      }),
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
      update: vi.fn().mockResolvedValue({ data: {}, error: null }),
      delete: vi.fn().mockResolvedValue({ data: {}, error: null }),
    }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: null, error: null }),
        remove: vi.fn().mockResolvedValue({ data: null, error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'mock-url' } }),
      }),
    },
  },
}));

// Mock adicional para AdminForm
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        then: vi.fn().mockImplementation(callback => {
          return Promise.resolve({ data: [], error: null }).then(callback);
        }),
      }),
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
      update: vi.fn().mockResolvedValue({ data: {}, error: null }),
      delete: vi.fn().mockResolvedValue({ data: {}, error: null }),
    }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: null, error: null }),
        remove: vi.fn().mockResolvedValue({ data: null, error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'mock-url' } }),
      }),
    },
  },
}));

// Mock SupabaseServer
vi.mock('@/lib/supabaseServer', () => ({
  createSupabaseServerClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
      }),
    }),
  })),
}));

// Mock Next/Image com priority como string
vi.mock('next/image', () => ({
  default: function MockedImage(props: any) {
    const { priority = false, ...restProps } = props || {};
    return React.createElement('img', {
      ...restProps,
      priority: priority ? 'true' : undefined,
    });
  },
}));

// Mock Next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));

// Mock Supabase server
vi.mock('@/lib/supabaseServer', () => ({
  createServerSupabaseClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ data: null, error: 'Mock error' }),
      }),
    }),
  }),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn(fn => fn),
    setValue: vi.fn(),
  })),
}));

if (typeof window !== 'undefined') {
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  window.ResizeObserver = MockResizeObserver;
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }
  window.IntersectionObserver = MockIntersectionObserver as any;
}

// Mock Radix UI Tooltip para testes
vi.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
  Root: ({ children }: { children: React.ReactNode }) => children,
  Trigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? children : React.createElement('div', { 'data-testid': 'tooltip-trigger' }, children),
  Portal: ({ children }: { children: React.ReactNode }) => children,
  Content: ({ children, side }: { children: React.ReactNode; side?: string }) =>
    React.createElement('div', { 'data-testid': 'tooltip-content', 'data-side': side }, children),
  Arrow: () => React.createElement('div', { 'data-testid': 'tooltip-arrow' }),
}));

// Suprimir apenas warnings específicos de React/Framer Motion
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    // Suprimir apenas erros específicos de React/Framer Motion
    const msg = args[0] || '';
    if (
      typeof msg === 'string' &&
      (msg.includes('not wrapped in act') ||
        msg.includes('React does not recognize the') ||
        msg.includes('Unknown event handler property'))
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  console.warn = (...args) => {
    // Suprimir apenas warnings específicos de React/Framer Motion
    const msg = args[0] || '';
    if (
      typeof msg === 'string' &&
      (msg.includes('not wrapped in act') ||
        msg.includes('React does not recognize the') ||
        msg.includes('Unknown event handler property'))
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
