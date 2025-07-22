import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock das variáveis de ambiente
const mockEnv = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://test-project.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key'
};

// Mock do createClient
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        }))
      }))
    }))
  }))
}));

describe('Supabase Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock process.env
    Object.keys(mockEnv).forEach(key => {
      vi.stubEnv(key, mockEnv[key as keyof typeof mockEnv]);
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('deve criar cliente Supabase', async () => {
    const { supabase } = await import('./supabase');
    
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(supabase.from).toBeDefined();
  });

  it('deve ter métodos de autenticação', async () => {
    const { supabase } = await import('./supabase');
    
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it('deve ter método from para queries', async () => {
    const { supabase } = await import('./supabase');
    
    expect(supabase).toBeDefined();
    expect(typeof supabase.from).toBe('function');
  });

  it('deve funcionar com configuração padrão', async () => {
    // Usar import dinâmico em vez de require
    await expect(async () => {
      await import('./supabase');
    }).not.toThrow();
  });
});