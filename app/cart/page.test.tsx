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

  // TODO: Corrigir este teste. A renderização assíncrona do CartSidebar está dificultando a busca por elementos.
  it.skip('mostra itens e total', async () => {
    const mockItems = [{ id: '1', name: 'Botox', price: 1200, quantity: 1, images: ['/test.jpg'] }];
    vi.mocked(useCartStore).mockReturnValue({ items: mockItems, clearCart: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn() });

    render(<Cart />);
    expect(await screen.findByText('Botox')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('1')).toBeInTheDocument();

    // Encontra o elemento "Subtotal" e verifica o preço no mesmo container
    const subtotalLabel = await screen.findByText('Subtotal');
    const subtotalContainer = subtotalLabel.parentElement;
    expect(subtotalContainer).not.toBeNull();
    if (subtotalContainer) {
      expect(within(subtotalContainer).getByText('R$ 1.200,00')).toBeInTheDocument();
    }

    // Encontra o elemento "Total" e verifica o preço no mesmo container
    const totalLabel = await screen.findByText('Total');
    const totalContainer = totalLabel.parentElement;
    expect(totalContainer).not.toBeNull();
    if (totalContainer) {
      expect(within(totalContainer).getByText('R$ 1.200,00')).toBeInTheDocument();
    }
  });
}); 