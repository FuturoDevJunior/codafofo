import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './button';

describe('Button', () => {
  it('deve renderizar com texto', () => {
    render(<Button>Teste Botão</Button>);
    expect(screen.getByText('Teste Botão')).toBeInTheDocument();
  });

  it('deve aplicar variante default', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-vitale-primary', 'to-vitale-secondary');
  });

  it('deve aplicar variante outline', () => {
    render(<Button variant='outline'>Outline Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-2', 'border-vitale-primary');
  });

  it('deve aplicar variante ghost', () => {
    render(<Button variant='ghost'>Ghost Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-vitale-primary');
  });

  it('deve aplicar variante destructive', () => {
    render(<Button variant='destructive'>Destructive Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-red-500', 'to-red-600');
  });

  it('deve aplicar tamanho sm', () => {
    render(<Button size='sm'>Small Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');
  });

  it('deve aplicar tamanho lg', () => {
    render(<Button size='lg'>Large Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12');
  });

  it('deve aplicar className customizada', () => {
    render(<Button className='custom-class'>Custom Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable Button</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('deve aplicar classes de disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('disabled:opacity-60');
  });

  it('deve renderizar como child quando asChild é true', () => {
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('deve passar props HTML adicionais', () => {
    render(<Button data-testid='test-button'>Test Button</Button>);
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });
});
