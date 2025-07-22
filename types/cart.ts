export interface CartItem {
  id: string;
  name: string;
  price: number;
  price_pix: number;
  price_card: number;
  quantity: number;
  images?: string[];
  category?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} 