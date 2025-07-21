"use client";

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  Eye,
  Heart,
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
import { toast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/lib/analytics';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types/product';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

export default function ProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const hasDiscount = product.discount_percent > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;
  const addItem = useCartStore((s) => s.addItem);
  const isOutOfStock = product.stock < 1;
  const { trackCartAdd } = useAnalytics();

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    
    // Debug log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('🛒 Adicionando produto ao carrinho:', { 
        id: product.id, 
        name: product.name, 
        price: discountedPrice 
      });
    }
    
    setIsLoading(true);
    try {
      addItem({ 
        id: product.id, 
        name: product.name, 
        price: discountedPrice, 
        quantity: 1,
        images: product.images
      });

      // Track analytics
      trackCartAdd(product.id, product.name, discountedPrice);
      
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
      className="group"
    >
      <Card className="overflow-hidden bg-white rounded-2xl border border-neutral-200 hover:border-vitale-primary/30 transition-all duration-300 hover:shadow-lg flex flex-col h-full focus-ring"
            role="article"
            aria-labelledby={`product-${product.id}-name`}>
        
        {/* Header com Imagem */}
        <CardHeader className="p-0 relative h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
          <motion.div variants={imageVariants} className="w-full h-full">
            <SmartImage
              src={product.images?.[0]}
              alt={`Imagem do produto ${product.name}`}
              fallback="/icons/icon-192.png"
              fill
              className="object-cover transition-transform duration-300"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Badges e Indicadores */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <motion.span 
                className="bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                aria-label={`Desconto de ${product.discount_percent}%`}
              >
                -{product.discount_percent}%
              </motion.span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-warning-500 text-white text-xs font-medium px-2 py-1 rounded-lg">
                Últimas unidades
              </span>
            )}
          </div>

          {/* Ações Rápidas */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 focus-ring"
              aria-label="Adicionar aos favoritos"
            >
              <Heart className="w-4 h-4 text-neutral-600 hover:text-error-500" />
            </button>
          </div>

          {/* Status de Estoque */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
              <span className="bg-neutral-800 text-white px-4 py-2 rounded-lg font-medium">
                Esgotado
              </span>
            </div>
          )}
        </CardHeader>

        {/* Conteúdo do Card */}
        <CardContent className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
          {/* Título e Categoria */}
          <div className="space-y-1">
            <CardTitle 
              id={`product-${product.id}-name`}
              className="text-base sm:text-lg font-semibold text-neutral-800 line-clamp-2 group-hover:text-vitale-primary transition-colors duration-200"
            >
              {product.name}
            </CardTitle>
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
              {product.category?.replace('_', ' ')}
            </p>
          </div>

          {/* Preços */}
          <div className="flex items-end gap-2">
            {hasDiscount && (
              <span className="text-sm text-neutral-400 line-through">
                {formatCurrency(product.price, product.currency)}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-bold text-vitale-primary">
              {formatCurrency(discountedPrice, product.currency)}
            </span>
          </div>

          {/* Informações de Estoque */}
          <div className="flex items-center gap-2 text-xs">
            <Package className="w-3 h-3 text-neutral-400" />
            <span className={`font-medium ${
              isOutOfStock ? 'text-error-500' : 
              product.stock <= 5 ? 'text-warning-600' : 
              'text-success-600'
            }`}>
              {isOutOfStock ? 'Esgotado' : `${product.stock} em estoque`}
            </span>
          </div>

          {/* Ações */}
          <div className="mt-auto flex gap-2 pt-2">
            <Button
              className={`flex-1 font-semibold rounded-xl py-2.5 transition-all duration-200 ${
                isOutOfStock 
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                  : 'bg-vitale-primary text-white hover:bg-vitale-secondary shadow-md hover:shadow-lg interactive'
              }`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
              aria-label={`${isOutOfStock ? 'Produto esgotado' : 'Adicionar'} ${product.name} ao carrinho`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Esgotado' : 'Adicionar'}</span>
                </div>
              )}
            </Button>
            
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-vitale-primary hover:text-vitale-secondary border border-vitale-primary/30 hover:border-vitale-secondary/50 rounded-xl bg-vitale-primary/5 hover:bg-vitale-secondary/10 transition-all duration-200 focus-ring"
              aria-label={`Ver detalhes de ${product.name}`}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
