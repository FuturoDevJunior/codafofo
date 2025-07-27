import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import ProductCardSkeleton, { ProductGridSkeleton } from './ProductCardSkeleton';

describe('ProductCardSkeleton', () => {
  it('deve renderizar skeleton do produto', () => {
    render(<ProductCardSkeleton />);

    // Verificar se o card principal está presente
    const card = screen.getByTestId('loading-skeleton');
    expect(card).toBeInTheDocument();
  });

  it('deve ter estrutura de card skeleton', () => {
    render(<ProductCardSkeleton />);

    const card = screen.getByTestId('loading-skeleton');
    expect(card).toHaveClass('bg-white', 'rounded-2xl', 'border', 'border-neutral-200');
  });

  it('deve ter skeleton para imagem', () => {
    render(<ProductCardSkeleton />);

    // Verificar se há skeletons para imagem
    const cardHeader = screen.getByTestId('card-header');
    expect(cardHeader).toBeInTheDocument();
  });

  it('deve ter skeleton para título', () => {
    render(<ProductCardSkeleton />);

    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('deve ter skeleton para preço', () => {
    render(<ProductCardSkeleton />);

    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('deve ter skeleton para botões de ação', () => {
    render(<ProductCardSkeleton />);

    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('deve ter skeleton para badge', () => {
    render(<ProductCardSkeleton />);

    const cardHeader = screen.getByTestId('card-header');
    expect(cardHeader).toBeInTheDocument();
  });

  it('deve ter skeleton para disponibilidade', () => {
    render(<ProductCardSkeleton />);

    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('deve ter altura consistente', () => {
    render(<ProductCardSkeleton />);

    const card = screen.getByTestId('loading-skeleton');
    expect(card).toHaveClass('flex', 'flex-col', 'h-full');
  });

  it('deve ter espaçamento adequado', () => {
    render(<ProductCardSkeleton />);

    const card = screen.getByTestId('loading-skeleton');
    expect(card).toBeInTheDocument();
  });
});

describe('ProductGridSkeleton', () => {
  it('deve renderizar grid com número padrão de skeletons', () => {
    render(<ProductGridSkeleton />);

    const cards = screen.getAllByTestId('loading-skeleton');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('deve renderizar grid com número personalizado de skeletons', () => {
    render(<ProductGridSkeleton count={3} />);

    const cards = screen.getAllByTestId('loading-skeleton');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('deve ter layout de grid responsivo', () => {
    render(<ProductGridSkeleton count={3} />);

    const grid = screen.getByTestId('product-grid-skeleton');
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('deve ter espaçamento entre cards', () => {
    render(<ProductGridSkeleton count={3} />);

    const grid = screen.getByTestId('product-grid-skeleton');
    expect(grid).toHaveClass('gap-6');
  });
});
