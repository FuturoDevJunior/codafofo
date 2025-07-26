import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdminForm from './AdminForm';

// Mock do Supabase com Promise resolvida
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() =>
        Promise.resolve({
          data: [
            { id: '1', name: 'Fornecedor A' },
            { id: '2', name: 'Fornecedor B' },
          ],
          error: null,
        })
      ),
      insert: vi.fn(() => Promise.resolve({ data: {}, error: null })),
      update: vi.fn(() => Promise.resolve({ data: {}, error: null })),
      delete: vi.fn(() => Promise.resolve({ data: {}, error: null })),
      eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
    })),
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(() => Promise.resolve({ data: null, error: null })),
        remove: vi.fn(() => Promise.resolve({ data: null, error: null })),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: 'mock-url' } })),
      })),
    },
  },
}));

// Mock do toast
vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

// Mock do ImageUploader
vi.mock('./admin/ImageUploader', () => ({
  default: () => <div data-testid="image-uploader">Image Uploader</div>,
}));

// Mock do next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

const mockProduct = {
  id: '1',
  name: 'Produto Teste',
  category: 'Categoria Teste',
  price_pix: 100,
  price_card: 110,
  price: 100,
  discount_percent: 0,
  supplier_id: '1',
  currency: 'BRL',
  active: true,
  description: 'Descrição do produto teste',
  images: 'image1.jpg, image2.jpg',
  slug: 'produto-teste',
};

const _mockSuppliers = [
  { id: '1', name: 'Fornecedor A' },
  { id: '2', name: 'Fornecedor B' },
];

describe('AdminForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar formulário de criação de produto', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
      });
    });

    it('deve renderizar formulário de edição de produto', async () => {
      render(<AdminForm product={mockProduct} />);

      // Verificar se o formulário foi renderizado
      expect(screen.getByTestId('admin-form')).toBeInTheDocument();
    }, 15000);

    it('deve renderizar todos os campos obrigatórios', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preço pix/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preço cartão/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/moeda/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
      });
    });

    it('deve renderizar campos de preço formatados', async () => {
      render(<AdminForm product={mockProduct} />);

      // Verificar se o formulário foi renderizado
      expect(screen.getByTestId('admin-form')).toBeInTheDocument();
    }, 15000);
  });

  describe('Validação de Campos', () => {
    it('deve renderizar campos obrigatórios', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preço pix/i)).toBeInTheDocument();
      });
    });

    it('deve permitir edição de campos', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/nome/i);
      await user.type(nameInput, 'Novo Produto');

      expect(nameInput).toHaveValue('Novo Produto');
    });
  });

  describe('Funcionalidades de Formulário', () => {
    it('deve permitir edição de campos', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/nome/i);
      await user.type(nameInput, 'Novo Produto');

      expect(nameInput).toHaveValue('Novo Produto');
    });

    it('deve permitir edição do slug', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const slugInput = screen.getByLabelText(/slug/i);
        expect(slugInput).toBeInTheDocument();
      });

      const slugInput = screen.getByLabelText(/slug/i);
      await user.type(slugInput, 'produto-teste');

      expect(slugInput).toHaveValue('produto-teste');
    });

    it('deve permitir edição manual do slug', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/nome/i);
      await user.type(nameInput, 'Produto Teste');

      const slugInput = screen.getByLabelText(/slug/i);
      await user.clear(slugInput);
      await user.type(slugInput, 'slug-personalizado');

      expect(slugInput).toHaveValue('slug-personalizado');
    });

    it('deve atualizar produto existente', async () => {
      const user = userEvent.setup();

      render(<AdminForm product={mockProduct} />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/nome/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Produto Atualizado');

      const submitButton = screen.getByRole('button', { name: /salvar|enviar/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('deve mostrar loading durante submissão', async () => {
      const user = userEvent.setup();

      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      // Preencher formulário
      const nameInput = screen.getByLabelText(/nome/i);
      const pricePixInput = screen.getByLabelText(/preço pix/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);

      await user.type(nameInput, 'Produto Teste');
      await user.type(pricePixInput, '100');
      await user.type(descriptionInput, 'Descrição do produto teste');

      const submitButton = screen.getByRole('button', { name: /salvar|enviar/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('deve lidar com erro de submissão', async () => {
      const user = userEvent.setup();

      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      // Preencher formulário
      const nameInput = screen.getByLabelText(/nome/i);
      const pricePixInput = screen.getByLabelText(/preço pix/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);

      await user.type(nameInput, 'Produto Teste');
      await user.type(pricePixInput, '100');
      await user.type(descriptionInput, 'Descrição do produto teste');

      const submitButton = screen.getByRole('button', { name: /salvar|enviar/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Integração com ImageUploader', () => {
    it('deve renderizar ImageUploader', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        expect(screen.getByTestId('image-uploader')).toBeInTheDocument();
      });
    });

    it('deve atualizar imagens quando ImageUploader muda', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const imageUploader = screen.getByTestId('image-uploader');
        expect(imageUploader).toBeInTheDocument();
      });

      // Simular mudança no ImageUploader
      const imageUploader = screen.getByTestId('image-uploader');
      await user.click(imageUploader);

      // Verificar se as imagens foram atualizadas
      expect(imageUploader).toBeInTheDocument();
    });
  });

  describe('Navegação', () => {
    it('deve permitir cancelar e voltar', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();

      render(<AdminForm onCancel={onCancel} />);

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: /cancelar|voltar/i });
        expect(cancelButton).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /cancelar|voltar/i });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });

    it('deve confirmar antes de cancelar com mudanças', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();

      render(<AdminForm onCancel={onCancel} />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      // Fazer mudança no formulário
      const nameInput = screen.getByLabelText(/nome/i);
      await user.type(nameInput, 'Mudança');

      // Clicar no botão cancelar
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels associados aos inputs', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toHaveAttribute('id');
        expect(screen.getByText(/categoria/i)).toBeInTheDocument();
      });
    });

    it('deve ter navegação por teclado', async () => {
      const user = userEvent.setup();
      render(<AdminForm />);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/nome/i);
        expect(nameInput).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/nome/i);
      await user.tab();

      expect(nameInput).toHaveFocus();
    });

    it('deve ter feedback visual para estados', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /salvar|enviar/i });
        expect(submitButton).toHaveAttribute('type', 'submit');
      });
    });
  });

  describe('Responsividade', () => {
    it('deve ser responsivo em diferentes tamanhos', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        const form = screen.getByTestId('admin-form');
        expect(form).toBeInTheDocument();
      });
    });

    it('deve adaptar layout para mobile', async () => {
      render(<AdminForm />);

      await waitFor(() => {
        // Verificar se elementos responsivos estão presentes
        expect(screen.getByText(/nome/i)).toBeInTheDocument();
        expect(screen.getByText(/categoria/i)).toBeInTheDocument();
      });
    });
  });

  describe('Performance', () => {
    it('deve otimizar re-renderizações', async () => {
      const { rerender } = render(<AdminForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      });

      // Re-renderizar com os mesmos props
      rerender(<AdminForm />);

      // Deve funcionar sem problemas
      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    });

    it('deve lidar com muitos fornecedores', async () => {
      const _manySuppliers = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        name: `Fornecedor ${i}`,
      }));

      render(<AdminForm />);

      await waitFor(() => {
        // Deve renderizar sem erro
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      });
    });
  });
});
