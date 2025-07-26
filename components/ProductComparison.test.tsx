import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductComparison from './ProductComparison';

const mockProducts = [
  {
    id: '1',
    name: 'Produto Teste 1',
    category: 'Categoria A',
    price_pix: 100,
    price_prazo: 110,
    images: ['/test1.jpg'],
    slug: 'produto-1',
    description: 'Teste',
    brand: 'Marca',
    unit: 'ml',
    volume: '1',
    active: true,
    price_card: 120,
  },
  {
    id: '2',
    name: 'Produto Teste 2',
    category: 'Categoria B',
    price_pix: 200,
    price_prazo: 220,
    images: ['/test2.jpg'],
    slug: 'produto-2',
    description: 'Teste 2',
    brand: 'Marca',
    unit: 'ml',
    volume: '1',
    active: true,
    price_card: 220,
  },
];

describe('ProductComparison', () => {
  const mockOnRemove = vi.fn();
  const mockOnClear = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar produtos na comparação', () => {
    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    expect(screen.getByText('Produto Teste 1')).toBeInTheDocument();
    expect(screen.getByText('Produto Teste 2')).toBeInTheDocument();
    expect(screen.getByText('Comparação de Produtos')).toBeInTheDocument();
    expect(screen.getByText('(2/4)')).toBeInTheDocument();
  });

  it('deve não renderizar quando não há produtos', () => {
    const { container } = render(
      <ProductComparison products={[]} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('deve chamar onRemove ao clicar no botão X de um produto', async () => {
    const user = userEvent.setup();

    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    const removeButtons = screen.getAllByRole('button', {
      name: /Remover Produto Teste \d+ da comparação/,
    });
    await user.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('deve chamar onClear ao clicar no botão Limpar', async () => {
    const user = userEvent.setup();

    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    const clearButton = screen.getByText('Limpar');
    await user.click(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
  });

  it('deve mostrar resumo da comparação para múltiplos produtos', () => {
    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    expect(screen.getByText('Resumo da Comparação')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Faixa de Preço')).toBeInTheDocument();
    expect(screen.getByText('Preço Médio')).toBeInTheDocument();
    expect(screen.getByText('Economia')).toBeInTheDocument();
  });

  it('deve calcular estatísticas corretamente', () => {
    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    // Verifica se há resumo de comparação
    expect(screen.getByText('Resumo da Comparação')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Faixa de Preço')).toBeInTheDocument();
    expect(screen.getByText('Preço Médio')).toBeInTheDocument();
    expect(screen.getByText('Economia')).toBeInTheDocument();

    // Verifica estatísticas específicas
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 categorias
    expect(screen.getByText('R$ 150,00')).toBeInTheDocument(); // Preço médio
  });

  it('deve ter estrutura responsiva', () => {
    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    const grid = screen.getByText('Produto Teste 1').closest('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it('deve exibir informações dos produtos corretamente', () => {
    render(
      <ProductComparison products={mockProducts} onRemove={mockOnRemove} onClear={mockOnClear} />
    );

    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Categoria B')).toBeInTheDocument();
    expect(screen.getAllByText('R$ 100,00')).toHaveLength(2); // Aparece no produto e no resumo
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument();
  });
});
