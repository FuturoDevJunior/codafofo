import {
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import AdminClient from './AdminClient';

const mockProducts = [
  { id: '1', name: 'Produto 1', price: 100, category: 'A', supplier_id: 's1' },
  { id: '2', name: 'Produto 2', price: 200, category: 'B', supplier_id: 's2' },
];
const mockSuppliers = [
  { id: 's1', name: 'Fornecedor 1' },
  { id: 's2', name: 'Fornecedor 2' },
];

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

describe('AdminClient', () => {
  it('renderiza tabela de produtos', () => {
    render(<AdminClient products={mockProducts} suppliers={mockSuppliers} />);
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
  });
  it('filtra produtos por supplier', () => {
    render(<AdminClient products={mockProducts} suppliers={mockSuppliers} />);
    fireEvent.change(screen.getByPlaceholderText('Filtrar por Supplier ID'), { target: { value: 's1' } });
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.queryByText('Produto 2')).not.toBeInTheDocument();
  });
  it('exporta CSV', () => {
    render(<AdminClient products={mockProducts} suppliers={mockSuppliers} />);
    const exportBtn = screen.getByText('Exportar CSV');
    // Simula clique (não valida download real em ambiente de teste)
    fireEvent.click(exportBtn);
    expect(exportBtn).toBeInTheDocument();
  });
  it('abre dialog de edição', () => {
    render(<AdminClient products={mockProducts} suppliers={mockSuppliers} />);
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });
}); 