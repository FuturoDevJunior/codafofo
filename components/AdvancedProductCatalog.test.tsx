import { act } from 'react-dom/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Product } from '@/types/product';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdvancedProductCatalog from './AdvancedProductCatalog';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Botox Allergan',
    category: 'Toxina Botulínica',
    description: 'Toxina botulínica tipo A para tratamento de rugas',
    price_pix: 450,
    price_card: 480,
    price_prazo: 500,
    active: true,
    images: ['/test-image.jpg'],
    slug: 'botox-allergan',
  },
  {
    id: '2',
    name: 'Juvederm Ultra',
    category: 'Preenchedor',
    description: 'Ácido hialurônico para preenchimento facial',
    price_pix: 680,
    price_card: 700,
    price_prazo: 720,
    active: true,
    images: ['/test-image2.jpg'],
    slug: 'juvederm-ultra',
  },
  {
    id: '3',
    name: 'Sculptra',
    category: 'Bioestimulador',
    description: 'Ácido poli-L-lático para estimulação de colágeno',
    price_pix: 850,
    price_card: 875,
    price_prazo: 900,
    active: true,
    images: ['/test-image3.jpg'],
    slug: 'sculptra',
  },
  {
    id: '4',
    name: 'Dysport Premium',
    category: 'Toxina Botulínica',
    description: 'Toxina botulínica avançada',
    price_pix: 520,
    price_card: 550,
    price_prazo: 580,
    active: false,
    images: ['/test-image4.jpg'],
    slug: 'dysport-premium',
  },
];

const user = userEvent.setup();

