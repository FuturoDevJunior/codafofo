import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import ProductDetailClient from './ProductDetailClient';

vi.mock('@/lib/store', () => ({
  useCartStore: (selector: any) => selector({ addItem: addItemMock }),
}));

const addItemMock = vi.fn();

const mockProduct = {
  id: '1',
  name: 'Produto',
  category: 'Test',
  images: ['img1.jpg'],
  price_pix: 10,
  price_card: 12,
  currency: 'BRL',
  description: 'desc',
  slug: 'produto-slug'
};

describe('ProductDetailClient', () => {
  it('renderiza input e botão', () => {
    render(<ProductDetailClient product={mockProduct} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByText('Adicionar ao Carrinho')).toBeInTheDocument();
  });
  it('altera quantidade e chama addItem', () => {
    render(<ProductDetailClient product={mockProduct} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
    fireEvent.click(screen.getByText('Adicionar ao Carrinho'));
    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        name: 'Produto',
        price: 10, // price_pix
        quantity: 3,
        images: ['img1.jpg'],
        category: 'Test'
      })
    );
  });
}); 