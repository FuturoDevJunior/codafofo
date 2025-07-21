import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { useCartStore } from '@/lib/store';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkout from './page';

vi.mock('@/lib/store');

describe('Checkout Page', () => {
  it('valida campos e envia pedido', async () => {
    const mockItems = [
      { id: '1', name: 'Botox® 50U', price: 1200, quantity: 1, images: ['/images/botox-50u.png'] },
      { id: '2', name: 'Botox® 100U', price: 1950, quantity: 1, images: ['/images/botox-100u.png'] },
      { id: '3', name: 'Dysport® 300U', price: 1400, quantity: 1, images: ['/images/dysport-300u.png'] },
      { id: '4', name: 'Xeomin® 50U', price: 900, quantity: 1, images: ['/images/xeomin-50u.png'] },
      { id: '5', name: 'Xeomin® 100U', price: 1600, quantity: 1, images: ['/images/xeomin-100u.png'] },
      { id: '6', name: 'Viscosuplementação Articular', price: 2500, quantity: 1, images: ['/images/visco-supl.png'] },
    ];
    vi.mocked(useCartStore).mockReturnValue({ items: mockItems, clearCart: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn() });
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    render(<Checkout />);
    const user = userEvent.setup();

    // Etapa 1: Dados Pessoais
    const nomeInput = await screen.findByPlaceholderText('Dr(a). João Silva');
    await user.type(nomeInput, 'Gabriel Ferreira');
    const whatsappInput = await screen.findByPlaceholderText('(11) 99999-9999');
    await user.type(whatsappInput, '5511999999999');
    const emailInput = await screen.findByPlaceholderText('dr.joao@clinica.com.br');
    await user.type(emailInput, 'gabriel@exemplo.com');
    // Avançar para etapa 2
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 2: Dados Profissionais
    const crmInput = await screen.findByPlaceholderText('123456/SP');
    await user.type(crmInput, '123456/SP');
    const clinicaInput = await screen.findByPlaceholderText('Clínica de Estética Avançada');
    await user.type(clinicaInput, 'Clínica Exemplo');
    // Avançar para etapa 3
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 3: Endereço
    const cepInput = await screen.findByPlaceholderText('00000-000');
    await user.type(cepInput, '01001-000');
    const cidadeInput = await screen.findByPlaceholderText('São Paulo');
    await user.type(cidadeInput, 'São Paulo');
    const estadoInput = await screen.findByPlaceholderText('SP');
    await user.type(estadoInput, 'SP');
    const enderecoInput = await screen.findByPlaceholderText('Rua Example, 123 - Centro');
    await user.type(enderecoInput, 'Rua Exemplo, 123 - Centro');
    // Avançar para etapa 4
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 4: Pagamento
    // Seleciona o primeiro método de pagamento disponível
    const metodoPagamento = await screen.findByText('PIX');
    await user.click(metodoPagamento);
    // Avançar para etapa 5
    await user.click(screen.getByRole('button', { name: /Revisar Pedido/i }));

    // Etapa 5: Confirmação
    // Mock window.open
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    // Clica no botão de submissão
    const submitButton = screen.getByRole('button', { name: /Finalizar via WhatsApp/i });
    await user.click(submitButton);

    // Verifica se window.open foi chamado
    await waitFor(() => {
      expect(openSpy).toHaveBeenCalled();
    });
  }, 10000); // Timeout de 10 segundos
}); 