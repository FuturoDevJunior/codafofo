# 🛠️ Guia de Desenvolvimento - Vytalle Estética

> **Guia completo para desenvolvedores: padrões, boas práticas e exemplos
> práticos**

## 📋 Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Componentes](#estrutura-de-componentes)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Testes](#testes)
- [Performance](#performance)
- [Segurança](#segurança)
- [Debug](#debug)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Configuração do Ambiente

### Pré-requisitos

```bash
# Verificar versões
node --version  # >= 18.0.0
npm --version   # >= 9.0.0
git --version   # >= 2.30.0

# Instalar Supabase CLI
npm install -g supabase
```

### Setup Inicial

```bash
# 1. Clone e instale
git clone https://github.com/FuturoDevJunior/codafofo.git
cd codafofo
npm install

# 2. Configure ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 3. Inicialize banco
npm run db:init

# 4. Inicie desenvolvimento
npm run dev
```

### IDEs Recomendadas

#### VS Code (Recomendado)

```json
{
  "extensions": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ],
  "settings": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "typescript.preferences.importModuleSpecifier": "relative"
  }
}
```

#### WebStorm

- Ativar ESLint e Prettier
- Configurar Tailwind CSS IntelliSense
- Habilitar TypeScript strict mode

---

## 📝 Padrões de Código

### 1. Estrutura de Arquivos

```
components/
├── ui/                    # Componentes base reutilizáveis
│   ├── button.tsx
│   ├── input.tsx
│   └── index.ts          # Exportações centralizadas
├── products/             # Componentes específicos de domínio
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductDetail.tsx
└── admin/                # Componentes administrativos
    ├── AdminDashboard.tsx
    └── AdminForm.tsx
```

### 2. Nomenclatura

```typescript
// ✅ Correto
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

// ❌ Incorreto
interface productCardProps {
  Product: Product;
  addToCart: (Product: Product) => void;
  class?: string;
}

// ✅ Componentes com PascalCase
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ...
}

// ✅ Hooks com camelCase e prefixo 'use'
export function useProductCart() {
  // ...
}

// ✅ Utilitários com camelCase
export function formatCurrency(value: number): string {
  // ...
}
```

### 3. Imports Organizados

```typescript
// 1. Imports do React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Imports de bibliotecas externas
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

// 3. Imports internos (absolutos)
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';

// 4. Imports relativos
import { ProductCard } from './ProductCard';
import { styles } from './styles.module.css';
```

### 4. TypeScript Strict

```typescript
// ✅ Sempre definir tipos explícitos
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ✅ Usar generics quando apropriado
function useApi<T>(url: string): [T | null, boolean, Error | null] {
  // ...
}

// ✅ Evitar any, usar unknown quando necessário
function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Invalid data type');
}

// ✅ Usar const assertions
const PRODUCT_CATEGORIES = ['toxina', 'preenchedor', 'bioestimulador'] as const;
type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
```

---

## 🧩 Estrutura de Componentes

### 1. Componente Base

```typescript
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onCompare?: (product: Product) => void;
  className?: string;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onAddToCart, onCompare, className }, ref) => {
    const handleAddToCart = () => {
      onAddToCart?.(product);
    };

    const handleCompare = () => {
      onCompare?.(product);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md',
          className
        )}
      >
        <div className="aspect-square overflow-hidden rounded-md">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              R$ {product.price_pix.toFixed(2)}
            </span>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCompare}
              >
                Comparar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
```

### 2. Hook Customizado

```typescript
import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface UseCartReturn {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Persistir no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (product: Product) => {
      setItems(prev => {
        const exists = prev.find(item => item.id === product.id);
        if (exists) {
          toast({
            title: 'Produto já no carrinho',
            description: 'Este produto já foi adicionado ao carrinho.',
            variant: 'destructive',
          });
          return prev;
        }

        toast({
          title: 'Produto adicionado',
          description: `${product.name} foi adicionado ao carrinho.`,
        });

        return [...prev, product];
      });
    },
    [toast]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems(prev => prev.filter(item => item.id !== productId));
      toast({
        title: 'Produto removido',
        description: 'Produto foi removido do carrinho.',
      });
    },
    [toast]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    toast({
      title: 'Carrinho limpo',
      description: 'Todos os produtos foram removidos.',
    });
  }, [toast]);

  const total = items.reduce((sum, item) => sum + item.price_pix, 0);
  const itemCount = items.length;

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    total,
    itemCount,
  };
}
```

### 3. Service Layer

```typescript
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types/product';

class ProductService {
  private supabase = createClient();

  async getProducts(category?: string): Promise<Product[]> {
    try {
      let query = this.supabase.from('products').select('*').eq('active', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Erro no ProductService.getProducts:', error);
      throw error;
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Produto não encontrado
        }
        throw new Error(`Erro ao buscar produto: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Erro no ProductService.getProductBySlug:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) {
        throw new Error(`Erro na busca: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Erro no ProductService.searchProducts:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
```

---

## 🔄 Gerenciamento de Estado

### 1. Zustand Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set(state => {
          const exists = state.items.find(item => item.id === product.id);
          if (exists) {
            return state; // Não adiciona duplicatas
          }
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      get total() {
        return get().items.reduce((sum, item) => sum + item.price_pix, 0);
      },

      get itemCount() {
        return get().items.length;
      },
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ items: state.items }),
    }
  )
);
```

### 2. Context API (Para casos específicos)

```typescript
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
```

---

## 🧪 Testes

### 1. Teste de Componente

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProductCard } from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Botox 50U',
  price_pix: 530,
  price_card: 580,
  price_prazo: 580,
  images: ['/images/botox.jpg'],
  category: 'Toxina Botulínica',
  active: true,
  slug: 'botox-50u',
};

describe('ProductCard', () => {
  it('deve renderizar informações do produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Botox 50U')).toBeInTheDocument();
    expect(screen.getByText('R$ 530,00')).toBeInTheDocument();
    expect(screen.getByText('Toxina Botulínica')).toBeInTheDocument();
  });

  it('deve chamar onAddToCart quando botão for clicado', async () => {
    const onAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);

    const addButton = screen.getByRole('button', { name: /adicionar/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
    });
  });

  it('deve mostrar imagem do produto', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Botox 50U');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/botox.jpg');
  });

  it('deve aplicar classes CSS customizadas', () => {
    const customClass = 'custom-product-card';
    render(<ProductCard product={mockProduct} className={customClass} />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass(customClass);
  });
});
```

