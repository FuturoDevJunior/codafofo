import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Input', () => {
  it('deve renderizar com placeholder', () => {
    render(<Input placeholder="Digite seu nome" />);
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  it('deve renderizar com valor', () => {
    render(<Input value="teste" onChange={() => {}} />);
    expect(screen.getByDisplayValue('teste')).toBeInTheDocument();
  });

  it('deve aplicar tamanho sm', () => {
    render(<Input inputSize="sm" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('h-9');
  });

  it('deve aplicar tamanho md por padrão', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('h-11');
  });

  it('deve aplicar tamanho lg', () => {
    render(<Input inputSize="lg" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('h-12');
  });

  it('deve aplicar variante default', () => {
    render(<Input variant="default" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('border-neutral-200');
  });

  it('deve aplicar variante outline', () => {
    render(<Input variant="outline" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('border-neutral-300');
  });

  it('deve aplicar variante filled', () => {
    render(<Input variant="filled" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('bg-neutral-50');
  });

  it('deve aplicar classes de erro quando error é true', () => {
    render(<Input error={true} placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('border-red-500');
  });

  it('deve aplicar className customizada', () => {
    render(<Input className="custom-input" placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('custom-input');
  });

  it('deve renderizar ícone à esquerda', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} placeholder="teste" />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('deve renderizar ícone à direita', () => {
    render(<Input rightIcon={<span data-testid="right-icon">📧</span>} placeholder="teste" />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('deve aplicar padding correto com ícone à esquerda', () => {
    render(<Input leftIcon={<span>🔍</span>} placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('pl-10');
  });

  it('deve aplicar padding correto com ícone à direita', () => {
    render(<Input rightIcon={<span>📧</span>} placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('pr-10');
  });

  it('deve aplicar padding correto com ambos os ícones', () => {
    render(<Input leftIcon={<span>🔍</span>} rightIcon={<span>📧</span>} placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('pl-10', 'pr-10');
  });

  it('deve chamar onChange quando valor muda', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="teste" />);

    await user.type(screen.getByPlaceholderText('teste'), 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Input disabled placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toBeDisabled();
  });

  it('deve aplicar classes de disabled', () => {
    render(<Input disabled placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-60');
  });

  it('deve aplicar classes de focus', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('focus:outline-none');
  });

  it('deve aplicar classes de transição', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('transition-all', 'duration-200');
  });

  it('deve aplicar classes de placeholder', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('placeholder:text-neutral-500');
  });

  it('deve aplicar classes de arredondamento', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('rounded-lg');
  });

  it('deve aplicar classes de largura', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('w-full');
  });

  it('deve aplicar classes de flex', () => {
    render(<Input placeholder="teste" />);
    const input = screen.getByPlaceholderText('teste');
    expect(input).toHaveClass('flex', 'items-center');
  });

  it('deve passar props HTML adicionais', () => {
    render(<Input data-testid="test-input" placeholder="teste" />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('deve aplicar tamanho correto do ícone para sm', () => {
    render(
      <Input inputSize="sm" leftIcon={<span data-testid="icon">🔍</span>} placeholder="teste" />
    );
    const iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass('h-4', 'w-4');
  });

  it('deve aplicar tamanho correto do ícone para lg', () => {
    render(
      <Input inputSize="lg" leftIcon={<span data-testid="icon">🔍</span>} placeholder="teste" />
    );
    const iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass('h-6', 'w-6');
  });

  it('deve aplicar tamanho correto do ícone para md', () => {
    render(
      <Input inputSize="md" leftIcon={<span data-testid="icon">🔍</span>} placeholder="teste" />
    );
    const iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass('h-5', 'w-5');
  });
});
