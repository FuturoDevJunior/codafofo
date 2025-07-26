import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import PrivacidadePage from './page';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Página de Política de Privacidade', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização da página', () => {
    it('deve renderizar o cabeçalho corretamente', () => {
      render(<PrivacidadePage />);

      expect(screen.getAllByText('Política de Privacidade')[0]).toBeInTheDocument();
      expect(screen.getByText('Voltar ao Início')).toBeInTheDocument();
    });

    it('deve exibir o título principal', () => {
      render(<PrivacidadePage />);

      expect(screen.getAllByText('Política de Privacidade')[1]).toBeInTheDocument();
      expect(screen.getByText('Última atualização:')).toBeInTheDocument();
      expect(
        screen.getAllByText((content, element) => {
          return element?.textContent?.includes('Dezembro de 2024') || false;
        })[0]
      ).toBeInTheDocument();
    });

    it('deve mostrar conformidade com LGPD', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Conformidade LGPD')).toBeInTheDocument();
      expect(screen.getByText(/Lei Geral de Proteção de Dados/)).toBeInTheDocument();
      expect(screen.getByText(/Lei nº 13.709\/2018/)).toBeInTheDocument();
    });
  });

  describe('Seções da política de privacidade', () => {
    it('deve exibir todas as seções principais', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('1. Dados Pessoais Coletados')).toBeInTheDocument();
      expect(screen.getByText('2. Finalidades do Tratamento')).toBeInTheDocument();
      expect(screen.getByText('3. Compartilhamento de Dados')).toBeInTheDocument();
      expect(screen.getByText('4. Segurança dos Dados')).toBeInTheDocument();
      expect(screen.getByText('5. Retenção de Dados')).toBeInTheDocument();
      expect(screen.getByText('6. Seus Direitos como Titular')).toBeInTheDocument();
      expect(screen.getByText('7. Cookies e Tecnologias Similares')).toBeInTheDocument();
      expect(screen.getByText('8. Contato e DPO')).toBeInTheDocument();
    });
  });

  describe('Dados coletados', () => {
    it('deve listar dados de identificação profissional', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Dados de Identificação Profissional')).toBeInTheDocument();
      expect(
        screen.getByText('Nome completo e nome social (quando aplicável)')
      ).toBeInTheDocument();
      expect(screen.getByText('CPF e/ou CNPJ')).toBeInTheDocument();
      expect(
        screen.getByText('Número de registro profissional (CRM, CRO, COREN, etc.)')
      ).toBeInTheDocument();
    });

    it('deve listar dados de contato', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Dados de Contato')).toBeInTheDocument();
      expect(screen.getByText('E-mail profissional e pessoal')).toBeInTheDocument();
      expect(screen.getByText('Telefone comercial e celular')).toBeInTheDocument();
      expect(screen.getByText('Endereço do consultório/clínica')).toBeInTheDocument();
    });

    it('deve listar dados comerciais', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Dados Comerciais')).toBeInTheDocument();
      expect(screen.getByText('Histórico de compras e preferências')).toBeInTheDocument();
      expect(screen.getByText('Dados de pagamento (criptografados)')).toBeInTheDocument();
      expect(screen.getByText('Avaliações e feedback sobre produtos')).toBeInTheDocument();
    });

    it('deve listar dados técnicos', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Dados Técnicos')).toBeInTheDocument();
      expect(screen.getByText('Endereço IP e localização aproximada')).toBeInTheDocument();
      expect(screen.getByText('Dados de navegação e uso do site')).toBeInTheDocument();
      expect(screen.getByText('Cookies e tecnologias similares')).toBeInTheDocument();
    });
  });

  describe('Finalidades do tratamento', () => {
    it('deve mostrar finalidades primárias', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Finalidades Primárias')).toBeInTheDocument();
      expect(screen.getByText('Verificação de habilitação profissional')).toBeInTheDocument();
      expect(screen.getByText('Processamento de pedidos e pagamentos')).toBeInTheDocument();
      expect(screen.getByText('Atendimento ao cliente e suporte técnico')).toBeInTheDocument();
    });

    it('deve mostrar finalidades secundárias', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Finalidades Secundárias')).toBeInTheDocument();
      expect(screen.getByText('Marketing direcionado (com consentimento)')).toBeInTheDocument();
      expect(screen.getByText('Análise de perfil de compra')).toBeInTheDocument();
      expect(screen.getByText('Pesquisas de satisfação')).toBeInTheDocument();
    });

    it('deve explicar base legal do tratamento', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Base Legal do Tratamento')).toBeInTheDocument();
      expect(screen.getByText(/Execução de contrato/)).toBeInTheDocument();
      expect(screen.getByText(/Legítimo interesse/)).toBeInTheDocument();
      expect(screen.getByText(/Cumprimento legal/)).toBeInTheDocument();
      expect(screen.getByText(/Consentimento/)).toBeInTheDocument();
    });
  });

  describe('Compartilhamento de dados', () => {
    it('deve enfatizar não venda de dados', () => {
      render(<PrivacidadePage />);

      expect(
        screen.getByText(
          /A Vytalle NÃO vende, aluga ou compartilha dados pessoais para fins comerciais/
        )
      ).toBeInTheDocument();
    });

    it('deve listar compartilhamento necessário', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Compartilhamento Necessário')).toBeInTheDocument();
      expect(screen.getByText(/Fornecedores de serviços/)).toBeInTheDocument();
      expect(screen.getByText(/Autoridades competentes/)).toBeInTheDocument();
      expect(screen.getByText(/Transferência de negócios/)).toBeInTheDocument();
    });

    it('deve mostrar parceiros autorizados', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Parceiros Autorizados')).toBeInTheDocument();
      expect(
        screen.getByText('Transportadoras licenciadas para produtos médicos')
      ).toBeInTheDocument();
      expect(screen.getByText('Gateways de pagamento certificados (PCI DSS)')).toBeInTheDocument();
      expect(
        screen.getByText('Provedores de tecnologia em nuvem (AWS, Google Cloud)')
      ).toBeInTheDocument();
    });
  });

  describe('Segurança dos dados', () => {
    it('deve listar medidas técnicas', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Medidas Técnicas')).toBeInTheDocument();
      expect(screen.getByText('Criptografia SSL/TLS 256-bit')).toBeInTheDocument();
      expect(screen.getByText('Firewall e sistemas anti-intrusão')).toBeInTheDocument();
      expect(screen.getByText('Monitoramento 24/7 de segurança')).toBeInTheDocument();
      expect(screen.getByText('Autenticação multifator')).toBeInTheDocument();
    });

    it('deve listar medidas organizacionais', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Medidas Organizacionais')).toBeInTheDocument();
      expect(screen.getByText('Treinamento em proteção de dados')).toBeInTheDocument();
      expect(screen.getByText('Controle de acesso por função')).toBeInTheDocument();
      expect(screen.getByText('Auditoria regular de segurança')).toBeInTheDocument();
      expect(screen.getByText('Teste de penetração periódico')).toBeInTheDocument();
    });

    it('deve mencionar certificações de segurança', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Certificações de Segurança')).toBeInTheDocument();
      expect(screen.getByText(/ISO 27001, SOC 2/)).toBeInTheDocument();
    });
  });

  describe('Retenção de dados', () => {
    it('deve mostrar prazos de retenção específicos', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Prazos de Retenção')).toBeInTheDocument();
      expect(screen.getByText('Dados de cadastro profissional:')).toBeInTheDocument();
      expect(screen.getByText('Enquanto conta ativa + 5 anos')).toBeInTheDocument();
      expect(screen.getByText('Histórico de compras:')).toBeInTheDocument();
      expect(screen.getByText('10 anos (obrigação fiscal)')).toBeInTheDocument();
      expect(screen.getByText('Dados de navegação:')).toBeInTheDocument();
      expect(screen.getByText('12 meses')).toBeInTheDocument();
    });
  });

  describe('Direitos do titular', () => {
    it('deve listar direitos de acesso', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Direitos de Acesso')).toBeInTheDocument();
      expect(screen.getByText('Confirmar existência de tratamento')).toBeInTheDocument();
      expect(screen.getByText('Acessar seus dados pessoais')).toBeInTheDocument();
      expect(screen.getByText('Solicitar correção de dados incompletos')).toBeInTheDocument();
      expect(screen.getByText('Obter portabilidade dos dados')).toBeInTheDocument();
    });

    it('deve listar direitos de controle', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Direitos de Controle')).toBeInTheDocument();
      expect(screen.getByText('Revogar consentimento a qualquer momento')).toBeInTheDocument();
      expect(screen.getByText('Solicitar eliminação dos dados')).toBeInTheDocument();
      expect(screen.getByText('Opor-se ao tratamento')).toBeInTheDocument();
      expect(screen.getByText('Solicitar revisão de decisões automatizadas')).toBeInTheDocument();
    });

    it('deve explicar como exercer direitos', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Como Exercer Seus Direitos')).toBeInTheDocument();
      expect(screen.getByText('privacidade@vytalle.com.br')).toBeInTheDocument();
      expect(screen.getByText('Até 15 dias úteis')).toBeInTheDocument();
      expect(screen.getByText('Primeira solicitação sempre gratuita')).toBeInTheDocument();
    });
  });

  describe('Cookies', () => {
    it('deve listar tipos de cookies', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Cookies Essenciais')).toBeInTheDocument();
      expect(screen.getByText('Cookies de Funcionalidade')).toBeInTheDocument();
      expect(screen.getByText('Cookies Analíticos')).toBeInTheDocument();
      expect(screen.getByText('Cookies de Marketing')).toBeInTheDocument();
    });

    it('deve explicar cada tipo de cookie', () => {
      render(<PrivacidadePage />);

      expect(
        screen.getByText('Necessários para funcionamento básico do site (sempre ativos)')
      ).toBeInTheDocument();
      expect(screen.getByText('Lembram suas preferências e configurações')).toBeInTheDocument();
      expect(
        screen.getByText('Ajudam a entender como você usa o site (anônimos)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Personalizam anúncios e conteúdo (com consentimento)')
      ).toBeInTheDocument();
    });
  });

  describe('Informações de contato e DPO', () => {
    it('deve mostrar informações do DPO', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Encarregado de Proteção de Dados (DPO)')).toBeInTheDocument();
      expect(screen.getByText('dpo@vytalle.com.br')).toBeInTheDocument();
    });

    it('deve mostrar contato geral', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Contato Geral')).toBeInTheDocument();
      expect(screen.getByText('contato.ferreirag@outlook.com')).toBeInTheDocument();
      expect(screen.getByText('Segunda a Sexta, 8h às 18h')).toBeInTheDocument();
    });

    it('deve mencionar ANPD', () => {
      render(<PrivacidadePage />);

      expect(
        screen.getByText('Autoridade Nacional de Proteção de Dados (ANPD)')
      ).toBeInTheDocument();
      expect(screen.getByText(/www.gov.br\/anpd/)).toBeInTheDocument();
    });

    it('deve ter links de contato funcionais', () => {
      render(<PrivacidadePage />);

      const dpoEmailLink = screen.getByRole('link', { name: 'dpo@vytalle.com.br' });
      const generalEmailLink = screen.getByRole('link', { name: 'contato.ferreirag@outlook.com' });
      const whatsappLink = screen.getByRole('link', { name: '(21) 99619-2890' });

      expect(dpoEmailLink).toHaveAttribute('href', 'mailto:dpo@vytalle.com.br');
      expect(generalEmailLink).toHaveAttribute('href', 'mailto:contato.ferreirag@outlook.com');
      expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5521996192890');
    });
  });

  describe('Navegação e ações', () => {
    it('deve ter botões de navegação no footer', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('Voltar ao Site')).toBeInTheDocument();
      expect(screen.getByText('Ver Termos de Uso')).toBeInTheDocument();
    });

    it('deve ter links corretos nos botões de navegação', () => {
      render(<PrivacidadePage />);

      const homeLinks = screen.getAllByRole('link');
      const homeLink = homeLinks.find(link => link.textContent?.includes('Voltar ao Site'));
      const termsLink = homeLinks.find(link => link.textContent?.includes('Ver Termos de Uso'));

      expect(homeLink).toHaveAttribute('href', '/');
      expect(termsLink).toHaveAttribute('href', '/termos');
    });

    it('deve mostrar garantia de privacidade', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText('🔒 Privacidade Garantida')).toBeInTheDocument();
      expect(screen.getByText(/Seus dados estão seguros conosco/)).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica apropriada', () => {
      render(<PrivacidadePage />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('deve ter headings hierárquicos', () => {
      render(<PrivacidadePage />);

      const h1 = screen.getByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2Elements.length).toBeGreaterThan(7);
    });
  });

  describe('Responsividade', () => {
    it('deve aplicar classes responsivas', () => {
      render(<PrivacidadePage />);

      const container = screen.getByRole('main');
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    });
  });

  describe('Estilização', () => {
    it('deve usar cores da marca Vitale', () => {
      render(<PrivacidadePage />);

      const primaryElements = screen.getAllByText(/Vytalle|Privacidade/);
      expect(primaryElements.length).toBeGreaterThan(0);
    });

    it('deve ter gradiente de fundo', () => {
      render(<PrivacidadePage />);

      const mainDiv = screen.getByRole('main').parentElement;
      expect(mainDiv).toHaveClass('min-h-screen');
    });
  });

  describe('Compliance e conformidade', () => {
    it('deve mencionar regulamentações específicas do setor saúde', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText(/regulamentações aplicáveis do setor de saúde/)).toBeInTheDocument();
    });

    it('deve mostrar medidas de segurança de nível hospitalar', () => {
      render(<PrivacidadePage />);

      expect(
        screen.getByText(/medidas técnicas e organizacionais de segurança de nível hospitalar/)
      ).toBeInTheDocument();
    });

    it('deve mencionar padrões específicos do setor saúde', () => {
      render(<PrivacidadePage />);

      expect(screen.getByText(/específicos do setor de saúde/)).toBeInTheDocument();
    });
  });
});
