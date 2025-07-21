import {
  useEffect,
  useState,
} from 'react';

import SmartImage from '@/components/SmartImage';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProductCarousel({ images }: { images: string[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIdx(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => { api.off('select', onSelect); };
  }, [api]);

  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={img}>
            <SmartImage 
              src={img} 
              alt={`Imagem ${idx + 1}`} 
              fallback="/icons/icon-192.png"
              width={400}
              height={256}
              className="w-full h-64 object-cover rounded-xl"
              priority={idx === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {/* Indicador de slides (dots) */}
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir para slide ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full border border-vitale-primary transition-all duration-200 ${selectedIdx === idx ? 'bg-vitale-primary' : 'bg-white'}`}
            onClick={() => api?.scrollTo(idx)}
            tabIndex={0}
          />
        ))}
      </div>
    </Carousel>
  );
}
