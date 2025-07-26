'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Filter,
  Grid2X2,
  Grid3X3,
  List,
  Package,
  Search,
  SortAsc,
  SortDesc,
  X,
} from 'lucide-react';

import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product';

interface ProductCatalogProps {
  products: Product[];
  isLoading?: boolean;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'category';
type ViewMode = 'grid' | 'grid-large' | 'list';

export default function ProductCatalog({ products, isLoading = false }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('category');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Extrair categorias únicas
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  // Extrair faixa de preços
  const priceExtent = useMemo(() => {
    if (products.length === 0) return [0, 1000];
    const prices = products.map(p => p.price_pix || 0);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  // Atualizar faixa de preços quando produtos mudarem
  useEffect(() => {
    setPriceRange(priceExtent as [number, number]);
  }, [priceExtent]);

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Busca por texto
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Categoria
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

      // Preço
      const productPrice = product.price_pix || 0;
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return (a.price_pix || 0) - (b.price_pix || 0);
        case 'price-desc':
          return (b.price_pix || 0) - (a.price_pix || 0);
        case 'category':
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange(priceExtent as [number, number]);
    setSortBy('category');
  };

  // Verificar se há filtros ativos
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== '' ||
    priceRange[0] !== priceExtent[0] ||
    priceRange[1] !== priceExtent[1];

  return (
    <div className="space-y-6">
      {/* Barra de busca e controles */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Busca */}
        <div className="relative max-w-full flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-neutral-400" />
          <Input
            type="text"
            placeholder="Buscar produtos, categorias..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="rounded-xl border-2 border-vitale-primary/30 py-3 pl-10 pr-4 text-base focus:border-vitale-primary"
            data-testid="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-neutral-400 hover:text-neutral-600"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
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

          {/* Botão de filtros */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={`border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10 ${showFilters ? 'bg-vitale-primary/10' : ''}`}
            data-testid="filter-toggle"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros{' '}
            {hasActiveFilters && (
              <span className="ml-1 h-2 w-2 rounded-full bg-vitale-primary"></span>
            )}
          </Button>
        </div>
      </div>

      {/* Painel de filtros */}
      {showFilters && (
        <div
          className="bg-white space-y-6 rounded-xl border border-vitale-primary/20 p-6"
          data-testid="filters-panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-vitale-primary">Filtros</h3>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-neutral-600 hover:text-vitale-primary"
                data-testid="clear-filters"
              >
                Limpar tudo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* Categoria */}
            <div>
              <label className="mb-2 block text-sm font-medium text-vitale-primary">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-vitale-primary/30 p-3 focus:border-vitale-primary focus:outline-none"
                data-testid="category-filter"
                aria-label="Filtrar por categoria"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Faixa de preço */}
            <div>
              <label className="mb-2 block text-sm font-medium text-vitale-primary">
                Faixa de Preço
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full rounded border border-vitale-primary/30 p-2 text-sm"
                    placeholder="Mín"
                    data-testid="price-min"
                  />
                  <span className="text-neutral-400">até</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full rounded border border-vitale-primary/30 p-2 text-sm"
                    placeholder="Máx"
                    data-testid="price-max"
                  />
                </div>
                <div className="text-xs text-neutral-500">
                  R$ {priceExtent[0]} - R$ {priceExtent[1]}
                </div>
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label className="mb-2 block text-sm font-medium text-vitale-primary">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="w-full rounded-lg border border-vitale-primary/30 p-3 focus:border-vitale-primary focus:outline-none"
                data-testid="sort-select"
                aria-label="Ordenar produtos"
              >
                <option value="category">Categoria</option>
                <option value="name-asc">Nome A-Z</option>
                <option value="name-desc">Nome Z-A</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600" data-testid="results-count">
          <strong>{filteredProducts.length}</strong> produto
          {filteredProducts.length !== 1 ? 's' : ''} encontrado
          {filteredProducts.length !== 1 ? 's' : ''}
          {searchTerm && ` para "${searchTerm}"`}
        </p>
        {sortBy !== 'category' && (
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            {sortBy.includes('asc') ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
            Ordenado por {sortBy.includes('name') ? 'nome' : 'preço'}
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
                ? 'xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1'
          }`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div
          className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid-large'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : viewMode === 'grid'
                ? 'xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1'
          }`}
          data-testid="products-grid"
        >
          {filteredProducts.map((product, index) => (
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
                className="text-white bg-vitale-primary hover:bg-vitale-secondary"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
