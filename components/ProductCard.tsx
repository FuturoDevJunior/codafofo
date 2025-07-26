'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Eye, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/lib/analytics';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types/product';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

interface ProductCardProps {
  product: Product;
  variant?: 'vertical' | 'horizontal';
}

export default function ProductCard({ product, variant = 'vertical' }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Detectar se temos preços PIX/Cartão ou preço único
  const pixPrice = product.price_pix || 0;
  const cardPrice = product.price_prazo || 0;

  const addItem = useCartStore(s => s.addItem);
  const { trackCartAdd } = useAnalytics();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: pixPrice, // Usar preço PIX como padrão
        price_pix: pixPrice,
        price_card: cardPrice,
        quantity: 1,
        images: product.images,
      });

      // Track analytics
      trackCartAdd(product.id, product.name, pixPrice);

      toast({
        title: '✅ Produto adicionado!',
        description: `${product.name} foi adicionado ao seu carrinho`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);

      // Tratamento específico de falha de rede/API
      const isNetworkError = error instanceof TypeError && error.message.includes('fetch');
      const isTimeoutError = error instanceof Error && error.name === 'AbortError';

      toast({
        title: '❌ Erro',
        description: isNetworkError
          ? 'Falha na conexão. Verifique sua internet e tente novamente.'
          : isTimeoutError
            ? 'Tempo esgotado. O servidor está demorando para responder.'
            : 'Não foi possível adicionar o produto. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group h-full"
      style={{ display: 'block' }}
    >
      <Card
        className="bg-white flex h-full flex-col overflow-hidden rounded-2xl border border-vitale-primary/20 transition-all duration-300 focus-ring hover:border-vitale-primary/40 hover:shadow-vitale"
        role="article"
        aria-labelledby={`product-${product.id}-name`}
      >
        {/* Header com Imagem */}
        <CardHeader className="relative h-52 overflow-hidden rounded-t-2xl bg-vitale-primary/5 p-0 sm:h-56 md:h-60 lg:h-64">
          <motion.div variants={imageVariants} className="h-full w-full">
            <SmartImage
              src={product.images?.[0]}
              alt={`${product.name} - Estético profissional`}
              fallback={
                product.category === 'Botox' ||
                product.category === 'Dysport' ||
                product.category === 'Xeomin'
                  ? '/icons/medicine-bottle.png'
                  : product.category === 'Visco-supl.'
                    ? '/icons/syringe.png'
                    : '/icons/pill-bottle.png'
              }
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              borderRadius="rounded-t-2xl"
              objectFit="cover"
              productName={product.name}
            />
          </motion.div>

          {/* Status Badge */}

          {/* Quick Actions */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <Tooltip content="Ver detalhes completos" side="left">
              <Link
                href={`/products/${product.slug}`}
                className="bg-white/95 hover:bg-white flex h-9 w-9 items-center justify-center rounded-xl border border-vitale-primary/20 shadow-lg transition-all duration-200 focus-ring hover:border-vitale-primary hover:shadow-xl"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <Eye className="h-4 w-4 text-vitale-primary" />
              </Link>
            </Tooltip>
          </div>

          {/* Image indicator dots */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {product.images.slice(0, 4).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${
                    idx === 0 ? 'bg-vitale-primary shadow-lg' : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
              {product.images.length > 4 && (
                <div className="text-white/80 bg-black/30 rounded-full px-1.5 py-0.5 text-xs font-medium">
                  +{product.images.length - 4}
                </div>
              )}
            </div>
          )}
        </CardHeader>

        {/* Conteúdo do Card */}
        <CardContent className="content-padding gap-responsive-sm flex min-w-0 flex-1 flex-col">
          {/* Título e Categoria */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <CardTitle
                  id={`product-${product.id}-name`}
                  className="product-title text-lg font-bold leading-tight text-vitale-primary md:text-xl lg:text-2xl"
                  title={product.name}
                >
                  {product.name}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-vitale-primary/10 px-2 py-1.5 md:px-3 md:py-2">
                <span className="text-xs font-bold uppercase tracking-wide text-vitale-primary md:text-sm lg:text-base">
                  {product.category?.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Preços - Hierarquia melhorada */}
          <div className="space-y-3">
            {/* Preço PIX - Destaque principal */}
            <div className="from-green-50 to-green-100/50 border-green-200 rounded-xl border-2 bg-gradient-to-r p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="bg-green-600 text-white flex-shrink-0 rounded-lg px-2 py-1.5 text-xs font-bold">
                    PIX
                  </div>
                  <span className="text-green-700 truncate text-xs font-bold md:text-sm">
                    à vista
                  </span>
                </div>
                <div className="price-container text-right">
                  <div className="font-black text-green-600 price-text text-lg md:text-xl lg:text-2xl">
                    {formatCurrency(pixPrice, product.currency)}
                  </div>
                  <div className="text-green-600/80 price-label text-xs font-medium md:text-sm">
                    melhor preço
                  </div>
                </div>
              </div>
            </div>

            {/* Parcelamento - Secundário */}
            <div className="rounded-xl border-2 border-vitale-primary/20 bg-vitale-primary/5 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-xs font-bold text-vitale-primary md:text-sm">
                    4x no cartão
                  </span>
                </div>
                <div className="font-black price-text text-base text-vitale-primary md:text-lg lg:text-xl">
                  {formatCurrency(cardPrice / 4, product.currency)}
                </div>
              </div>
              <div className="mt-2 text-xs font-medium text-vitale-primary/80 md:text-sm">
                Total: {formatCurrency(cardPrice, product.currency)}
              </div>
            </div>
          </div>

          {/* Status e Disponibilidade */}
          <div className="border-success-200 flex items-center gap-3 rounded-xl border-2 bg-success-50 p-3 md:p-4">
            <div className="flex-shrink-0 rounded-full bg-success-500 p-1.5 md:p-2">
              <Package className="text-white h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-success-700 md:text-sm lg:text-base">
                Disponível para envio imediato
              </div>
              <div className="text-xs font-medium text-success-600 md:text-sm">
                Consulte condições especiais
              </div>
            </div>
          </div>

          {/* Ações - Redesenhadas */}
          <div className="mt-auto space-y-4 pt-4">
            <Button
              className="text-white min-h-[52px] w-full rounded-xl bg-vitale-primary py-4 text-base font-bold shadow-lg transition-all duration-200 focus-ring interactive hover:bg-vitale-secondary hover:shadow-xl md:min-h-[56px] md:py-5 md:text-lg"
              onClick={handleAddToCart}
              disabled={isLoading}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              {isLoading ? (
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="border-white/30 border-t-white h-4 w-4 animate-spin rounded-full border-2" />
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex w-full items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-bold">Adicionar ao Carrinho</span>
                </div>
              )}
            </Button>

            <Link
              href={`/products/${product.slug}`}
              className="bg-white inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 border-vitale-primary/30 px-4 py-3 text-sm font-bold text-vitale-primary transition-all duration-200 focus-ring hover:border-vitale-primary/50 hover:bg-vitale-primary/5 hover:text-vitale-secondary md:min-h-[52px] md:py-4 md:text-base"
              aria-label={`Ver detalhes completos de ${product.name}`}
            >
              <Eye className="h-4 w-4 md:h-5 md:w-5" />
              <span>Ver Detalhes Completos</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
