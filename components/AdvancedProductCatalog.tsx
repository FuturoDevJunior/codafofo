'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid2X2,
  Grid3X3,
  List,
  Package,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';

import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product';

interface AdvancedProductCatalogProps {
  products: Product[];
  isLoading?: boolean;
  enableAdvancedFilters?: boolean;
}

type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'category'
  | 'popularity'
  | 'newest'
  | 'best-rated';

type ViewMode = 'grid' | 'grid-large' | 'list';

type FilterPreset =
  | 'all'
  | 'toxina'
  | 'preenchedor'
  | 'bioestimulador'
  | 'premium'
  | 'budget'
  | 'new';

interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  priceRange: [number, number];
  brands: string[];
  inStock: boolean;
  featured: boolean;
  preset: FilterPreset;
}

// Constantes para paginação
const ITEMS_PER_PAGE = 12;
const LAZY_LOAD_THRESHOLD = 3; // Carregar mais quando faltar 3 páginas

export default function AdvancedProductCatalog({
  products,
  isLoading = false,
  enableAdvancedFilters = true,
}: AdvancedProductCatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategories: [],
    priceRange: [0, 5000],
    brands: [],
    inStock: true,
    featured: false,
    preset: 'all',
  });

  const [sortBy, setSortBy] = useState<SortOption>('category');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Extrair dados únicos dos produtos
  const productData = useMemo(() => {
    const categories = Array.from(new Set(products.map(p => p.category))).sort();
    const brands = Array.from(
      new Set(products.map(p => p.name.split(' ')[0]).filter(Boolean))
    ).sort();

    const prices = products.map(p => p.price_pix || 0).filter(p => p > 0);
    const priceExtent: [number, number] =
      prices.length > 0
        ? [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]
        : [0, 5000];

    return { categories, brands, priceExtent };
  }, [products]);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Filtro de busca
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Filtro de categoria
      if (filters.selectedCategories.length > 0) {
        if (!filters.selectedCategories.includes(product.category)) return false;
      }

      // Filtro de preço
      const price = product.price_pix || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

      // Filtro de estoque
      if (filters.inStock && !product.active) return false;

      // Filtro de destaque
      if (filters.featured && !product.active) return false;

      return true;
    });

    // Aplicar presets
    switch (filters.preset) {
      case 'toxina':
        filtered = filtered.filter(p => p.category.includes('Toxina'));
        break;
      case 'preenchedor':
        filtered = filtered.filter(p => p.category.includes('Preenchedor'));
        break;
      case 'bioestimulador':
        filtered = filtered.filter(p => p.category.includes('Bioestimulador'));
        break;
      case 'premium':
        filtered = filtered.filter(p => (p.price_pix || 0) > 1000);
        break;
      case 'budget':
        filtered = filtered.filter(p => (p.price_pix || 0) <= 500);
        break;
      case 'new':
        // Produtos novos (últimos 30 dias) - simulado
        filtered = filtered.slice(0, Math.floor(filtered.length * 0.2));
        break;
    }

    return filtered;
  }, [products, filters]);

  // Ordenar produtos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => (a.price_pix || 0) - (b.price_pix || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price_pix || 0) - (a.price_pix || 0));
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case 'popularity':
        // Simular popularidade baseada no ID (produtos mais antigos = mais populares)
        return sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      case 'newest':
        return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'best-rated':
        // Simular rating baseado no preço (produtos mais caros = melhor rating)
        return sorted.sort((a, b) => (b.price_pix || 0) - (a.price_pix || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Paginação
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(0, endIndex);

  // Lazy loading - carregar mais produtos automaticamente
  useEffect(() => {
    if (
      currentPage >= totalPages - LAZY_LOAD_THRESHOLD &&
      !isLoadingMore &&
      currentPage < totalPages
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
        setIsLoadingMore(false);
      }, 500);
    }
  }, [currentPage, totalPages, isLoadingMore]);

  // Reset paginação quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Gerar sugestões de busca
  useEffect(() => {
    if (filters.searchTerm.length < 2) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = products
      .map(p => p.name)
      .filter(name => name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      .slice(0, 5);

    setSearchSuggestions(suggestions);
  }, [filters.searchTerm, products]);

  // Debounce para busca
  const debouncedSearch = useCallback(
    (value: string) => {
      const timeoutId = setTimeout(() => {
        setFilters(prev => ({ ...prev, searchTerm: value }));
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [setFilters] // Adicionar setFilters como dependência
  );

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCategories: [],
      priceRange: [0, 5000],
      brands: [],
      inStock: true,
      featured: false,
      preset: 'all',
    });
    setCurrentPage(1);
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const applyPreset = (preset: FilterPreset) => {
    setFilters(prev => ({ ...prev, preset }));
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.selectedCategories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 5000 ||
    !filters.inStock ||
    filters.featured ||
    filters.preset !== 'all';

  // Indicadores visuais para produtos
  const getProductIndicators = (product: Product) => {
    const indicators = [];

    // Produto novo (simulado - baseado no ID)
    if (parseInt(product.id) > 80) {
      indicators.push({ type: 'new', label: 'Novo', color: 'bg-green-500' });
    }

    // Produto premium (preço alto)
    if ((product.price_pix || 0) > 1500) {
      indicators.push({ type: 'premium', label: 'Premium', color: 'bg-vitale-primary' });
    }

    // Produto em promoção (simulado)
    if (parseInt(product.id) % 7 === 0) {
      indicators.push({ type: 'sale', label: 'Oferta', color: 'bg-red-500' });
    }

    return indicators;
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Filtros Rápidos */}
      {enableAdvancedFilters && (
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-sm font-medium text-muted-foreground'>Filtros Rápidos:</span>
          <Button
            variant={filters.preset === 'all' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('all')}
          >
            Todos
          </Button>
          <Button
            variant={filters.preset === 'toxina' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('toxina')}
          >
            Toxinas
          </Button>
          <Button
            variant={filters.preset === 'preenchedor' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('preenchedor')}
          >
            Preenchedores
          </Button>
          <Button
            variant={filters.preset === 'bioestimulador' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('bioestimulador')}
          >
            Bioestimuladores
          </Button>
          <Button
            variant={filters.preset === 'premium' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('premium')}
          >
            Premium
          </Button>
          <Button
            variant={filters.preset === 'budget' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('budget')}
          >
            Econômico
          </Button>
          <Button
            variant={filters.preset === 'new' ? 'default' : 'outline'}
            size='sm'
            onClick={() => applyPreset('new')}
          >
            Novidades
          </Button>
        </div>
      )}

      {/* Barra de Controles */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        {/* Busca */}
        <div className='relative max-w-md flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            data-testid='search-input'
            placeholder='Busque por produto, categoria, marca...'
            className='pl-10'
            onChange={e => debouncedSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Sugestões de busca */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className='bg-white absolute top-full z-50 w-full rounded-md border shadow-lg'>
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className='block w-full px-4 py-2 text-left hover:bg-muted'
                  onClick={() => {
                    setFilters(prev => ({ ...prev, searchTerm: suggestion }));
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Controles de Visualização */}
        <div className='flex items-center gap-2'>
          <div className='flex rounded-md border'>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size='sm'
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className='h-4 w-4' />
            </Button>
            <Button
              variant={viewMode === 'grid-large' ? 'default' : 'ghost'}
              size='sm'
              onClick={() => setViewMode('grid-large')}
              title='Grade grande'
            >
              <Grid3X3 className='h-4 w-4' />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size='sm'
              onClick={() => setViewMode('list')}
              title='Lista'
            >
              <List className='h-4 w-4' />
            </Button>
          </div>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className='rounded-md border px-3 py-2 text-sm'
            aria-label='Ordenar produtos por'
          >
            <option value='popularity'>Mais populares</option>
            <option value='name-asc'>Nome A-Z</option>
            <option value='name-desc'>Nome Z-A</option>
            <option value='price-asc'>Menor preço</option>
            <option value='price-desc'>Maior preço</option>
            <option value='category'>Categoria</option>
            <option value='newest'>Mais recentes</option>
          </select>

          {/* Filtros Avançados */}
          {enableAdvancedFilters && (
            <Button
              data-testid='filter-toggle'
              variant={showFilters ? 'default' : 'outline'}
              size='sm'
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className='h-4 w-4' />
              Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Filtros Avançados */}
      {showFilters && enableAdvancedFilters && (
        <div className='rounded-lg border bg-muted/50 p-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {/* Categorias */}
            <div>
              <label className='text-sm font-medium'>Categorias</label>
              <div className='mt-2 space-y-2'>
                {productData.categories.map(category => (
                  <label key={category} className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={filters.selectedCategories.includes(category)}
                      onChange={e => {
                        if (e.target.checked) {
                          updateFilter('selectedCategories', [
                            ...filters.selectedCategories,
                            category,
                          ]);
                        } else {
                          updateFilter(
                            'selectedCategories',
                            filters.selectedCategories.filter(c => c !== category)
                          );
                        }
                      }}
                      className='mr-2'
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div>
              <label className='text-sm font-medium'>Faixa de Preço</label>
              <div className='mt-2 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Input
                    type='number'
                    placeholder='Min'
                    value={filters.priceRange[0]}
                    onChange={e =>
                      updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
                    }
                    className='w-20'
                  />
                  <span>-</span>
                  <Input
                    type='number'
                    placeholder='Max'
                    value={filters.priceRange[1]}
                    onChange={e =>
                      updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                    }
                    className='w-20'
                  />
                </div>
                <div className='text-xs text-muted-foreground'>
                  R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                </div>
              </div>
            </div>

            {/* Outros Filtros */}
            <div>
              <label className='text-sm font-medium'>Outros</label>
              <div className='mt-2 space-y-2'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={filters.inStock}
                    onChange={e => updateFilter('inStock', e.target.checked)}
                    className='mr-2'
                  />
                  Apenas em estoque
                </label>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={filters.featured}
                    onChange={e => updateFilter('featured', e.target.checked)}
                    className='mr-2'
                  />
                  Produtos em destaque
                </label>
              </div>
            </div>
          </div>

          {/* Limpar Filtros */}
          {hasActiveFilters && (
            <div className='mt-4 flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                {filteredProducts.length} produtos encontrados
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={clearFilters}
                data-testid='clear-filters'
              >
                <X className='mr-2 h-4 w-4' />
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Resultados */}
      <div className='space-y-4'>
        {/* Contagem e Indicadores */}
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <span data-testid='results-count'>{filteredProducts.length} produtos encontrados</span>
          <span>
            Ordenado por{' '}
            {sortBy === 'popularity'
              ? 'popularidade'
              : sortBy === 'name-asc'
                ? 'name-asc'
                : sortBy === 'name-desc'
                  ? 'name-desc'
                  : sortBy === 'price-asc'
                    ? 'price-asc'
                    : sortBy === 'price-desc'
                      ? 'price-desc'
                      : sortBy === 'category'
                        ? 'category'
                        : sortBy === 'newest'
                          ? 'newest'
                          : sortBy}
          </span>
        </div>

        {/* Grid de Produtos */}
        <div
          data-testid='products-grid'
          className={`grid gap-4 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : viewMode === 'grid-large'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
          }`}
        >
          {currentProducts.map(product => {
            const indicators = getProductIndicators(product);
            return (
              <div key={product.id} className='relative'>
                <ProductCard product={product} />
                {/* Indicadores visuais */}
                {indicators.length > 0 && (
                  <div className='absolute right-2 top-2 flex flex-col gap-1'>
                    {indicators.map((indicator, index) => (
                      <span
                        key={index}
                        className={`${indicator.color} text-white rounded-full px-2 py-1 text-xs font-medium`}
                      >
                        {indicator.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Loading mais produtos */}
        {isLoadingMore && currentPage < totalPages && (
          <div className='flex justify-center py-4'>
            <div className='flex items-center gap-2'>
              <RefreshCw className='h-4 w-4 animate-spin' />
              <span className='text-sm text-muted-foreground'>Carregando mais produtos...</span>
            </div>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='h-4 w-4' />
              Anterior
            </Button>

            <span className='text-sm text-muted-foreground'>
              Página {currentPage} de {totalPages}
            </span>

            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {filteredProducts.length === 0 && (
          <div data-testid='no-results' className='py-12 text-center'>
            <Package className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <h3 className='mb-2 text-lg font-medium text-muted-foreground'>
              Nenhum produto encontrado
            </h3>
            <p className='mb-4 text-muted-foreground'>
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button onClick={clearFilters} data-testid='clear-filters'>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
