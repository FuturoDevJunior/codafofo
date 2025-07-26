import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

// Mock básicos para evitar problemas
vi.mock('@radix-ui/react-portal', () => ({
  __esModule: true,
  Root: ({ children }: any) => children,
}));

vi.mock('@/lib/supabase', () => ({
  __esModule: true,
  supabase: {
    storage: {
      from: () => ({
        upload: async () => ({ data: { Key: 'mock' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: 'https://mock.com/img.png' } }),
        remove: async () => ({ data: {}, error: null }),
      }),
    },
  },
}));

describe('AdminDashboard - Testes Básicos', () => {
  const user = { id: '1', email: 'admin@vytalle.com.br', name: 'Admin' };
  const suppliers = [{ id: 'sup1', name: 'Fornecedor 1' }];
  const products = [
    {
      id: 'prod1',
      name: 'Produto Teste',
      category: 'Categoria',
      price_pix: 100,
      price_prazo: 120,
      description: 'desc',
      images: [],
      active: true,
      slug: 'produto-teste',
    },
  ];

  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (root?.parentNode) root.parentNode.removeChild(root);
    vi.clearAllMocks();
  });

  it('deve renderizar componente principal', () => {
    render(<AdminDashboard products={[]} suppliers={[]} user={user} />, { container: root });
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('deve exibir email do usuário', () => {
    render(<AdminDashboard products={[]} suppliers={[]} user={user} />, { container: root });
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('deve renderizar tabela de produtos', () => {
    render(<AdminDashboard products={products} suppliers={suppliers} user={user} />, {
      container: root,
    });
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
  });

  it('deve exibir botões de ação', () => {
    render(<AdminDashboard products={products} suppliers={suppliers} user={user} />, {
      container: root,
    });
    expect(screen.getByText(/novo produto/i)).toBeInTheDocument();
    expect(screen.getByText(/sair/i)).toBeInTheDocument();
  });

  it('deve mostrar estatísticas básicas', () => {
    render(<AdminDashboard products={products} suppliers={suppliers} user={user} />, {
      container: root,
    });
    expect(screen.getByTestId('admin-stats')).toBeInTheDocument();
    expect(screen.getByTestId('products-count')).toBeInTheDocument();
  });
});
