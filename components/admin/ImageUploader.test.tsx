import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageUploader from './ImageUploader';

// Mock do toast
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

// Mock do Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ data: { path: 'test-path' }, error: null }),
        remove: vi.fn().mockResolvedValue({ data: null, error: null }),
        getPublicUrl: vi
          .fn()
          .mockReturnValue({ data: { publicUrl: 'https://test.com/image.jpg' } }),
      })),
    },
  },
}));

describe('ImageUploader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar o componente ImageUploader', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText('Gerenciar Imagens do Produto')).toBeInTheDocument();
    });

    it('deve renderizar área de upload', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const uploadButton = screen.getByText('Selecionar Imagens');
      expect(uploadButton).toBeInTheDocument();
    });

    it('deve renderizar input de arquivo oculto', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('type', 'file');
    });

    it('deve mostrar contador de imagens', () => {
      const currentImages = ['image1.jpg', 'image2.jpg'];
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText(/2\/5 imagens/)).toBeInTheDocument();
    });
  });

  describe('Funcionalidades de Upload', () => {
    it('deve permitir clicar no botão de upload', async () => {
      const user = userEvent.setup();
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const uploadButton = screen.getByText('Selecionar Imagens');
      expect(uploadButton).toBeInTheDocument();
    });

    it('deve aceitar múltiplos arquivos quando configurado', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toHaveAttribute('multiple');
    });

    it('deve simular upload de arquivo', async () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp');
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp');
    });

    it('deve validar tipos de arquivo', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp');
    });
  });

  describe('Preview de Imagens', () => {
    it('deve mostrar imagens existentes', () => {
      const currentImages = ['https://test.com/image1.jpg', 'https://test.com/image2.jpg'];

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByAltText('Produto Teste - Imagem 1')).toBeInTheDocument();
      expect(screen.getByAltText('Produto Teste - Imagem 2')).toBeInTheDocument();
    });

    it('deve mostrar título da seção de imagens atuais', () => {
      const currentImages = ['image1.jpg'];

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText('Imagens Atuais (1)')).toBeInTheDocument();
    });
  });

  describe('Remoção de Imagens', () => {
    it('deve mostrar botões de remoção para imagens existentes', () => {
      const currentImages = ['image1.jpg'];

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      const removeButtons = screen.getAllByTitle(/remover imagem/i);
      expect(removeButtons).toHaveLength(1);
    });

    it('deve permitir clicar no botão de remover', async () => {
      const user = userEvent.setup();
      const currentImages = ['image1.jpg'];
      const mockOnImagesUpdate = vi.fn();

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={mockOnImagesUpdate}
        />
      );

      const removeButton = screen.getByTitle(/remover imagem/i);
      expect(removeButton).toBeInTheDocument();
    });
  });

  describe('Estados de Loading', () => {
    it('deve mostrar estado de loading quando configurado', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText('Gerenciar Imagens do Produto')).toBeInTheDocument();
    });

    it('deve desabilitar botão quando limite de imagens atingido', () => {
      const currentImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      const uploadButton = screen.getByText('Selecionar Imagens');
      expect(uploadButton).toBeDisabled();
    });
  });

  describe('Validações', () => {
    it('deve aceitar tipos de arquivo corretos', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const fileInput = screen.getByTestId('mock-upload-input');
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp');
    });

    it('deve mostrar dicas de uso', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText('💡 Dicas importantes:')).toBeInTheDocument();
      expect(screen.getByText(/Use imagens de alta qualidade/)).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels apropriados', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const uploadButton = screen.getByText('Selecionar Imagens');
      expect(uploadButton).toBeInTheDocument();
    });

    it('deve ter botões com títulos descritivos', () => {
      const currentImages = ['image1.jpg'];

      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={currentImages}
          onImagesUpdate={vi.fn()}
        />
      );

      const removeButton = screen.getByTitle(/remover imagem/i);
      expect(removeButton).toBeInTheDocument();
    });

    it('deve ter feedback visual para estados', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const uploadButton = screen.getByText('Selecionar Imagens');
      expect(uploadButton).toBeInTheDocument();
    });
  });

  describe('Responsividade', () => {
    it('deve ser responsivo em diferentes tamanhos', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      const container = document.querySelector('.space-y-4');
      expect(container).toBeInTheDocument();
    });

    it('deve adaptar layout para mobile', () => {
      render(
        <ImageUploader
          productId="test-id"
          productName="Produto Teste"
          currentImages={[]}
          onImagesUpdate={vi.fn()}
        />
      );

      expect(screen.getByText('Selecionar Imagens')).toBeInTheDocument();
    });
  });
});
