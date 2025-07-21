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

import ProductCard from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Botox® 50U',
  slug: 'botox-50u',
  price: 1200,
  images: ['/test.jpg'],
  category: 'Botox',
  discount_percent: 0,
  stock: 10,
  currency: 'BRL',
};

describe('ProductCard', () => {
  it('renderiza nome, preço e categoria corretamente', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Botox® 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.200,00')).toBeInTheDocument();
    expect(screen.getByText('Botox')).toBeInTheDocument();
  });

  it('inclui link para detalhes do produto', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link', { name: /Ver detalhes/i });
    expect(link).toHaveAttribute('href', '/products/botox-50u');
  });

  it('renderiza imagem com alt text', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByAltText('Botox® 50U')).toBeInTheDocument();
  });
});

afterEach(() => vi.clearAllMocks()); 