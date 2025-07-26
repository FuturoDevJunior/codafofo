import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploader from './ImageUploader';

// Mock do Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'test-product-1/mock-image.jpg' },
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://supabase.co/storage/test-product-1/mock-image.jpg' },
        }),
        remove: vi.fn().mockResolvedValue({ error: null }),
      })),
    },
  },
}));

// Mock do Next/Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} data-testid="optimized-image" />
  ),
}));

// Mock dos ícones Lucide
vi.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon">Upload</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  AlertCircle: () => <div data-testid="alert-icon">AlertCircle</div>,
  Image: () => <div data-testid="image-icon">Image</div>,
}));

// Mock do Button
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className, variant, size, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}));

const defaultProps = {
  productId: 'test-product-1',
  productName: 'Produto Teste',
  currentImages: ['https://example.com/image1.jpg'],
  onImagesUpdate: vi.fn(),
  maxImages: 5,
};

describe('ImageUploader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('Renderização Inicial', () => {
    it('deve renderizar o header com informações do produto', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText('Gerenciar Imagens do Produto')).toBeInTheDocument();
      expect(screen.getByText('Produto Teste')).toBeInTheDocument();
      expect(screen.getByText(/1\/5 imagens/)).toBeInTheDocument();
    });

    it('deve renderizar a área de upload', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText('Adicionar Novas Imagens')).toBeInTheDocument();
      expect(
        screen.getByText('Clique para selecionar ou arraste as imagens aqui')
      ).toBeInTheDocument();
      expect(
        screen.getByText('JPG, PNG, WEBP até 5MB cada • Máximo 5 imagens')
      ).toBeInTheDocument();
      expect(screen.getByText('Selecionar Imagens')).toBeInTheDocument();
    });

    it('deve renderizar imagens atuais', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText('Imagens Atuais (1)')).toBeInTheDocument();
      expect(screen.getByText('Imagem 1')).toBeInTheDocument();
      expect(screen.getByTestId('optimized-image')).toBeInTheDocument();
    });
  });

  describe('Validação de Arquivos', () => {
    it('deve rejeitar arquivo com tipo inválido', () => {
      render(<ImageUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      const invalidFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      // Avançar timers para processar state updates
      vi.advanceTimersByTime(200);

      // Buscar diretamente por elemento que contém o texto de erro
      const errorMessage = screen.getByText('Apenas arquivos JPG, PNG e WEBP são permitidos');
      expect(errorMessage).toBeInTheDocument();
    });

    it('deve rejeitar arquivo muito grande', async () => {
      render(<ImageUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      const largeFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 }); // 10MB

      fireEvent.change(fileInput, { target: { files: [largeFile] } });

      expect(screen.getByText('Cada imagem deve ter no máximo 5MB')).toBeInTheDocument();
    });

    it('deve rejeitar quando excede limite de imagens', async () => {
      const propsWithMaxImages = {
        ...defaultProps,
        currentImages: Array(5).fill('image.jpg'),
      };

      render(<ImageUploader {...propsWithMaxImages} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      const newFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.change(fileInput, { target: { files: [newFile] } });

      expect(screen.getByText('Máximo de 5 imagens permitidas por produto')).toBeInTheDocument();
    });
  });

  describe('Estados Especiais', () => {
    it('deve desabilitar upload quando limite é atingido', () => {
      const propsWithMaxImages = {
        ...defaultProps,
        currentImages: Array(5).fill('image.jpg'),
      };

      render(<ImageUploader {...propsWithMaxImages} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      const uploadButton = screen.getByTestId('mock-upload-button');

      expect(fileInput).toBeDisabled();
      expect(uploadButton).toBeDisabled();
    });

    it('deve mostrar estado sem imagens', () => {
      const propsWithoutImages = {
        ...defaultProps,
        currentImages: [],
      };

      render(<ImageUploader {...propsWithoutImages} />);

      expect(screen.getByText(/0\/5 imagens/)).toBeInTheDocument();
      expect(screen.queryByText('Imagens Atuais')).not.toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels e descrições acessíveis', () => {
      render(<ImageUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp');
      expect(fileInput).toHaveAttribute('multiple');
    });

    it('deve ter alt text adequado nas imagens', () => {
      render(<ImageUploader {...defaultProps} />);

      const image = screen.getByTestId('optimized-image');
      expect(image).toHaveAttribute('alt', 'Produto Teste - Imagem 1');
    });
  });

  describe('Interface', () => {
    it('deve renderizar dicas importantes', () => {
      render(<ImageUploader {...defaultProps} />);

      expect(screen.getByText('💡 Dicas importantes:')).toBeInTheDocument();
      expect(screen.getByText(/Use imagens de alta qualidade/)).toBeInTheDocument();
      expect(screen.getByText(/A primeira imagem será a principal/)).toBeInTheDocument();
    });

    it('deve permitir fechar mensagens de erro', async () => {
      render(<ImageUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('mock-upload-input');
      const invalidFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      expect(
        screen.getByText('Apenas arquivos JPG, PNG e WEBP são permitidos')
      ).toBeInTheDocument();

      // Buscar especificamente o botão de fechar da mensagem de erro
      const closeButton = screen.getByTitle('Fechar mensagem de erro');
      fireEvent.click(closeButton);

      expect(
        screen.queryByText('Apenas arquivos JPG, PNG e WEBP são permitidos')
      ).not.toBeInTheDocument();
    });
  });
});
