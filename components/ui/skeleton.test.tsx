import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  describe('Renderização Básica', () => {
    it('deve renderizar com classes padrão', () => {
      render(<Skeleton data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('animate-pulse-soft', 'rounded-md', 'bg-neutral-200');
    });

    it('deve aplicar className personalizada', () => {
      render(<Skeleton className='custom-class' data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });

    it('deve renderizar com dimensões específicas', () => {
      render(<Skeleton className='h-4 w-32' data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-4', 'w-32');
    });
  });

  describe('Variações de Tamanho', () => {
    it('deve renderizar skeleton para texto', () => {
      render(<Skeleton className='h-4 w-48' data-testid='text-skeleton' />);

      const skeleton = screen.getByTestId('text-skeleton');
      expect(skeleton).toHaveClass('h-4', 'w-48');
    });

    it('deve renderizar skeleton para avatar', () => {
      render(<Skeleton className='h-12 w-12 rounded-full' data-testid='avatar-skeleton' />);

      const skeleton = screen.getByTestId('avatar-skeleton');
      expect(skeleton).toHaveClass('h-12', 'w-12', 'rounded-full');
    });

    it('deve renderizar skeleton para card', () => {
      render(<Skeleton className='h-48 w-full' data-testid='card-skeleton' />);

      const skeleton = screen.getByTestId('card-skeleton');
      expect(skeleton).toHaveClass('h-48', 'w-full');
    });
  });

  describe('Estrutura HTML', () => {
    it('deve renderizar como div por padrão', () => {
      render(<Skeleton data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton.tagName).toBe('DIV');
    });

    it('deve renderizar como elemento div', () => {
      render(<Skeleton data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton.tagName).toBe('DIV');
    });
  });

  describe('Casos de Uso Comuns', () => {
    it('deve renderizar múltiplos skeletons para lista', () => {
      render(
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='mb-2 h-4 w-full' data-testid={`skeleton-${i}`} />
          ))}
        </div>
      );

      for (let i = 0; i < 3; i++) {
        expect(screen.getByTestId(`skeleton-${i}`)).toBeInTheDocument();
      }
    });

    it('deve renderizar skeleton complexo com múltiplas partes', () => {
      render(
        <div className='space-y-4'>
          <Skeleton className='h-12 w-12 rounded-full' data-testid='avatar' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' data-testid='title' />
            <Skeleton className='h-4 w-48' data-testid='subtitle' />
          </div>
        </div>
      );

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('subtitle')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter estrutura HTML apropriada', () => {
      render(<Skeleton data-testid='skeleton' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton.tagName).toBe('DIV');
    });

    it('deve aceitar atributos personalizados', () => {
      render(<Skeleton data-testid='skeleton' aria-hidden='true' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
