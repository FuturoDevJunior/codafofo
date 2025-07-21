import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { useCartStore } from '@/lib/store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import WhatsAppButton from './WhatsAppButton';

// Mock do useCartStore e useAnalytics
vi.mock('@/lib/store');
vi.mock('@/lib/analytics', () => ({
  useAnalytics: () => ({
    trackWhatsAppRedirect: vi.fn(),
    trackLead: vi.fn(),
  }),
}));

describe('WhatsAppButton', () => {
  const mockUseCartStore = vi.mocked(useCartStore);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('com carrinho vazio', () => {
    it('renderiza link para contato direto no WhatsApp', () => {
      mockUseCartStore.mockReturnValue([]);
      render(<WhatsAppButton />);
      
      const link = screen.getByTestId('whatsapp-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/'));
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('com itens no carrinho', () => {
    it('abre o formulário modal ao ser clicado', async () => {
      mockUseCartStore.mockReturnValue([{ id: '1', name: 'Botox', price: 1200, quantity: 1, images: [] }]);
      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /Finalizar pedido/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Finalizar Pedido/i })).toBeInTheDocument();
      });
    });
  });
}); 