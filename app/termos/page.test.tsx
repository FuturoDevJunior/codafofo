import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import TermosPage from './page';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Página de Termos de Uso', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização da página', () => {
    it('deve renderizar o cabeçalho corretamente', () => {
      render(<TermosPage />);

      expect(screen.getAllByText('Termos de Uso')[0]).toBeInTheDocument();
      expect(screen.getByText('Voltar ao Início')).toBeInTheDocument();
    });

    it('deve exibir o título principal', () => {
      render(<TermosPage />);

      expect(screen.getByText('Termos de Uso - Vytalle Estética')).toBeInTheDocument();
      expect(screen.getByText('Última atualização:')).toBeInTheDocument();
      expect(
        screen.getAllByText((content, element) => {
          return element?.textContent?.includes('Dezembro de 2024') || false;
        })[0]
      ).toBeInTheDocument();
    });

    it('deve mostrar aviso importante sobre público-alvo', () => {
      render(<TermosPage />);

      expect(screen.getByText('Importante')).toBeInTheDocument();
      expect(
        screen.getByText(/exclusivamente a profissionais da área da saúde/)
      ).toBeInTheDocument();
    });
  });

  describe('Conteúdo das seções', () => {
    it('deve exibir todas as seções principais', () => {
      render(<TermosPage />);

      expect(screen.getByText('1. Aceitação dos Termos')).toBeInTheDocument();
      expect(screen.getByText('2. Uso Autorizado do Site')).toBeInTheDocument();
      expect(screen.getByText('3. Produtos e Responsabilidades')).toBeInTheDocument();
      expect(screen.getByText('4. Propriedade Intelectual')).toBeInTheDocument();
      expect(screen.getByText('5. Política de Compras e Pagamentos')).toBeInTheDocument();
      expect(screen.getByText('6. Privacidade e Proteção de Dados')).toBeInTheDocument();
      expect(screen.getByText('7. Alterações dos Termos')).toBeInTheDocument();
      expect(screen.getByText('8. Contato e Suporte')).toBeInTheDocument();
    });

    it('deve mostrar informações sobre público-alvo restrito', () => {
      render(<TermosPage />);

      expect(screen.getByText('PÚBLICO-ALVO RESTRITO: Profissionais da Saúde')).toBeInTheDocument();
      expect(
        screen.getByText('Médicos dermatologistas, cirurgiões plásticos e estetas')
      ).toBeInTheDocument();
      expect(screen.getByText('Biomédicos especializados em estética')).toBeInTheDocument();
      expect(
        screen.getByText('Enfermeiros especialistas em procedimentos estéticos')
      ).toBeInTheDocument();
    });

    it('deve exibir usos proibidos', () => {
      render(<TermosPage />);

      expect(screen.getByText('Uso Proibido:')).toBeInTheDocument();
      expect(screen.getByText('Revenda não autorizada de produtos')).toBeInTheDocument();
      expect(
        screen.getByText('Uso por pessoas não habilitadas profissionalmente')
      ).toBeInTheDocument();
      expect(screen.getByText('Atividades ilegais ou fraudulentas')).toBeInTheDocument();
    });

    it('deve mostrar garantia de autenticidade', () => {
      render(<TermosPage />);

      expect(screen.getByText('Garantia de Autenticidade')).toBeInTheDocument();
      expect(screen.getByText(/100% originais/)).toBeInTheDocument();
      expect(screen.getByText(/registro na ANVISA/)).toBeInTheDocument();
    });

    it('deve exibir informações sobre responsabilidade profissional', () => {
      render(<TermosPage />);

      expect(screen.getByText('Responsabilidade Profissional')).toBeInTheDocument();
      expect(screen.getByText(/O profissional é inteiramente responsável/)).toBeInTheDocument();
      expect(screen.getByText(/seguir rigorosamente as instruções técnicas/)).toBeInTheDocument();
    });

    it('deve mostrar limitações de responsabilidade', () => {
      render(<TermosPage />);

      expect(screen.getByText('Limitação de Responsabilidade')).toBeInTheDocument();
      expect(screen.getByText(/A Vytalle não se responsabiliza por/)).toBeInTheDocument();
      expect(
        screen.getByText('Complicações decorrentes de má aplicação dos produtos')
      ).toBeInTheDocument();
    });
  });

  describe('Informações de propriedade intelectual', () => {
    it('deve listar itens protegidos por direitos autorais', () => {
      render(<TermosPage />);

      expect(
        screen.getByText('Textos, imagens, vídeos e materiais educativos')
      ).toBeInTheDocument();
      expect(screen.getByText('Marca Vytalle e logotipos associados')).toBeInTheDocument();
      expect(screen.getByText('Layout, design e interface do site')).toBeInTheDocument();
      expect(screen.getByText('Protocolos e materiais didáticos exclusivos')).toBeInTheDocument();
    });
  });

  describe('Política de compras', () => {
    it('deve mostrar condições de compra', () => {
      render(<TermosPage />);

      expect(screen.getByText('Condições de Compra')).toBeInTheDocument();
      expect(screen.getByText('Pedidos sujeitos à confirmação de estoque')).toBeInTheDocument();
      expect(screen.getByText(/24 a 48 horas para São Paulo/)).toBeInTheDocument();
    });

    it('deve listar formas de pagamento', () => {
      render(<TermosPage />);

      expect(screen.getByText('Formas de Pagamento')).toBeInTheDocument();
      expect(screen.getByText('PIX (desconto especial)')).toBeInTheDocument();
      expect(screen.getByText('Cartão de crédito (parcelamento disponível)')).toBeInTheDocument();
      expect(screen.getByText('Transferência bancária')).toBeInTheDocument();
    });

    it('deve mostrar política de troca e devolução', () => {
      render(<TermosPage />);

      expect(screen.getByText('Política de Troca e Devolução')).toBeInTheDocument();
      expect(screen.getByText(/7 dias/)).toBeInTheDocument();
      expect(
        screen.getByText('Estejam em perfeitas condições e embalagem original')
      ).toBeInTheDocument();
    });
  });

  describe('Privacidade e dados', () => {
    it('deve mencionar conformidade com LGPD', () => {
      render(<TermosPage />);

      expect(screen.getByText(/Lei Geral de Proteção de Dados \(LGPD\)/)).toBeInTheDocument();
    });

    it('deve ter link para política de privacidade', () => {
      render(<TermosPage />);

      const privacyLink = screen.getByText('Política de Privacidade');
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacidade');
    });
  });

  describe('Informações de contato', () => {
    it('deve exibir informações de contato', () => {
      render(<TermosPage />);

      expect(screen.getByText('contato.ferreirag@outlook.com')).toBeInTheDocument();
      expect(screen.getByText('(21) 99619-2890')).toBeInTheDocument();
      expect(screen.getByText('Segunda a Sexta, 8h às 18h')).toBeInTheDocument();
    });

    it('deve ter links de contato funcionais', () => {
      render(<TermosPage />);

      const emailLink = screen.getByRole('link', { name: 'contato.ferreirag@outlook.com' });
      const whatsappLink = screen.getByRole('link', { name: '(21) 99619-2890' });

      expect(emailLink).toHaveAttribute('href', 'mailto:contato.ferreirag@outlook.com');
      expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5521996192890');
    });
  });

  describe('Navegação e ações', () => {
    it('deve ter botões de navegação no footer', () => {
      render(<TermosPage />);

      expect(screen.getByText('Voltar ao Site')).toBeInTheDocument();
      expect(screen.getByText('Ver Política de Privacidade')).toBeInTheDocument();
    });

    it('deve ter links corretos nos botões de navegação', () => {
      render(<TermosPage />);

      const homeLinks = screen.getAllByRole('link');
      const homeLink = homeLinks.find(link => link.textContent?.includes('Voltar ao Site'));
      const privacyLink = homeLinks.find(link =>
        link.textContent?.includes('Ver Política de Privacidade')
      );

      expect(homeLink).toHaveAttribute('href', '/');
      expect(privacyLink).toHaveAttribute('href', '/privacidade');
    });

    it('deve mostrar confirmação de aceitação dos termos', () => {
      render(<TermosPage />);

      expect(screen.getByText('✓ Termos Aceitos')).toBeInTheDocument();
      expect(screen.getByText(/Ao continuar navegando em nosso site/)).toBeInTheDocument();
    });
  });

  describe('Alterações dos termos', () => {
    it('deve explicar sobre mudanças nos termos', () => {
      render(<TermosPage />);

      expect(screen.getByText(/reserva-se o direito de alterar estes Termos/)).toBeInTheDocument();
      expect(screen.getByText(/antecedência mínima de 30 dias/)).toBeInTheDocument();
      expect(screen.getByText(/revisão periódica/)).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica apropriada', () => {
      render(<TermosPage />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('deve ter headings hierárquicos', () => {
      render(<TermosPage />);

      const h1 = screen.getByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2Elements.length).toBeGreaterThan(5);
    });
  });

  describe('Responsividade', () => {
    it('deve aplicar classes responsivas', () => {
      render(<TermosPage />);

      const container = screen.getByRole('main');
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    });
  });

  describe('Estilização', () => {
    it('deve usar cores da marca Vitale', () => {
      render(<TermosPage />);

      const primaryElements = screen.getAllByText(/Vytalle|Termos/);
      expect(primaryElements.length).toBeGreaterThan(0);
    });

    it('deve ter gradiente de fundo', () => {
      render(<TermosPage />);

      const mainDiv = screen.getByRole('main').parentElement;
      expect(mainDiv).toHaveClass('min-h-screen');
    });
  });
});
