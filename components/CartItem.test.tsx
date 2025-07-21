import {
  afterEach,
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

import CartItem from './CartItem';

const mockItem = { id: '1', name: 'Botox', price: 1200, quantity: 2 };
const onRemove = vi.fn();
const onUpdateQty = vi.fn();

describe('CartItem', () => {
  afterEach(() => vi.clearAllMocks());

  it('renderiza item com subtotal correto', () => {
    render(<CartItem item={mockItem} onRemove={onRemove} onUpdateQty={onUpdateQty} />);
    expect(screen.getByText('Botox x 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 2.400,00')).toBeInTheDocument();
  });

  it('chama onUpdateQty ao mudar quantidade', () => {
    render(<CartItem item={mockItem} onRemove={onRemove} onUpdateQty={onUpdateQty} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    expect(onUpdateQty).toHaveBeenCalledWith('1', 3);
  });

  it('chama onRemove ao clicar remover', () => {
    render(<CartItem item={mockItem} onRemove={onRemove} onUpdateQty={onUpdateQty} />);
    fireEvent.click(screen.getByText('Remover'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });
}); 