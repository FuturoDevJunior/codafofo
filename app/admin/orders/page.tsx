import {
  Badge,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Package,
  Phone,
  Truck,
  User,
} from 'lucide-react';
import { redirect } from 'next/navigation';

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

// Interface Order removida pois não está sendo utilizada

function OrderStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800' },
    processing: { label: 'Processando', className: 'bg-purple-100 text-purple-800' },
    shipped: { label: 'Enviado', className: 'bg-orange-100 text-orange-800' },
    delivered: { label: 'Entregue', className: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
    paid: { label: 'Pago', className: 'bg-green-100 text-green-800' },
    failed: { label: 'Falhado', className: 'bg-red-100 text-red-800' },
    refunded: { label: 'Reembolsado', className: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient();

  // Verificar autenticação
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Buscar pedidos com paginação
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  // Calcular estatísticas
  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
    shipped: orders?.filter(o => o.status === 'shipped').length || 0,
    delivered: orders?.filter(o => o.status === 'delivered').length || 0,
    revenue: orders?.reduce((sum, o) => sum + (Number(o.total) || 0), 0) || 0,
    avgOrder: orders?.length
      ? orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0) / orders.length
      : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 border-b-2 border-vitale-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vitale-primary">
                <Package className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-vitale-primary">Gestão de Pedidos</h1>
                <p className="text-neutral-600">Gerencie todos os pedidos do sistema</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="text-white bg-vitale-primary hover:bg-vitale-secondary"
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
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-vitale-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground">{stats.pending} pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-green-600 text-2xl font-bold">
                {formatCurrency(stats.revenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Ticket médio: {formatCurrency(stats.avgOrder)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-600 text-2xl font-bold">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">{stats.shipped} enviados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entregues</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-green-600 text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.delivered / stats.total) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Pedidos</TabsTrigger>
            <TabsTrigger value="filters">Filtros Avançados</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <Input id="search" placeholder="Nome, email, telefone..." className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="processing">Processando</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payment">Pagamento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Status pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="failed">Falhado</SelectItem>
                        <SelectItem value="refunded">Reembolsado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="period">Período</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Hoje</SelectItem>
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="month">Este mês</SelectItem>
                        <SelectItem value="quarter">Este trimestre</SelectItem>
                        <SelectItem value="year">Este ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de pedidos */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos ({orders?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders?.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-xs">#{order.id.slice(-6)}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {order.customer_email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-xs">{order.customer_phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell>
                            <PaymentStatusBadge status={order.payment_status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              <span className="text-xs capitalize">
                                {order.payment_method?.replace('_', ' ') || 'N/A'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(order.total)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">
                                {new Date(order.created_at).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <User className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Package className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={9} className="py-8 text-center">
                            <div className="text-muted-foreground">
                              <Package className="mx-auto mb-4 h-12 w-12 opacity-50" />
                              <p>Nenhum pedido encontrado</p>
                              <p className="text-xs">Os pedidos aparecerão aqui quando criados</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filters">
            <Card>
              <CardHeader>
                <CardTitle>Filtros Avançados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Período</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Data inicial</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Data final</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Valores</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Valor mínimo</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label>Valor máximo</Label>
                        <Input type="number" placeholder="1000.00" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas por Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries({
                      delivered: stats.delivered,
                      shipped: stats.shipped,
                      confirmed: stats.confirmed,
                      pending: stats.pending,
                    }).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <OrderStatusBadge status={status} />
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Receita Total:</span>
                      <span className="text-green-600 font-semibold">
                        {formatCurrency(stats.revenue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ticket Médio:</span>
                      <span className="font-semibold">{formatCurrency(stats.avgOrder)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de Pedidos:</span>
                      <span className="font-semibold">{stats.total}</span>
                    </div>
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
