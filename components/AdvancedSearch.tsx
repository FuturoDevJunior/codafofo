'use client';

import { useEffect, useMemo, useState } from 'react';

import { ChevronDown, ChevronUp, Filter, Search, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockProducts } from '@/lib/mockData';

interface AdvancedSearchProps {
  onSearchResults: (_results: any[]) => void;
  className?: string;
}

export default function AdvancedSearch({ onSearchResults, className = '' }: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extrair categorias únicas dos produtos
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
    return uniqueCategories.sort();
  }, []);

  // Função de busca otimizada
  const performSearch = useMemo(() => {
    return () => {
      let _results = [...mockProducts];

      // Filtro por termo de busca
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        _results = _results.filter(
          product =>
            product.name.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term) ||
            false ||
            product.category.toLowerCase().includes(term)
        );
      }

      // Filtro por categoria
      if (selectedCategory) {
        _results = _results.filter(product => product.category === selectedCategory);
      }

      // Filtro por faixa de preço
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        _results = _results.filter(product => {
          const price = product.price_pix;
          return price >= min && (max ? price <= max : true);
        });
      }

      // Ordenação
      if (sortBy) {
        _results.sort((a, b) => {
          switch (sortBy) {
            case 'price-asc':
              return a.price_pix - b.price_pix;
            case 'price-desc':
              return b.price_pix - a.price_pix;
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(b.name);
            default:
              return 0;
          }
        });
      }

      // Atualizar filtros ativos
      const newActiveFilters = [];
      if (searchTerm) newActiveFilters.push(`Busca: "${searchTerm}"`);
      if (selectedCategory) newActiveFilters.push(`Categoria: ${selectedCategory}`);
      if (priceRange) newActiveFilters.push(`Preço: ${priceRange}`);
      if (sortBy) newActiveFilters.push(`Ordenar: ${getSortLabel(sortBy)}`);

      setActiveFilters(newActiveFilters);
      onSearchResults(_results);
    };
  }, [searchTerm, selectedCategory, priceRange, sortBy, onSearchResults]);

  // Executar busca quando filtros mudarem
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Função para obter label da ordenação
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'price-asc':
        return 'Menor Preço';
      case 'price-desc':
        return 'Maior Preço';
      case 'name-asc':
        return 'A-Z';
      case 'name-desc':
        return 'Z-A';
      case 'rating':
        return 'Melhor Avaliados';
      default:
        return '';
    }
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setSortBy('');
    setActiveFilters([]);
  };

  // Função para remover filtro específico
  const removeFilter = (filterIndex: number) => {
    const filter = activeFilters[filterIndex];
    if (filter.includes('Busca:')) setSearchTerm('');
    if (filter.includes('Categoria:')) setSelectedCategory('');
    if (filter.includes('Preço:')) setPriceRange('');
    if (filter.includes('Ordenar:')) setSortBy('');

    const newFilters = activeFilters.filter((_, index) => index !== filterIndex);
    setActiveFilters(newFilters);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Barra de busca principal */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400' />
        <Input
          type='text'
          placeholder='Buscar produtos por nome, categoria ou marca...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='h-12 pl-10 pr-4 text-base'
        />
      </div>

      {/* Botão de filtros para mobile */}
      <div className='flex items-center justify-between lg:hidden'>
        <Button
          variant='outline'
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2'
        >
          <Filter className='h-4 w-4' />
          Filtros
          {showFilters ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
        </Button>

        {activeFilters.length > 0 && (
          <Button variant='ghost' onClick={clearFilters} className='text-sm'>
            Limpar
          </Button>
        )}
      </div>

      {/* Filtros ativos */}
      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant='secondary' className='flex items-center gap-1 px-3 py-1'>
              <span className='text-xs'>{filter}</span>
              <button
                onClick={() => removeFilter(index)}
                className='hover:text-red-500 ml-1 transition-colors'
                aria-label={`Remover filtro: ${filter}`}
                title={`Remover filtro: ${filter}`}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Painel de filtros */}
      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Filtro por categoria */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-neutral-700'>Categoria</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className='h-10'>
                <SelectValue placeholder='Todas as categorias' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=''>Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por faixa de preço */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-neutral-700'>Faixa de Preço</label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className='h-10'>
                <SelectValue placeholder='Qualquer preço' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=''>Qualquer preço</SelectItem>
                <SelectItem value='0-500'>Até R$ 500</SelectItem>
                <SelectItem value='500-1000'>R$ 500 - R$ 1.000</SelectItem>
                <SelectItem value='1000-2000'>R$ 1.000 - R$ 2.000</SelectItem>
                <SelectItem value='2000-'>Acima de R$ 2.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ordenação */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-neutral-700'>Ordenar por</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='h-10'>
                <SelectValue placeholder='Relevância' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=''>Relevância</SelectItem>
                <SelectItem value='price-asc'>Menor Preço</SelectItem>
                <SelectItem value='price-desc'>Maior Preço</SelectItem>
                <SelectItem value='name-asc'>A-Z</SelectItem>
                <SelectItem value='name-desc'>Z-A</SelectItem>
                <SelectItem value='rating'>Melhor Avaliados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botões de ação para desktop */}
        <div className='hidden items-center justify-between lg:flex'>
          <div className='text-sm text-neutral-600'>
            {activeFilters.length > 0 && `${activeFilters.length} filtro(s) ativo(s)`}
          </div>

          {activeFilters.length > 0 && (
            <Button variant='ghost' onClick={clearFilters} className='text-sm'>
              Limpar todos os filtros
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
