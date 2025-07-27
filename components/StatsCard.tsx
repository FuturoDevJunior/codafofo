'use client';

import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  iconName: keyof typeof LucideIcons;
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

// Função local para renderizar ícones
function renderIcon(name: keyof typeof LucideIcons, size: number, className: string) {
  const Icon = LucideIcons[name] as LucideIcon;
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

export default function StatsCard({ 
  iconName, 
  value, 
  label, 
  color = 'primary',
  className = '' 
}: StatsCardProps) {
  const colorClasses = {
    primary: {
      bg: 'bg-white/95',
      border: 'border-vitale-primary/20',
      text: 'text-vitale-primary',
      icon: 'text-vitale-primary'
    },
    secondary: {
      bg: 'bg-white/95',
      border: 'border-vitale-secondary/20',
      text: 'text-vitale-secondary',
      icon: 'text-vitale-secondary'
    },
    accent: {
      bg: 'bg-white/95',
      border: 'border-orange-200/50',
      text: 'text-orange-600',
      icon: 'text-orange-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} ${colors.border} rounded-2xl border-2 p-6 text-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-vitale-primary/10 to-vitale-secondary/10`}>
        {renderIcon(iconName, 24, `h-6 w-6 ${colors.icon}`)}
      </div>
      <div className={`mb-2 text-3xl font-bold ${colors.text} md:text-4xl lg:text-5xl`}>
        {value}
      </div>
      <p className={`font-medium text-gray-800 text-sm md:text-base`}>
        {label}
      </p>
    </div>
  );
} 