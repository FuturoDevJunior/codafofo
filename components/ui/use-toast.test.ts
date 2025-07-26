import { describe, expect, it } from 'vitest';

import { reducer, toast } from './use-toast';

describe('use-toast', () => {
  it('adiciona toast', () => {
    const state = { toasts: [] };
    const next = reducer(state, { type: 'ADD_TOAST', toast: { id: '1', open: true } });
    expect(next.toasts.length).toBe(1);
  });
  it('atualiza toast', () => {
    const state = { toasts: [{ id: '1', open: true, title: 'A' }] };
    const next = reducer(state, { type: 'UPDATE_TOAST', toast: { id: '1', title: 'B' } });
    expect(next.toasts[0].title).toBe('B');
  });
  it('descarta toast', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const next = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' });
    expect(next.toasts[0].open).toBe(false);
  });
  it('remove toast', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const next = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' });
    expect(next.toasts.length).toBe(0);
  });
  it('toast retorna id e funções', () => {
    const t = toast({ title: 'X' });
    expect(t).toHaveProperty('id');
    expect(typeof t.dismiss).toBe('function');
    expect(typeof t.update).toBe('function');
  });
});
