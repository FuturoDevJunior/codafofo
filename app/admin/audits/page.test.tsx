import { describe, expect, it, vi } from 'vitest';

import Audits from './page';

const mockSupabase = {
  auth: { getSession: vi.fn() },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [] }),
    }),
  }),
};

describe('Audits Page', () => {
  it('redireciona se não autenticado', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    await Audits();
  });
  it('renderiza tabela de auditoria', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: { user: { id: '1' } } } });
    vi.mock('@/lib/supabaseServer', () => ({ createServerSupabaseClient: () => mockSupabase }));
    const Page = await Audits();
    expect(Page).toBeDefined();
  });
});
