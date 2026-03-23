import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { SERVICES } from '../constants/data';

// ── Types ──────────────────────────────────────────────────────
export interface CartItem {
  idx: number;
  title: string;
  emoji: string;
  price: number;
}

interface CartCtx {
  cart: CartItem[];
  addToCart: (idx: number) => void;
  removeFromCart: (idx: number) => void;
  clearCart: () => void;
  isInCart: (idx: number) => boolean;
  total: number;
}

// ── Context ────────────────────────────────────────────────────
const CartContext = createContext<CartCtx | null>(null);

// ── Provider ───────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((idx: number) => {
    const s = SERVICES[idx];
    if (!s) return;
    setCart(prev => {
      if (prev.find(c => c.idx === idx)) return prev; // already in cart
      return [...prev, { idx, title: s.title, emoji: s.emoji, price: s.price }];
    });
  }, []);

  const removeFromCart = useCallback((idx: number) => {
    setCart(prev => prev.filter(c => c.idx !== idx));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isInCart = useCallback((idx: number) => !!cart.find(c => c.idx === idx), [cart]);

  const total = cart.reduce((sum, c) => sum + c.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
