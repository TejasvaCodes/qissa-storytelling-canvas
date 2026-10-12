export type CartItem = {
  id: string;
  name: string;
  colour: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

const STORAGE_KEY = "qissa-cart-v1";
const EVENT_NAME = "qissa-cart-updated";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function addToCart(item: CartItem) {
  const current = readCart();
  const index = current.findIndex(
    (line) => line.id === item.id && line.colour === item.colour && line.size === item.size,
  );

  if (index >= 0) {
    current[index] = {
      ...current[index],
      qty: Math.min(9, current[index].qty + item.qty),
    };
  } else {
    current.push({ ...item, qty: Math.min(9, Math.max(1, item.qty)) });
  }

  writeCart(current);
}

export function updateCartQuantity(id: string, colour: string, size: string, qty: number) {
  const next = readCart()
    .map((item) =>
      item.id === id && item.colour === colour && item.size === size
        ? { ...item, qty: Math.min(9, Math.max(1, qty)) }
        : item,
    );
  writeCart(next);
}

export function removeFromCart(id: string, colour: string, size: string) {
  writeCart(
    readCart().filter(
      (item) => !(item.id === id && item.colour === colour && item.size === size),
    ),
  );
}

export function cartCount(items = readCart()) {
  return items.reduce((total, item) => total + item.qty, 0);
}

export function cartTotal(items = readCart()) {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}

export const cartEventName = EVENT_NAME;
