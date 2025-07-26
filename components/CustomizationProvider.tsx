'use client';

import { useCustomization } from '@/hooks/useCustomization';

interface CustomizationProviderProps {
  children: React.ReactNode;
}

export default function CustomizationProvider({ children }: CustomizationProviderProps) {
  // Apenas carregar o hook para aplicar customizações
  useCustomization();

  return <>{children}</>;
}
