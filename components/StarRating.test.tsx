import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import StarRating from './StarRating';

describe('StarRating', () => {
  it('deve renderizar com rating padrão', () => {
    render(<StarRating rating={3.5} />);
    expect(screen.getByText('3.5 | +500 Avaliações')).toBeInTheDocument();
  });

  it('deve renderizar 5 estrelas por padrão', () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    expect(stars).toHaveLength(5);
  });

  it('deve renderizar estrelas preenchidas baseado no rating', () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    
    // Primeiras 3 estrelas devem estar preenchidas
    expect(stars[0]).toHaveClass('text-yellow-500', 'fill-yellow-500');
    expect(stars[1]).toHaveClass('text-yellow-500', 'fill-yellow-500');
    expect(stars[2]).toHaveClass('text-yellow-500', 'fill-yellow-500');
    
    // Últimas 2 estrelas devem estar vazias
    expect(stars[3]).toHaveClass('text-gray-300', 'fill-gray-300');
    expect(stars[4]).toHaveClass('text-gray-300', 'fill-gray-300');
  });

  it('deve aceitar maxRating customizado', () => {
    render(<StarRating rating={2} maxRating={3} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 3/);
    expect(stars).toHaveLength(3);
  });

  it('deve aplicar tamanho sm', () => {
    render(<StarRating rating={4} size="sm" />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    expect(stars[0]).toHaveClass('h-4', 'w-4');
  });

  it('deve aplicar tamanho lg', () => {
    render(<StarRating rating={4} size="lg" />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    expect(stars[0]).toHaveClass('h-6', 'w-6');
  });

  it('deve aplicar tamanho md por padrão', () => {
    render(<StarRating rating={4} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    expect(stars[0]).toHaveClass('h-5', 'w-5');
  });

  it('deve mostrar texto quando showText é true', () => {
    render(<StarRating rating={4.2} showText={true} />);
    expect(screen.getByText('4.2 | +500 Avaliações')).toBeInTheDocument();
  });

  it('deve ocultar texto quando showText é false', () => {
    render(<StarRating rating={4.2} showText={false} />);
    expect(screen.queryByText('4.2 | +500 Avaliações')).not.toBeInTheDocument();
  });

  it('deve mostrar texto por padrão', () => {
    render(<StarRating rating={4.2} />);
    expect(screen.getByText('4.2 | +500 Avaliações')).toBeInTheDocument();
  });

  it('deve aplicar className customizada', () => {
    render(<StarRating rating={4} className="custom-rating" />);
    const container = screen.getByText('4.0 | +500 Avaliações').parentElement;
    expect(container).toHaveClass('custom-rating');
  });

  it('deve aplicar tamanho de texto correto para sm', () => {
    render(<StarRating rating={4} size="sm" />);
    const text = screen.getByText('4.0 | +500 Avaliações');
    expect(text).toHaveClass('text-sm');
  });

  it('deve aplicar tamanho de texto correto para lg', () => {
    render(<StarRating rating={4} size="lg" />);
    const text = screen.getByText('4.0 | +500 Avaliações');
    expect(text).toHaveClass('text-lg');
  });

  it('deve aplicar tamanho de texto correto para md', () => {
    render(<StarRating rating={4} size="md" />);
    const text = screen.getByText('4.0 | +500 Avaliações');
    expect(text).toHaveClass('text-base');
  });

  it('deve lidar com rating zero', () => {
    render(<StarRating rating={0} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    stars.forEach(star => {
      expect(star).toHaveClass('text-gray-300', 'fill-gray-300');
    });
  });

  it('deve lidar com rating máximo', () => {
    render(<StarRating rating={5} />);
    const stars = screen.getAllByLabelText(/Estrela \d+ de 5/);
    stars.forEach(star => {
      expect(star).toHaveClass('text-yellow-500', 'fill-yellow-500');
    });
  });

  it('deve lidar com rating decimal', () => {
    render(<StarRating rating={3.7} />);
    expect(screen.getByText('3.7 | +500 Avaliações')).toBeInTheDocument();
  });
}); 