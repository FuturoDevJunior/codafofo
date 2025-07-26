import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// Mocks
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/lib/store', () => ({
  useCartStore: vi.fn(() => ({
    items: [],
    total: 0,
  })),
}));

vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }: any) => <div>{children}</div>,
  Trigger: ({ children, asChild }: any) => (asChild ? children : <button>{children}</button>),
  Portal: ({ children }: any) => <div>{children}</div>,
  Overlay: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Content: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('Header', () => {
  it('deve renderizar logo da Vytalle', () => {
    render(<Header />);

    const logo = screen.getByAltText(/vytalle/i);
    expect(logo).toBeInTheDocument();
  });

  it('deve renderizar link para home', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: /ir para página inicial/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('deve renderizar navegação principal', () => {
    render(<Header />);

    expect(screen.getByLabelText('Navegação principal')).toBeInTheDocument();
  });

  it('deve renderizar botão de menu mobile', () => {
    render(<Header />);

    const mobileMenuButton = screen.getByLabelText(/abrir menu de navegação/i);
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('deve ter estrutura semântica apropriada', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('deve ser responsivo', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass('sticky');
  });

  it('deve renderizar links WhatsApp', () => {
    render(<Header />);

    const whatsappLinks = screen.getAllByRole('link', { name: /whatsapp/i });
    expect(whatsappLinks).toHaveLength(2); // Desktop e mobile
    whatsappLinks.forEach(link => {
      expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
    });
  });

  it('deve manter acessibilidade adequada', () => {
    render(<Header />);

    const navPrincipal = screen.getByLabelText('Navegação principal');
    const banner = screen.getByRole('banner');

    expect(navPrincipal).toBeInTheDocument();
    expect(banner).toBeInTheDocument();
  });

  it('deve renderizar links de navegação', () => {
    render(<Header />);

    const inicioLinks = screen.getAllByRole('link', { name: /início/i });
    const catalogoLinks = screen.getAllByRole('link', { name: /catálogo/i });

    expect(inicioLinks).toHaveLength(2); // Desktop e mobile
    expect(catalogoLinks).toHaveLength(2); // Desktop e mobile

    inicioLinks.forEach(link => expect(link).toHaveAttribute('href', '/'));
    catalogoLinks.forEach(link => expect(link).toHaveAttribute('href', '/products'));
  });
});
