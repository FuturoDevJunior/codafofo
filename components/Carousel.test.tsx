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

const mockImages = ['/img1.jpg', '/img2.jpg'];

describe('ProductCarousel', () => {
  it('renderiza todas as imagens no carousel', () => {
    render(<ProductCarousel images={mockImages} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByAltText('Imagem 1')).toBeInTheDocument();
    expect(screen.getByAltText('Imagem 2')).toBeInTheDocument();
  });
});

afterEach(() => vi.clearAllMocks()); 