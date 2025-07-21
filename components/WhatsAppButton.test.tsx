import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import WhatsAppButton from './WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renderiza botão com link correto', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://wa.me/5562999999999');
    expect(link).toHaveAttribute('target', '_blank');
  });
});

afterEach(() => vi.clearAllMocks()); 