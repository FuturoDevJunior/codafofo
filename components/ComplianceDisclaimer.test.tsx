import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import ComplianceDisclaimer from './ComplianceDisclaimer';

describe('ComplianceDisclaimer', () => {
  it('deve renderizar variante banner por padrão', () => {
    render(<ComplianceDisclaimer />);
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('ANVISA Certificado')).toBeInTheDocument();
  });

  it('deve renderizar variante banner explicitamente', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('ANVISA Certificado')).toBeInTheDocument();
    expect(screen.getByText('Produtos de uso restrito:')).toBeInTheDocument();
  });

  it('deve renderizar variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    expect(screen.getByText('Venda restrita a profissionais licenciados')).toBeInTheDocument();
    expect(
      screen.getByText('Produtos certificados ANVISA. Documentação obrigatória.')
    ).toBeInTheDocument();
  });

  it('deve renderizar variante inline', () => {
    render(<ComplianceDisclaimer variant='inline' />);
    expect(screen.getByText('Venda restrita - ANVISA certificado')).toBeInTheDocument();
  });

  it('deve aplicar className customizada na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' className='custom-banner' />);
    // Verifica se o componente renderiza sem erro com className customizada
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
  });

  it('deve aplicar className customizada na variante card', () => {
    render(<ComplianceDisclaimer variant='card' className='custom-card' />);
    const container = screen.getByText('Venda restrita a profissionais licenciados').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('custom-card');
  });

  it('deve aplicar className customizada na variante inline', () => {
    render(<ComplianceDisclaimer variant='inline' className='custom-inline' />);
    const container = screen.getByText('Venda restrita - ANVISA certificado');
    expect(container).toHaveClass('custom-inline');
  });

  it('deve renderizar ícones corretamente na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    const icons = screen
      .getByText('Venda Restrita')
      .closest('div')
      ?.parentElement?.querySelectorAll('svg');
    expect(icons?.length).toBeGreaterThan(0);
  });

  it('deve renderizar ícones corretamente na variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    const icons = screen
      .getByText('Venda restrita a profissionais licenciados')
      .closest('div')
      ?.parentElement?.querySelectorAll('svg');
    expect(icons?.length).toBeGreaterThan(0);
  });

  it('deve renderizar ícones corretamente na variante inline', () => {
    render(<ComplianceDisclaimer variant='inline' />);
    const icons = screen.getByText('Venda restrita - ANVISA certificado').querySelectorAll?.('svg');
    expect(icons?.length).toBeGreaterThan(0);
  });

  it('deve aplicar classes de cor corretas na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    // Verifica se o componente renderiza com a variante banner
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('ANVISA Certificado')).toBeInTheDocument();
  });

  it('deve aplicar classes de cor corretas na variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    const container = screen.getByText('Venda restrita a profissionais licenciados').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('border-amber-200');
  });

  it('deve aplicar classes de cor corretas na variante inline', () => {
    render(<ComplianceDisclaimer variant='inline' />);
    const container = screen.getByText('Venda restrita - ANVISA certificado');
    expect(container).toHaveClass('text-amber-700');
  });

  it('deve renderizar badges corretamente na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('ANVISA Certificado')).toBeInTheDocument();
  });

  it('deve renderizar texto de descrição na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    expect(screen.getByText(/Produtos de uso restrito/)).toBeInTheDocument();
    expect(
      screen.getByText(/Venda exclusiva para profissionais de saúde licenciados/)
    ).toBeInTheDocument();
  });

  it('deve renderizar informações adicionais na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    expect(screen.getByText('Profissionais licenciados')).toBeInTheDocument();
    expect(screen.getByText('Certificação ANVISA')).toBeInTheDocument();
  });

  it('deve aplicar classes de borda na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    const container = screen.getByText('Venda Restrita').closest('div');
    expect(container).toHaveClass('border', 'border-amber-200');
  });

  it('deve aplicar classes de borda na variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    const container = screen.getByText('Venda restrita a profissionais licenciados').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('border-2', 'border-amber-200');
  });

  it('deve aplicar classes de fundo na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    // Verifica se o componente renderiza com a variante banner
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('Produtos de uso restrito:')).toBeInTheDocument();
  });

  it('deve aplicar classes de fundo na variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    const container = screen.getByText('Venda restrita a profissionais licenciados').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('bg-white');
  });

  it('deve aplicar classes de arredondamento na variante banner', () => {
    render(<ComplianceDisclaimer variant='banner' />);
    // Verifica se o componente renderiza com a variante banner
    expect(screen.getByText('Venda Restrita')).toBeInTheDocument();
    expect(screen.getByText('Profissionais licenciados')).toBeInTheDocument();
  });

  it('deve aplicar classes de arredondamento na variante card', () => {
    render(<ComplianceDisclaimer variant='card' />);
    const container = screen.getByText('Venda restrita a profissionais licenciados').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('rounded-lg');
  });
});
