import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  colour: string;
  size: string;
  price: number;
  qty: number;
  img: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  setQuantity: (id: string, size: string, delta: number) => void;
  removeItem: (id: string, size: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "qissa-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // Ignore malformed local storage and start with an empty cart.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private/restricted browser contexts.
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue["addItem"] = (item) => {
      setItems((current) => {
        const existing = current.find((x) => x.id === item.id && x.size === item.size && x.colour === item.colour);
        if (existing) {
          return current.map((x) =>
            x.id === item.id && x.size === item.size && x.colour === item.colour
              ? { ...x, qty: Math.min(9, x.qty + (item.qty ?? 1)) }
              : x,
          );
        }
        return [...current, { ...item, qty: item.qty ?? 1 }];
      });
    };

    const setQuantity: CartContextValue["setQuantity"] = (id, size, delta) => {
      setItems((current) =>
        current
          .map((item) => (item.id === id && item.size === size ? { ...item, qty: Math.min(9, Math.max(0, item.qty + delta)) } : item))
          .filter((item) => item.qty > 0),
      );
    };

    const removeItem: CartContextValue["removeItem"] = (id, size) => {
      setItems((current) => current.filter((item) => !(item.id === id && item.size === size)));
    };

    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      addItem,
      setQuantity,
      removeItem,
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
