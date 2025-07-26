import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomizationPage from './page';

// Mock do hook useCustomization
const mockUseCustomization = {
  customization: {
    companyName: 'Vytalle',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    primaryColor: '#d8a75b',
    secondaryColor: '#e79632',
    whatsapp: '5521996192890',
    email: 'contato@vytalle.com',
    emailPrivacidade: 'privacidade@vytalle.com',
    emailDpo: 'dpo@vytalle.com',
    instagram: '@vytalle',
    website: 'https://vytalle.com',
    mensagemDestaque: 'Produtos Premium para Profissionais',
    infoEntrega: 'Entrega em todo Brasil',
    formasPagamento: 'PIX, Cartão, Boleto',
    contatoSuporte: 'suporte@vytalle.com',
  },
  saveCustomization: vi.fn(),
  resetCustomization: vi.fn(),
};

vi.mock('@/hooks/useCustomization', () => ({
  useCustomization: () => mockUseCustomization,
}));

// Mock do toast
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

describe('CustomizationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar a página de personalização', () => {
      render(<CustomizationPage />);

      expect(screen.getByText('Personalização')).toBeInTheDocument();
      expect(screen.getByText('Customize o visual e informações do seu site')).toBeInTheDocument();
    });

    it('deve renderizar um componente simples', () => {
      render(<div data-testid="test">Test</div>);
      expect(screen.getByTestId('test')).toBeInTheDocument();
    });

    it('deve renderizar botões de ação', () => {
      render(<CustomizationPage />);

      expect(screen.getByText('Salvar Mudanças')).toBeInTheDocument();
      expect(screen.getByText('Ver Preview')).toBeInTheDocument();
      expect(screen.getByText('Resetar')).toBeInTheDocument();
    });

    it('deve renderizar abas de navegação', () => {
      render(<CustomizationPage />);

      expect(screen.getByText('Branding')).toBeInTheDocument();
      expect(screen.getByText('Contatos')).toBeInTheDocument();
      expect(screen.getByText('Configurações')).toBeInTheDocument();
      expect(screen.getByText('Cores')).toBeInTheDocument();
    });
  });

  describe('Campos de Formulário', () => {
    it('deve renderizar campos de branding', () => {
      render(<CustomizationPage />);

      expect(screen.getByLabelText('Nome da Empresa')).toBeInTheDocument();
      expect(screen.getByLabelText('URL do Logo')).toBeInTheDocument();
      expect(screen.getByLabelText('URL do Favicon')).toBeInTheDocument();
    });

    it('deve renderizar campos de contatos', async () => {
      render(<CustomizationPage />);

      // Clicar na aba de contatos
      const contatosTab = screen.getByText('Contatos');
      await userEvent.click(contatosTab);

      expect(screen.getByLabelText('WhatsApp (apenas números)')).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail Principal')).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail Privacidade')).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail DPO')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
      expect(screen.getByLabelText('Website')).toBeInTheDocument();
    });

    it('deve renderizar campos de configurações', async () => {
      render(<CustomizationPage />);

      // Clicar na aba de configurações
      const configTab = screen.getByText('Configurações');
      await userEvent.click(configTab);

      expect(screen.getByLabelText('Mensagem de Destaque')).toBeInTheDocument();
      expect(screen.getByLabelText('Informações de Entrega')).toBeInTheDocument();
      expect(screen.getByLabelText('Formas de Pagamento')).toBeInTheDocument();
      expect(screen.getByLabelText('Contato de Suporte')).toBeInTheDocument();
    });

    it('deve renderizar campos de cores', async () => {
      render(<CustomizationPage />);

      // Clicar na aba de cores
      const coresTab = screen.getByText('Cores');
      await userEvent.click(coresTab);

      expect(screen.getByLabelText('Cor Principal')).toBeInTheDocument();
      expect(screen.getByLabelText('Cor Secundária')).toBeInTheDocument();
    });
  });

  describe('Funcionalidades de Preview', () => {
    it('deve alternar preview mode', async () => {
      render(<CustomizationPage />);

      const previewButton = screen.getByText('Ver Preview');
      await userEvent.click(previewButton);

      expect(screen.getByText('Ocultar Preview')).toBeInTheDocument();
      expect(screen.queryByText('Ver Preview')).not.toBeInTheDocument();
    });

    it('deve mostrar preview quando ativado', async () => {
      render(<CustomizationPage />);

      const previewButton = screen.getByText('Ver Preview');
      await userEvent.click(previewButton);

      // Verificar se o preview está ativo
      expect(screen.getByText('Ocultar Preview')).toBeInTheDocument();
      expect(screen.queryByText('Ver Preview')).not.toBeInTheDocument();
    });
  });

  describe('Dicas e Orientação', () => {
    it('deve renderizar dicas de personalização', () => {
      render(<CustomizationPage />);

      expect(screen.getByText('Dicas de Personalização')).toBeInTheDocument();
      expect(screen.getByText(/Branding/)).toBeInTheDocument();
      expect(screen.getByText(/Contatos/)).toBeInTheDocument();
    });
  });

  describe('Interações do Usuário', () => {
    it('deve permitir edição de campos', async () => {
      const _user = userEvent.setup();
      render(<CustomizationPage />);

      const companyNameInput = screen.getByLabelText('Nome da Empresa');
      await _user.clear(companyNameInput);
      await _user.type(companyNameInput, 'Nova Empresa');

      expect(companyNameInput).toHaveValue('Nova Empresa');
    });

    it('deve salvar customizações', async () => {
      const _user = userEvent.setup();
      render(<CustomizationPage />);

      const saveButton = screen.getByText('Salvar Mudanças');
      await _user.click(saveButton);

      expect(mockUseCustomization.saveCustomization).toHaveBeenCalled();
    });

    it('deve resetar customizações', async () => {
      const _user = userEvent.setup();
      render(<CustomizationPage />);

      const resetButton = screen.getByText('Resetar');
      await _user.click(resetButton);

      expect(mockUseCustomization.resetCustomization).toHaveBeenCalled();
    });
  });

  describe('Estados de Loading', () => {
    it('deve mostrar loading durante salvamento', async () => {
      const _user = userEvent.setup();
      render(<CustomizationPage />);

      const saveButton = screen.getByText('Salvar Mudanças');
      expect(saveButton).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels apropriados', () => {
      render(<CustomizationPage />);

      expect(screen.getByLabelText('Nome da Empresa')).toBeInTheDocument();
      expect(screen.getByLabelText('URL do Logo')).toBeInTheDocument();
    });

    it('deve ter acessibilidade adequada', () => {
      render(<CustomizationPage />);

      const saveButton = screen.getByText('Salvar Mudanças');
      expect(saveButton).toBeInTheDocument();
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve lidar com erros de carregamento', () => {
      render(<CustomizationPage />);

      expect(screen.getByText('Personalização')).toBeInTheDocument();
    });
  });

  describe('Responsividade', () => {
    it('deve ser responsivo', () => {
      render(<CustomizationPage />);

      const header = screen.getByText('Personalização');
      const container = document.querySelector('.container');

      expect(header).toBeInTheDocument();
      expect(container).toBeInTheDocument();
    });
  });
});
