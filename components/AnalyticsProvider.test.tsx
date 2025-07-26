import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

// Mock do next/navigation
const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock do analytics
const mockTrackPageView = vi.fn();
vi.mock('@/lib/analytics', () => ({
  default: {
    trackPageView: mockTrackPageView,
  },
  analytics: {
    trackPageView: mockTrackPageView,
  },
}));

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  it('deve renderizar children corretamente', async () => {
    // Import após os mocks
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    render(
      <AnalyticsProvider>
        <div data-testid="child-content">Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('deve chamar trackPageView na montagem inicial', async () => {
    mockUsePathname.mockReturnValue('/products');

    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    render(
      <AnalyticsProvider>
        <div>Content</div>
      </AnalyticsProvider>
    );

    expect(mockTrackPageView).toHaveBeenCalledWith('/products');
  });

  it('deve chamar trackPageView quando pathname muda', async () => {
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    const { rerender } = render(
      <AnalyticsProvider>
        <div>Content</div>
      </AnalyticsProvider>
    );

    // O componente tem 2 useEffects que chamam trackPageView na montagem
    const initialCalls = mockTrackPageView.mock.calls.length;

    // Simula mudança de rota
    mockUsePathname.mockReturnValue('/cart');

    rerender(
      <AnalyticsProvider>
        <div>Content</div>
      </AnalyticsProvider>
    );

    // Deve ter sido chamado novamente com nova rota
    expect(mockTrackPageView).toHaveBeenCalledWith('/cart');
    // Deve ter mais chamadas que inicialmente
    expect(mockTrackPageView.mock.calls.length).toBeGreaterThan(initialCalls);
  });

  it('deve lidar com diferentes rotas', async () => {
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    const routes = ['/products', '/cart', '/admin', '/checkout'];

    for (const [index, route] of routes.entries()) {
      mockUsePathname.mockReturnValue(route);

      render(
        <AnalyticsProvider>
          <div key={index}>Content {index}</div>
        </AnalyticsProvider>
      );

      expect(mockTrackPageView).toHaveBeenCalledWith(route);
      vi.clearAllMocks();
    }
  });

  it('deve funcionar com múltiplos children', async () => {
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    render(
      <AnalyticsProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </AnalyticsProvider>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('deve funcionar com children nulo/undefined', async () => {
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    expect(() => {
      render(<AnalyticsProvider>{null}</AnalyticsProvider>);
    }).not.toThrow();

    expect(() => {
      render(<AnalyticsProvider>{undefined}</AnalyticsProvider>);
    }).not.toThrow();
  });

  it('deve preservar estrutura de elementos aninhados', async () => {
    const AnalyticsProvider = (await import('./AnalyticsProvider')).default;

    render(
      <AnalyticsProvider>
        <header>
          <nav>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </nav>
        </header>
        <main>
          <section>
            <p>Main content</p>
          </section>
        </main>
      </AnalyticsProvider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // nav
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });
});
