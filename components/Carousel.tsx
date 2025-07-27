'use client';

import { useEffect, useState } from 'react';

import SmartImage from '@/components/SmartImage';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProductCarousel({
  images = [],
  productName,
}: {
  images?: string[];
  productName?: string;
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIdx(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <Carousel className="mx-auto w-full max-w-xs" setApi={setApi}>
      <CarouselContent>
        {(images || []).map((img, idx) => (
          <CarouselItem key={img}>
            <SmartImage
              src={img}
              alt={`Imagem ${idx + 1}${productName ? ` do produto ${productName}` : ''}`}
              width={320}
              height={256}
              className="h-64 w-full rounded-xl object-cover"
              productName={productName}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {/* Indicador de slides (dots) */}
      <div className="mt-2 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir para slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full border border-vitale-primary transition-all duration-200 ${selectedIdx === idx ? 'bg-vitale-primary' : 'bg-white'}`}
            onClick={() => api?.scrollTo(idx)}
            tabIndex={0}
          />
        ))}
      </div>
    </Carousel>
  );
}
