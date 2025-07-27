import { useRouter } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { act, render, screen, waitFor } from '@testing-library/react';

import ProtectedRoute from './ProtectedRoute';

// Mock do Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock simples do Supabase
vi.mock('@/lib/supabase/browser', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: null },
        error: null,
      }),
    },
  })),
}));

describe('ProtectedRoute', () => {
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
  });

  it('deve renderizar loading inicialmente', () => {
    act(() => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    expect(screen.getByText('Verificando autenticação...')).toBeInTheDocument();
  });

  it('deve renderizar children quando usuário está autenticado', async () => {
    // Mock do Supabase para retornar usuário autenticado
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: '1', email: 'test@example.com' } },
          error: null,
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
    });
  });

  it('deve redirecionar para login quando usuário não está autenticado', async () => {
    // Mock do Supabase para retornar usuário não autenticado
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('deve redirecionar para login quando há erro na autenticação', async () => {
    // Mock do Supabase para retornar erro
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: new Error('Auth error'),
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('deve aceitar redirectTo personalizado', async () => {
    // Mock do Supabase para retornar usuário não autenticado
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute redirectTo='/custom-login'>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/custom-login');
    });
  });

  it('deve renderizar múltiplos children quando autenticado', async () => {
    // Mock do Supabase para retornar usuário autenticado
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: '1', email: 'test@example.com' } },
          error: null,
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute>
          <div>Child 1</div>
          <div>Child 2</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  it('deve funcionar com componentes complexos quando autenticado', async () => {
    // Mock do Supabase para retornar usuário autenticado
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: '1', email: 'test@example.com' } },
          error: null,
        }),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    const ComplexComponent = () => (
      <div>
        <h1>Título</h1>
        <p>Parágrafo</p>
        <button>Botão</button>
      </div>
    );

    await act(async () => {
      render(
        <ProtectedRoute>
          <ComplexComponent />
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Parágrafo')).toBeInTheDocument();
      expect(screen.getByText('Botão')).toBeInTheDocument();
    });
  });

  it('deve lidar com erro na verificação de autenticação', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Mock do Supabase para retornar erro
    const { createClient } = await import('@/lib/supabase/browser');
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockRejectedValue(new Error('Network error')),
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);

    await act(async () => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/login');
    });
    consoleErrorSpy.mockRestore();
  });

  it('deve ter estrutura de loading adequada', () => {
    act(() => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    const loadingContainer = screen.getByText('Verificando autenticação...').closest('div');
    expect(loadingContainer).toHaveClass('text-center');

    // Verificar o container principal
    const mainContainer = screen
      .getByText('Verificando autenticação...')
      .closest('div')?.parentElement;
    expect(mainContainer).toHaveClass('flex', 'min-h-screen', 'items-center', 'justify-center');
  });

  it('deve ter spinner de loading', () => {
    act(() => {
      render(
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      );
    });

    expect(screen.getByText('Verificando autenticação...')).toBeInTheDocument();
  });
});
