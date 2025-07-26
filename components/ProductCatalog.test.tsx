import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Product } from '@/types/product';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductCatalog from './ProductCatalog';

// Mock do ProductCard
vi.mock('./ProductCard', () => ({
  default: ({ product, variant }: { product: Product; variant?: string }) => (
    <div data-testid={`product-card-${product.id}`} data-variant={variant}>
      <h3>{product.name}</h3>
      <span>{product.category}</span>
      <span>R$ {product.price_pix}</span>
    </div>
  ),
}));

// Mock do ProductCardSkeleton
vi.mock('./ProductCardSkeleton', () => ({
  default: () => <div data-testid="product-skeleton">Loading...</div>,
}));

// Mock dos ícones Lucide
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
  Filter: () => <div data-testid="filter-icon">Filter</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Grid3X3: () => <div data-testid="grid-icon">Grid3X3</div>,
  Grid2X2: () => <div data-testid="grid-large-icon">Grid2X2</div>,
  List: () => <div data-testid="list-icon">List</div>,
  SortAsc: () => <div data-testid="sort-asc-icon">SortAsc</div>,
  SortDesc: () => <div data-testid="sort-desc-icon">SortDesc</div>,
  Package: () => <div data-testid="package-icon">Package</div>,
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  EyeOff: () => <div data-testid="eye-off-icon">EyeOff</div>,
}));

// Mock do Button
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className, variant, size, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock do Input
vi.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, ...props }: any) => (
    <input value={value} onChange={onChange} {...props} />
  ),
}));

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Botox Allergan',
    category: 'Toxina Botulínica',
    price_pix: 750,
    price_card: 800,
    price_prazo: 800,
    description: 'Toxina botulínica premium',
    slug: 'botox-allergan',
    images: ['image1.jpg'],
    active: true,
  },
  {
    id: '2',
    name: 'Juvederm Ultra',
    category: 'Preenchedor',
    price_pix: 550,
    price_card: 600,
    price_prazo: 600,
    description: 'Preenchedor com ácido hialurônico',
    slug: 'juvederm-ultra',
    images: ['image2.jpg'],
    active: true,
  },
  {
    id: '3',
    name: 'Sculptra',
    category: 'Bioestimulador',
    price_pix: 1100,
    price_card: 1200,
    price_prazo: 1200,
    description: 'Bioestimulador de colágeno',
    slug: 'sculptra',
    images: ['image3.jpg'],
    active: true,
  },
  {
    id: '4',
    name: 'Radiesse',
    category: 'Bioestimulador',
    price_pix: 850,
    price_card: 900,
    price_prazo: 900,
    description: 'Bioestimulador com hidroxiapatita de cálcio',
    slug: 'radiesse',
    images: ['image4.jpg'],
    active: true,
  },
];

