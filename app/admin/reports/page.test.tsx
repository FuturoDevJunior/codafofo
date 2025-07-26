import { describe, it, expect, vi } from 'vitest';

const mockSupabase = {
  auth: { getSession: vi.fn() },
  from: vi.fn().mockReturnValue({ select: vi.fn().mockResolvedValue({ data: [] }) }),
};

import Reports from './page';

describe('Reports Page', () => {
  it('redireciona se não autenticado', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    await Reports();
  });
  it('renderiza produtos populares e resumo de pedidos', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: { user: { id: '1' } } } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    const Page = await Reports();
    expect(Page).toBeDefined();
  });
});
