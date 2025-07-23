'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Settings, 
  Package, 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Edit, 
  Trash2, 
  Plus, 
  Download, 
  Upload,
  LogOut,
  Eye,
  Search,
  Filter
} from 'lucide-react';

import AdminForm from '@/components/AdminForm';
import ImageUploader from '@/components/admin/ImageUploader';
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

export default function AdminDashboard({ products: initialProducts, suppliers, user }: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm 
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory 
      : true;
    
    const matchesSupplier = selectedSupplier 
      ? product.supplier_id === selectedSupplier 
      : true;

    return matchesSearch && matchesCategory && matchesSupplier;
  });

  // Obter categorias únicas
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Estatísticas
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active !== false).length,
    categories: categories.length,
    suppliers: suppliers.length
  };

  const handleImageUpdate = (productId: string, newImages: string[]) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, images: newImages }
          : product
      )
    );
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${productName}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

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
    const headers = ['Nome', 'Categoria', 'Preço PIX', 'Preço Cartão', 'Status', 'Imagens', 'Descrição'];
    const rows = filteredProducts.map(p => [
      p.name,
      p.category || '',
      p.price_pix || p.price || '',
      p.price_card || p.price || '',
      p.active !== false ? 'Ativo' : 'Inativo',
      (p.images?.length || 0) + ' imagem(ns)',
      p.description || ''
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
    <div className="min-h-screen">
      {/* Header Administrativo */}
      <header className="bg-white border-b-2 border-vitale-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-vitale-primary rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-vitale-primary">
                  Dashboard Administrativo
                </h1>
                <p className="text-neutral-600">
                  Bem-vindo, {user.email} • Vytalle Estética
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-vitale-primary">Adicionar Novo Produto</DialogTitle>
                    <DialogDescription>
                      Preencha todas as informações do produto
                    </DialogDescription>
                  </DialogHeader>
                  <AdminForm />
                </DialogContent>
              </Dialog>
              
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-vitale-primary/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-vitale-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-vitale-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-vitale-primary">Total</h3>
                <p className="text-2xl font-bold text-vitale-primary">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-green-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-green-700">Ativos</h3>
                <p className="text-2xl font-bold text-green-700">{stats.activeProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-700">Categorias</h3>
                <p className="text-2xl font-bold text-blue-700">{stats.categories}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-purple-700">Fornecedores</h3>
                <p className="text-2xl font-bold text-purple-700">{stats.suppliers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Ações */}
        <div className="bg-white rounded-xl border-2 border-vitale-primary/20 shadow-lg p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Busca */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-vitale-primary mb-2">
                Buscar Produtos
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vitale-primary w-5 h-5" />
                <Input 
                  placeholder="Nome, categoria, descrição..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-12 py-3 text-base border-2 border-vitale-primary/30 focus:border-vitale-primary rounded-xl"
                />
              </div>
            </div>

            {/* Filtro Categoria */}
            <div className="w-full lg:w-64">
              <label className="block text-sm font-bold text-vitale-primary mb-2">
                Categoria
              </label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 text-base border-2 border-vitale-primary/30 focus:border-vitale-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-vitale-primary/20"
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
            <div className="w-full lg:w-64">
              <label className="block text-sm font-bold text-vitale-primary mb-2">
                Fornecedor
              </label>
              <select 
                value={selectedSupplier} 
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="w-full p-3 text-base border-2 border-vitale-primary/30 focus:border-vitale-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-vitale-primary/20"
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
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </Button>
          </div>

          {/* Resultados */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-neutral-600">
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
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-xl border-2 border-vitale-primary/20 shadow-lg overflow-hidden">
          <div className="p-4 md:p-6 border-b border-vitale-primary/20">
            <h2 className="text-xl md:text-2xl font-bold text-vitale-primary">
              Gerenciar Produtos ({filteredProducts.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-vitale-primary/5">
                  <TableHead className="font-bold text-vitale-primary min-w-[60px]">Imagem</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[200px]">Nome</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[120px]">Categoria</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[100px]">Preço PIX</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[100px]">Preço Cartão</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[80px]">Status</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[100px]">Imagens</TableHead>
                  <TableHead className="font-bold text-vitale-primary min-w-[200px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-vitale-primary/5">
                    {/* Imagem Principal */}
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-vitale-primary/10 flex items-center justify-center">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-vitale-primary" />
                        )}
                      </div>
                    </TableCell>

                    {/* Nome */}
                    <TableCell className="font-medium">
                      <div className="max-w-[200px]">
                        <p className="font-bold text-vitale-primary truncate" title={product.name}>
                          {product.name}
                        </p>
                        {product.description && (
                          <p className="text-sm text-neutral-600 truncate" title={product.description}>
                            {product.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Categoria */}
                    <TableCell>
                      <span className="bg-vitale-primary/10 text-vitale-primary px-2 py-1 rounded-full text-xs font-semibold">
                        {product.category || 'Sem categoria'}
                      </span>
                    </TableCell>

                    {/* Preços */}
                    <TableCell className="font-semibold text-green-700">
                      {formatCurrency(product.price_pix || product.price || 0)}
                    </TableCell>
                    <TableCell className="font-semibold text-blue-700">
                      {formatCurrency(product.price_card || product.price || 0)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.active !== false 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.active !== false ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>

                    {/* Contador de Imagens */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-vitale-primary" />
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
                              className="bg-vitale-primary hover:bg-vitale-secondary text-white min-w-[40px]"
                              title="Editar produto"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                                  onImagesUpdate={(newImages) => handleImageUpdate(product.id, newImages)}
                                  maxImages={5}
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
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
                              onImagesUpdate={(newImages) => handleImageUpdate(product.id, newImages)}
                              maxImages={5}
                            />
                          </DialogContent>
                        </Dialog>

                        {/* Ver Produto */}
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-vitale-primary/30 text-vitale-primary hover:bg-vitale-primary/10 min-w-[40px]"
                          onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                          title="Ver produto no site"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {/* Excluir */}
                        <Button 
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white min-w-[40px]"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          title="Excluir produto"
                        >
                          <Trash2 className="w-4 h-4" />
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
              <div className="w-16 h-16 bg-vitale-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-vitale-primary" />
              </div>
              <h3 className="text-xl font-bold text-vitale-primary mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-neutral-600 mb-4">
                {searchTerm || selectedCategory || selectedSupplier 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando seu primeiro produto'
                }
              </p>
              {(searchTerm || selectedCategory || selectedSupplier) && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedSupplier('');
                  }}
                  className="bg-vitale-primary hover:bg-vitale-secondary text-white"
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