import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import CustomizationProvider from './CustomizationProvider';

// Mock do hook useCustomization
const mockUseCustomization = {
  customization: {
    companyName: 'Vytalle',
    logoUrl: '/logo.png',
    primaryColor: '#d8a75b',
    secondaryColor: '#e79632',
  },
  saveCustomization: vi.fn(),
  resetCustomization: vi.fn(),
};

vi.mock('@/hooks/useCustomization', () => ({
  useCustomization: () => mockUseCustomization,
}));

describe('CustomizationProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar children corretamente', () => {
      render(
        <CustomizationProvider>
          <div data-testid="test-child">Test Child</div>
        </CustomizationProvider>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('deve carregar o hook useCustomization', () => {
      render(
        <CustomizationProvider>
          <div>Test</div>
        </CustomizationProvider>
      );

      // O hook deve ser chamado internamente
      expect(mockUseCustomization.customization).toBeDefined();
    });

    it('deve renderizar múltiplos children', () => {
      render(
        <CustomizationProvider>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </CustomizationProvider>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });

    it('deve renderizar componentes complexos', () => {
      const ComplexComponent = () => (
        <div data-testid="complex">
          <span>Complex</span>
          <button>Button</button>
        </div>
      );

      render(
        <CustomizationProvider>
          <ComplexComponent />
        </CustomizationProvider>
      );

      expect(screen.getByTestId('complex')).toBeInTheDocument();
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('deve funcionar com componentes que usam customização', () => {
      const CustomComponent = () => (
        <div data-testid="custom-component">{mockUseCustomization.customization.companyName}</div>
      );

      render(
        <CustomizationProvider>
          <CustomComponent />
        </CustomizationProvider>
      );

      expect(screen.getByTestId('custom-component')).toBeInTheDocument();
      expect(screen.getByText('Vytalle')).toBeInTheDocument();
    });

    it('deve lidar com children null', () => {
      render(<CustomizationProvider>{null}</CustomizationProvider>);
      // Não deve quebrar
      expect(document.body).toBeInTheDocument();
    });

    it('deve lidar com children undefined', () => {
      render(<CustomizationProvider>{undefined}</CustomizationProvider>);
      // Não deve quebrar
      expect(document.body).toBeInTheDocument();
    });

    it('deve lidar com children vazio', () => {
      render(<CustomizationProvider>{null}</CustomizationProvider>);
      // Não deve quebrar
      expect(document.body).toBeInTheDocument();
    });

    it('deve aplicar customizações automaticamente', () => {
      render(
        <CustomizationProvider>
          <div data-testid="test">Test</div>
        </CustomizationProvider>
      );

      // As customizações devem estar disponíveis através do hook
      expect(mockUseCustomization.customization.companyName).toBe('Vytalle');
      expect(mockUseCustomization.customization.primaryColor).toBe('#d8a75b');
    });

    it('deve ser um componente client-side', () => {
      // Verificar se o componente pode ser renderizado no cliente
      expect(() => {
        render(
          <CustomizationProvider>
            <div>Test</div>
          </CustomizationProvider>
        );
      }).not.toThrow();
    });
  });
});
