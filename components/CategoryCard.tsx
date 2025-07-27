'use client';

import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Função local para renderizar ícones
function renderIcon(name: keyof typeof LucideIcons, size: number, className: string) {
  const Icon = LucideIcons[name] as LucideIcon;
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

interface CategoryCardProps {
  title: string;
  description: string;
  brands: string;
  category: 'toxina' | 'preenchedor' | 'bioestimulador' | 'acessorio';
  className?: string;
}

export default function CategoryCard({
  title,
  description,
  brands,
  category,
  className = '',
}: CategoryCardProps) {
  const categoryConfig = {
    toxina: {
      iconName: 'Syringe' as keyof typeof LucideIcons,
      color: 'text-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    preenchedor: {
      iconName: 'Droplets' as keyof typeof LucideIcons,
      color: 'text-purple-600',
      bgColor: 'from-purple-50 to-pink-50',
    },
    bioestimulador: {
      iconName: 'Sparkles' as keyof typeof LucideIcons,
      color: 'text-green-600',
      bgColor: 'from-green-50 to-emerald-50',
    },
    acessorio: {
      iconName: 'Scissors' as keyof typeof LucideIcons,
      color: 'text-orange-600',
      bgColor: 'from-orange-50 to-amber-50',
    },
  };

  const config = categoryConfig[category];

  return (
    <Card
      className={`hover:shadow-2xl from-white group transform border-2 border-vitale-primary/20 bg-gradient-to-br to-vitale-primary/5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-vitale-primary/50 ${className}`}
    >
      <CardHeader className='pb-4'>
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${config.bgColor} transition-transform duration-300 group-hover:scale-110`}
        >
          {renderIcon(config.iconName, 40, `h-10 w-10 ${config.color}`)}
        </div>
        <CardTitle className='text-2xl font-bold text-vitale-primary'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='leading-relaxed text-neutral-700'>{description}</p>
        <div className='text-sm font-semibold text-vitale-primary'>{brands}</div>
      </CardContent>
    </Card>
  );
}
