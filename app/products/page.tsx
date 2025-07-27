'use client';

import { useState } from 'react';

import { ArrowLeft, Grid, List, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import AdvancedSearch from '@/components/AdvancedSearch';
import ComplianceDisclaimer from '@/components/ComplianceDisclaimer';
import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';

export default function ProductsPage() {
  const [searchResults, setSearchResults] = useState(mockProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Paginação
  const totalPages = Math.ceil(searchResults.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = searchResults.slice(startIndex, endIndex);

  // Função para mudar página
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='via-white min-h-screen bg-gradient-to-br from-vitale-primary/5 to-vitale-secondary/5'>
      {/* Header da página */}
      <section className='bg-white/95 border-b border-vitale-primary/20 py-8 backdrop-blur-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <div>
              <Link
                href='/'
                className='mb-2 inline-flex items-center gap-2 text-vitale-primary transition-colors hover:text-vitale-secondary'
              >
                <ArrowLeft className='h-4 w-4' />
                Voltar ao Início
              </Link>
              <h1 className='text-3xl font-bold text-vitale-primary md:text-4xl'>
                Catálogo Completo
              </h1>
              <p className='text-gray-600 mt-2' data-testid='results-count'>
                {searchResults.length} produtos encontrados
              </p>
            </div>

            {/* Controles de visualização */}
            <div className='flex items-center gap-2'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size='sm'
                onClick={() => setViewMode('grid')}
                className='flex items-center gap-2'
              >
                <Grid className='h-4 w-4' />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size='sm'
                onClick={() => setViewMode('list')}
                className='flex items-center gap-2'
              >
                <List className='h-4 w-4' />
                Lista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer de Conformidade */}
      <section className='py-4'>
        <div className='container mx-auto px-4'>
          <ComplianceDisclaimer variant='banner' />
        </div>
      </section>

      {/* Busca Avançada */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <AdvancedSearch onSearchResults={setSearchResults} className='mb-8' />
        </div>
      </section>

      {/* Lista de Produtos */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          {currentProducts.length === 0 ? (
            <div className='py-12 text-center' role='status' aria-live='polite'>
              <div className='mb-4 text-6xl' aria-hidden='true'>
                🔍
              </div>
              <h3 className='text-gray-700 mb-2 text-xl font-semibold'>
                Nenhum produto encontrado
              </h3>
              <p className='text-gray-500 mb-6'>Tente ajustar os filtros ou termos de busca</p>
              <Button onClick={() => setSearchResults(mockProducts)} variant='outline'>
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <>
              {/* Grid/Lista de Produtos */}
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'space-y-4'
                }
                role='list'
                data-testid='products-grid'
                aria-label={`Lista de produtos em modo ${viewMode === 'grid' ? 'grade' : 'lista'}`}
              >
                {currentProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`hover:shadow-2xl bg-white/95 group transform border-2 border-vitale-primary/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50 ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                    role='listitem'
                    data-testid='product-card'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = `/products/${product.slug}`;
                      }
                    }}
                    aria-label={`Produto: ${product.name} - R$ ${product.price_pix?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  >
                    <CardHeader
                      className={`relative overflow-hidden rounded-t-lg ${viewMode === 'list' ? 'w-1/3' : ''}`}
                    >
                      <div
                        className={`relative bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10 ${
                          viewMode === 'list' ? 'aspect-square' : 'aspect-square'
                        } rounded-lg`}
                      >
                        <SmartImage
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className='rounded-lg object-cover transition-transform duration-500 group-hover:scale-110'
                          productName={product.name}
                          sizes={
                            viewMode === 'list'
                              ? '(max-width: 768px) 100vw, 33vw'
                              : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                          }
                          priority={index < 4}
                        />
                        {/* Badge de Categoria */}
                        <div className='text-white absolute right-3 top-3 rounded-full bg-vitale-primary px-3 py-1 text-xs font-bold'>
                          {product.category}
                        </div>
                        {/* Badge de Novidade */}
                        {index < 2 && (
                          <div className='bg-red-600 text-white absolute left-3 top-3 animate-pulse rounded-full px-3 py-1 text-xs font-bold'>
                            NOVO
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className={`space-y-4 p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                      <div>
                        <CardTitle className='text-xl font-bold text-vitale-primary transition-colors group-hover:text-vitale-secondary'>
                          {product.name}
                        </CardTitle>
                        <p
                          className={`text-sm text-neutral-600 ${
                            viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'
                          }`}
                        >
                          {product.description}
                        </p>
                      </div>

                      {/* Preço e CTA */}
                      <div
                        className={`flex items-center justify-between border-t border-vitale-primary/20 pt-4 ${
                          viewMode === 'list' ? 'flex-col items-start gap-4' : ''
                        }`}
                      >
                        <div className='space-y-1'>
                          <div className='text-2xl font-bold text-vitale-primary'>
                            R${' '}
                            {product.price_pix?.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) || '0,00'}
                          </div>
                          <div className='text-sm text-neutral-500'>À vista no PIX</div>
                        </div>
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label={`Ver detalhes do produto ${product.name}`}
                        >
                          <Button className='text-white transform rounded-xl bg-vitale-primary px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-vitale-secondary focus-ring'>
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <nav
                  className='mt-12 flex items-center justify-center gap-2'
                  role='navigation'
                  aria-label='Navegação de páginas'
                  data-testid='pagination'
                >
                  <Button
                    variant='outline'
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='flex items-center gap-2 focus-ring'
                    data-testid='prev-page'
                    aria-label='Página anterior'
                  >
                    <ArrowLeft className='h-4 w-4' />
                    Anterior
                  </Button>

                  <div className='flex items-center gap-1'>
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
                      const isNearCurrent = Math.abs(page - currentPage) <= 2;

                      if (isCurrentPage || isNearCurrent || page === 1 || page === totalPages) {
                        return (
                          <Button
                            key={page}
                            variant={isCurrentPage ? 'default' : 'outline'}
                            size='sm'
                            onClick={() => goToPage(page)}
                            className='min-w-[40px] focus-ring'
                            aria-label={
                              isCurrentPage ? `Página atual: ${page}` : `Ir para página ${page}`
                            }
                            aria-current={isCurrentPage ? 'page' : undefined}
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === 2 && currentPage > 4) {
                        return (
                          <span key={page} className='px-2'>
                            ...
                          </span>
                        );
                      } else if (page === totalPages - 1 && currentPage < totalPages - 3) {
                        return (
                          <span key={page} className='px-2'>
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant='outline'
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='flex items-center gap-2 focus-ring'
                    data-testid='next-page'
                    aria-label='Próxima página'
                  >
                    Próxima
                    <ArrowLeft className='h-4 w-4 rotate-180' />
                  </Button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className='bg-gradient-to-br from-vitale-primary/10 via-vitale-secondary/5 to-vitale-primary/10 py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-vitale-primary'>
            Precisa de Ajuda para Escolher?
          </h2>
          <p className='text-gray-700 mx-auto mb-8 max-w-2xl text-lg'>
            Nossa equipe especializada está pronta para ajudar você a encontrar os produtos ideais
            para sua clínica.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <a
              href='https://wa.me/5521996192890?text=Olá! Gostaria de ajuda para escolher produtos da Vytalle.'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-green-600 text-white hover:bg-green-700 inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold transition-colors'
            >
              <MessageCircle className='h-5 w-5' />
              Consultor Especializado
            </a>
            <Link
              href='/'
              className='text-white inline-flex items-center justify-center gap-3 rounded-xl bg-vitale-primary px-8 py-4 font-semibold transition-colors hover:bg-vitale-secondary'
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
