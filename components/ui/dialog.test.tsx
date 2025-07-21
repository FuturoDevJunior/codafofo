import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';

describe('Dialog UI', () => {
  it('renderiza Dialog e subcomponentes', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose>Fechar</DialogClose>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
}); 