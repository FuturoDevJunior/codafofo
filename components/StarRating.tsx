'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showText = true,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300 fill-gray-300'
            }`}
            aria-label={`Estrela ${index + 1} de ${maxRating}`}
          />
        ))}
      </div>
      {showText && (
        <span className={`font-semibold text-gray-700 ${textSizes[size]}`}>
          {rating.toFixed(1)} | +500 Avaliações
        </span>
      )}
    </div>
  );
} 