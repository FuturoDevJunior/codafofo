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
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from 'lucide-react';
import Image from 'next/image';

import ImageUploader from '@/components/admin/ImageUploader';
import AdminForm from '@/components/AdminForm';
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

interface AdminDashboardProps {
  products: any[];
  suppliers: any[];
  user: any;
}

export default function AdminDashboard({
  products: initialProducts,
  suppliers,
  user,
}: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts);
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
      p.price_pix || p.price || '',
      p.price_card || p.price || '',
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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitale-neutral via-neutral-50 to-vitale-light">
      {/* Header Administrativo */}
      <header className="bg-white sticky top-0 z-30 border-b-2 border-vitale-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vitale-primary">
                <Settings className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight text-vitale-primary md:text-3xl">
                  Dashboard Administrativo
                </h1>
                <p className="text-sm text-neutral-600 md:text-base">
                  Bem-vindo, <span className="font-semibold">{user.email}</span> • Vytalle Estética
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex min-w-[120px] items-center gap-2 rounded-xl px-4 py-2">
                    <Plus className="h-5 w-5" />
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
                  <AdminForm />
                </DialogContent>
              </Dialog>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 flex min-w-[100px] items-center gap-2 rounded-xl px-4 py-2"
                aria-label="Sair do painel administrativo"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-responsive-lg container mx-auto px-2 py-8 sm:px-4 md:px-6">
        {/* Estatísticas */}
        <div
          className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6"
          data-testid="admin-stats"
        >
          <section
            className="bg-white rounded-xl border-2 border-vitale-primary/20 p-4 shadow-lg md:p-6"
            aria-label="Total de produtos"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vitale-primary/10">
                <Package className="h-5 w-5 text-vitale-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-vitale-primary">Total</h3>
                <p className="text-2xl font-bold text-vitale-primary">{stats.totalProducts}</p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-green-200 rounded-xl border-2 p-4 shadow-lg md:p-6"
            aria-label="Produtos ativos"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 flex h-10 w-10 items-center justify-center rounded-lg">
                <BarChart3 className="text-green-600 h-5 w-5" />
              </div>
              <div>
                <h3 className="text-green-700 text-sm font-semibold">Ativos</h3>
                <p className="text-green-700 text-2xl font-bold">{stats.activeProducts}</p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-blue-200 rounded-xl border-2 p-4 shadow-lg md:p-6"
            aria-label="Categorias"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 flex h-10 w-10 items-center justify-center rounded-lg">
                <Filter className="text-blue-600 h-5 w-5" />
              </div>
              <div>
                <h3 className="text-blue-700 text-sm font-semibold">Categorias</h3>
                <p className="text-blue-700 text-2xl font-bold">{stats.categories}</p>
              </div>
            </div>
          </section>
          <section
            className="bg-white border-purple-200 rounded-xl border-2 p-4 shadow-lg md:p-6"
            aria-label="Fornecedores"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 flex h-10 w-10 items-center justify-center rounded-lg">
                <Users className="text-purple-600 h-5 w-5" />
              </div>
              <div>
                <h3 className="text-purple-700 text-sm font-semibold">Fornecedores</h3>
                <p className="text-purple-700 text-2xl font-bold">{stats.suppliers}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Filtros e Ações */}
        <div className="bg-white mb-8 rounded-xl border-2 border-vitale-primary/20 p-4 shadow-lg md:p-6">
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end">
            {/* Busca */}
            <div className="w-full min-w-[180px] flex-1">
              <label
                className="mb-2 block text-sm font-bold text-vitale-primary"
                htmlFor="admin-search"
              >
                Buscar Produtos
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-vitale-primary" />
                <Input
                  id="admin-search"
                  placeholder="Nome, categoria, descrição..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="rounded-xl border-2 border-vitale-primary/30 py-3 pl-12 text-base focus:border-vitale-primary"
                  aria-label="Buscar produtos por nome, categoria ou descrição"
                />
              </div>
            </div>
            {/* Filtro Categoria */}
            <div className="w-full min-w-[140px] lg:w-64">
              <label
                className="mb-2 block text-sm font-bold text-vitale-primary"
                htmlFor="admin-category"
              >
                Categoria
              </label>
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
            <div className="w-full min-w-[140px] lg:w-64">
              <label
                className="mb-2 block text-sm font-bold text-vitale-primary"
                htmlFor="admin-supplier"
              >
                Fornecedor
              </label>
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
            {/* Exportar */}
            <Button
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 lg:w-auto"
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
        <div className="bg-white overflow-x-auto rounded-xl border-2 border-vitale-primary/20 shadow-lg">
          <div className="min-w-[600px] border-b border-vitale-primary/20 p-4 md:p-6">
            <h2 className="text-xl font-bold text-vitale-primary md:text-2xl">
              Gerenciar Produtos ({filteredProducts.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-vitale-primary/5">
                  <TableHead className="min-w-[60px] font-bold text-vitale-primary">
                    Imagem
                  </TableHead>
                  <TableHead className="min-w-[200px] font-bold text-vitale-primary">
                    Nome
                  </TableHead>
                  <TableHead className="min-w-[120px] font-bold text-vitale-primary">
                    Categoria
                  </TableHead>
                  <TableHead className="min-w-[100px] font-bold text-vitale-primary">
                    Preço PIX
                  </TableHead>
                  <TableHead className="min-w-[100px] font-bold text-vitale-primary">
                    Preço Cartão
                  </TableHead>
                  <TableHead className="min-w-[80px] font-bold text-vitale-primary">
                    Status
                  </TableHead>
                  <TableHead className="min-w-[100px] font-bold text-vitale-primary">
                    Imagens
                  </TableHead>
                  <TableHead className="min-w-[200px] font-bold text-vitale-primary">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-testid="products-tbody">
                {filteredProducts.map(product => (
                  <TableRow key={product.id} className="hover:bg-vitale-primary/5">
                    {/* Imagem Principal */}
                    <TableCell>
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-vitale-primary/10">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-vitale-primary" />
                        )}
                      </div>
                    </TableCell>

                    {/* Nome */}
                    <TableCell className="font-medium">
                      <div className="max-w-[200px]">
                        <p className="truncate font-bold text-vitale-primary" title={product.name}>
                          {product.name}
                        </p>
                        {product.description && (
                          <p
                            className="truncate text-sm text-neutral-600"
                            title={product.description}
                          >
                            {product.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Categoria */}
                    <TableCell>
                      <span className="rounded-full bg-vitale-primary/10 px-2 py-1 text-xs font-semibold text-vitale-primary">
                        {product.category || 'Sem categoria'}
                      </span>
                    </TableCell>

                    {/* Preços */}
                    <TableCell className="text-green-700 font-semibold">
                      {formatCurrency(product.price_pix || product.price || 0)}
                    </TableCell>
                    <TableCell className="text-blue-700 font-semibold">
                      {formatCurrency(product.price_card || product.price || 0)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
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
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-vitale-primary" />
                        <span className="text-sm font-medium text-vitale-primary">
                          {product.images?.length || 0}
                        </span>
                      </div>
                    </TableCell>

                    {/* Ações */}
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {/* Editar Produto */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="text-white min-w-[40px] bg-vitale-primary hover:bg-vitale-secondary"
                              title="Editar produto"
                            >
                              <Edit className="h-4 w-4" />
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
                                <AdminForm product={product} />
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
                              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[40px]"
                              title="Gerenciar imagens"
                            >
                              <ImageIcon className="h-4 w-4" />
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
                          className="min-w-[40px] border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10"
                          onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                          title="Ver produto no site"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Excluir */}
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white min-w-[40px]"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          title="Excluir produto"
                        >
                          <Trash2 className="h-4 w-4" />
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
