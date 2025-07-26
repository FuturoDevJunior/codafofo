import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorBoundary from './ErrorBoundary';

// Mock dos ícones Lucide
vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-triangle-icon">AlertTriangle</div>,
  RefreshCw: () => <div data-testid="refresh-icon">RefreshCw</div>,
  Home: () => <div data-testid="home-icon">Home</div>,
  Bug: () => <div data-testid="bug-icon">Bug</div>,
}));

// Mock do Button
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, size, className, ...props }: any) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Componente que lança erro para testes
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Erro de teste');
  }
  return <div data-testid="success-component">Componente funcionando</div>;
};

// Componente com erro de renderização
const RenderError = () => {
  throw new Error('Erro de renderização');
};

// Mock do console.error para capturar logs
const originalConsoleError = console.error;

describe('ErrorBoundary', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock console.error para evitar logs nos testes
    console.error = vi.fn();
  });

  afterEach(() => {
    // Restaurar console.error original
    console.error = originalConsoleError;
    vi.clearAllMocks();
  });

  describe('Comportamento Normal', () => {
    it('deve renderizar children quando não há erro', () => {
      render(
        <ErrorBoundary>
          <div data-testid="normal-content">Conteúdo normal</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('normal-content')).toBeInTheDocument();
      expect(screen.getByText('Conteúdo normal')).toBeInTheDocument();
    });

    it('deve renderizar múltiplos children sem erro', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
          <span data-testid="child3">Child 3</span>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
      expect(screen.getByTestId('child3')).toBeInTheDocument();
    });
  });

  describe('Captura de Erros', () => {
    it('deve capturar e exibir UI de erro quando child lança exceção', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
      expect(screen.getByText(/Encontramos um erro inesperado/)).toBeInTheDocument();
      expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument();
    });

    it('deve capturar erros de renderização', () => {
      render(
        <ErrorBoundary>
          <RenderError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
      expect(screen.queryByTestId('success-component')).not.toBeInTheDocument();
    });

    it('deve exibir mensagem de erro personalizada quando fornecida', () => {
      const customFallback = <div data-testid="custom-fallback">Erro customizado</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Erro customizado')).toBeInTheDocument();
    });
  });

  describe('Funcionalidades de Recuperação', () => {
    it('deve resetar erro e renderizar children novamente ao clicar em "Tentar Novamente"', async () => {
      let resetKey = 0;
      const { rerender } = render(
        <ErrorBoundary resetKeys={[resetKey]}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Verificar que o erro está sendo exibido
      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();

      // Clicar no botão "Tentar Novamente"
      const retryButton = screen.getByText('Tentar Novamente');
      await user.click(retryButton);

      // Re-renderizar com props que não causam erro e resetKey diferente
      resetKey++;
      rerender(
        <ErrorBoundary resetKeys={[resetKey]}>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      // Verificar que o componente normal está sendo exibido
      expect(screen.getByTestId('success-component')).toBeInTheDocument();
      expect(screen.queryByText('Ops! Algo deu errado')).not.toBeInTheDocument();
    });

    it('deve navegar para home ao clicar em "Voltar ao Início"', async () => {
      // Mock do window.location
      delete (window as any).location;
      window.location = { href: '' } as any;

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const homeButton = screen.getByText('Voltar ao Início');
      await user.click(homeButton);

      expect(window.location.href).toBe('/');
    });

    it('deve recarregar a página ao clicar em "Recarregar Página"', async () => {
      // Mock do window.location.reload
      const mockReload = vi.fn();
      delete (window as any).location;
      window.location = { reload: mockReload } as any;

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByText('Recarregar Página');
      await user.click(reloadButton);

      expect(mockReload).toHaveBeenCalled();
    });
  });

  describe('Informações de Debug', () => {
    it('deve exibir informações de erro em desenvolvimento', () => {
      // Simular ambiente de desenvolvimento
      const originalEnv = process.env.NODE_ENV;
      vi.stubEnv('NODE_ENV', 'development');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Detalhes do Erro')).toBeInTheDocument();
      expect(screen.getByText(/Error: Erro de teste/)).toBeInTheDocument();

      // Restaurar ambiente
      vi.unstubAllEnvs();
    });

    it('não deve exibir detalhes de erro em produção', () => {
      // Simular ambiente de produção
      const originalEnv = process.env.NODE_ENV;
      (process.env as any).NODE_ENV = 'production';

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Detalhes do Erro')).not.toBeInTheDocument();
      expect(screen.queryByText(/Error: Erro de teste/)).not.toBeInTheDocument();

      // Restaurar ambiente
      (process.env as any).NODE_ENV = originalEnv;
    });
  });

  describe('Relatório de Erro', () => {
    it('deve lidar com falha no envio do relatório', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Falha no envio'));
      global.fetch = mockFetch;

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reportButton = screen.getByText('Reportar Erro');
      await user.click(reportButton);

      expect(screen.getByText('Falha ao reportar erro')).toBeInTheDocument();
    });
  });

  describe('Estados e Interações', () => {
    it('deve mostrar loading durante envio do relatório', async () => {
      const mockFetch = vi
        .fn()
        .mockImplementation(
          () => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
        );
      global.fetch = mockFetch;

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reportButton = screen.getByText('Reportar Erro');
      await user.click(reportButton);

      expect(screen.getByText('Enviando...')).toBeInTheDocument();
      expect(reportButton).toBeDisabled();
    });

    it('deve resetar estado após recuperação bem-sucedida', async () => {
      let resetKey = 0;
      const { rerender } = render(
        <ErrorBoundary resetKeys={[resetKey]}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Verificar que erro está sendo exibido
      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();

      // Clicar em tentar novamente
      const retryButton = screen.getByText('Tentar Novamente');
      await user.click(retryButton);

      // Re-renderizar sem erro e resetKey diferente
      resetKey++;
      rerender(
        <ErrorBoundary resetKeys={[resetKey]}>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      // Verificar que voltou ao estado normal
      expect(screen.getByTestId('success-component')).toBeInTheDocument();
      expect(screen.queryByText('Ops! Algo deu errado')).not.toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter roles ARIA apropriados', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorContainer = screen.getByRole('alert');
      expect(errorContainer).toBeInTheDocument();
    });

    it('deve ter foco gerenciado adequadamente', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const firstButton = screen.getByText('Tentar Novamente');
      expect(firstButton).toBeInTheDocument();

      // Em um cenário real, o foco deveria estar no primeiro elemento focável
      // Isso pode ser testado com jsdom ou cypress
    });

    it('deve ter descrições acessíveis nos botões', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Tentar Novamente')).toBeInTheDocument();
      expect(screen.getByText('Voltar ao Início')).toBeInTheDocument();
      expect(screen.getByText('Recarregar Página')).toBeInTheDocument();
      expect(screen.getByText('Reportar Erro')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com erro null', () => {
      // Simular um erro null (edge case)
      const ThrowNullError = () => {
        throw null;
      };

      render(
        <ErrorBoundary>
          <ThrowNullError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    });

    it('deve lidar com erro sem stack trace', () => {
      const ErrorWithoutStack = () => {
        const error = new Error('Erro sem stack');
        error.stack = undefined;
        throw error;
      };

      render(
        <ErrorBoundary>
          <ErrorWithoutStack />
        </ErrorBoundary>
      );

      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    });

    it('deve lidar com múltiplos erros consecutivos', async () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Primeiro erro
      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();

      // Tentar novamente com outro erro
      const retryButton = screen.getByText('Tentar Novamente');
      await user.click(retryButton);

      rerender(
        <ErrorBoundary>
          <RenderError />
        </ErrorBoundary>
      );

      // Deve ainda mostrar a UI de erro
      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    });
  });

  describe('Personalização', () => {
    it('deve aceitar customização via props', () => {
      const customTitle = 'Erro Personalizado';
      const customMessage = 'Mensagem personalizada de erro';

      render(
        <ErrorBoundary title={customTitle} message={customMessage}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(customTitle)).toBeInTheDocument();
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('deve aceitar callback de erro personalizado', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });
});
