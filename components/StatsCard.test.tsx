import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import StatsCard from './StatsCard';

describe('StatsCard', () => {
  const defaultProps = {
    iconName: 'Users' as keyof typeof import('lucide-react'),
    value: '1,234',
    label: 'Usuários Ativos'
  };

  it('deve renderizar com props básicas', () => {
    render(<StatsCard {...defaultProps} />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('Usuários Ativos')).toBeInTheDocument();
  });

  it('deve renderizar ícone corretamente', () => {
    render(<StatsCard {...defaultProps} />);
    const icon = screen.getByText('1,234').closest('div')?.parentElement?.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('deve aplicar cor primary por padrão', () => {
    render(<StatsCard {...defaultProps} />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('border-vitale-primary/20');
  });

  it('deve aplicar cor secondary', () => {
    render(<StatsCard {...defaultProps} color="secondary" />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('border-vitale-secondary/20');
  });

  it('deve aplicar cor accent', () => {
    render(<StatsCard {...defaultProps} color="accent" />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('border-orange-200/50');
  });

  it('deve aplicar className customizada', () => {
    render(<StatsCard {...defaultProps} className="custom-stats" />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('custom-stats');
  });

  it('deve renderizar com diferentes ícones', () => {
    render(<StatsCard {...defaultProps} iconName="ShoppingCart" />);
    const icon = screen.getByText('1,234').closest('div').parentElement.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('deve aplicar classes de hover', () => {
    render(<StatsCard {...defaultProps} />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('hover:shadow-2xl', 'hover:-translate-y-1');
  });

  it('deve aplicar classes de transição', () => {
    render(<StatsCard {...defaultProps} />);
    const card = screen.getByText('1,234').closest('div')?.parentElement;
    expect(card).toHaveClass('transition-all', 'duration-300');
  });

  it('deve renderizar valor com tamanho responsivo', () => {
    render(<StatsCard {...defaultProps} />);
    const value = screen.getByText('1,234');
    expect(value).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl');
  });

  it('deve renderizar label com tamanho responsivo', () => {
    render(<StatsCard {...defaultProps} />);
    const label = screen.getByText('Usuários Ativos');
    expect(label).toHaveClass('text-sm', 'md:text-base');
  });

  it('deve renderizar container do ícone com gradiente', () => {
    render(<StatsCard {...defaultProps} />);
    const iconContainer = screen.getByText('1,234').previousElementSibling;
    expect(iconContainer).toHaveClass('bg-gradient-to-br', 'from-vitale-primary/10', 'to-vitale-secondary/10');
  });

  it('deve lidar com ícone inválido graciosamente', () => {
    render(<StatsCard {...defaultProps} iconName={'InvalidIcon' as any} />);
    // Não deve quebrar, apenas não renderizar o ícone
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('deve aplicar classes de cor corretas para primary', () => {
    render(<StatsCard {...defaultProps} color="primary" />);
    const card = screen.getByText('1,234').closest('div');
    expect(card).toHaveClass('text-vitale-primary');
  });

  it('deve aplicar classes de cor corretas para secondary', () => {
    render(<StatsCard {...defaultProps} color="secondary" />);
    const card = screen.getByText('1,234').closest('div');
    expect(card).toHaveClass('text-vitale-secondary');
  });

  it('deve aplicar classes de cor corretas para accent', () => {
    render(<StatsCard {...defaultProps} color="accent" />);
    const card = screen.getByText('1,234').closest('div');
    expect(card).toHaveClass('text-orange-600');
  });

  it('deve renderizar com valores numéricos', () => {
    render(<StatsCard {...defaultProps} value="42" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('deve renderizar com valores de texto longo', () => {
    render(<StatsCard {...defaultProps} value="1,234,567" label="Usuários Muito Ativos" />);
    expect(screen.getByText('1,234,567')).toBeInTheDocument();
    expect(screen.getByText('Usuários Muito Ativos')).toBeInTheDocument();
  });
}); 