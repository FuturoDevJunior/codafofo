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

import ProductCarousel from './Carousel';

// Mock do SmartImage para retornar uma tag <img> simples
vi.mock('./SmartImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockImages = ['/img1.jpg', '/img2.jpg'];

describe('ProductCarousel', () => {
  it('renderiza todas as imagens no carousel', async () => {
    render(<ProductCarousel images={mockImages} />);
    
    // Usamos findAllByRole para aguardar a renderização das imagens mockadas
    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(2);

    expect(screen.getByAltText('Imagem 1')).toBeInTheDocument();
    expect(screen.getByAltText('Imagem 2')).toBeInTheDocument();
  });
});

afterEach(() => vi.clearAllMocks()); 