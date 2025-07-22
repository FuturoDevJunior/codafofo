import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renderiza todas as seções principais da página inicial', () => {
    render(<Home />);
    
    // Verifica o título principal
    expect(screen.getByText('Produtos Premium para Estética Profissional')).toBeInTheDocument();
    
    // Verifica a descrição
    expect(screen.getByText(/Produtos originais, entrega rápida e suporte consultivo para clínicas e profissionais/)).toBeInTheDocument();
    
    // Verifica seção "Sobre Nós"
    expect(screen.getByText('Sobre a Vytalle Estética')).toBeInTheDocument();
    expect(screen.getByText('Nossa Missão')).toBeInTheDocument();
    expect(screen.getByText('Nossa Visão')).toBeInTheDocument();
    
    // Verifica categorias de produtos
    expect(screen.getByText('Nossas Categorias de Produtos')).toBeInTheDocument();
    expect(screen.getByText('Toxina Botulínica')).toBeInTheDocument();
    expect(screen.getByText('Preenchedores')).toBeInTheDocument();
    expect(screen.getByText('Bioestimuladores')).toBeInTheDocument();
    expect(screen.getByText('Acessórios')).toBeInTheDocument();
    
    // Verifica seção de diferenciais
    expect(screen.getByText('Por que escolher a Vytalle?')).toBeInTheDocument();
    expect(screen.getByText('Qualidade Garantida')).toBeInTheDocument();
    expect(screen.getAllByText('Entrega Rápida')).toHaveLength(2); // Aparece em benefícios e diferenciais
    expect(screen.getByText('Vendas Digital')).toBeInTheDocument();
    
    // Verifica estatísticas
    expect(screen.getByText('+500')).toBeInTheDocument();
    expect(screen.getByText('+50')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Verifica botões de ação
    expect(screen.getAllByText('Explorar Catálogo Completo')).toHaveLength(2);
    expect(screen.getAllByText('Siga no Instagram')).toHaveLength(2);
  });
}); 