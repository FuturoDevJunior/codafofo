import SmartImage from '@/components/SmartImage';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProductCarousel({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={idx}>
            <SmartImage 
              src={img} 
              alt={`Imagem ${idx + 1}`} 
              fallback="/icons/icon-192.png"
              width={400}  // Largura fixa pra otimização
              height={256}  // Altura proporcional (h-64 ~256px)
              className="w-full h-64 object-cover rounded" 
              priority={idx === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
