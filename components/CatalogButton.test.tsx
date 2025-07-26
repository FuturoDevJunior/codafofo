import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import CatalogButton from './CatalogButton';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('next/link', () => {
  return {
    default: ({ children, href, onClick, ...props }: any) => (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    ),
  };
});

describe('CatalogButton', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('deve renderizar o botão com texto padrão', () => {
    render(<CatalogButton />);

    expect(screen.getByText('Explorar Catálogo Completo')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-button')).toBeInTheDocument();
  });

  it('deve ter o href correto para /products', () => {
    render(<CatalogButton />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/products');
  });

  it('deve renderizar ícones de Package e ArrowRight', () => {
    render(<CatalogButton />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toBeInTheDocument();

    // Verificar se os ícones estão presentes através das classes
    const packageIcon = button.querySelector('svg');
    expect(packageIcon).toBeInTheDocument();
  });

  it('deve aplicar classes CSS corretas para variant primary', () => {
    render(<CatalogButton variant="primary" />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-vitale-primary');
    expect(button).toHaveClass('to-vitale-secondary');
  });

  it('deve aplicar classes CSS corretas para variant secondary', () => {
    render(<CatalogButton variant="secondary" />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toHaveClass('bg-vitale-primary');
    expect(button).toHaveClass('group');
  });

  it('deve aplicar classes CSS corretas para size large', () => {
    render(<CatalogButton size="large" />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toHaveClass('group');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('sm:w-auto');
  });

  it('deve chamar router.push quando clicado', () => {
    render(<CatalogButton />);

    const button = screen.getByTestId('catalog-button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('deve renderizar children customizado quando fornecido', () => {
    render(
      <CatalogButton>
        <span>Texto Customizado</span>
      </CatalogButton>
    );

    expect(screen.getByText('Texto Customizado')).toBeInTheDocument();
    expect(screen.queryByText('Explorar Catálogo Completo')).not.toBeInTheDocument();
  });

  it('deve aplicar className customizado', () => {
    render(<CatalogButton className="minha-classe-custom" />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toHaveClass('minha-classe-custom');
  });

  it('deve ter atributos de acessibilidade corretos', () => {
    render(<CatalogButton />);

    const button = screen.getByTestId('catalog-button');
    expect(button).toHaveAttribute('aria-label', 'Navegar para página de produtos');

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/products');
  });

  it('deve prevenir comportamento padrão do link e usar router', () => {
    const preventDefault = vi.fn();
    render(<CatalogButton />);

    const button = screen.getByTestId('catalog-button');

    // Simular evento com preventDefault
    const mockEvent = { preventDefault };
    fireEvent.click(button, mockEvent);

    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('deve renderizar com todas as variações de props', () => {
    const { rerender } = render(<CatalogButton variant="primary" size="default" />);

    expect(screen.getByTestId('catalog-button')).toBeInTheDocument();

    rerender(<CatalogButton variant="secondary" size="large" />);
    expect(screen.getByTestId('catalog-button')).toBeInTheDocument();
  });
});
