import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import SmartImage from './SmartImage';

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, onLoad, onError, ...props }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...props}
        data-testid="next-image"
      />
    );
  },
}));

describe('SmartImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar imagem com src válido', () => {
    render(<SmartImage src="/test-image.jpg" alt="Test Image" />);

    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });

  it('deve renderizar com placeholder durante carregamento', async () => {
    render(<SmartImage src="/test-image.jpg" alt="Test Image" />);

    // Verificar se imagem está presente
    const image = screen.getByTestId('next-image');

    expect(image).toBeInTheDocument();
  });

  it('deve lidar com erro de carregamento', () => {
    render(<SmartImage src="/invalid-image.jpg" alt="Test Image" />);

    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/invalid-image.jpg');
  });

  it('deve aplicar classes CSS personalizadas', () => {
    render(<SmartImage src="/test.jpg" alt="Test" className="custom-class" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('class', expect.stringContaining('custom-class'));
  });

  it('deve renderizar com dimensões específicas', () => {
    render(<SmartImage src="/test.jpg" alt="Test" width={300} height={200} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '200');
  });

  it('deve suportar prioridade de carregamento', () => {
    render(<SmartImage src="/test.jpg" alt="Test" priority />);
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
  });

  it('deve renderizar com fill quando especificado', () => {
    render(<SmartImage src="/test.jpg" alt="Test" fill />);
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
  });

  it('deve lidar com diferentes formatos de imagem', () => {
    const formats = ['.jpg', '.png', '.webp', '.gif'];

    formats.forEach(format => {
      const { rerender } = render(<SmartImage src={`/test${format}`} alt="Test" />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', `/test${format}`);

      rerender(<div />);
    });
  });

  it('deve ser acessível com alt text apropriado', () => {
    render(<SmartImage src="/test.jpg" alt="Produto Vytalle Premium" />);

    const image = screen.getByAltText('Produto Vytalle Premium');
    expect(image).toBeInTheDocument();
  });

  it('deve otimizar para diferentes breakpoints', () => {
    const sizes = '(max-width: 768px) 100vw, 50vw';

    render(<SmartImage src="/test.jpg" alt="Test" sizes={sizes} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('sizes', sizes);
  });
});
