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

describe('ProductDetailClient', () => {
  it('renderiza input e botão', () => {
    render(<ProductDetailClient product={{ id: '1', name: 'Produto', price: 10 }} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByText('Adicionar ao Carrinho')).toBeInTheDocument();
  });
  it('altera quantidade e chama addItem', () => {
    render(<ProductDetailClient product={{ id: '1', name: 'Produto', price: 10 }} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
    fireEvent.click(screen.getByText('Adicionar ao Carrinho'));
    expect(addItemMock).toHaveBeenCalledWith({ id: '1', name: 'Produto', price: 10, quantity: 3 });
  });
}); 