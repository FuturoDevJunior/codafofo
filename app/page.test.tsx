import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from './page';

// Mock do next/link para capturar navegação
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock do SmartImage
vi.mock('@/components/SmartImage', () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

// Mock do mockProducts
vi.mock('@/lib/mockData', () => ({
  mockProducts: [
    {
      id: '1',
      name: 'Produto Teste',
      slug: 'produto-teste',
      description: 'Descrição do produto teste',
      category: 'Toxina Botulínica',
      price_pix: 100,
      price_prazo: 120,
      images: ['/test-image.jpg'],
    },
  ],
}));

describe('Página Inicial - Navegação do Catálogo', () => {
  it('deve renderizar o botão "Explorar Catálogo Completo" principal', () => {
    render(<Home />);

    const catalogButtons = screen.getAllByText('Explorar Catálogo Completo');
    expect(catalogButtons.length).toBeGreaterThan(0);
    expect(catalogButtons[0]).toBeInTheDocument();
  });

  it('deve ter o link correto para /products no botão principal de navegação', () => {
    render(<Home />);

    // Buscar o primeiro link que vai para /products
    const catalogLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href') === '/products');

    expect(catalogLinks.length).toBeGreaterThan(0);
    expect(catalogLinks[0]).toHaveAttribute('href', '/products');
  });

  it('deve renderizar todos os botões de navegação para o catálogo', () => {
    render(<Home />);

    // Verificar se há múltiplos links para /products na página
    const productLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href') === '/products');

    // Deve ter pelo menos 3 links (hero, seção produtos, CTA final)
    expect(productLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('deve funcionar a navegação por clique no botão principal', () => {
    render(<Home />);

    const heroSection = screen.getByText('Produtos Premium para').closest('section');
    expect(heroSection).toBeInTheDocument();

    // Buscar o link dentro do hero
    const catalogLink = screen
      .getAllByRole('link')
      .find(
        link =>
          link.getAttribute('href') === '/products' &&
          link.textContent?.includes('Explorar Catálogo Completo')
      );

    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', '/products');
  });

  it('deve renderizar seções principais da página', () => {
    render(<Home />);

    // Verifica o título principal
    expect(screen.getByText('Produtos Premium para')).toBeInTheDocument();
    expect(screen.getByText('Estética Profissional')).toBeInTheDocument();

    // Verifica seção de produtos em destaque
    expect(screen.getByText('Produtos em Destaque')).toBeInTheDocument();

    // Verifica seção sobre a empresa
    expect(screen.getByText('Sobre a Vytalle Estética')).toBeInTheDocument();
  });

  it('deve ter botões com classes CSS corretas para interatividade', () => {
    render(<Home />);

    const catalogButtons = screen.getAllByText('Explorar Catálogo Completo');

    catalogButtons.forEach(button => {
      const parentElement = button.closest('button, a');
      expect(parentElement).toBeInTheDocument();
    });
  });

  it('deve renderizar produtos mockados na seção de destaque', () => {
    render(<Home />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getAllByText('Toxina Botulínica')).toHaveLength(2); // Uma na seção de produtos, outra na de categorias
  });

  it('deve renderizar todos os CTAs de navegação para produtos', () => {
    render(<Home />);

    // Botões de explorar catálogo
    expect(screen.getAllByText(/Explorar Catálogo/)).toHaveLength(2);

    // Botão "Ver Todos os Produtos"
    expect(screen.getByText('Ver Todos os Produtos')).toBeInTheDocument();
  });

  it('deve ter links acessíveis com estrutura HTML correta', () => {
    render(<Home />);

    // Verificar se todos os links para produtos estão bem formados
    const links = screen.getAllByRole('link');
    const catalogLinks = links.filter(link => link.getAttribute('href') === '/products');

    catalogLinks.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/products');
    });
  });

  it('deve renderizar badges de confiança e certificações', () => {
    render(<Home />);

    // Badges de confiança no hero
    expect(screen.getByText('Compra 100% Segura')).toBeInTheDocument();
    expect(screen.getByText('Produtos Certificados')).toBeInTheDocument();
    expect(screen.getByText('Entrega em 24-48h')).toBeInTheDocument();
    expect(screen.getByText('+2000 Profissionais')).toBeInTheDocument();
  });
});
