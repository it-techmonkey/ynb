'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  kind: 'blind';
  title: string;
  /** Human-readable configuration lines shown in the cart. */
  details: string[];
  unitPrice: number;
  qty: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  count: number;
  subtotal: number;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, 'id' | 'qty'> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'ynb-preview-cart-v2';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems((JSON.parse(raw) as CartItem[]).filter((i) => i.kind === 'blind'));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const add = useCallback<CartState['add']>((item) => {
    setItems((prev) => [...prev, { ...item, qty: item.qty ?? 1, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }]);
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, Math.min(20, qty)) } : p)));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((p) => p.id !== id)), []);

  const value = useMemo<CartState>(
    () => ({
      items,
      open,
      setOpen,
      add,
      setQty,
      remove,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.unitPrice, 0),
    }),
    [items, open, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
