import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renderiza todas as seções principais da página inicial', () => {
    render(<Home />);
    
    // Verifica o título principal
    expect(screen.getByText('Vytalle Estética')).toBeInTheDocument();
    
    // Verifica a descrição
    expect(screen.getByText(/Excelência em tratamentos estéticos avançados/)).toBeInTheDocument();
    
    // Verifica seção "Sobre Nós"
    expect(screen.getByText('Sobre a Vytalle Estética')).toBeInTheDocument();
    expect(screen.getByText('Nossa Missão')).toBeInTheDocument();
    expect(screen.getByText('Nossa Visão')).toBeInTheDocument();
    
    // Verifica seção de serviços
    expect(screen.getByText('Nossos Serviços Especializados')).toBeInTheDocument();
    expect(screen.getByText('Toxina Botulínica')).toBeInTheDocument();
    expect(screen.getByText('Viscosuplementação')).toBeInTheDocument();
    expect(screen.getByText('Tratamentos Faciais')).toBeInTheDocument();
    expect(screen.getByText('Consultoria Especializada')).toBeInTheDocument();
    
    // Verifica seção de diferenciais
    expect(screen.getByText('Por que escolher a Vytalle?')).toBeInTheDocument();
    expect(screen.getByText('Qualidade Garantida')).toBeInTheDocument();
    expect(screen.getByText('Profissionais Qualificados')).toBeInTheDocument();
    expect(screen.getByText('Atendimento Digital')).toBeInTheDocument();
    
    // Verifica estatísticas
    expect(screen.getByText('+500')).toBeInTheDocument();
    expect(screen.getByText('+50')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Verifica botões de ação
    expect(screen.getByText('Ver Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Explorar Catálogo')).toBeInTheDocument();
  });
}); 