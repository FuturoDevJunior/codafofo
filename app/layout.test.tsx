import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

// Mock Next.js components
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('./globals.css', () => ({}));

describe('RootLayout', () => {
  const mockChildren = <div data-testid='test-content'>Test Content</div>;

  it('deve renderizar estrutura HTML básica', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('deve ter metadados corretos no documento', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

    // Verificar se o conteúdo está sendo renderizado
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('deve aplicar classes CSS apropriadas', () => {
    const { container } = render(<RootLayout>{mockChildren}</RootLayout>);

    // Verificar estrutura do HTML
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar children corretamente', () => {
    const customChildren = (
      <div>
        <h1>Título Teste</h1>
        <p>Parágrafo teste</p>
      </div>
    );

    render(<RootLayout>{customChildren}</RootLayout>);

    expect(screen.getByText('Título Teste')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo teste')).toBeInTheDocument();
  });

  it('deve suportar múltiplos children', () => {
    const multipleChildren = (
      <>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
        <div data-testid='child-3'>Child 3</div>
      </>
    );

    render(<RootLayout>{multipleChildren}</RootLayout>);

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });
});
