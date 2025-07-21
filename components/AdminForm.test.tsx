import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { toast } from '@/components/ui/use-toast';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import AdminForm, { adminFormOnSubmit } from './AdminForm';

// Mock useForm, supabase e toast
const insertSpy = vi.fn(() => ({ eq: eqSpy }));
const updateSpy = vi.fn(() => ({ eq: eqSpy }));
const eqSpy = vi.fn().mockResolvedValue({ data: {}, error: null });

let formValues: Record<string, any> = {};

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn((name) => ({
      name,
      onChange: (e: any) => {
        formValues[name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      },
      ref: () => {},
    })),
    handleSubmit: vi.fn((fn) => async (e: any) => {
      e.preventDefault();
      await fn({
        name: formValues.name || '',
        slug: formValues.slug || '',
        price: Number(formValues.price) || 0,
        description: formValues.description || '',
        images: formValues.images || '',
        category: formValues.category || 'Botox',
        active: formValues.active ?? true,
        stock: Number(formValues.stock) || 0,
        discount_percent: Number(formValues.discount_percent) || 0,
        supplier_id: formValues.supplier_id || '1',
        currency: formValues.currency || 'BRL',
      });
    }),
    setValue: vi.fn((name, value) => {
      formValues[name] = value;
    }),
  })),
}));

vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      from: vi.fn((table) => {
        if (table === 'suppliers') {
          return {
            select: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Fornecedor 1' }] }),
          };
        }
        return {
          insert: insertSpy,
          update: updateSpy,
          select: vi.fn().mockResolvedValue({ data: [] }),
          eq: eqSpy,
        };
      }),
    },
  };
});

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

describe('AdminForm', () => {
  beforeEach(() => { formValues = {}; });
  afterEach(() => vi.clearAllMocks());

  it('renderiza campos do formulário', () => {
    render(<AdminForm />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imagens/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Estoque/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Desconto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Moeda/i)).toBeInTheDocument();
    expect(screen.getByText(/Fornecedor/i)).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')[1]).toBeInTheDocument();
    expect(screen.getByLabelText(/Ativo/i)).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('submete form novo produto corretamente', async () => {
    // Teste unitário direto da função de submit
    const submitData = {
      name: 'Produto Teste',
      slug: 'produto-teste',
      price: 100,
      description: 'Descrição do produto',
      images: 'img1.jpg,img2.jpg',
      category: 'Botox',
      active: true,
      stock: 10,
      discount_percent: 5,
      supplier_id: '1',
      currency: 'BRL',
    };
    await adminFormOnSubmit(submitData);
    expect(insertSpy).toHaveBeenCalledWith(expect.objectContaining({ name: 'Produto Teste', price: 100, slug: 'produto-teste' }));
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'Sucesso' }));
  });

  it('edita produto existente', async () => {
    const mockProduct = {
      id: '1',
      name: 'Existing',
      slug: 'existing',
      price: 1200,
      description: '',
      images: '',
      category: '',
      active: true,
      stock: 0,
      discount_percent: 0,
      supplier_id: '',
      currency: 'BRL',
    };
    render(<AdminForm product={mockProduct} />);
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Updated' } });
    fireEvent.submit(screen.getByTestId('admin-form'));

    expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ name: 'Updated' }));
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'Sucesso' }));
  });
}); 