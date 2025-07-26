'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Clock,
  Filter,
  Grid2X2,
  Grid3X3,
  List,
  Package,
  RefreshCw,
  Search,
  Sliders,
  SortAsc,
  SortDesc,
  Star,
  Tag,
  TrendingUp,
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

  // Atualizar faixa de preços quando produtos mudarem
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: productData.priceExtent,
    }));
  }, [productData.priceExtent]);

  // Gerar sugestões de pesquisa
  const generateSearchSuggestions = useCallback(
    (query: string) => {
      if (!query || query.length < 2) {
        setSearchSuggestions([]);
        return;
      }

      const suggestions = new Set<string>();
      const queryLower = query.toLowerCase();

      products.forEach(product => {
        // Sugestões de nomes de produtos
        if (product.name.toLowerCase().includes(queryLower)) {
          suggestions.add(product.name);
        }

        // Sugestões de categorias
        if (product.category.toLowerCase().includes(queryLower)) {
          suggestions.add(product.category);
        }

        // Sugestões de descrição
        if (product.description?.toLowerCase().includes(queryLower)) {
          const words = product.description.split(' ');
          words.forEach(word => {
            if (word.toLowerCase().includes(queryLower) && word.length > 3) {
              suggestions.add(word);
            }
          });
        }
      });

      setSearchSuggestions(Array.from(suggestions).slice(0, 5));
    },
    [products]
  );

  // Aplicar filtros preset
  const applyPreset = useCallback(
    (preset: FilterPreset) => {
      switch (preset) {
        case 'toxina':
          setFilters(prev => ({
            ...prev,
            selectedCategories: ['Toxina Botulínica'],
            preset,
          }));
          break;
        case 'preenchedor':
          setFilters(prev => ({
            ...prev,
            selectedCategories: ['Preenchedor'],
            preset,
          }));
          break;
        case 'bioestimulador':
          setFilters(prev => ({
            ...prev,
            selectedCategories: ['Bioestimulador'],
            preset,
          }));
          break;
        case 'premium':
          setFilters(prev => ({
            ...prev,
            priceRange: [1000, productData.priceExtent[1]],
            preset,
          }));
          break;
        case 'budget':
          setFilters(prev => ({
            ...prev,
            priceRange: [productData.priceExtent[0], 500],
            preset,
          }));
          break;
        case 'new':
          setFilters(prev => ({
            ...prev,
            featured: true,
            preset,
          }));
          setSortBy('newest');
          break;
        default:
          setFilters(prev => ({
            ...prev,
            selectedCategories: [],
            priceRange: productData.priceExtent,
            brands: [],
            featured: false,
            preset: 'all',
          }));
      }
    },
    [productData.priceExtent]
  );

  // Busca inteligente
  const smartSearch = useMemo(() => {
    if (!filters.searchTerm) return products;

    const query = filters.searchTerm.toLowerCase();
    const searchTerms = query.split(' ').filter(term => term.length > 0);

    return products.filter(product => {
      const searchableText = [product.name, product.category, product.description || '']
        .join(' ')
        .toLowerCase();

      // Busca exata
      if (searchableText.includes(query)) return true;

      // Busca por termos individuais
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, [products, filters.searchTerm]);

  // Aplicar filtros
  const filteredProducts = useMemo(() => {
    let filtered = smartSearch;

    // Filtro por categorias
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(product => filters.selectedCategories.includes(product.category));
    }

    // Filtro por preço
    filtered = filtered.filter(product => {
      const price = product.price_pix || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filtro por marcas
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => {
        const brand = product.name.split(' ')[0];
        return filters.brands.includes(brand);
      });
    }

    // Filtro por estoque (simulado)
    if (filters.inStock) {
      filtered = filtered.filter(product => product.active !== false);
    }

    // Filtro por destaque
    if (filters.featured) {
      // Simular produtos em destaque (primeiros 10)
      const featuredIds = products.slice(0, 10).map(p => p.id);
      filtered = filtered.filter(product => featuredIds.includes(product.id));
    }

    return filtered;
  }, [smartSearch, filters, products]);

  // Aplicar ordenação
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
      case 'popularity':
        // Simular popularidade baseada no ID (menor ID = mais popular)
        return sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      case 'newest':
        // Simular produtos mais novos (maior ID = mais novo)
        return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'best-rated':
        // Simular melhor avaliação (por nome alfabético invertido)
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'category':
      default:
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
    }
  }, [filteredProducts, sortBy]);

  // Limpar filtros
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCategories: [],
      priceRange: productData.priceExtent,
      brands: [],
      inStock: true,
      featured: false,
      preset: 'all',
    });
    setSortBy('category');
    setSearchSuggestions([]);
  };

  // Verificar se há filtros ativos
  const hasActiveFilters =
    filters.searchTerm !== '' ||
    filters.selectedCategories.length > 0 ||
    filters.priceRange[0] !== productData.priceExtent[0] ||
    filters.priceRange[1] !== productData.priceExtent[1] ||
    filters.brands.length > 0 ||
    filters.featured ||
    filters.preset !== 'all';

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filtros Rápidos (Presets) */}
      {enableAdvancedFilters && (
        <div className="bg-white rounded-xl border border-vitale-primary/20 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-medium text-vitale-primary">Filtros Rápidos:</span>
            {[
              { key: 'all', label: 'Todos', icon: Package },
              { key: 'toxina', label: 'Toxinas', icon: Star },
              { key: 'preenchedor', label: 'Preenchedores', icon: TrendingUp },
              { key: 'bioestimulador', label: 'Bioestimuladores', icon: Clock },
              { key: 'premium', label: 'Premium', icon: Star },
              { key: 'budget', label: 'Econômico', icon: Tag },
              { key: 'new', label: 'Novidades', icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filters.preset === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => applyPreset(key as FilterPreset)}
                className={`gap-2 text-xs ${
                  filters.preset === key
                    ? 'text-white bg-vitale-primary'
                    : 'border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10'
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Barra de busca e controles principais */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Busca inteligente */}
        <div className="relative max-w-full flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-neutral-400" />
          <Input
            type="text"
            placeholder="Busque por produto, categoria, marca..."
            value={filters.searchTerm}
            onChange={e => {
              updateFilter('searchTerm', e.target.value);
              generateSearchSuggestions(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="rounded-xl border-2 border-vitale-primary/30 py-3 pl-10 pr-4 text-base focus:border-vitale-primary"
            data-testid="search-input"
          />
          {filters.searchTerm && (
            <button
              onClick={() => {
                updateFilter('searchTerm', '');
                setSearchSuggestions([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-neutral-400 hover:text-neutral-600"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Sugestões de busca */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="bg-white absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-vitale-primary/20 shadow-lg">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    updateFilter('searchTerm', suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-vitale-primary/10"
                >
                  <Search className="mr-2 inline h-4 w-4 text-neutral-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Controles de visualização e filtros */}
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          {/* Modo de visualização */}
          <div className="hidden items-center rounded-lg border border-vitale-primary/20 p-1 sm:flex">
            <button
              onClick={() => setViewMode('grid-large')}
              className={`rounded p-2 ${viewMode === 'grid-large' ? 'text-white bg-vitale-primary' : 'text-vitale-primary hover:bg-vitale-primary/10'}`}
              title="Grade grande"
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded p-2 ${viewMode === 'grid' ? 'text-white bg-vitale-primary' : 'text-vitale-primary hover:bg-vitale-primary/10'}`}
              title="Grade compacta"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded p-2 ${viewMode === 'list' ? 'text-white bg-vitale-primary' : 'text-vitale-primary hover:bg-vitale-primary/10'}`}
              title="Lista"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Ordenação rápida */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-vitale-primary/30 px-3 py-2 text-sm focus:border-vitale-primary focus:outline-none"
            aria-label="Ordenar produtos por"
          >
            <option value="category">Por categoria</option>
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="popularity">Mais populares</option>
            <option value="newest">Mais recentes</option>
            <option value="best-rated">Melhor avaliados</option>
          </select>

          {/* Botão de filtros avançados */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={`border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10 ${showFilters ? 'bg-vitale-primary/10' : ''}`}
            data-testid="filter-toggle"
          >
            <Sliders className="mr-2 h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-1 h-2 w-2 rounded-full bg-vitale-primary"></span>
            )}
          </Button>
        </div>
      </div>

      {/* Painel de filtros avançados */}
      {showFilters && enableAdvancedFilters && (
        <div className="bg-white space-y-6 rounded-xl border border-vitale-primary/20 p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-vitale-primary">
              <Filter className="h-5 w-5" />
              Filtros Avançados
            </h3>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-neutral-600 hover:text-vitale-primary"
                  data-testid="clear-filters"
                >
                  <RefreshCw className="h-4 w-4" />
                  Limpar tudo
                </Button>
              )}
              <Button onClick={() => setShowFilters(false)} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Filtro por categorias */}
            <div>
              <label className="mb-3 block text-sm font-medium text-vitale-primary">
                Categorias
              </label>
              <div className="max-h-40 space-y-2 overflow-y-auto">
                {productData.categories.map(category => (
                  <label key={category} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(category)}
                      onChange={e => {
                        const newCategories = e.target.checked
                          ? [...filters.selectedCategories, category]
                          : filters.selectedCategories.filter(c => c !== category);
                        updateFilter('selectedCategories', newCategories);
                      }}
                      className="rounded border-vitale-primary/30 text-vitale-primary focus:ring-vitale-primary"
                    />
                    <span className="text-sm text-neutral-700">{category}</span>
                    <span className="ml-auto text-xs text-neutral-500">
                      ({products.filter(p => p.category === category).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por faixa de preço */}
            <div>
              <label className="mb-3 block text-sm font-medium text-vitale-primary">
                Faixa de Preço
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={e =>
                      updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
                    }
                    className="w-full rounded border border-vitale-primary/30 p-2 text-sm"
                    placeholder="Mín"
                    min={productData.priceExtent[0]}
                    max={productData.priceExtent[1]}
                  />
                  <span className="text-neutral-400">até</span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={e =>
                      updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                    }
                    className="w-full rounded border border-vitale-primary/30 p-2 text-sm"
                    placeholder="Máx"
                    min={productData.priceExtent[0]}
                    max={productData.priceExtent[1]}
                  />
                </div>
                <div className="text-xs text-neutral-500">
                  R$ {productData.priceExtent[0].toLocaleString()} - R${' '}
                  {productData.priceExtent[1].toLocaleString()}
                </div>

                {/* Faixas pré-definidas */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Até R$ 500', range: [0, 500] },
                    { label: 'R$ 500-1000', range: [500, 1000] },
                    { label: 'R$ 1000+', range: [1000, productData.priceExtent[1]] },
                  ].map(({ label, range }) => (
                    <Button
                      key={label}
                      variant="outline"
                      size="sm"
                      onClick={() => updateFilter('priceRange', range as [number, number])}
                      className="border-vitale-primary/30 text-xs text-vitale-primary hover:bg-vitale-primary/10"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtros adicionais */}
            <div>
              <label className="mb-3 block text-sm font-medium text-vitale-primary">
                Opções Adicionais
              </label>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={e => updateFilter('inStock', e.target.checked)}
                    className="rounded border-vitale-primary/30 text-vitale-primary focus:ring-vitale-primary"
                  />
                  <span className="text-sm text-neutral-700">Apenas em estoque</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={e => updateFilter('featured', e.target.checked)}
                    className="rounded border-vitale-primary/30 text-vitale-primary focus:ring-vitale-primary"
                  />
                  <span className="text-sm text-neutral-700">Produtos em destaque</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resultados e informações */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-neutral-600" data-testid="results-count">
            <strong>{sortedProducts.length}</strong> produto{sortedProducts.length !== 1 ? 's' : ''}{' '}
            encontrado{sortedProducts.length !== 1 ? 's' : ''}
            {filters.searchTerm && ` para "${filters.searchTerm}"`}
          </p>
          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="gap-1 text-vitale-primary hover:bg-vitale-primary/10"
            >
              <RefreshCw className="h-3 w-3" />
              Limpar filtros
            </Button>
          )}
        </div>

        {sortBy !== 'category' && (
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            {sortBy.includes('asc') ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
            Ordenado por{' '}
            {sortBy.includes('name')
              ? 'nome'
              : sortBy.includes('price')
                ? 'preço'
                : sortBy === 'popularity'
                  ? 'popularidade'
                  : sortBy === 'newest'
                    ? 'mais recentes'
                    : sortBy === 'best-rated'
                      ? 'avaliação'
                      : 'categoria'}
          </div>
        )}
      </div>

      {/* Grid de produtos */}
      {isLoading ? (
        <div
          className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid-large'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1'
          }`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div
          className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid-large'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1'
          }`}
          data-testid="products-grid"
        >
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard
                product={product}
                variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center" data-testid="no-results">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-vitale-primary/10">
              <Package className="h-8 w-8 text-vitale-primary" />
            </div>
            <h3 className="text-xl font-bold text-vitale-primary">Nenhum produto encontrado</h3>
            <p className="mx-auto max-w-md text-neutral-600">
              {hasActiveFilters
                ? 'Tente ajustar os filtros ou limpar a busca para ver mais produtos.'
                : 'Não há produtos disponíveis no momento.'}
            </p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                className="text-white gap-2 bg-vitale-primary hover:bg-vitale-secondary"
              >
                <RefreshCw className="h-4 w-4" />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
