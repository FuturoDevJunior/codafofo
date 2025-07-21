import { openDB } from 'idb';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartState } from '@/types/cart';

const IDBStorage = {
  getItem: async (name: string) => {
    const db = await openDB('vytalle-db', 1, { upgrade(db) { db.createObjectStore('store'); } });
    return db.get('store', name);
  },
  setItem: async (name: string, value: any) => {
    const db = await openDB('vytalle-db', 1);
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    await db.put('store', toStore, name);
  },
  removeItem: async (name: string) => {
    const db = await openDB('vytalle-db', 1);
    await db.delete('store', name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(i => i.id === item.id);
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
            // Update other fields if provided
            images: item.images || updatedItems[existingItemIndex].images,
            category: item.category || updatedItems[existingItemIndex].category
          };
          return { items: updatedItems };
        } else {
          // Add new item
          return { items: [...state.items, item] };
        }
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i),
      })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage', storage: { getItem: IDBStorage.getItem, setItem: IDBStorage.setItem, removeItem: IDBStorage.removeItem } }
  )
);
