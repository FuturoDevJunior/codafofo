import Image from 'next/image';
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
  default: ({ src, alt }: { src: string; alt: string }) => <Image src={src} alt={alt} width={100} height={100} />,
}));

const mockProducts = [
  {
    id: '1',
    name: 'Botox® 50U',
    slug: 'botox-50u',
    price_pix: 1200,
    price_card: 1300,
    images: ['/images/botox-50u.png'],
    category: 'Botox',
    currency: 'BRL',
  },
  {
    id: '2',
    name: 'Botox® 100U',
    slug: 'botox-100u',
    price_pix: 1950,
    price_card: 2100,
    images: ['/images/botox-100u.png'],
    category: 'Botox',
    currency: 'BRL',
  },
  {
    id: '3',
    name: 'Dysport® 300U',
    slug: 'dysport-300u',
    price_pix: 1400,
    price_card: 1500,
    images: ['/images/dysport-300u.png'],
    category: 'Dysport',
    currency: 'BRL',
  },
  {
    id: '4',
    name: 'Xeomin® 50U',
    slug: 'xeomin-50u',
    price_pix: 900,
    price_card: 1000,
    images: ['/images/xeomin-50u.png'],
    category: 'Xeomin',
    currency: 'BRL',
  },
  {
    id: '5',
    name: 'Xeomin® 100U',
    slug: 'xeomin-100u',
    price_pix: 1600,
    price_card: 1700,
    images: ['/images/xeomin-100u.png'],
    category: 'Xeomin',
    currency: 'BRL',
  },
  {
    id: '6',
    name: 'Viscosuplementação Articular',
    slug: 'visco-supl',
    price_pix: 2500,
    price_card: 2600,
    images: ['/images/visco-supl.png'],
    category: 'Visco-supl.',
    currency: 'BRL',
  },
];

describe('ProductCard', () => {
  it('renderiza nome, preço e categoria corretamente', () => {
    render(<ProductCard product={mockProducts[0]} />);
    expect(screen.getByText('Botox® 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.200,00')).toBeInTheDocument(); // Preço PIX
    expect(screen.getByText('R$ 1.300,00')).toBeInTheDocument(); // Preço Cartão
    expect(screen.getByText('Botox')).toBeInTheDocument();
  });

  it('inclui link para detalhes do produto', () => {
    render(<ProductCard product={mockProducts[0]} />);
    const link = screen.getByRole('link', { name: /Ver detalhes/i });
    expect(link).toHaveAttribute('href', '/products/botox-50u');
  });

  it('renderiza imagem com alt text', async () => {
    render(<ProductCard product={mockProducts[0]} />);
    const image = await screen.findByAltText('Foto do produto Botox® 50U');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/botox-50u.png');
  });
});

afterEach(() => vi.clearAllMocks()); 