export interface ProductForm {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string;
  category: string;
  active: boolean;
  stock: number;
  discount_percent: number;
  supplier_id: string;
  currency: string;
} 