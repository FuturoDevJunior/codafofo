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
  addItem: (_item: CartItem) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, _quantity: number) => void;
  clearCart: () => void;
}
