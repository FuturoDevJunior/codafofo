"use client";

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  Eye,
  Package,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';

import SmartImage from '@/components/SmartImage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      staggerChildren: 0.1
    }
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: { 
      duration: 0.3, 
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

export default function ProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Detectar se temos preços PIX/Cartão ou preço único
  const pixPrice = product.price_pix || 0;
  const cardPrice = product.price_card || 0;
  
  const addItem = useCartStore((s) => s.addItem);
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
        images: product.images
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
        variant: 'destructive'
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
    >
      <Card
        className="overflow-hidden bg-white rounded-2xl border border-vitale-primary/20 hover:border-vitale-primary/40 transition-all duration-300 hover:shadow-vitale flex flex-col h-full focus-ring"
        role="article"
        aria-labelledby={`product-${product.id}-name`}>
        
        {/* Header com Imagem */}
        <CardHeader className="p-0 relative h-52 sm:h-56 md:h-60 lg:h-64 bg-vitale-primary/5 overflow-hidden rounded-t-2xl">
          <motion.div variants={imageVariants} className="w-full h-full">
            <SmartImage
              src={product.images?.[0]}
              alt={`${product.name} - Estético profissional`}
              fallback={
                product.category === 'Botox' || product.category === 'Dysport' || product.category === 'Xeomin'
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
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
            <Tooltip content="Ver detalhes completos" side="left">
              <Link
                href={`/products/${product.slug}`}
                className="w-9 h-9 bg-white/95 hover:bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus-ring border border-vitale-primary/20 hover:border-vitale-primary"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <Eye className="w-4 h-4 text-vitale-primary" />
              </Link>
            </Tooltip>
          </div>

          {/* Image indicator dots */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.slice(0, 4).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === 0 
                      ? 'bg-vitale-primary shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
              {product.images.length > 4 && (
                <div className="text-xs text-white/80 font-medium bg-black/30 px-1.5 py-0.5 rounded-full">
                  +{product.images.length - 4}
                </div>
              )}
            </div>
          )}

        </CardHeader>

        {/* Conteúdo do Card */}
        <CardContent className="content-padding flex flex-col flex-1 gap-responsive-sm">
          {/* Título e Categoria */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle 
                  id={`product-${product.id}-name`}
                  className="line-clamp-2 text-lg md:text-xl lg:text-2xl font-bold text-vitale-primary leading-tight"
                >
                  {product.name}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-vitale-primary/10 px-3 py-2 rounded-lg">
                <span className="text-sm md:text-base font-bold text-vitale-primary uppercase tracking-wide">
                  {product.category?.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Preços - Hierarquia melhorada */}
          <div className="space-y-3">
            {/* Preço PIX - Destaque principal */}
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-bold">
                    PIX
                  </div>
                  <span className="text-sm md:text-base text-green-700 font-bold">à vista</span>
                </div>
                <div className="text-right">
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-green-600">
                    {formatCurrency(pixPrice, product.currency)}
                  </div>
                  <div className="text-sm text-green-600/80 font-medium">melhor preço</div>
                </div>
              </div>
            </div>

            {/* Parcelamento - Secundário */}
            <div className="bg-vitale-primary/5 border-2 border-vitale-primary/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-bold text-vitale-primary">4x no cartão</span>
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-black text-vitale-primary">
                  {formatCurrency(cardPrice / 4, product.currency)}
                </div>
              </div>
              <div className="text-sm text-vitale-primary/80 mt-2 font-medium">
                Total: {formatCurrency(cardPrice, product.currency)}
              </div>
            </div>
          </div>

          {/* Status e Disponibilidade */}
          <div className="bg-success-50 border-2 border-success-200 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-success-500 p-2 rounded-full">
              <Package className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm md:text-base font-bold text-success-700">
                Disponível para envio imediato
              </div>
              <div className="text-sm text-success-600 font-medium">
                Consulte condições especiais
              </div>
            </div>
          </div>

          {/* Ações - Redesenhadas */}
          <div className="mt-auto space-y-4 pt-4">
            <Button
              className="w-full font-bold rounded-xl py-4 md:py-5 text-base md:text-lg transition-all duration-200 bg-vitale-primary text-white hover:bg-vitale-secondary shadow-lg hover:shadow-xl interactive focus-ring min-h-[52px] md:min-h-[56px]"
              onClick={handleAddToCart}
              disabled={isLoading}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center w-full">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center w-full">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="font-bold">Adicionar ao Carrinho</span>
                </div>
              )}
            </Button>
            
            <Link
              href={`/products/${product.slug}`}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 md:py-4 text-sm md:text-base font-bold text-vitale-primary hover:text-vitale-secondary border-2 border-vitale-primary/30 hover:border-vitale-primary/50 rounded-xl bg-white hover:bg-vitale-primary/5 transition-all duration-200 focus-ring min-h-[48px] md:min-h-[52px]"
              aria-label={`Ver detalhes completos de ${product.name}`}
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
              <span>Ver Detalhes Completos</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
