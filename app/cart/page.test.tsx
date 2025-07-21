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
  within,
} from '@testing-library/react';

import Cart from './page';

vi.mock('@/lib/store');

describe('Cart Page', () => {
  it('mostra carrinho vazio', async () => {
    vi.mocked(useCartStore).mockReturnValue({ items: [], clearCart: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn() });
    render(<Cart />);
    expect(await screen.findByText(/Seu carrinho está vazio/i)).toBeInTheDocument();
  });

  it('mostra itens e total', async () => {
    const mockItems = [{ id: '1', name: 'Botox', price: 1200, quantity: 1, images: ['/images/botox-50u.png'] }];
    vi.mocked(useCartStore).mockReturnValue({ items: mockItems, clearCart: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn() });

    render(<Cart />);
    // Encontra o card do item 'Botox'
    const card = await screen.findByTestId('card');
    expect(within(card).getByText('Botox')).toBeInTheDocument();
    expect(within(card).getByDisplayValue('1')).toBeInTheDocument();
    expect(within(card).getByText('R$ 1.200,00')).toBeInTheDocument(); // preço unitário

    // Encontra o elemento 'Total:' no rodapé (matcher flexível)
    const totalLabel = await screen.findByText((content) => content.replace(/\s|:/g, '').toLowerCase() === 'total');
    const totalContainer = totalLabel.parentElement;
    expect(totalContainer).not.toBeNull();
    if (totalContainer) {
      expect(within(totalContainer).getByText('R$ 1.200,00')).toBeInTheDocument();
    }
  });
}); 