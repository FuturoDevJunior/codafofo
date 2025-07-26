import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

describe('Table UI', () => {
  it('renderiza tabela com cabeçalho, corpo e caption', () => {
    render(
      <Table>
        <TableCaption>Legenda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Coluna</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByText('Legenda')).toBeInTheDocument();
    expect(screen.getByText('Coluna')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
  });
});
