'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/lib/analytics';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

import SmartImage from './SmartImage';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal' | 'vertical';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addItem = useCartStore(s => s.addItem);
  const { trackCartAdd } = useAnalytics();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price_pix || 0,
        price_pix: product.price_pix || 0,
        price_card: product.price_card || 0,
        quantity: 1,
        images: product.images,
      });

      // Track analytics
      trackCartAdd(product.id, product.name, product.price_pix || 0);

      toast({
        title: '✅ Adicionado ao carrinho!',
        description: `${product.name} foi adicionado com sucesso.`,
      });
    } catch {
      toast({
        title: '❌ Erro',
        description: 'Não foi possível adicionar ao carrinho.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group transition-all duration-300 hover:shadow-lg"
      data-variant={variant}
    >
      <Card className="bg-white relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Imagem do produto */}
        <div className="relative aspect-square overflow-hidden">
          <motion.div variants={imageVariants} className="h-full w-full">
            <SmartImage
              src={product.images?.[0] || product.image || '/images/placeholder.jpg'}
              alt={`${product.name} - Estético profissional`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallback="/images/placeholder.jpg"
            />
          </motion.div>

          {/* Overlay com ações */}
          <div
            className={`bg-black/20 absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <Tooltip content="Adicionar ao carrinho">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Ver detalhes completos">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
              >
                <a href={`/products/${product.slug}`} aria-label="Ver detalhes completos">
                  <Eye className="h-4 w-4" />
                </a>
              </Button>
            </Tooltip>
          </div>

          {/* Badge de categoria */}
          <div className="absolute left-2 top-2">
            <span className="text-white rounded-full bg-vitale-primary px-2 py-1 text-xs font-medium">
              {product.category}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <CardContent className="p-4">
          <motion.div variants={contentVariants}>
            {/* Nome do produto */}
            <h3 className="text-gray-900 mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-vitale-primary">
              {product.name}
            </h3>

            {/* Preços */}
            <div className="mb-3 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-vitale-primary">
                  {formatCurrency(product.price_pix || 0)}
                </span>
                <span className="text-gray-500 text-sm">no PIX</span>
              </div>

              {product.price_card && product.price_card !== product.price_pix && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-lg">
                    {formatCurrency(product.price_card)}
                  </span>
                  <span className="text-gray-500 text-sm">no cartão</span>
                  {product.price_card > 0 && (
                    <div className="text-gray-500 text-xs">
                      ou {formatCurrency(product.price_card / 4)} em 4x
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botão de ação */}
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="text-white w-full bg-vitale-primary py-2 font-medium hover:bg-vitale-primary/90"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="border-white/30 border-t-white h-4 w-4 animate-spin rounded-full border-2" />
                  Adicionando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao Carrinho
                </div>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
