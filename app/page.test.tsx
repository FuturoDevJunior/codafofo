import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renderiza todas as seções principais da página inicial otimizada', () => {
    render(<Home />);
    
    // Verifica o título principal atualizado (quebra em duas linhas)
    expect(screen.getByText('Produtos Premium para')).toBeInTheDocument();
    expect(screen.getByText('Estética Profissional')).toBeInTheDocument();
    
    // Verifica a nova descrição otimizada
    expect(screen.getByText(/Sua excelência profissional começa aqui/)).toBeInTheDocument();
    expect(screen.getByText(/Produtos originais, certificados ANVISA/)).toBeInTheDocument();
    
    // Verifica nova seção "Produtos em Destaque"
    expect(screen.getByText('Produtos em Destaque')).toBeInTheDocument();
    expect(screen.getByText(/Conheça nossa seleção premium de produtos mais procurados/)).toBeInTheDocument();
    
    // Verifica seção "Sobre Nós" melhorada
    expect(screen.getByText('Sobre a Vytalle Estética')).toBeInTheDocument();
    expect(screen.getByText('Nossa Missão')).toBeInTheDocument();
    expect(screen.getByText('Nossa Visão')).toBeInTheDocument();
    
    // Verifica certificações adicionadas
    expect(screen.getByText('Certificações & Compliance')).toBeInTheDocument();
    expect(screen.getByText('ANVISA Certificado')).toBeInTheDocument();
    expect(screen.getByText('ISO 13485')).toBeInTheDocument();
    expect(screen.getByText('LGPD Conforme')).toBeInTheDocument();
    
    // Verifica categorias expandidas
    expect(screen.getByText('Categorias de Produtos Premium')).toBeInTheDocument();
    expect(screen.getAllByText('Toxina Botulínica').length).toBeGreaterThan(0); // Aparece em produtos em destaque e categorias
    expect(screen.getByText('Preenchedores')).toBeInTheDocument();
    expect(screen.getByText('Bioestimuladores')).toBeInTheDocument();
    expect(screen.getByText('Acessórios Premium')).toBeInTheDocument();
    
    // Verifica marcas mencionadas
    expect(screen.getByText(/Allergan, Ipsen, Merz/)).toBeInTheDocument();
    expect(screen.getByText(/Juvederm, Restylane, Belotero/)).toBeInTheDocument();
    expect(screen.getByText(/Sculptra, Radiesse, Ellansé/)).toBeInTheDocument();
    
    // Verifica estatísticas atualizadas
    expect(screen.getByText('+2K')).toBeInTheDocument();
    expect(screen.getByText('+80')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Verifica badges de confiança
    expect(screen.getByText('Compra 100% Segura')).toBeInTheDocument();
    expect(screen.getByText('Produtos Certificados')).toBeInTheDocument();
    expect(screen.getByText('Entrega em 24-48h')).toBeInTheDocument();
    expect(screen.getByText('+2000 Profissionais')).toBeInTheDocument();
    
    // Verifica CTA final otimizado
    expect(screen.getByText('Pronto para Elevar sua Prática Profissional?')).toBeInTheDocument();
    expect(screen.getByText('Garantia Total')).toBeInTheDocument();
    expect(screen.getByText('Entrega Expressa')).toBeInTheDocument();
    expect(screen.getByText('Suporte 24/7')).toBeInTheDocument();
    
    // Verifica botões de ação (múltiplas ocorrências)
    expect(screen.getAllByText(/Explorar Catálogo Completo/)).toHaveLength(2);
    expect(screen.getAllByText(/Siga no Instagram/)).toHaveLength(2);
    expect(screen.getAllByText(/Consultor Especializado/)).toHaveLength(2);
  });
}); 