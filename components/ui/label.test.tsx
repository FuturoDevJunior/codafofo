import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import { Label } from './label';

describe('Label', () => {
  it('deve renderizar com children', () => {
    render(<Label>Nome do Campo</Label>);
    expect(screen.getByText('Nome do Campo')).toBeInTheDocument();
  });

  it('deve aplicar tamanho sm', () => {
    render(<Label size="sm">Label Pequeno</Label>);
    const label = screen.getByText('Label Pequeno');
    expect(label).toHaveClass('text-xs');
  });

  it('deve aplicar tamanho md por padrão', () => {
    render(<Label>Label Médio</Label>);
    const label = screen.getByText('Label Médio');
    expect(label).toHaveClass('text-sm');
  });

  it('deve aplicar tamanho lg', () => {
    render(<Label size="lg">Label Grande</Label>);
    const label = screen.getByText('Label Grande');
    expect(label).toHaveClass('text-base');
  });

  it('deve aplicar variante default', () => {
    render(<Label variant="default">Label Default</Label>);
    const label = screen.getByText('Label Default');
    expect(label).toHaveClass('text-vitale-primary', 'font-medium');
  });

  it('deve aplicar variante required', () => {
    render(<Label variant="required">Label Obrigatório</Label>);
    const label = screen.getByText('Label Obrigatório');
    expect(label).toHaveClass('text-vitale-primary', 'font-semibold');
  });

  it('deve aplicar variante optional', () => {
    render(<Label variant="optional">Label Opcional</Label>);
    const label = screen.getByText('Label Opcional');
    expect(label).toHaveClass('text-neutral-600', 'font-medium');
  });

  it('deve aplicar classes de erro quando error é true', () => {
    render(<Label error={true}>Label com Erro</Label>);
    const label = screen.getByText('Label com Erro');
    expect(label).toHaveClass('text-red-600');
  });

  it('deve aplicar className customizada', () => {
    render(<Label className="custom-label">Label Customizado</Label>);
    const label = screen.getByText('Label Customizado');
    expect(label).toHaveClass('custom-label');
  });

  it('deve renderizar asterisco para variante required', () => {
    render(<Label variant="required">Campo Obrigatório</Label>);
    expect(screen.getByText('Campo Obrigatório')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('deve renderizar texto opcional para variante optional', () => {
    render(<Label variant="optional">Campo Opcional</Label>);
    expect(screen.getByText('Campo Opcional')).toBeInTheDocument();
    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  it('deve aplicar classes de transição', () => {
    render(<Label>Label com Transição</Label>);
    const label = screen.getByText('Label com Transição');
    expect(label).toHaveClass('transition-colors', 'duration-200');
  });

  it('deve aplicar classes de focus', () => {
    render(<Label>Label com Focus</Label>);
    const label = screen.getByText('Label com Focus');
    expect(label).toHaveClass('focus-within:text-vitale-secondary');
  });

  it('deve aplicar classes de margem', () => {
    render(<Label>Label com Margem</Label>);
    const label = screen.getByText('Label com Margem');
    expect(label).toHaveClass('mb-2');
  });

  it('deve aplicar classes de display', () => {
    render(<Label>Label com Display</Label>);
    const label = screen.getByText('Label com Display');
    expect(label).toHaveClass('block');
  });

  it('deve aplicar aria-label para asterisco', () => {
    render(<Label variant="required">Campo Obrigatório</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-label', 'campo obrigatório');
  });

  it('deve aplicar classes de cor corretas para variante default', () => {
    render(<Label variant="default">Label Default</Label>);
    const label = screen.getByText('Label Default');
    expect(label).toHaveClass('text-vitale-primary');
  });

  it('deve aplicar classes de cor corretas para variante required', () => {
    render(<Label variant="required">Label Required</Label>);
    const label = screen.getByText('Label Required');
    expect(label).toHaveClass('text-vitale-primary');
  });

  it('deve aplicar classes de cor corretas para variante optional', () => {
    render(<Label variant="optional">Label Optional</Label>);
    const label = screen.getByText('Label Optional');
    expect(label).toHaveClass('text-neutral-600');
  });

  it('deve aplicar classes de peso da fonte corretas para variante default', () => {
    render(<Label variant="default">Label Default</Label>);
    const label = screen.getByText('Label Default');
    expect(label).toHaveClass('font-medium');
  });

  it('deve aplicar classes de peso da fonte corretas para variante required', () => {
    render(<Label variant="required">Label Required</Label>);
    const label = screen.getByText('Label Required');
    expect(label).toHaveClass('font-semibold');
  });

  it('deve aplicar classes de peso da fonte corretas para variante optional', () => {
    render(<Label variant="optional">Label Optional</Label>);
    const label = screen.getByText('Label Optional');
    expect(label).toHaveClass('font-medium');
  });

  it('deve aplicar classes de cor corretas para asterisco', () => {
    render(<Label variant="required">Label Required</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveClass('text-red-500');
  });

  it('deve aplicar classes de cor corretas para texto opcional', () => {
    render(<Label variant="optional">Label Optional</Label>);
    const optionalText = screen.getByText('(opcional)');
    expect(optionalText).toHaveClass('text-neutral-400');
  });

  it('deve aplicar classes de margem corretas para asterisco', () => {
    render(<Label variant="required">Label Required</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveClass('ml-1');
  });

  it('deve aplicar classes de margem corretas para texto opcional', () => {
    render(<Label variant="optional">Label Optional</Label>);
    const optionalText = screen.getByText('(opcional)');
    expect(optionalText).toHaveClass('ml-1');
  });

  it('deve aplicar classes de tamanho corretas para texto opcional', () => {
    render(<Label variant="optional">Label Optional</Label>);
    const optionalText = screen.getByText('(opcional)');
    expect(optionalText).toHaveClass('text-xs');
  });

  it('deve passar props HTML adicionais', () => {
    render(<Label data-testid="test-label">Label Test</Label>);
    expect(screen.getByTestId('test-label')).toBeInTheDocument();
  });

  it('deve renderizar como elemento label', () => {
    render(<Label>Label Element</Label>);
    const label = screen.getByText('Label Element');
    expect(label.tagName).toBe('LABEL');
  });
}); 