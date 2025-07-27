import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Card, CardContent, CardHeader, CardTitle } from './card';

describe('Card Components', () => {
  describe('Card', () => {
    it('deve renderizar com children', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('deve ter data-testid correto', () => {
      render(<Card>Test Card</Card>);
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('deve aplicar className customizada', () => {
      render(<Card className='custom-card'>Custom Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    it('deve passar props HTML adicionais', () => {
      render(<Card data-testid='test-card'>Test Card</Card>);
      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('deve renderizar com children', () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('deve ter data-testid correto', () => {
      render(<CardContent>Test Content</CardContent>);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('deve aplicar className customizada', () => {
      render(<CardContent className='custom-content'>Custom Content</CardContent>);
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('CardHeader', () => {
    it('deve renderizar com children', () => {
      render(<CardHeader>Header</CardHeader>);
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('deve ter data-testid correto', () => {
      render(<CardHeader>Test Header</CardHeader>);
      expect(screen.getByTestId('card-header')).toBeInTheDocument();
    });

    it('deve aplicar className customizada', () => {
      render(<CardHeader className='custom-header'>Custom Header</CardHeader>);
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('deve renderizar com children', () => {
      render(<CardTitle>Title</CardTitle>);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('deve ter data-testid correto', () => {
      render(<CardTitle>Test Title</CardTitle>);
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
    });

    it('deve renderizar como h2', () => {
      render(<CardTitle>Test Title</CardTitle>);
      const title = screen.getByTestId('card-title');
      expect(title.tagName).toBe('H2');
    });

    it('deve aplicar className customizada', () => {
      render(<CardTitle className='custom-title'>Custom Title</CardTitle>);
      const title = screen.getByTestId('card-title');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('Card Composition', () => {
    it('deve renderizar estrutura completa do card', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-header')).toBeInTheDocument();
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });
});
