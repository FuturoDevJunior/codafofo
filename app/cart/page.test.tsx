import { describe, expect, it, vi } from 'vitest';

import { useCartStore } from '@/lib/store';
import { render, screen, within } from '@testing-library/react';

import Cart from './page';

vi.mock('@/lib/store');

describe('Cart Page', () => {
  it('mostra carrinho vazio', async () => {
    vi.mocked(useCartStore).mockReturnValue({
      items: [],
      clearCart: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    });
    render(<Cart />);
    expect(await screen.findByText(/Seu carrinho está vazio/i)).toBeInTheDocument();
  });

  it('mostra itens e total', async () => {
    const mockItems = [
      { id: '1', name: 'Botox® 50U', price: 1200, quantity: 1, images: ['/images/botox-50u.png'] },
      {
        id: '2',
        name: 'Botox® 100U',
        price: 1950,
        quantity: 1,
        images: ['/images/botox-100u.png'],
      },
      {
        id: '3',
        name: 'Dysport® 300U',
        price: 1400,
        quantity: 1,
        images: ['/images/dysport-300u.png'],
      },
      {
        id: '4',
        name: 'Xeomin® 50U',
        price: 900,
        quantity: 1,
        images: ['/images/xeomin-50u.png'],
      },
      {
        id: '5',
        name: 'Xeomin® 100U',
        price: 1600,
        quantity: 1,
        images: ['/images/xeomin-100u.png'],
      },
      {
        id: '6',
        name: 'Viscosuplementação Articular',
        price: 2500,
        quantity: 1,
        images: ['/images/visco-supl.png'],
      },
    ];
    vi.mocked(useCartStore).mockReturnValue({
      items: mockItems,
      clearCart: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<Cart />);
    // Encontra todos os cards dos produtos
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(mockItems.length);
    mockItems.forEach((item, idx) => {
      const card = cards[idx];
      expect(within(card).getByText(item.name)).toBeInTheDocument();
      expect(within(card).getByDisplayValue('1')).toBeInTheDocument();
      const priceElements = within(card).getAllByText(content =>
        content
          .replace(/\s|\u00a0/g, '')
          .includes(
            `R$${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`.replace(
              /\s|\u00a0/g,
              ''
            )
          )
      );
      expect(priceElements.length).toBeGreaterThan(0);
    });

    // Encontra o elemento 'Total:' no rodapé (matcher flexível)
    const totalLabel = await screen.findByText(
      content => content.replace(/\s|:/g, '').toLowerCase() === 'total'
    );
    const totalContainer = totalLabel.parentElement;
    expect(totalContainer).not.toBeNull();
    if (totalContainer) {
      const totalExpected = mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalFormatted = `R$ ${totalExpected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      expect(
        within(totalContainer).getByText(content =>
          content.replace(/\s|\u00a0/g, '').includes(totalFormatted.replace(/\s|\u00a0/g, ''))
        )
      ).toBeInTheDocument();
    }
  });
});
