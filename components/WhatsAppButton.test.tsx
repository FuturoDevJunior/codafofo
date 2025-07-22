import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { useCartStore } from '@/lib/store';
import {
  render,
  screen,
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
    
    // Mock da função selector que retorna apenas o array de items
    mockUseCartStore.mockImplementation((selector) => 
      selector({
        items: [],
        addItem: () => {},
        removeItem: () => {},
        updateQuantity: () => {},
        clearCart: () => {}
      })
    );
  });

  describe('componente WhatsApp', () => {
    it('renderiza link para contato direto no WhatsApp', () => {
      render(<WhatsAppButton />);
      
      const link = screen.getByRole('link', { name: /Fale no WhatsApp/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('https://api.whatsapp.com/send'));
      expect(link).toHaveAttribute('target', '_blank');
      expect(screen.getByText('Fale no WhatsApp')).toBeInTheDocument();
    });

    it('contém o número de telefone correto no link', () => {
      render(<WhatsAppButton />);
      
      const link = screen.getByRole('link', { name: /Fale no WhatsApp/i });
      expect(link).toHaveAttribute('href', expect.stringContaining('5521996192890'));
    });
  });
}); 