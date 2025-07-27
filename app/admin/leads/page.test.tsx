import { beforeAll, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import LeadsPage from './page';

// Mock do Next.js navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock do Supabase
vi.mock('@/lib/supabaseServer', () => ({
  createServerSupabaseClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn(() =>
        Promise.resolve({
          data: {
            session: {
              user: { id: '1', email: 'admin@test.com' },
            },
          },
        })
      ),
    },
  })),
}));

// Mock dos componentes UI
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectValue: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@/components/ui/table', () => ({
  Table: ({ children, ...props }: any) => (
    <div className='relative w-full overflow-auto'>
      <table {...props}>{children}</table>
    </div>
  ),
  TableBody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  TableCell: ({ children, ...props }: any) => <td {...props}>{children}</td>,
  TableHead: ({ children, ...props }: any) => <th {...props}>{children}</th>,
  TableHeader: ({ children, ...props }: any) => <thead {...props}>{children}</thead>,
  TableRow: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
}));

vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

// Mock dos ícones Lucide
vi.mock('lucide-react', () => ({
  Calendar: () => <span data-testid='calendar-icon'>Calendar</span>,
  Download: () => <span data-testid='download-icon'>Download</span>,
  Filter: () => <span data-testid='filter-icon'>Filter</span>,
  MessageCircle: () => <span data-testid='message-icon'>MessageCircle</span>,
  Phone: () => <span data-testid='phone-icon'>Phone</span>,
  Star: () => <span data-testid='star-icon'>Star</span>,
  TrendingUp: () => <span data-testid='trending-icon'>TrendingUp</span>,
  User: () => <span data-testid='user-icon'>User</span>,
}));

describe('LeadsPage', () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar página de leads', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Controle de Leads')).toBeInTheDocument();
  });

  it('deve ter estrutura de layout correta', async () => {
    const page = await LeadsPage();
    const { container } = render(page);

    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });

  it('deve ter gradiente de fundo', async () => {
    const page = await LeadsPage();
    const { container } = render(page);

    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toHaveClass('from-vitale-neutral', 'to-vitale-light');
  });

  it('deve ter título da página', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Controle de Leads')).toBeInTheDocument();
  });

  it('deve ter descrição da página', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText(/gerencie contatos e oportunidades do whatsapp/i)).toBeInTheDocument();
  });

  it('deve ter ícones de funcionalidade', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByTestId('download-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('message-icon')).toHaveLength(4);
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('user-icon')).toHaveLength(7);
  });

  it('deve ter estrutura de tabs', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Lista de Leads')).toBeInTheDocument();
    expect(screen.getByText('Pipeline de Vendas')).toBeInTheDocument();
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
  });

  it('deve ter cards de estatísticas', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Total de Leads')).toBeInTheDocument();
    expect(screen.getByText('Em Andamento')).toBeInTheDocument();
    expect(screen.getAllByText('Fechados')).toHaveLength(2);
    expect(screen.getByText('Valor Fechado')).toBeInTheDocument();
  });

  it('deve ter tabela de leads', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getAllByText('Status')).toHaveLength(2);
  });

  it('deve ter filtros de busca', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Filtros e Busca')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('deve ter botões de ação', async () => {
    const page = await LeadsPage();
    render(page);

    expect(screen.getByText('Exportar')).toBeInTheDocument();
    expect(screen.getByText('Voltar ao Dashboard')).toBeInTheDocument();
  });
});
