import { beforeAll, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdminLoginForm from './AdminLoginForm';

// Mock do Next.js Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock do Supabase
vi.mock('@/lib/supabase/browser', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
    },
  })),
}));

describe('AdminLoginForm', () => {
  const user = userEvent.setup();

  beforeAll(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar formulário de login', () => {
    render(<AdminLoginForm />);

    expect(screen.getByText('Painel Admin')).toBeInTheDocument();
    expect(screen.getByText('Acesso restrito - Supabase Auth')).toBeInTheDocument();
    expect(screen.getByText(/email administrativo/i)).toBeInTheDocument();
    expect(screen.getByText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar com supabase/i })).toBeInTheDocument();
  });

  it('deve ter email pré-preenchido', () => {
    render(<AdminLoginForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toHaveValue('admin@vytalle.com.br');
  });

  it('deve permitir alterar email', async () => {
    render(<AdminLoginForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('deve permitir digitar senha', async () => {
    render(<AdminLoginForm />);

    const passwordInput = screen.getByDisplayValue('');
    await user.type(passwordInput, 'senha123');

    expect(passwordInput).toHaveValue('senha123');
  });

  it('deve alternar visibilidade da senha', async () => {
    render(<AdminLoginForm />);

    const passwordInput = screen.getByDisplayValue('');
    const toggleButtons = screen.getAllByRole('button');
    const toggleButton = toggleButtons.find(
      btn =>
        (btn as HTMLButtonElement).type === 'button' &&
        btn !== screen.getByRole('button', { name: /entrar/i })
    );

    // Senha deve estar oculta por padrão
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Clicar para mostrar senha
    if (toggleButton) {
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Clicar para ocultar senha
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    }
  });

  it('deve ter ícones corretos', () => {
    render(<AdminLoginForm />);

    // Verificar se os ícones estão presentes (SVG)
    const shieldIcon = screen.getByText('Painel Admin').closest('div')?.querySelector('svg');
    expect(shieldIcon).toBeInTheDocument();
  });

  it('deve ter estrutura de layout correta', () => {
    const { container } = render(<AdminLoginForm />);

    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toHaveClass('flex', 'min-h-screen', 'items-center', 'justify-center');
  });

  it('deve ter gradiente de fundo', () => {
    const { container } = render(<AdminLoginForm />);

    const mainContainer = container.querySelector('.bg-gradient-to-br');
    expect(mainContainer).toHaveClass(
      'bg-gradient-to-br',
      'from-vitale-primary/10',
      'to-vitale-secondary/10'
    );
  });

  it('deve ter card com borda e sombra', () => {
    render(<AdminLoginForm />);

    const card = screen.getByText(/email administrativo/i).closest('form')?.parentElement;
    expect(card).toHaveClass('bg-white', 'rounded-2xl', 'shadow-xl');
  });

  it('deve ter botão com estilo correto', () => {
    render(<AdminLoginForm />);

    const button = screen.getByRole('button', { name: /entrar com supabase/i });
    expect(button).toHaveClass('bg-vitale-primary', 'text-white');
  });

  it('deve ter mensagem de segurança', () => {
    render(<AdminLoginForm />);

    expect(screen.getByText('🔒 Autenticação 100% segura via Supabase')).toBeInTheDocument();
  });

  it('deve ter campos obrigatórios marcados', () => {
    render(<AdminLoginForm />);

    expect(screen.getAllByText('*')).toHaveLength(2);
  });

  it('deve ter inputs com tamanho adequado', () => {
    render(<AdminLoginForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByDisplayValue('');

    expect(emailInput).toHaveClass('text-lg');
    expect(passwordInput).toHaveClass('text-lg');
  });

  it('deve ter autocomplete configurado', () => {
    render(<AdminLoginForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByDisplayValue('');

    expect(emailInput).toHaveAttribute('autocomplete', 'username');
    expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
  });
});
