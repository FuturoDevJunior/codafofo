export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  category: string;
  discount_percent: number;
  stock: number;
  currency: string;
  active?: boolean;
  description?: string;
} 