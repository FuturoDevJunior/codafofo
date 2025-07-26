'use client';

import { useState } from 'react';

import {
  BarChart3,
  Download,
  Edit,
  Eye,
  Filter,
  Image as ImageIcon,
  LogOut,
  Package,
  Palette,
  Plus,
  Settings,
  Trash2,
  Users,
} from 'lucide-react';
import Image from 'next/image';

import ImageUploader from '@/components/admin/ImageUploader';
import AdminFormComplete from '@/components/AdminFormComplete';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import type { Product, User } from '@/types';

interface DashboardProps {
  products?: Product[];
  suppliers?: any[]; // TODO: Criar interface Supplier
  user: User;
}

export default function AdminDashboard({
  products: initialProducts = [],
  suppliers = [],
  user,
}: DashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    const matchesSupplier = selectedSupplier ? product.supplier_id === selectedSupplier : true;

    return matchesSearch && matchesCategory && matchesSupplier;
  });

  // Obter categorias únicas
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Estatísticas
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active !== false).length,
    categories: categories.length,
    suppliers: suppliers.length,
  };

  const handleImageUpdate = (productId: string, newImages: string[]) => {
    setProducts(prev =>
      prev.map(product => (product.id === productId ? { ...product, images: newImages } : product))
    );
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (
      !confirm(`Tem certeza que deseja excluir "${productName}"? Esta ação não pode ser desfeita.`)
    ) {
      return;
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);

      if (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
        return;
      }

      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('Produto excluído com sucesso!');
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro inesperado ao excluir produto');
    }
  };

  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      await supabase.auth.signOut();
      window.location.href = '/admin/login';
    }
  };

  const exportToCSV = () => {
    if (typeof document !== 'undefined') {
      const headers = [
        'Nome',
        'Categoria',
        'Preço PIX',
        'Preço Cartão',
        'Status',
        'Imagens',
        'Descrição',
      ];
      const rows = filteredProducts.map(p => [
        p.name,
        p.category || '',
        p.price_pix || '',
        p.price_card || '',
        p.active !== false ? 'Ativo' : 'Inativo',
        (p.images?.length || 0) + ' imagem(ns)',
        p.description || '',
      ]);

      const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vytalle-produtos-${new Date().toISOString().split('T')[0]}.csv`;

      // Verificar se document.body existe e se link é um Node válido
      if (document.body && link instanceof Node) {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Administrativo */}
      <header className="dashboard-header">
        <div className="container-responsive px-spacing-md py-spacing-md">
          <div className="dashboard-header-content">
            <div className="dashboard-brand">
              <div className="icon-container bg-primary">
                <Settings className="text-white icon-lg" />
              </div>
              <div>
                <h1 className="dashboard-title">Dashboard Administrativo</h1>
                <p className="dashboard-subtitle">
                  Bem-vindo, <span className="font-semibold">{user.email}</span> • Vytalle Estética
                  & Viscosuplementação
                </p>
              </div>
            </div>
            <div className="dashboard-actions">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-success btn-lg">
                    <Plus className="icon-md" />
                    <span className="hidden sm:inline">Novo Produto</span>
                    <span className="sm:hidden">Novo</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-vitale-primary">
                      Adicionar Novo Produto
                    </DialogTitle>
                    <DialogDescription>Preencha todas as informações do produto</DialogDescription>
                  </DialogHeader>
                  <AdminFormComplete onSuccess={() => window.location.reload()} />
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => (window.location.href = '/admin/customization')}
                className="btn-outline btn-lg"
                aria-label="Personalizar site"
              >
                <Palette className="icon-md" />
                <span className="hidden sm:inline">Personalizar</span>
                <span className="sm:hidden">Personalizar</span>
              </Button>

              <Button
                onClick={handleLogout}
                className="btn-danger btn-lg"
                aria-label="Sair do painel administrativo"
              >
                <LogOut className="icon-md" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Estatísticas */}
        <div className="stats-grid" data-testid="admin-stats">
          <section className="stats-card" aria-label="Total de produtos">
            <div className="stats-content">
              <div className="stats-icon bg-primary">
                <Package className="icon-md text-white" />
              </div>
              <div>
                <h3 className="stats-label">Total</h3>
                <p className="stats-value text-primary">{stats.totalProducts}</p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-green-200 rounded-xl border-2 p-3 shadow-lg sm:p-4 lg:p-6"
            aria-label="Produtos ativos"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-green-100 flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                <BarChart3 className="text-green-600 h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="text-green-700 text-xs font-semibold sm:text-sm">Ativos</h3>
                <p className="text-green-700 text-lg font-bold sm:text-xl lg:text-2xl">
                  {stats.activeProducts}
                </p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-blue-200 rounded-xl border-2 p-3 shadow-lg sm:p-4 lg:p-6"
            aria-label="Categorias"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-100 flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                <Filter className="text-blue-600 h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="text-blue-700 text-xs font-semibold sm:text-sm">Categorias</h3>
                <p className="text-blue-700 text-lg font-bold sm:text-xl lg:text-2xl">
                  {stats.categories}
                </p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-purple-200 rounded-xl border-2 p-3 shadow-lg sm:p-4 lg:p-6"
            aria-label="Fornecedores"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-purple-100 flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                <Users className="text-purple-600 h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="text-purple-700 text-xs font-semibold sm:text-sm">Fornecedores</h3>
                <p className="text-purple-700 text-lg font-bold sm:text-xl lg:text-2xl">
                  {stats.suppliers}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Filtros e Ações */}
        <div className="filters-card">
          <div className="filters-grid">
            {/* Busca */}
            <div className="search-container">
              <Label htmlFor="admin-search" className="form-label mb-spacing-xs">
                Buscar Produtos
              </Label>
              <Input
                id="admin-search"
                placeholder="Nome, categoria, descrição..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input-primary"
                aria-label="Buscar produtos por nome, categoria ou descrição"
              />
            </div>
            {/* Filtro Categoria */}
            <div className="sm:col-span-1">
              <Label htmlFor="admin-category" variant="default" size="sm" className="mb-2">
                Categoria
              </Label>
              <select
                id="admin-category"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border-2 border-vitale-primary/30 p-3 text-base focus:border-vitale-primary focus:outline-none focus:ring-2 focus:ring-vitale-primary/20"
                aria-label="Filtrar por categoria"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Filtro Fornecedor */}
            <div className="sm:col-span-1">
              <Label htmlFor="admin-supplier" variant="default" size="sm" className="mb-2">
                Fornecedor
              </Label>
              <select
                id="admin-supplier"
                value={selectedSupplier}
                onChange={e => setSelectedSupplier(e.target.value)}
                className="w-full rounded-xl border-2 border-vitale-primary/30 p-3 text-base focus:border-vitale-primary focus:outline-none focus:ring-2 focus:ring-vitale-primary/20"
                aria-label="Filtrar por fornecedor"
              >
                <option value="">Todos os fornecedores</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Exportar */}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 sm:w-auto"
              aria-label="Exportar produtos para CSV"
            >
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Exportar CSV</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </div>
          {/* Resultados */}
          <div className="mt-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm text-neutral-600" data-testid="products-count">
              <strong>{filteredProducts.length}</strong> produto(s) encontrado(s)
            </p>
            {(searchTerm || selectedCategory || selectedSupplier) && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedSupplier('');
                }}
                variant="outline"
                size="sm"
                className="text-neutral-600 hover:text-vitale-primary"
                aria-label="Limpar filtros"
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Gerenciar Produtos ({filteredProducts.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[800px] lg:min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-vitale-primary/5">
                  <TableHead className="min-w-[50px] text-xs font-bold text-vitale-primary lg:min-w-[60px] lg:text-sm">
                    Imagem
                  </TableHead>
                  <TableHead className="min-w-[150px] text-xs font-bold text-vitale-primary lg:min-w-[200px] lg:text-sm">
                    Nome
                  </TableHead>
                  <TableHead className="min-w-[100px] text-xs font-bold text-vitale-primary lg:min-w-[120px] lg:text-sm">
                    Categoria
                  </TableHead>
                  <TableHead className="min-w-[80px] text-xs font-bold text-vitale-primary lg:min-w-[100px] lg:text-sm">
                    Preço PIX
                  </TableHead>
                  <TableHead className="min-w-[80px] text-xs font-bold text-vitale-primary lg:min-w-[100px] lg:text-sm">
                    Preço Cartão
                  </TableHead>
                  <TableHead className="min-w-[60px] text-xs font-bold text-vitale-primary lg:min-w-[80px] lg:text-sm">
                    Status
                  </TableHead>
                  <TableHead className="min-w-[80px] text-xs font-bold text-vitale-primary lg:min-w-[100px] lg:text-sm">
                    Imagens
                  </TableHead>
                  <TableHead className="min-w-[150px] text-xs font-bold text-vitale-primary lg:min-w-[200px] lg:text-sm">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-testid="products-tbody">
                {filteredProducts.map(product => (
                  <TableRow key={product.id} className="hover:bg-vitale-primary/5">
                    {/* Imagem Principal */}
                    <TableCell>
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-vitale-primary/10 lg:h-12 lg:w-12">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-4 w-4 text-vitale-primary lg:h-6 lg:w-6" />
                        )}
                      </div>
                    </TableCell>

                    {/* Nome */}
                    <TableCell className="font-medium">
                      <div className="max-w-[150px] lg:max-w-[200px]">
                        <p
                          className="truncate text-xs font-bold text-vitale-primary lg:text-sm"
                          title={product.name}
                        >
                          {product.name}
                        </p>
                        {product.description && (
                          <p
                            className="truncate text-xs text-neutral-600 lg:text-sm"
                            title={product.description}
                          >
                            {product.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Categoria */}
                    <TableCell>
                      <span className="rounded-full bg-vitale-primary/10 px-1 py-0.5 text-xs font-semibold text-vitale-primary lg:px-2 lg:py-1">
                        {product.category || 'Sem categoria'}
                      </span>
                    </TableCell>

                    {/* Preços */}
                    <TableCell className="text-green-700 text-xs font-semibold lg:text-sm">
                      {formatCurrency(product.price_pix || 0)}
                    </TableCell>
                    <TableCell className="text-blue-700 text-xs font-semibold lg:text-sm">
                      {formatCurrency(product.price_card || 0)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`rounded-full px-1 py-0.5 text-xs font-semibold lg:px-2 lg:py-1 ${
                          product.active !== false
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.active !== false ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>

                    {/* Contador de Imagens */}
                    <TableCell>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <ImageIcon className="h-3 w-3 text-vitale-primary lg:h-4 lg:w-4" />
                        <span className="text-xs font-medium text-vitale-primary lg:text-sm">
                          {product.images?.length || 0}
                        </span>
                      </div>
                    </TableCell>

                    {/* Ações */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1 lg:gap-2">
                        {/* Editar Produto */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="text-white h-8 min-w-[32px] bg-vitale-primary hover:bg-vitale-secondary lg:h-9 lg:min-w-[40px]"
                              title="Editar produto"
                            >
                              <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-vitale-primary">
                                Editar: {product.name}
                              </DialogTitle>
                              <DialogDescription>
                                Modifique as informações e imagens do produto
                              </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="details" className="mt-6">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="details">Detalhes</TabsTrigger>
                                <TabsTrigger value="images">
                                  Imagens ({product.images?.length || 0})
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="details" className="mt-6">
                                <AdminFormComplete
                                  product={product as any}
                                  onSuccess={() => window.location.reload()}
                                />
                              </TabsContent>

                              <TabsContent value="images" className="mt-6">
                                <ImageUploader
                                  productId={product.id}
                                  productName={product.name}
                                  currentImages={product.images || []}
                                  onImagesUpdate={newImages =>
                                    handleImageUpdate(product.id, newImages)
                                  }
                                  maxImages={5}
                                  data-testid="mock-upload-button"
                                />
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>

                        {/* Gerenciar Imagens */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white h-8 min-w-[32px] lg:h-9 lg:min-w-[40px]"
                              title="Gerenciar imagens"
                            >
                              <ImageIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-vitale-primary">
                                Imagens: {product.name}
                              </DialogTitle>
                              <DialogDescription>
                                Gerencie as imagens do produto ({product.images?.length || 0}/5)
                              </DialogDescription>
                            </DialogHeader>

                            <ImageUploader
                              productId={product.id}
                              productName={product.name}
                              currentImages={product.images || []}
                              onImagesUpdate={newImages => handleImageUpdate(product.id, newImages)}
                              maxImages={5}
                            />
                          </DialogContent>
                        </Dialog>

                        {/* Ver Produto */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 min-w-[32px] border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10 lg:h-9 lg:min-w-[40px]"
                          onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                          title="Ver produto no site"
                        >
                          <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>

                        {/* Excluir */}
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white h-8 min-w-[32px] lg:h-9 lg:min-w-[40px]"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          title="Excluir produto"
                        >
                          <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Estado vazio */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vitale-primary/20">
                <Package className="h-8 w-8 text-vitale-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-vitale-primary">
                Nenhum produto encontrado
              </h3>
              <p className="mb-4 text-neutral-600">
                {searchTerm || selectedCategory || selectedSupplier
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando seu primeiro produto'}
              </p>
              {(searchTerm || selectedCategory || selectedSupplier) && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedSupplier('');
                  }}
                  className="text-white bg-vitale-primary hover:bg-vitale-secondary"
                  aria-label="Limpar filtros"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
