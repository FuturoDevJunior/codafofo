import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import * as mockData from '@/lib/mockData';
import {
  render,
  screen,
} from '@testing-library/react';

import Products from './page';

describe('Products Page', () => {
  it('renderiza lista de produtos de Supabase', async () => {
    const Page = await Products();
    render(Page);
    expect(screen.getByText('Catálogo Vytalle Estética')).toBeInTheDocument();
    // Verifica se há produtos sendo exibidos (busca por textos relacionados)
    expect(screen.getAllByText(/DL BOTOX|Toxina Botulínica/i).length).toBeGreaterThanOrEqual(2);
  });

  it('renderiza mensagem de vazio se sem produtos', async () => {
    vi.spyOn(mockData, 'getMockProductsCached').mockResolvedValue([]);
    const Page = await Products();
    render(Page);
    const vazioEncontrado = Array.from(document.querySelectorAll('h2, div, p, span')).some(el =>
      el.textContent?.toLowerCase().includes('nenhum produto disponível')
    );
    expect(vazioEncontrado).toBe(true);
    const avisoEncontrado = Array.from(document.querySelectorAll('h2, div, p, span')).some(el =>
      el.textContent?.toLowerCase().includes('volte em breve para novos produtos')
    );
    expect(avisoEncontrado).toBe(true);
  });
}); 