### 2. Teste de Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

const mockProduct = {
  id: '1',
  name: 'Botox 50U',
  price_pix: 530,
  images: ['/image.jpg'],
  category: 'Toxina',
  slug: 'botox-50u',
};

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve inicializar com carrinho vazio', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('deve adicionar produto ao carrinho', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockProduct);
    expect(result.current.total).toBe(530);
    expect(result.current.itemCount).toBe(1);
  });

  it('deve remover produto do carrinho', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    act(() => {
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('deve persistir carrinho no localStorage', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    const saved = localStorage.getItem('cart');
    expect(saved).toBe(JSON.stringify([mockProduct]));
  });
});
```

### 3. Teste de Integração

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import { productService } from '@/lib/productService';

// Mock do service
vi.mock('@/lib/productService');
const mockProductService = vi.mocked(productService);

describe('ProductList Integration', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Botox 50U',
      price_pix: 530,
      images: ['/image1.jpg'],
      category: 'Toxina',
      slug: 'botox-50u',
    },
    {
      id: '2',
      name: 'Ellansé M',
      price_pix: 1200,
      images: ['/image2.jpg'],
      category: 'Preenchedor',
      slug: 'ellanse-m',
    },
  ];

  beforeEach(() => {
    mockProductService.getProducts.mockResolvedValue(mockProducts);
  });

  it('deve carregar e exibir produtos', async () => {
    render(<ProductList />);

    // Mostra loading inicial
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    // Aguarda carregamento
    await waitFor(() => {
      expect(screen.getByText('Botox 50U')).toBeInTheDocument();
      expect(screen.getByText('Ellansé M')).toBeInTheDocument();
    });

    // Verifica se service foi chamado
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('deve filtrar produtos por categoria', async () => {
    render(<ProductList category="Toxina" />);

    await waitFor(() => {
      expect(mockProductService.getProducts).toHaveBeenCalledWith('Toxina');
    });
  });
});
```

---

## ⚡ Performance

### 1. Otimizações de React

```typescript
// ✅ Memoização de componentes
import { memo } from 'react';

export const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <ProductImage src={product.images[0]} alt={product.name} />
      <ProductInfo product={product} />
      <AddToCartButton onClick={() => onAddToCart(product)} />
    </div>
  );
});

// ✅ Memoização de callbacks
import { useCallback } from 'react';

export function ProductList({ products, onAddToCart }) {
  const handleAddToCart = useCallback((product) => {
    onAddToCart(product);
  }, [onAddToCart]);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// ✅ Lazy loading de componentes
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

const AdminDashboard = dynamic(() => import('./AdminDashboard'), {
  loading: () => <DashboardSkeleton />,
  ssr: false
});
```

### 2. Otimizações de Imagens

```typescript
// ✅ Componente de imagem otimizada
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
    />
  );
}
```

### 3. Bundle Optimization

```typescript
// ✅ Code splitting por rota
// app/admin/page.tsx
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), {
  loading: () => <div>Carregando...</div>,
  ssr: false
});

// ✅ Import condicional
const loadChart = async () => {
  if (process.env.NODE_ENV === 'development') {
    return await import('@/components/charts/DevChart');
  }
  return await import('@/components/charts/ProdChart');
};

// ✅ Tree shaking friendly
import { Button } from '@/components/ui/button';
// ❌ Evitar
import * as UI from '@/components/ui';
```

