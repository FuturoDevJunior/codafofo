import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { getProducts } from '@/lib/mockData';
import {
  render,
  screen,
} from '@testing-library/react';

import Products from './page';

vi.mock('@/lib/mockData', () => ({
  getProducts: vi.fn().mockReturnValue([
    {
      id: '1',
      name: 'DL BOTOX 100UI',
      category: 'Toxina Botulínica',
      images: ['/images/products/dl-botox-100ui.jpg'],
      price_pix: 745,
      price_card: 789,
      currency: 'BRL',
      slug: 'dl-botox-100ui',
      active: true,
      description: 'Toxina botulínica tipo A para tratamentos estéticos de rugas dinâmicas e hiperidrose.'
    }
  ])
}));

describe('Products Page', () => {
  it('renderiza lista de produtos do mockData', async () => {
    const Page = await Products();
    render(Page);
    expect(screen.getByText('Catálogo Vytalle Estética')).toBeInTheDocument();
    // Verifica se há produtos sendo exibidos (busca por textos relacionados)
    expect(screen.getAllByText(/DL BOTOX|Toxina Botulínica/i).length).toBeGreaterThan(0);
  });

  it('renderiza mensagem de vazio se sem produtos', async () => {
    vi.mocked(getProducts).mockReturnValueOnce([]);
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

  it('renderiza todas as descrições de categoria', async () => {
    const categorias = [
      { category: 'Toxina Botulínica', desc: 'Toxinas botulínicas para redução de rugas e rejuvenescimento facial' },
      { category: 'Bioestimulador', desc: 'Bioestimuladores para regeneração celular e estímulo de colágeno' },
      { category: 'Preenchedor', desc: 'Preenchedores com ácido hialurônico para contorno e volume facial' },
      { category: 'Fio Bioestimulação', desc: 'Fios de bioestimulação para lifting e regeneração de colágeno' },
      { category: 'Microcânula', desc: 'Microcânulas profissionais para aplicação precisa e segura' },
      { category: 'Enzima', desc: 'Enzimas para dissolução e correção de tratamentos estéticos' },
      { category: 'Skinbooster', desc: 'Skinboosters para hidratação profunda e melhora da qualidade da pele' },
      { category: 'Bioremodelador', desc: 'Bioremodeladores para regeneração tecidual e rejuvenescimento' },
    ];
    for (const { category, desc } of categorias) {
      vi.mocked(getProducts).mockReturnValueOnce([
        {
          id: '1',
          name: 'Produto Teste',
          category,
          images: ['/images/products/produto-teste.jpg'],
          price_pix: 100,
          price_card: 120,
          currency: 'BRL',
          description: 'desc',
          slug: 'produto-teste',
          active: true
        }
      ]);
      const Page = await Products();
      render(Page);
      // Verifica se pelo menos um elemento corresponde ao nome da categoria
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
      expect(screen.getByText(desc)).toBeInTheDocument();
    }
  });
}); 