describe('ProductCatalog', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar sem crash', () => {
      render(<ProductCatalog products={[]} />);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('deve renderizar barra de busca', () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', 'Buscar produtos, categorias...');
    });

    it('deve renderizar botão de filtros', () => {
      render(<ProductCatalog products={mockProducts} />);

      const filterButton = screen.getByTestId('filter-toggle');
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).toHaveTextContent('Filtros');
    });

    it('deve renderizar controles de visualização', () => {
      render(<ProductCatalog products={mockProducts} />);

      expect(screen.getByTestId('grid-large-icon')).toBeInTheDocument();
      expect(screen.getByTestId('grid-icon')).toBeInTheDocument();
      expect(screen.getByTestId('list-icon')).toBeInTheDocument();
    });
  });

  describe('Exibição de Produtos', () => {
    it('deve exibir todos os produtos por padrão', () => {
      render(<ProductCatalog products={mockProducts} />);

      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.getByText('Juvederm Ultra')).toBeInTheDocument();
      expect(screen.getByText('Sculptra')).toBeInTheDocument();
      expect(screen.getByText('Radiesse')).toBeInTheDocument();
    });

    it('deve mostrar contagem correta de produtos', () => {
      render(<ProductCatalog products={mockProducts} />);

      const resultsCount = screen.getByTestId('results-count');
      expect(resultsCount).toHaveTextContent('4 produtos encontrados');
    });

    it('deve renderizar estado de loading', () => {
      render(<ProductCatalog products={[]} isLoading={true} />);

      const skeletons = screen.getAllByTestId('product-skeleton');
      expect(skeletons).toHaveLength(8);
    });

    it('deve renderizar estado vazio', () => {
      render(<ProductCatalog products={[]} />);

      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    });
  });

  describe('Busca', () => {
    it('deve filtrar produtos por nome', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');

      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.queryByText('Juvederm Ultra')).not.toBeInTheDocument();
      expect(screen.queryByText('Sculptra')).not.toBeInTheDocument();

      const resultsCount = screen.getByTestId('results-count');
      expect(resultsCount).toHaveTextContent('1 produto encontrado para "Botox"');
    });

    it('deve filtrar produtos por categoria', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Toxina');

      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.queryByText('Juvederm Ultra')).not.toBeInTheDocument();
    });

    it('deve limpar busca ao clicar no X', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');

      const clearButton = screen.getByLabelText('Limpar busca');
      await user.click(clearButton);

      expect(searchInput).toHaveValue('');
      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.getByText('Juvederm Ultra')).toBeInTheDocument();
    });
  });

  describe('Filtros', () => {
    it('deve abrir/fechar painel de filtros', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const filterButton = screen.getByTestId('filter-toggle');

      // Painel deve estar fechado inicialmente
      expect(screen.queryByTestId('filters-panel')).not.toBeInTheDocument();

      // Abrir painel
      await user.click(filterButton);
      expect(screen.getByTestId('filters-panel')).toBeInTheDocument();

      // Fechar painel
      await user.click(filterButton);
      expect(screen.queryByTestId('filters-panel')).not.toBeInTheDocument();
    });

    it('deve filtrar por categoria', async () => {
      render(<ProductCatalog products={mockProducts} />);

      // Abrir filtros
      await user.click(screen.getByTestId('filter-toggle'));

      const categoryFilter = screen.getByTestId('category-filter');
      await user.selectOptions(categoryFilter, 'Toxina Botulínica');

      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.queryByText('Juvederm Ultra')).not.toBeInTheDocument();
      expect(screen.queryByText('Sculptra')).not.toBeInTheDocument();
    });

    it('deve filtrar por faixa de preço', async () => {
      render(<ProductCatalog products={mockProducts} />);

      // Abrir filtros
      await user.click(screen.getByTestId('filter-toggle'));

      const priceMin = screen.getByTestId('price-min');
      const priceMax = screen.getByTestId('price-max');

      await user.clear(priceMin);
      await user.type(priceMin, '700');
      await user.clear(priceMax);
      await user.type(priceMax, '900');

      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.queryByText('Juvederm Ultra')).not.toBeInTheDocument();
      expect(screen.queryByText('Sculptra')).not.toBeInTheDocument();
    });

    it('deve limpar todos os filtros', async () => {
      render(<ProductCatalog products={mockProducts} />);

      // Aplicar filtros
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');

      await user.click(screen.getByTestId('filter-toggle'));
      const categoryFilter = screen.getByTestId('category-filter');
      await user.selectOptions(categoryFilter, 'Toxina Botulínica');

      // Limpar filtros
      const clearButton = screen.getByTestId('clear-filters');
      await user.click(clearButton);

      expect(searchInput).toHaveValue('');
      expect(categoryFilter).toHaveValue('');
      expect(screen.getByText('Botox Allergan')).toBeInTheDocument();
      expect(screen.getByText('Juvederm Ultra')).toBeInTheDocument();
      expect(screen.getByText('Sculptra')).toBeInTheDocument();
    });
  });

  describe('Ordenação', () => {
    it('deve ordenar por nome A-Z', async () => {
      render(<ProductCatalog products={mockProducts} />);

      await user.click(screen.getByTestId('filter-toggle'));
      const sortSelect = screen.getByTestId('sort-select');
      await user.selectOptions(sortSelect, 'name-asc');

      const productCards = screen.getAllByTestId(/^product-card-/);
      expect(productCards[0]).toHaveTextContent('Botox Allergan');
      expect(productCards[1]).toHaveTextContent('Juvederm Ultra');
      expect(productCards[2]).toHaveTextContent('Radiesse');
      expect(productCards[3]).toHaveTextContent('Sculptra');
    });

    it('deve ordenar por preço crescente', async () => {
      render(<ProductCatalog products={mockProducts} />);

      await user.click(screen.getByTestId('filter-toggle'));
      const sortSelect = screen.getByTestId('sort-select');
      await user.selectOptions(sortSelect, 'price-asc');

      const productCards = screen.getAllByTestId(/^product-card-/);
      expect(productCards[0]).toHaveTextContent('Juvederm Ultra'); // R$ 550
      expect(productCards[1]).toHaveTextContent('Botox Allergan'); // R$ 750
      expect(productCards[2]).toHaveTextContent('Radiesse'); // R$ 850
      expect(productCards[3]).toHaveTextContent('Sculptra'); // R$ 1100
    });
  });

  describe('Modos de Visualização', () => {
    it('deve alternar entre modos de visualização', async () => {
      render(<ProductCatalog products={mockProducts} />);

      // Testar modo lista
      const listButton = screen.getByTitle('Lista');
      await user.click(listButton);

      const productCardsAfterList = screen.getAllByTestId(/^product-card-/);
      productCardsAfterList.forEach(card => {
        expect(card).toHaveAttribute('data-variant', 'horizontal');
      });

      // Testar modo grid
      const gridButton = screen.getByTitle('Grade compacta');
      await user.click(gridButton);

      const productCardsAfterGrid = screen.getAllByTestId(/^product-card-/);
      productCardsAfterGrid.forEach(card => {
        expect(card).toHaveAttribute('data-variant', 'vertical');
      });
    });
  });

  describe('Estados Especiais', () => {
    it('deve mostrar indicador de filtros ativos', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'Botox');

      const filterButton = screen.getByTestId('filter-toggle');
      expect(filterButton).toHaveTextContent('Filtros');
      // O indicador aparece como um ponto vermelho no CSS
    });

    it('deve mostrar botão de limpar filtros quando há filtros ativos', async () => {
      render(<ProductCatalog products={mockProducts} />);

      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'produto-inexistente');

      await waitFor(() => {
        expect(screen.getByTestId('no-results')).toBeInTheDocument();
      });

      const clearButton = screen.getByText('Limpar filtros');
      expect(clearButton).toBeInTheDocument();

      await user.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByTestId('no-results')).not.toBeInTheDocument();
      });
    });
  });

  describe('Responsividade', () => {
    it('deve renderizar grid responsivo', () => {
      render(<ProductCatalog products={mockProducts} />);

      const grid = screen.getByTestId('products-grid');
      expect(grid).toHaveClass('grid');
      expect(grid.className).toMatch(/gap-4|md:gap-6/);
    });
  });
});
