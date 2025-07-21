import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

import React from 'react';

import { vi } from 'vitest';

// Definir variáveis de ambiente para testes
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-url';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';

// Mock window.open para jsdom
Object.defineProperty(window, 'open', {
  value: vi.fn(),
  writable: true,
});

// Mock Supabase com cadeia completa
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
        single: vi.fn().mockResolvedValue({ data: {}, error: null }),
        then: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
      update: vi.fn().mockResolvedValue({ data: {}, error: null }),
      delete: vi.fn().mockResolvedValue({ data: {}, error: null }),
    }),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
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
    const { priority, ...restProps } = props;
    return React.createElement('img', { 
      ...restProps, 
      priority: priority ? 'true' : undefined 
    }); 
  },
}));

// Mock Next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    setValue: vi.fn(),
  })),
})); 