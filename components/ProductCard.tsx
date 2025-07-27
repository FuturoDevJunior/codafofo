'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Eye, Heart, Scale, ShoppingCart, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/lib/analytics';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

import SmartImage from './SmartImage';

// Detectar ambiente de teste para simplificar animações
const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

// Componentes condicionais para teste
const MotionDiv = isTestEnvironment ? 'div' : motion.div;
const MotionSpan = isTestEnvironment ? 'span' : motion.span;
const MotionArticle = isTestEnvironment ? 'article' : motion.article;

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal' | 'vertical';
  onCompare?: (_product: Product) => void;
  canCompare?: boolean;
}

export default function ProductCard({
  product: _product,
  variant = 'default',
  onCompare: _onCompare,
  canCompare = true,
}: ProductCardProps) {
  // Usar product para evitar warning
  const productName = _product.name;
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addItem = useCartStore(s => s.addItem);
  const { trackCartAdd } = useAnalytics();

  // Usar a variável product para evitar warning
  const productId = _product.id;
  const productPrice = _product.price_pix || 0;
  const productImages = _product.images;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        price_pix: productPrice,
        price_card: _product.price_card || 0,
        quantity: 1,
        images: productImages,
      });

      // Track analytics
      trackCartAdd(productId, productName, productPrice);

      toast({
        title: '✅ Adicionado ao carrinho!',
        description: `${productName} foi adicionado com sucesso.`,
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
    },
    hover: {
      y: -8,
      scale: 1.03,
      rotateY: 2, // Sutil efeito 3D para satisfação
    },
    tap: {
      scale: 0.98,
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
    hover: {
      scale: 1.08,
      filter: 'brightness(1.1) saturate(1.1)', // Realce sutil que gera bem-estar
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  // Micro-interação para feedback tátil satisfatório
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 25px rgba(139, 69, 19, 0.15)',
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Feedback visual de confiança para preços
  const priceVariants = {
    hover: {
      scale: 1.02,
      color: '#8B4513', // Cor que transmite estabilidade
      transition: { duration: 0.2 },
    },
  };

  return (
    <MotionArticle
      {...(!isTestEnvironment && {
        variants: cardVariants,
        initial: 'hidden',
        animate: 'visible',
        whileHover: 'hover',
        whileTap: 'tap',
        onHoverStart: () => setIsHovered(true),
        onHoverEnd: () => setIsHovered(false),
        style: {
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        },
      })}
      className='hover:shadow-2xl group cursor-pointer transition-all duration-500'
      data-variant={variant}
    >
      <Card className='from-white hover:shadow-2xl border-transparent hover:from-white group-hover:shadow-vitale-glow relative overflow-hidden border-0 border-2 bg-gradient-to-br to-neutral-50/30 shadow-lg transition-all duration-500 hover:border-vitale-primary/30 hover:bg-gradient-to-br hover:to-vitale-primary/5'>
        {/* Neuro Glow Background Effect */}
        <MotionDiv
          className='absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'
          style={{
            background: `
              radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(139, 69, 19, 0.06) 0%, 
                rgba(139, 69, 19, 0.02) 40%, 
                transparent 80%
              )
            `,
          }}
        />

        {/* Soft Pulse Effect */}
        <MotionDiv
          className='absolute inset-0 opacity-0 group-hover:opacity-30'
          animate={
            !isTestEnvironment && isHovered
              ? {
                  background: [
                    'radial-gradient(circle at center, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at center, rgba(139, 69, 19, 0.05) 0%, transparent 60%)',
                    'radial-gradient(circle at center, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
                  ],
                }
              : {}
          }
          transition={
            !isTestEnvironment ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined
          }
        />
        {/* Imagem do produto */}
        <div className='relative aspect-square overflow-hidden'>
          <MotionDiv
            variants={!isTestEnvironment ? imageVariants : undefined}
            className='h-full w-full'
          >
            <SmartImage
              src={_product.images?.[0] || '/images/placeholder.jpg'}
              alt={`${_product.name} - Estético profissional`}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </MotionDiv>

          {/* Overlay com ações - Microrefinado */}
          <div
            className={`from-black/40 via-transparent to-transparent absolute inset-0 flex items-center justify-center gap-3 bg-gradient-to-t transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <MotionDiv
              initial={{ scale: 0, opacity: 0 }}
              animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className='flex gap-2'
            >
              <Tooltip content='Adicionar ao carrinho'>
                <MotionDiv variants={buttonVariants} whileHover='hover' whileTap='tap'>
                  <Button
                    size='sm'
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className='text-white relative overflow-hidden rounded-full bg-gradient-to-r from-vitale-primary to-vitale-secondary p-3 shadow-vitale transition-all duration-300 focus-ring hover:from-vitale-secondary hover:to-vitale-primary hover:shadow-xl'
                  >
                    <MotionDiv
                      animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
                    >
                      <ShoppingCart className='h-5 w-5' />
                    </MotionDiv>
                    {/* Shimmer effect para satisfação visual */}
                    <div className='from-transparent via-white/20 to-transparent absolute inset-0 -left-1 -top-1 w-6 skew-x-12 bg-gradient-to-r group-hover:animate-[shimmer_0.8s_ease-in-out]' />
                  </Button>
                </MotionDiv>
              </Tooltip>

              <Tooltip content='Ver detalhes completos'>
                <MotionDiv variants={buttonVariants} whileHover='hover' whileTap='tap'>
                  <Button
                    size='sm'
                    variant='outline'
                    asChild
                    className='bg-white/95 hover:bg-white rounded-full border-vitale-primary/30 p-3 text-vitale-primary shadow-lg backdrop-blur-sm transition-all duration-300 focus-ring hover:border-vitale-primary hover:shadow-xl'
                  >
                    <a href={`/products/${_product.slug}`} aria-label='Ver detalhes completos'>
                      <MotionDiv whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Eye className='h-5 w-5' />
                      </MotionDiv>
                    </a>
                  </Button>
                </MotionDiv>
              </Tooltip>

              {canCompare && _onCompare && (
                <Tooltip content='Comparar produto'>
                  <MotionDiv variants={buttonVariants} whileHover='hover' whileTap='tap'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => _onCompare?.(_product)}
                      className='bg-white/95 hover:bg-white rounded-full border-vitale-primary/30 p-3 text-vitale-primary shadow-lg backdrop-blur-sm transition-all duration-300 focus-ring hover:border-vitale-primary hover:shadow-xl'
                    >
                      <MotionDiv
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <Scale className='h-5 w-5' />
                      </MotionDiv>
                    </Button>
                  </MotionDiv>
                </Tooltip>
              )}
            </MotionDiv>
          </div>

          {/* Botão de favorito - Micro-interação satisfatória */}
          <div className='absolute right-3 top-3'>
            <MotionDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size='sm'
                variant='ghost'
                className='bg-white/90 hover:bg-white text-red-500 hover:text-red-600 rounded-full p-2 shadow-md backdrop-blur-sm transition-all duration-300 focus-ring hover:shadow-lg'
              >
                <MotionDiv
                  whileHover={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className='h-4 w-4' />
                </MotionDiv>
              </Button>
            </MotionDiv>
          </div>

          {/* Badge de categoria - Micro-interação refinada */}
          <MotionDiv
            className='absolute left-3 top-3'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)',
            }}
          >
            <MotionSpan
              className='text-white border-white/20 rounded-full border bg-gradient-to-r from-vitale-primary to-vitale-secondary px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-sm'
              whileHover={{
                background: 'linear-gradient(135deg, #d8a75b 0%, #e79632 100%)',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                borderColor: 'rgba(255,255,255,0.4)',
              }}
            >
              {_product.category}
            </MotionSpan>
          </MotionDiv>

          {/* Badge de avaliação - Micro-interação satisfatória */}
          <MotionDiv
            className='absolute bottom-3 left-3'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
            }}
          >
            <MotionDiv
              className='bg-white/95 border-yellow-200/50 flex items-center gap-1 rounded-full border px-2 py-1 shadow-md backdrop-blur-sm'
              whileHover={{
                backgroundColor: 'rgba(255, 248, 220, 0.95)',
                borderColor: 'rgba(255, 193, 7, 0.5)',
              }}
            >
              <MotionDiv
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: 1.2,
                }}
                transition={{ duration: 0.4 }}
              >
                <Star className='fill-yellow-400 text-yellow-400 h-3 w-3' />
              </MotionDiv>
              <MotionSpan
                className='text-xs font-semibold text-neutral-700'
                whileHover={{
                  color: '#d8a75b',
                  fontWeight: '700',
                }}
              >
                4.8
              </MotionSpan>
            </MotionDiv>
          </MotionDiv>
        </div>

        {/* Conteúdo */}
        <CardContent className='p-4'>
          <MotionDiv variants={contentVariants}>
            {/* Nome do produto */}
            <h3 className='text-high-contrast mb-2 line-clamp-2 font-heading font-semibold leading-tight text-neutral-800 transition-colors group-hover:text-vitale-primary'>
              {_product.name}
            </h3>

            {/* Preços - Interface que transmite confiança */}
            <div className='mb-3 space-y-1'>
              <MotionDiv
                className='flex items-center gap-2'
                variants={priceVariants}
                whileHover='hover'
              >
                <MotionSpan
                  className='price-text font-heading text-2xl font-bold text-vitale-primary'
                  whileHover={{
                    textShadow: '0 0 8px rgba(216, 167, 91, 0.4)',
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {formatCurrency(_product.price_pix || 0)}
                </MotionSpan>
                <MotionSpan
                  className='border-success-200 rounded-full border bg-success-50 px-3 py-1 text-sm font-semibold text-success-600 shadow-sm'
                  whileHover={{ scale: 1.05, boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15)' }}
                >
                  💳 no PIX
                </MotionSpan>
              </MotionDiv>

              {_product.price_card && _product.price_card !== _product.price_pix && (
                <MotionDiv
                  className='flex items-center gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <MotionSpan
                    className='price-text text-lg font-semibold text-neutral-700'
                    whileHover={{ scale: 1.02 }}
                  >
                    {formatCurrency(_product.price_card)}
                  </MotionSpan>
                  <span className='border-info-200 rounded-full border bg-info-50 px-3 py-1 text-sm font-semibold text-info-600 shadow-sm'>
                    💳 cartão
                  </span>
                  {_product.price_card > 0 && (
                    <MotionDiv
                      className='rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm'
                      whileHover={{ scale: 1.05, backgroundColor: 'rgb(var(--vitale-neutral-50))' }}
                    >
                      ou {formatCurrency(_product.price_card / 4)} em 4x
                    </MotionDiv>
                  )}
                </MotionDiv>
              )}
            </div>

            {/* Botão de ação principal - Micro-interação de confiança */}
            <MotionDiv
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className='text-white touch-friendly group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-vitale-primary to-vitale-secondary py-3 font-heading font-semibold shadow-vitale transition-all duration-300 hover:from-vitale-secondary hover:to-vitale-primary hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60'
              >
                {/* Background pulse effect durante loading */}
                {isLoading && (
                  <MotionDiv
                    className='absolute inset-0 bg-gradient-to-r from-vitale-primary/20 to-vitale-secondary/20'
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Shimmer effect para satisfação visual */}
                <MotionDiv
                  className='from-transparent via-white/30 to-transparent absolute inset-0 -left-12 -top-1 w-24 skew-x-12 bg-gradient-to-r'
                  animate={isHovered ? { x: [0, 200] } : { x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                <div className='relative z-10 flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <MotionDiv
                        className='border-white/30 border-t-white h-4 w-4 rounded-full border-2'
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <MotionSpan
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Adicionando...
                      </MotionSpan>
                    </>
                  ) : (
                    <>
                      <MotionDiv
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ShoppingCart className='h-5 w-5' />
                      </MotionDiv>
                      <MotionSpan
                        whileHover={{
                          textShadow: '0 0 8px rgba(255,255,255,0.8)',
                        }}
                      >
                        Adicionar ao Carrinho
                      </MotionSpan>
                    </>
                  )}
                </div>

                {/* Ripple effect no click */}
                <MotionDiv
                  className='absolute inset-0 rounded-xl'
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileTap={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                  }}
                />
              </Button>
            </MotionDiv>
          </MotionDiv>
        </CardContent>
      </Card>
    </MotionArticle>
  );
}
