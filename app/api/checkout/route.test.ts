import { describe, it, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-url';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },
  })),
}));

let POST: typeof import('./route').POST;
beforeAll(async () => {
  ({ POST } = await import('./route'));
});

describe('API Checkout', () => {
  it('processa POST com dados válidos', async () => {
    const mockReq = { method: 'POST', json: async () => ({ customer_name: 'Test', items: [], total: 100 }) } as Request;
    const res = await POST(mockReq);
    expect(res.status).toBe(200);
  });
}); 