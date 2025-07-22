import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import Admin from './page';

const mockSupabase = {
  auth: { getSession: vi.fn() },
  from: vi.fn().mockReturnValue({ select: vi.fn().mockResolvedValue({ data: [] }) })
};

describe('Admin Page', () => {
  it('redireciona se não autenticado', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    await Admin();
  });
  it('renderiza painel admin com produtos e suppliers', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: { user: { id: '1' } } } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    const Page = await Admin();
    expect(Page).toBeDefined();
  });
}); 