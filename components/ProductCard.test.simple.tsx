import Image from 'next/image';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard';

// Mocks básicos
vi.mock('./SmartImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={100} height={100} />
  ),
}));

vi.mock('@/lib/store', () => ({
  useCartStore: vi.fn(() => ({
    addItem: vi.fn(),
    items: [],
  })),
}));

vi.mock('@/lib/analytics', () => ({
  useAnalytics: vi.fn(() => ({
    trackAddToCart: vi.fn(),
    trackPageView: vi.fn(),
  })),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockProduct = {
  id: '1',
  name: 'Botox® 50U',
  slug: 'botox-50u',
  price_pix: 1200,
  price_card: 1300,
  price_prazo: 1300,
  images: ['/images/botox-50u.png'],
  category: 'Botox',
  currency: 'BRL',
};

describe('ProductCard - Básico', () => {
  it('renderiza produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Botox® 50U')).toBeInTheDocument();
    expect(screen.getByText('Botox')).toBeInTheDocument();
  });

  it('renderiza preços', () => {
    render(<ProductCard product={mockProduct} />);

    // Procurar por qualquer texto que contenha R$
    const priceElements = screen.getAllByText(/R\$/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('tem botão adicionar ao carrinho', () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /adicionar/i });
    expect(addButton).toBeInTheDocument();
  });

  it('tem link para detalhes', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/products/botox-50u');
  });
});
