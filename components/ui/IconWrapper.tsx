'use client';

import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  name: keyof typeof LucideIcons;
  size?: number;
  className?: string;
}

export function IconWrapper({ name, size = 24, className }: IconWrapperProps) {
  const Icon = LucideIcons[name] as LucideIcon;
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
} 