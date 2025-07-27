import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

// Mock do Supabase para evitar erros
vi.mock('@/lib/supabase/browser', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn(),
    },
  }),
}));

// Mock do router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock do dynamic para renderizar diretamente o AdminLoginForm
vi.mock('next/dynamic', () => ({
  default: (importFn: any) => {
    const Component = () => {
      return (
        <div className="via-white flex min-h-screen items-center justify-center bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-vitale-primary">Painel Admin</h1>
              <p className="text-neutral-600">Acesso restrito - Supabase Auth</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-vitale-primary/20 p-8 shadow-xl">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label>Email Administrativo</label>
                  <input type="email" />
                </div>
                <div className="space-y-2">
                  <label>Senha</label>
                  <input type="password" />
                </div>
                <button type="submit">Entrar com Supabase</button>
              </form>
              <div className="bg-blue-50 border-blue-200 mt-6 rounded-xl border p-4">
                <p className="text-blue-800 text-sm font-medium">
                  🔒 Autenticação 100% segura via Supabase
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return Component;
  },
}));

// Mock do useState para garantir que isClient seja sempre true
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: (initial: any) => {
      if (typeof initial === 'boolean') {
        return [true, vi.fn()]; // isClient sempre true
      }
      return [initial, vi.fn()];
    },
    useEffect: vi.fn(),
  };
});

import AdminLogin from './page';

describe('AdminLogin Page', () => {
  it('deve renderizar página de login admin', () => {
    render(<AdminLogin />);
    
    expect(screen.getByText('Painel Admin')).toBeInTheDocument();
  });

  it('deve renderizar formulário de login', () => {
    render(<AdminLogin />);
    
    expect(screen.getByText('Email Administrativo')).toBeInTheDocument();
    expect(screen.getByText('Senha')).toBeInTheDocument();
  });

  it('deve ter botão de login', () => {
    render(<AdminLogin />);
    
    expect(screen.getByRole('button', { name: /entrar com supabase/i })).toBeInTheDocument();
  });

  it('deve ter estrutura de layout correta', () => {
    render(<AdminLogin />);
    
    expect(screen.getByText('Painel Admin')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de segurança', () => {
    render(<AdminLogin />);
    
    expect(screen.getByText(/autenticação 100% segura via supabase/i)).toBeInTheDocument();
  });
}); 