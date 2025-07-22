import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { useCartStore } from './store';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });
  it('adiciona item ao carrinho', () => {
    useCartStore.getState().addItem({ id: '1', name: 'A', price: 10, price_pix: 10, price_card: 12, quantity: 1 });
    expect(useCartStore.getState().items).toHaveLength(1);
  });
  it('remove item do carrinho', () => {
    useCartStore.getState().addItem({ id: '1', name: 'A', price: 10, price_pix: 10, price_card: 12, quantity: 1 });
    useCartStore.getState().removeItem('1');
    expect(useCartStore.getState().items).toHaveLength(0);
  });
  it('atualiza quantidade', () => {
    useCartStore.getState().addItem({ id: '1', name: 'A', price: 10, price_pix: 10, price_card: 12, quantity: 1 });
    useCartStore.getState().updateQuantity('1', 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });
  it('clearCart esvazia o carrinho', () => {
    useCartStore.getState().addItem({ id: '1', name: 'A', price: 10, price_pix: 10, price_card: 12, quantity: 1 });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
  it('não permite quantidade menor que 1', () => {
    useCartStore.getState().addItem({ id: '1', name: 'A', price: 10, price_pix: 10, price_card: 12, quantity: 1 });
    useCartStore.getState().updateQuantity('1', 0);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });
}); 