---

## 🔒 Segurança

### 1. Validação de Inputs

```typescript
import { z } from 'zod';

// ✅ Schema de validação
const ProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
  price_pix: z.number().positive('Preço deve ser positivo'),
  category: z.enum(['toxina', 'preenchedor', 'bioestimulador']),
  images: z.array(z.string().url()).min(1, 'Pelo menos uma imagem'),
});

type ProductInput = z.infer<typeof ProductSchema>;

// ✅ Hook de validação
export function useProductValidation() {
  const validateProduct = (data: unknown): ProductInput => {
    try {
      return ProductSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Validação falhou: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      throw error;
    }
  };

  return { validateProduct };
}
```

### 2. Sanitização de Dados

```typescript
import DOMPurify from 'isomorphic-dompurify';

// ✅ Sanitização de HTML
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}

// ✅ Escape de dados
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ✅ Validação de URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### 3. Autenticação e Autorização

```typescript
// ✅ Middleware de autenticação
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Proteger rotas admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verificar role de admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 🐛 Debug

### 1. Logging Estruturado

```typescript
// ✅ Logger configurado
import { logger } from '@/lib/logger';

export function useDebug() {
  const logError = (error: Error, context?: Record<string, any>) => {
    logger.error('Erro na aplicação', {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  };

  const logInfo = (message: string, data?: any) => {
    logger.info(message, {
      data,
      timestamp: new Date().toISOString(),
    });
  };

  return { logError, logInfo };
}
```

### 2. Error Boundaries

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);

    // Enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: errorInfo });
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Algo deu errado</h2>
          <p>Desculpe, ocorreu um erro inesperado.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 3. Debug Tools

```typescript
// ✅ Hook de debug
export function useDebugMode() {
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        setIsDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return isDebugMode;
}

// ✅ Componente de debug
export function DebugPanel({ data }: { data: any }) {
  const isDebugMode = useDebugMode();

  if (!isDebugMode) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg max-w-md">
      <h3 className="text-sm font-bold mb-2">Debug Info</h3>
      <pre className="text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
```

---

## 🚀 Deploy

### 1. Build de Produção

```bash
# ✅ Build otimizado
npm run build

# ✅ Verificar bundle
npm run analyze

# ✅ Testes antes do deploy
npm run ci:full

# ✅ Deploy para staging
npm run deploy:staging

# ✅ Deploy para produção
npm run deploy:production
```

### 2. Variáveis de Ambiente

```bash
# ✅ .env.production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=production
VERCEL_ENV=production
```

### 3. Monitoramento

```typescript
// ✅ Health check
export async function GET() {
  try {
    // Verificar banco
    const supabase = createClient();
    await supabase.from('products').select('count').limit(1);

    // Verificar serviços externos
    const response = await fetch('https://api.external-service.com/health');
    if (!response.ok) throw new Error('External service down');

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
    });
  } catch (error) {
    return Response.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Build Falha

```bash
# ✅ Limpar cache
rm -rf .next node_modules
npm install
npm run build

# ✅ Verificar TypeScript
npm run type-check

# ✅ Verificar ESLint
npm run lint
```

#### 2. Testes Falham

```bash
# ✅ Reset completo
npm run test:reset

# ✅ Verificar ambiente
node --version
npm --version

# ✅ Limpar cache de testes
rm -rf coverage .vitest
```

#### 3. Performance Degradada

```bash
# ✅ Analisar bundle
npm run analyze

# ✅ Lighthouse
npm run performance:lighthouse

# ✅ Verificar dependências
npm audit
```

### Comandos de Emergência

```bash
# ✅ Reset completo do projeto
rm -rf node_modules .next package-lock.json
npm cache clean --force
npm install
npm run db:init
npm run dev

# ✅ Rollback de deploy
git revert HEAD
git push origin main
vercel --prod --force

# ✅ Backup de emergência
npm run db:backup
npm run backup
```

---

## 📚 Recursos Adicionais

### Links Úteis

- **[Next.js Docs](https://nextjs.org/docs)** - Documentação oficial
- **[React Docs](https://react.dev)** - Guia oficial do React
- **[TypeScript](https://www.typescriptlang.org/docs)** - Documentação
  TypeScript
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Guia do Tailwind
- **[Supabase](https://supabase.com/docs)** - Documentação Supabase

### Ferramentas Recomendadas

- **[React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)** -
  Debug React
- **[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)** -
  Debug estado
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** -
  Performance
- **[WebPageTest](https://www.webpagetest.org)** - Teste de performance

---

**Desenvolvimento com qualidade e excelência! 🚀**
