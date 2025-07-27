import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

describe('Toast UI', () => {
  it('renderiza Toast com título e descrição', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Alerta</ToastTitle>
          <ToastDescription>Mensagem</ToastDescription>
          <ToastAction altText='Desfazer'>Desfazer</ToastAction>
          <ToastClose>Fechar</ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText('Alerta')).toBeInTheDocument();
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
    expect(screen.getByText('Desfazer')).toBeInTheDocument();
    // O botão de fechar não tem texto visível, buscar pelo role e atributo toast-close
    const closeBtn = screen
      .getAllByRole('button')
      .find(btn => btn.getAttribute('toast-close') !== null);
    expect(closeBtn).toBeDefined();
  });
});
