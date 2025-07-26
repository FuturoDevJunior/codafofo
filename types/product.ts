// Interface única para produtos - sistema atualizado
export interface Product {
  id: string;
  name: string;
  price_pix: number; // Preço para PIX
  price_card: number; // Preço para Cartão
  price_prazo: number; // Preço para Prazo/Cartão
  images: string[];
  slug: string;
  category: string;
  currency?: string;
  active?: boolean;
  description?: string;
}
