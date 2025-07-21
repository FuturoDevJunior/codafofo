import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  cn,
  formatCurrency,
} from './utils';

describe('utils', () => {
  it('cn combina classes corretamente', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c');
    expect(cn('a', { b: true, c: false })).toContain('a b');
  });
  it('formatCurrency formata BRL corretamente', () => {
    expect(formatCurrency(10, 'BRL')).toBe('R$ 10,00');
  });
  it('formatCurrency formata USD corretamente', () => {
    expect(formatCurrency(10, 'USD')).toMatch(/\$10\.00|US\$ 10,00/);
  });
}); 