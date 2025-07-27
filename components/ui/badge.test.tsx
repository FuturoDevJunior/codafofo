import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Badge } from './badge';

describe('Badge', () => {
  it('deve renderizar com texto', () => {
    render(<Badge>Teste Badge</Badge>);
    expect(screen.getByText('Teste Badge')).toBeInTheDocument();
  });

  it('deve aplicar variante default', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('bg-primary');
  });

  it('deve aplicar variante secondary', () => {
    render(<Badge variant='secondary'>Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary');
  });

  it('deve aplicar variante destructive', () => {
    render(<Badge variant='destructive'>Destructive Badge</Badge>);
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toHaveClass('bg-destructive');
  });

  it('deve aplicar variante outline', () => {
    render(<Badge variant='outline'>Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('text-foreground');
  });

  it('deve aplicar className customizada', () => {
    render(<Badge className='custom-class'>Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('deve passar props HTML adicionais', () => {
    render(<Badge data-testid='test-badge'>Test Badge</Badge>);
    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
  });
});
