import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadingButton } from './loading-button';

describe('LoadingButton', () => {
  describe('Renderização Básica', () => {
    it('deve renderizar botão com texto', () => {
      render(<LoadingButton>Clique aqui</LoadingButton>);

      const button = screen.getByRole('button', { name: /clique aqui/i });
      expect(button).toBeInTheDocument();
    });

    it('deve renderizar como disabled quando loading', () => {
      render(<LoadingButton loading>Carregando</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve mostrar spinner quando loading', () => {
      render(<LoadingButton loading>Carregando</LoadingButton>);

      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });
  });

  describe('Estados do Botão', () => {
    it('deve estar habilitado por padrão', () => {
      render(<LoadingButton>Normal</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('deve aplicar disabled quando prop disabled é true', () => {
      render(<LoadingButton disabled>Desabilitado</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve aplicar disabled quando loading é true', () => {
      render(<LoadingButton loading>Carregando</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve estar disabled quando ambos disabled e loading são true', () => {
      render(
        <LoadingButton disabled loading>
          Ambos
        </LoadingButton>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Interações', () => {
    it('deve chamar onClick quando clicado', async () => {
      const mockClick = vi.fn();
      const user = userEvent.setup();

      render(<LoadingButton onClick={mockClick}>Clique</LoadingButton>);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onClick quando disabled', async () => {
      const mockClick = vi.fn();
      const user = userEvent.setup();

      render(
        <LoadingButton disabled onClick={mockClick}>
          Desabilitado
        </LoadingButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockClick).not.toHaveBeenCalled();
    });

    it('não deve chamar onClick quando loading', async () => {
      const mockClick = vi.fn();
      const user = userEvent.setup();

      render(
        <LoadingButton loading onClick={mockClick}>
          Carregando
        </LoadingButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockClick).not.toHaveBeenCalled();
    });

    it('deve funcionar com navegação por teclado', async () => {
      const mockClick = vi.fn();
      const user = userEvent.setup();

      render(<LoadingButton onClick={mockClick}>Teclado</LoadingButton>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(mockClick).toHaveBeenCalled();
    });
  });

  describe('Variantes e Estilos', () => {
    it('deve aplicar variant padrão', () => {
      render(<LoadingButton>Padrão</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('deve aplicar variant destructive', () => {
      render(<LoadingButton variant="destructive">Destructive</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('deve aplicar variant outline', () => {
      render(<LoadingButton variant="outline">Outline</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-input');
    });

    it('deve aplicar size sm', () => {
      render(<LoadingButton size="sm">Pequeno</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-3');
    });

    it('deve aplicar size lg', () => {
      render(<LoadingButton size="lg">Grande</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-8');
    });
  });

  describe('Conteúdo do Botão', () => {
    it('deve renderizar texto simples', () => {
      render(<LoadingButton>Texto simples</LoadingButton>);

      expect(screen.getByText('Texto simples')).toBeInTheDocument();
    });

    it('deve renderizar com ícone', () => {
      render(
        <LoadingButton>
          <span data-testid="icon">🔥</span>
          Com ícone
        </LoadingButton>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Com ícone')).toBeInTheDocument();
    });

    it('deve mostrar loading text quando loading', () => {
      render(<LoadingButton loading>Texto original</LoadingButton>);

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('deve mostrar spinner quando loading', () => {
      render(<LoadingButton loading>Texto</LoadingButton>);

      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });
  });

  describe('Props Adicionais', () => {
    it('deve aceitar className personalizada', () => {
      render(<LoadingButton className="custom-class">Custom</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('deve aceitar props de botão padrão', () => {
      render(
        <LoadingButton type="submit" form="test-form">
          Submit
        </LoadingButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
    });

    it('deve aceitar data attributes', () => {
      render(<LoadingButton data-testid="test-button">Test</LoadingButton>);

      const button = screen.getByTestId('test-button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role de button', () => {
      render(<LoadingButton>Accessible</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('deve ter disabled quando disabled', () => {
      render(<LoadingButton disabled>Disabled</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve ter disabled quando loading', () => {
      render(<LoadingButton loading>Loading</LoadingButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve ter focusable quando habilitado', () => {
      render(<LoadingButton>Focusable</LoadingButton>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Casos de Uso Práticos', () => {
    it('deve simular envio de formulário', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();

      const TestComponent = () => {
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async () => {
          setLoading(true);
          await mockSubmit();
          setLoading(false);
        };

        return (
          <LoadingButton loading={loading} onClick={handleSubmit}>
            Enviar
          </LoadingButton>
        );
      };

      render(<TestComponent />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockSubmit).toHaveBeenCalled();
    });

    it('deve funcionar em formulários', () => {
      const mockSubmit = vi.fn(e => e.preventDefault());

      render(
        <form onSubmit={mockSubmit}>
          <LoadingButton type="submit">Submit Form</LoadingButton>
        </form>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
