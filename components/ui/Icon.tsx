'use client';

import React from 'react';
import * as Lucide from 'lucide-react';

// Tipos para os ícones disponíveis
type LucideIconName = keyof typeof Lucide;

interface IconProps {
  name: LucideIconName;
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  'data-testid'?: string;
  onClick?: () => void;
}

/**
 * Componente Icon dinâmico para resolver problema Server/Client Components
 *
 * Este componente permite usar ícones do Lucide React de forma segura
 * entre Server e Client Components, passando apenas o nome do ícone
 * como string em vez da função/componente do ícone.
 *
 * @example
 * // Em Server Component: passe name="User"
 * <Icon name="User" size={24} className="text-blue-500" />
 *
 * // Em Client Component: funciona normalmente
 * <Icon name="ShoppingCart" size={20} color="red" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  'data-testid': testId,
  onClick,
}) => {
  // Resolve o componente do ícone pelo nome
  const IconComponent = Lucide[name] as React.ComponentType<{
    size?: number | string;
    color?: string;
    className?: string;
    strokeWidth?: number;
    'data-testid'?: string;
    onClick?: () => void;
  }>;

  // Fallback caso o ícone não exista
  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado no Lucide React`);
    return (
      <div
        className={`inline-block ${className}`}
        style={{ width: size, height: size }}
        data-testid={testId}
      >
        <span className="text-xs text-neutral-400">?</span>
      </div>
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
      data-testid={testId}
      onClick={onClick}
    />
  );
};

// Export do tipo para uso em outros componentes
export type { LucideIconName };

/**
 * Hook para verificar se um ícone existe
 */
export const useIconExists = (name: string): boolean => {
  return name in Lucide;
};

/**
 * Lista de ícones mais comuns para autocomplete
 */
export const commonIcons = [
  'User',
  'ShoppingCart',
  'Search',
  'Menu',
  'X',
  'Phone',
  'Mail',
  'Instagram',
  'Star',
  'Heart',
  'Download',
  'Upload',
  'Filter',
  'Calendar',
  'Clock',
  'Settings',
  'Home',
  'Package',
  'Truck',
  'CreditCard',
  'DollarSign',
  'MessageCircle',
  'TrendingUp',
  'Badge',
  'Eye',
  'EyeOff',
  'ChevronDown',
  'ChevronUp',
  'ChevronLeft',
  'ChevronRight',
  'ArrowRight',
  'ArrowLeft',
  'Plus',
  'Minus',
  'Edit',
  'Trash2',
  'Check',
  'AlertCircle',
  'Info',
] as const;

export type CommonIconName = (typeof commonIcons)[number];
