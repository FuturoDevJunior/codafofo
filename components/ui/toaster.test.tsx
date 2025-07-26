import { describe, expect, it, vi } from 'vitest';

import * as useToastModule from '@/components/ui/use-toast';
import { render, screen } from '@testing-library/react';

import { Toaster } from './toaster';

describe('Toaster', () => {
  it('renderiza toasts do hook', () => {
    vi.spyOn(useToastModule, 'useToast').mockReturnValue({
      toasts: [{ id: '1', title: 'Toast 1', description: 'Desc', open: true }],
      toast: vi.fn(),
      dismiss: vi.fn(),
    });
    render(<Toaster />);
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });
});
