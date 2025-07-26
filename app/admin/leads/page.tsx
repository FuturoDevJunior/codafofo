import { redirect } from 'next/navigation';

import {
  Calendar,
  Download,
  Filter,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  cliente_nome: string;
  cliente_telefone: string;
  produto_interesse: string;
  status: string;
  valor_estimado: number;
  vendedor_responsavel: string;
  data_contato: string;
  ultima_interacao: string;
  observacoes?: string;
  origem: string;
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    novo: { label: 'Novo Lead', className: 'bg-blue-100 text-blue-800' },
    contato: { label: 'Em Contato', className: 'bg-yellow-100 text-yellow-800' },
    interessado: { label: 'Interessado', className: 'bg-orange-100 text-orange-800' },
    negociacao: { label: 'Negociação', className: 'bg-purple-100 text-purple-800' },
    fechado: { label: 'Fechado', className: 'bg-green-100 text-green-800' },
    perdido: { label: 'Perdido', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.novo;
  
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

export default async function LeadsPage() {
  const supabase = await createServerSupabaseClient();

  // Verificar autenticação
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Simular dados de leads (já que não existem tabelas específicas)
  const leads: Lead[] = [
    {
      id: '1',
      cliente_nome: 'Dr. Maria Silva',
      cliente_telefone: '11999887766',
      produto_interesse: 'Toxina Botulínica',
      status: 'negociacao',
      valor_estimado: 2500,
      vendedor_responsavel: 'João Santos',
      data_contato: '2025-01-20',
      ultima_interacao: '2025-01-25',
      origem: 'WhatsApp Catálogo',
    },
    {
      id: '2', 
      cliente_nome: 'Dra. Ana Costa',
      cliente_telefone: '11998776655',
      produto_interesse: 'Preenchedores',
      status: 'interessado',
      valor_estimado: 3200,
      vendedor_responsavel: 'Pedro Lima',
      data_contato: '2025-01-22',
      ultima_interacao: '2025-01-24',
      origem: 'WhatsApp Direto',
    },
    {
      id: '3',
      cliente_nome: 'Dr. Carlos Ferreira',
      cliente_telefone: '11997665544',
      produto_interesse: 'Skinboosters',
      status: 'fechado',
      valor_estimado: 1800,
      vendedor_responsavel: 'João Santos',
      data_contato: '2025-01-18',
      ultima_interacao: '2025-01-23',
      origem: 'WhatsApp Catálogo',
    },
  ];

  // Calcular estatísticas
  const stats = {
    total: leads.length,
    novos: leads.filter(l => l.status === 'novo').length,
    emAndamento: leads.filter(l => ['contato', 'interessado', 'negociacao'].includes(l.status)).length,
    fechados: leads.filter(l => l.status === 'fechado').length,
    valorTotal: leads.filter(l => l.status === 'fechado').reduce((sum, l) => sum + l.valor_estimado, 0),
    valorPotencial: leads.filter(l => ['interessado', 'negociacao'].includes(l.status)).reduce((sum, l) => sum + l.valor_estimado, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      {/* Header */}
      <header className="bg-white border-b-2 border-vitale-primary/20 shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-vitale-primary">Controle de Leads</h1>
                <p className="text-neutral-600">Gerencie contatos e oportunidades do WhatsApp</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="bg-vitale-primary hover:bg-vitale-secondary text-white"
              >
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-vitale-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Contatos registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.emAndamento}</div>
              <p className="text-xs text-muted-foreground">
                Oportunidades ativas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fechados</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.fechados}</div>
              <p className="text-xs text-muted-foreground">
                Vendas concluídas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Fechado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.valorTotal)}
              </div>
              <p className="text-xs text-muted-foreground">
                Potencial: {formatCurrency(stats.valorPotencial)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Leads</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline de Vendas</TabsTrigger>
            <TabsTrigger value="analytics">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Filtros básicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros e Busca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <Label htmlFor="search">Buscar</Label>
                    <Input
                      id="search"
                      placeholder="Nome, telefone..."
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="novo">Novo Lead</SelectItem>
                        <SelectItem value="contato">Em Contato</SelectItem>
                        <SelectItem value="interessado">Interessado</SelectItem>
                        <SelectItem value="negociacao">Negociação</SelectItem>
                        <SelectItem value="fechado">Fechado</SelectItem>
                        <SelectItem value="perdido">Perdido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendedor">Vendedor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos vendedores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="joao">João Santos</SelectItem>
                        <SelectItem value="pedro">Pedro Lima</SelectItem>
                        <SelectItem value="maria">Maria Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as origens" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="catalogo">WhatsApp Catálogo</SelectItem>
                        <SelectItem value="direto">WhatsApp Direto</SelectItem>
                        <SelectItem value="indicacao">Indicação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de leads */}
            <Card>
              <CardHeader>
                <CardTitle>Leads ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Produto Interesse</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead>Valor Estimado</TableHead>
                        <TableHead>Último Contato</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{lead.cliente_nome}</div>
                              <div className="text-xs text-muted-foreground">
                                {lead.origem}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-xs">{lead.cliente_telefone}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{lead.produto_interesse}</span>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={lead.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="text-xs">{lead.vendedor_responsavel}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(lead.valor_estimado)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">
                                {new Date(lead.ultima_interacao).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => window.open(`https://wa.me/55${lead.cliente_telefone}`, '_blank')}
                              >
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <User className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Pipeline de vendas */}
              {[
                { status: 'novo', title: 'Novos Leads', color: 'blue' },
                { status: 'negociacao', title: 'Em Negociação', color: 'orange' },
                { status: 'fechado', title: 'Fechados', color: 'green' },
              ].map((stage) => (
                <Card key={stage.status}>
                  <CardHeader>
                    <CardTitle className={`text-${stage.color}-600`}>
                      {stage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leads
                        .filter(lead => 
                          stage.status === 'novo' ? lead.status === 'novo' :
                          stage.status === 'negociacao' ? ['interessado', 'negociacao'].includes(lead.status) :
                          lead.status === 'fechado'
                        )
                        .map((lead) => (
                        <div key={lead.id} className="p-3 border rounded-lg">
                          <div className="font-medium text-sm">{lead.cliente_nome}</div>
                          <div className="text-xs text-muted-foreground">{lead.produto_interesse}</div>
                          <div className="text-xs font-semibold text-green-600 mt-1">
                            {formatCurrency(lead.valor_estimado)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance por Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['João Santos', 'Pedro Lima', 'Maria Costa'].map((vendedor) => {
                      const leadsVendedor = leads.filter(l => l.vendedor_responsavel === vendedor);
                      const fechados = leadsVendedor.filter(l => l.status === 'fechado').length;
                      const valor = leadsVendedor.filter(l => l.status === 'fechado').reduce((sum, l) => sum + l.valor_estimado, 0);
                      
                      return (
                        <div key={vendedor} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{vendedor}</div>
                            <div className="text-xs text-muted-foreground">
                              {leadsVendedor.length} leads • {fechados} fechados
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">
                              {formatCurrency(valor)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {leadsVendedor.length ? Math.round((fechados / leadsVendedor.length) * 100) : 0}% conversão
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Origem dos Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['WhatsApp Catálogo', 'WhatsApp Direto', 'Indicação'].map((origem) => {
                      const leadsOrigem = leads.filter(l => l.origem === origem);
                      const fechados = leadsOrigem.filter(l => l.status === 'fechado').length;
                      
                      return (
                        <div key={origem} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{origem}</div>
                            <div className="text-xs text-muted-foreground">
                              {leadsOrigem.length} leads
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{fechados} fechados</div>
                            <div className="text-xs text-muted-foreground">
                              {leadsOrigem.length ? Math.round((fechados / leadsOrigem.length) * 100) : 0}% conversão
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}