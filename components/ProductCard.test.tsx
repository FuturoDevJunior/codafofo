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

// Mock do SmartImage para retornar uma tag <img> simples para este teste
vi.mock('./SmartImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockProducts = [
  {
    id: '1',
    name: 'Botox® 50U',
    slug: 'botox-50u',
    price: 1200,
    images: ['/images/botox-50u.png'],
    category: 'Botox',
    discount_percent: 0,
    currency: 'BRL',
  },
  {
    id: '2',
    name: 'Botox® 100U',
    slug: 'botox-100u',
    price: 1950,
    images: ['/images/botox-100u.png'],
    category: 'Botox',
    discount_percent: 0,
    currency: 'BRL',
  },
  {
    id: '3',
    name: 'Dysport® 300U',
    slug: 'dysport-300u',
    price: 1400,
    images: ['/images/dysport-300u.png'],
    category: 'Dysport',
    discount_percent: 0,
    currency: 'BRL',
  },
  {
    id: '4',
    name: 'Xeomin® 50U',
    slug: 'xeomin-50u',
    price: 900,
    images: ['/images/xeomin-50u.png'],
    category: 'Xeomin',
    discount_percent: 0,
    currency: 'BRL',
  },
  {
    id: '5',
    name: 'Xeomin® 100U',
    slug: 'xeomin-100u',
    price: 1600,
    images: ['/images/xeomin-100u.png'],
    category: 'Xeomin',
    discount_percent: 0,
    currency: 'BRL',
  },
  {
    id: '6',
    name: 'Viscosuplementação Articular',
    slug: 'visco-supl',
    price: 2500,
    images: ['/images/visco-supl.png'],
    category: 'Visco-supl.',
    discount_percent: 0,
    currency: 'BRL',
  },
];

describe('ProductCard', () => {
  it('renderiza nome, preço e categoria corretamente', () => {
    render(<ProductCard product={mockProducts[0]} />);
    expect(screen.getByText('Botox® 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.200,00')).toBeInTheDocument();
    expect(screen.getByText('Botox')).toBeInTheDocument();
  });

  it('inclui link para detalhes do produto', () => {
    render(<ProductCard product={mockProducts[0]} />);
    const link = screen.getByRole('link', { name: /Ver detalhes/i });
    expect(link).toHaveAttribute('href', '/products/botox-50u');
  });

  it('renderiza imagem com alt text', async () => {
    render(<ProductCard product={mockProducts[0]} />);
    const image = await screen.findByAltText('Imagem do produto Botox® 50U');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/botox-50u.png');
  });
});

afterEach(() => vi.clearAllMocks()); 