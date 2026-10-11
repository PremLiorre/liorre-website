"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getProduct } from "@/lib/products";

export type CartItem = { slug: string; size: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "liorre-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Restore the cart after hydration so server and client render the same markup.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      // Drop items that are no longer available (sold-out products or sizes).
      const available = Array.isArray(saved)
        ? saved.filter((i: CartItem) => {
            const p = getProduct(i.slug);
            return p && !p.outOfStock && !p.soldOutSizes?.includes(i.size);
          })
        : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(available);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const setQty = (slug: string, size: string, qty: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    );

  const add = (slug: string, size: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, size, qty }];
    });
    setIsOpen(true);
  };

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce(
    (sum, i) => sum + (getProduct(i.slug)?.price ?? 0) * i.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        open,
        close,
        add,
        setQty,
        remove: (slug, size) => setQty(slug, size, 0),
        clear: () => setItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
