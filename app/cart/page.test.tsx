import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { useCartStore } from '@/lib/store';
import {
  render,
  screen,
} from '@testing-library/react';

import Cart from './page';

vi.mock('@/lib/store');

describe('Cart Page', () => {
  it('mostra carrinho vazio', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: [], removeItem: vi.fn(), updateQuantity: vi.fn() });
    render(<Cart />);
    expect(screen.getByText('Carrinho vazio.')).toBeInTheDocument();
  });

  it('mostra itens e total', () => {
    const mockItems = [{ id: '1', name: 'Botox', price: 1200, quantity: 1 }];
    vi.mocked(useCartStore).mockReturnValue({ items: mockItems, removeItem: vi.fn(), updateQuantity: vi.fn() });
    render(<Cart />);
    expect(screen.getByText('Botox x 1')).toBeInTheDocument();
    expect(screen.getByText('Total: R$ 1.200,00')).toBeInTheDocument();
  });
}); 