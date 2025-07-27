import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import CategoryCard from './CategoryCard';

describe('CategoryCard', () => {
  const defaultProps = {
    title: 'Toxina Botulínica',
    description: 'Produtos premium para harmonização facial',
    brands: 'Allergan, Dysport, Xeomin',
    category: 'toxina' as const,
  };

  it('deve renderizar com props básicas', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText('Toxina Botulínica')).toBeInTheDocument();
    expect(screen.getByText('Produtos premium para harmonização facial')).toBeInTheDocument();
    expect(screen.getByText('Allergan, Dysport, Xeomin')).toBeInTheDocument();
  });

  it('deve aplicar configuração para categoria toxina', () => {
    render(<CategoryCard {...defaultProps} category='toxina' />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toBeInTheDocument();
  });

  it('deve aplicar configuração para categoria preenchedor', () => {
    render(<CategoryCard {...defaultProps} category='preenchedor' />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toBeInTheDocument();
  });

  it('deve aplicar configuração para categoria bioestimulador', () => {
    render(<CategoryCard {...defaultProps} category='bioestimulador' />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toBeInTheDocument();
  });

  it('deve aplicar configuração para categoria acessorio', () => {
    render(<CategoryCard {...defaultProps} category='acessorio' />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toBeInTheDocument();
  });

  it('deve aplicar className customizada', () => {
    render(<CategoryCard {...defaultProps} className='custom-category' />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('custom-category');
  });

  it('deve renderizar ícone corretamente', () => {
    render(<CategoryCard {...defaultProps} />);
    const icon = screen.getByTestId('card').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('deve aplicar classes de hover', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('hover:shadow-2xl', 'hover:-translate-y-2');
  });

  it('deve aplicar classes de transição', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('transition-all', 'duration-300');
  });

  it('deve aplicar classes de grupo', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('group');
  });

  it('deve renderizar título com cor primária', () => {
    render(<CategoryCard {...defaultProps} />);
    const title = screen.getByText('Toxina Botulínica');
    expect(title).toHaveClass('text-vitale-primary');
  });

  it('deve renderizar brands com cor primária', () => {
    render(<CategoryCard {...defaultProps} />);
    const brands = screen.getByText('Allergan, Dysport, Xeomin');
    expect(brands).toHaveClass('text-vitale-primary');
  });

  it('deve renderizar descrição com cor neutra', () => {
    render(<CategoryCard {...defaultProps} />);
    const description = screen.getByText('Produtos premium para harmonização facial');
    expect(description).toHaveClass('text-neutral-700');
  });

  it('deve renderizar com diferentes títulos', () => {
    render(<CategoryCard {...defaultProps} title='Preenchedores Premium' />);
    expect(screen.getByText('Preenchedores Premium')).toBeInTheDocument();
  });

  it('deve renderizar com diferentes descrições', () => {
    render(<CategoryCard {...defaultProps} description='Produtos avançados para volumização' />);
    expect(screen.getByText('Produtos avançados para volumização')).toBeInTheDocument();
  });

  it('deve renderizar com diferentes brands', () => {
    render(<CategoryCard {...defaultProps} brands='Juvederm, Restylane, Belotero' />);
    expect(screen.getByText('Juvederm, Restylane, Belotero')).toBeInTheDocument();
  });

  it('deve aplicar classes de gradiente de fundo', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('bg-gradient-to-br');
  });

  it('deve aplicar classes de borda', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('border-2', 'border-vitale-primary/20');
  });

  it('deve aplicar classes de hover na borda', () => {
    render(<CategoryCard {...defaultProps} />);
    const card = screen.getByText('Toxina Botulínica').closest('[data-testid="card"]');
    expect(card).toHaveClass('hover:border-vitale-primary/50');
  });

  it('deve renderizar container do ícone com gradiente', () => {
    render(<CategoryCard {...defaultProps} />);
    const iconContainer = screen.getByText('Toxina Botulínica').previousElementSibling;
    expect(iconContainer).toHaveClass('bg-gradient-to-br');
  });

  it('deve aplicar classes de grupo no container do ícone', () => {
    render(<CategoryCard {...defaultProps} />);
    const iconContainer = screen.getByText('Toxina Botulínica').previousElementSibling;
    expect(iconContainer).toHaveClass('group-hover:scale-110');
  });
});