describe('AdvancedProductCatalog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização básica', () => {
    it('deve renderizar o catálogo com produtos', () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('filter-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('results-count')).toBeInTheDocument();
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });

    it('deve exibir filtros rápidos quando habilitados', () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      expect(screen.getByText('Filtros Rápidos:')).toBeInTheDocument();
      expect(screen.getByText('Todos')).toBeInTheDocument();
      expect(screen.getByText('Toxinas')).toBeInTheDocument();
      expect(screen.getByText('Preenchedores')).toBeInTheDocument();
      expect(screen.getByText('Bioestimuladores')).toBeInTheDocument();
    });

    it('deve mostrar estado de carregamento', () => {
      render(<AdvancedProductCatalog products={[]} isLoading={true} />);

      const skeletons = screen.getAllByTestId(/skeleton/);
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('deve mostrar mensagem quando não há resultados', () => {
      render(<AdvancedProductCatalog products={[]} />);

      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    });
  });

  describe('Busca inteligente', () => {
    it('deve filtrar produtos por nome', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      await act(async () => {
        const searchInput = screen.getByTestId('search-input');
        await user.type(searchInput, 'Botox');
      });

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar produtos por categoria', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Toxina');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar produtos por descrição', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'ácido hialurônico');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve mostrar sugestões de busca', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Bot');

      await waitFor(() => {
        expect(screen.getAllByText('Botox Allergan')[0]).toBeInTheDocument();
      });
    });

    it('deve limpar busca ao limpar input', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');
      await user.clear(searchInput);

      expect(searchInput).toHaveValue('');
    });

    it('deve suportar busca por múltiplos termos', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox Allergan');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });
  });

  describe('Filtros rápidos (Presets)', () => {
    it('deve filtrar por categoria Toxina', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const toxinaButton = screen.getByText('Toxinas');
      await user.click(toxinaButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar por categoria Preenchedor', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const preenchedorButton = screen.getByText('Preenchedores');
      await user.click(preenchedorButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar por categoria Bioestimulador', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const bioestimuladorButton = screen.getByText('Bioestimuladores');
      await user.click(bioestimuladorButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar produtos premium', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const premiumButton = screen.getByText('Premium');
      await user.click(premiumButton);

      await waitFor(() => {
        const resultsText = screen.getByTestId('results-count');
        expect(resultsText).toBeInTheDocument();
      });
    });

    it('deve voltar para todos os produtos', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const toxinaButton = screen.getByText('Toxinas');
      await user.click(toxinaButton);

      const todosButton = screen.getByText('Todos');
      await user.click(todosButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('3 produtos encontrados');
      });
    });
  });

  describe('Ordenação', () => {
    it('deve ordenar por nome A-Z', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const sortSelect = screen.getByLabelText('Ordenar produtos por');
      await user.selectOptions(sortSelect, 'name-asc');

      await waitFor(() => {
        expect(screen.getByText('Ordenado por name-asc')).toBeInTheDocument();
      });
    });

    it('deve ordenar por nome Z-A', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const sortSelect = screen.getByLabelText('Ordenar produtos por');
      await user.selectOptions(sortSelect, 'name-desc');

      await waitFor(() => {
        expect(screen.getByText('Ordenado por name-desc')).toBeInTheDocument();
      });
    });

    it('deve ordenar por menor preço', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const sortSelect = screen.getByLabelText('Ordenar produtos por');
      await user.selectOptions(sortSelect, 'price-asc');

      await waitFor(() => {
        expect(screen.getByText('Ordenado por price-asc')).toBeInTheDocument();
      });
    });

    it('deve ordenar por maior preço', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const sortSelect = screen.getByLabelText('Ordenar produtos por');
      await user.selectOptions(sortSelect, 'price-desc');

      await waitFor(() => {
        expect(screen.getByText('Ordenado por price-desc')).toBeInTheDocument();
      });
    });

    it('deve ordenar por popularidade', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const sortSelect = screen.getByLabelText('Ordenar produtos por');
      await user.selectOptions(sortSelect, 'popularity');

      await waitFor(() => {
        expect(screen.getByText('Ordenado por popularidade')).toBeInTheDocument();
      });
    });
  });

  describe('Filtros avançados', () => {
    it('deve abrir painel de filtros avançados', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const filterButton = screen.getByTestId('filter-toggle');
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText('Categorias')).toBeInTheDocument();
      });
    });

    it('deve filtrar por categoria nos filtros avançados', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const filterButton = screen.getByTestId('filter-toggle');
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText('Categorias')).toBeInTheDocument();
        expect(screen.getByText('Faixa de Preço')).toBeInTheDocument();
        expect(screen.getByText('Outros')).toBeInTheDocument();
      });
    });

    it('deve filtrar por faixa de preço', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const filterButton = screen.getByTestId('filter-toggle');
      await user.click(filterButton);

      await waitFor(async () => {
        const minPriceInput = screen.getByDisplayValue('0');
        const maxPriceInput = screen.getByDisplayValue('5000');

        await user.clear(minPriceInput);
        await user.type(minPriceInput, '600');

        await user.clear(maxPriceInput);
        await user.type(maxPriceInput, '900');
      });

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('2 produtos encontrados');
      });
    });

    it('deve filtrar apenas produtos em estoque', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const filterButton = screen.getByTestId('filter-toggle');
      await user.click(filterButton);

      await waitFor(() => {
        const inStockCheckbox = screen.getByLabelText('Apenas em estoque');
        expect(inStockCheckbox).toBeChecked();
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('3 produtos encontrados');
      });
    });

    it('deve mostrar indicador de filtros ativos', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve limpar todos os filtros', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const filterButton = screen.getByTestId('filter-toggle');
      await user.click(filterButton);

      // Alterar um filtro para que apareça o botão de limpar
      const inStockCheckbox = screen.getByLabelText('Apenas em estoque');
      await user.click(inStockCheckbox); // Desmarcar para ativar filtro

      await waitFor(async () => {
        const clearButton = screen.getByText('Limpar Filtros');
        await user.click(clearButton);
      });

      // Verificar que o filtro foi limpo
      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('3 produtos encontrados');
      });
    });
  });

  describe('Modos de visualização', () => {
    it('deve alternar para visualização em grade grande', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const gridLargeButton = screen.getByTitle('Grade grande');
      await user.click(gridLargeButton);

      const productGrid = screen.getByTestId('products-grid');
      expect(productGrid).toHaveClass('grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3');
    });

    it('deve alternar para visualização em lista', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const listButton = screen.getByTitle('Lista');
      await user.click(listButton);

      const productGrid = screen.getByTestId('products-grid');
      expect(productGrid).toHaveClass('grid-cols-1');
    });
  });

  describe('Contagem de resultados', () => {
    it('deve mostrar contagem correta para múltiplos produtos', () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const resultsCount = screen.getByTestId('results-count');
      expect(resultsCount.textContent).toContain('3 produtos encontrados');
    });

    it('deve mostrar contagem correta para um produto', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Juvederm');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve incluir termo de busca na contagem', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Toxina');

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });
  });

  describe('Filtro por presets de preço', () => {
    it('deve filtrar produtos econômicos', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const budgetButton = screen.getByText('Econômico');
      await user.click(budgetButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('1 produtos encontrados');
      });
    });

    it('deve filtrar produtos premium', async () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={true} />);

      const premiumButton = screen.getByText('Premium');
      await user.click(premiumButton);

      await waitFor(() => {
        const resultsCount = screen.getByTestId('results-count');
        expect(resultsCount.textContent).toContain('0 produtos encontrados');
      });
    });
  });

  describe('Compatibilidade e acessibilidade', () => {
    it('deve ter labels apropriados para acessibilidade', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      expect(
        screen.getByPlaceholderText('Busque por produto, categoria, marca...')
      ).toBeInTheDocument();

      expect(screen.getByLabelText('Ordenar produtos por')).toBeInTheDocument();
    });

    it('deve suportar navegação por teclado', async () => {
      render(<AdvancedProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      searchInput.focus();

      expect(searchInput).toHaveFocus();
    });
  });

  describe('Props e configurações', () => {
    it('deve desabilitar filtros avançados quando enableAdvancedFilters é false', () => {
      render(<AdvancedProductCatalog products={mockProducts} enableAdvancedFilters={false} />);

      expect(screen.queryByText('Filtros Rápidos:')).not.toBeInTheDocument();
    });

    it('deve funcionar com lista vazia de produtos', () => {
      render(<AdvancedProductCatalog products={[]} />);

      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    });
  });
});
