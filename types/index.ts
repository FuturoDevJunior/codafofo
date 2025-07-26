// Tipos base para o sistema Vytalle
export interface Product {
  id: string;
  name: string;
  price_pix: number;
  price_card: number;
  price_prazo: number;
  description?: string;
  image?: string;
  images: string[];
  category: string;
  slug: string;
  active?: boolean;
  supplier_id?: string;
  stock?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  currency?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  profile?: UserProfile;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  shipping_address?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductForm {
  name: string;
  price: number;
  price_pix?: number;
  price_card?: number;
  price_prazo?: number;
  description?: string;
  category: string;
  image?: string;
  images?: string[];
  stock?: number;
  active?: boolean;
  is_active?: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
  username?: string; // Para compatibilidade com validação existente
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
  whatsapp?: string; // Para compatibilidade com validação existente
  cep?: string; // Para compatibilidade com validação existente
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: Record<string, unknown>; // Para compatibilidade com validação existente
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para analytics
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: number;
  userId?: string;
}

export interface AnalyticsData {
  events: AnalyticsEvent[];
  sessionId: string;
  userId?: string;
}

// Tipos específicos para analytics
export interface PageView {
  page: string;
  timestamp: number;
  userId?: string;
}

export interface CartEvent {
  action: 'add' | 'remove' | 'update';
  productId: string;
  quantity: number;
  timestamp: number;
  userId?: string;
}

export interface LeadEvent {
  source: string;
  data: Record<string, unknown>;
  timestamp: number;
  userId?: string;
}

// Tipos para upload
export interface UploadResponse {
  url: string;
  key: string;
  size: number;
  mimeType: string;
}

// Tipos para admin dashboard
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  topProducts: Product[];
}

// Tipos para erro
export interface AppError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

export type ErrorType = 'validation' | 'network' | 'auth' | 'server' | 'unknown';

// Tipos para logger
export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
