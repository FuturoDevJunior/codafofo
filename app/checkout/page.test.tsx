import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { useCartStore } from '@/lib/store';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Checkout from './page';

vi.mock('@/lib/store');

describe('Checkout Page', () => {
  it('valida campos e envia pedido', async () => {
    vi.mocked(useCartStore).mockReturnValue({ items: [], clearCart: vi.fn() });
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    render(<Checkout />);
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Enviar via WhatsApp'));
    expect(global.fetch).toHaveBeenCalled();
  });
}); 