import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export type ProductView = { src: string; alt: string };
export type ProductConfig = {
  id: string;
  name: string;
  category: string;
  number: string;
  price: number;
  description: string;
  views: ProductView[];
  colours?: { name: string; swatch: string }[];
};

const defaultColours = [
  { name: "Onyx", swatch: "oklch(0.2 0.002 0)" },
  { name: "Tobacco", swatch: "oklch(0.5 0.06 60)" },
  { name: "Bone", swatch: "oklch(0.91 0.014 82)" },
];
const sizes = ["XS", "S", "M", "L", "XL"];

export function ProductHero({ product }: { product: ProductConfig }) {
  const colours = product.colours ?? defaultColours;
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(colours[0]!.name);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const el = endRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setShowBar((entry?.boundingClientRect.top ?? 0) < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  const addToBag = () => {
    addItem({ id: product.id, img: product.views[0]!.src, name: product.name, colour, size, price: product.price, qty });
    setShowAddedToast(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowAddedToast(false), 4500);
  };

  return (
    <section id="hero" className="pt-28 md:pt-36">
      <div aria-live="polite" aria-atomic="true" className={`fixed inset-x-4 top-20 z-50 transition-all duration-500 md:left-auto md:right-6 md:w-[380px] ${showAddedToast ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}>
        <div className="border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <img src={product.views[0]!.src} alt="" width={72} height={90} className="h-[72px] w-[58px] shrink-0 object-cover" />
            <div className="min-w-0 flex-1"><p className="eyebrow">Added to your bag</p><p className="mt-2 truncate font-serif text-lg font-light">{product.name}</p><p className="mt-1 text-xs tracking-wide text-muted-foreground">{colour} — Size {size} — Qty {qty}</p></div>
            <Link to="/bag" onClick={() => setShowAddedToast(false)} className="eyebrow link-underline shrink-0 text-foreground">View Bag</Link>
            <button type="button" aria-label="Dismiss added to bag message" onClick={() => setShowAddedToast(false)} className="self-start text-lg leading-none text-muted-foreground">×</button>
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 lg:grid-cols-[80px_1fr_320px] lg:gap-14">
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {product.views.map((v, i) => <button key={v.alt} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-label={v.alt} className={`w-[68px] shrink-0 transition-opacity duration-500 lg:w-full ${active === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}><img src={v.src} alt={v.alt} loading="lazy" width={800} height={1008} className="h-[86px] w-full object-cover lg:h-[100px]" /></button>)}
        </div>
        <div className="order-1 lg:order-2"><div className="relative bg-secondary">{product.views.map((v, i) => <img key={v.alt} src={v.src} alt={v.alt} width={1408} height={1760} className={`h-[70vh] w-full object-cover transition-opacity duration-[900ms] md:h-[86vh] ${active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} />)}</div></div>
        <div className="order-3 lg:pt-6">
          <p className="eyebrow">{product.category} — {product.number}</p>
          <h1 className="display mt-5 text-[2.6rem] md:text-[3.1rem]">{product.name}</h1>
          <p className="mt-5 text-base tracking-wide">₹ {product.price.toLocaleString("en-IN")}</p>
          <p className="mt-8 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-14"><p className="eyebrow">Colour — {colour}</p><div className="mt-5 flex gap-4">{colours.map((c) => <button key={c.name} onClick={() => setColour(c.name)} aria-label={c.name} className={`h-7 w-7 rounded-full transition-all duration-500 ${colour === c.name ? "ring-1 ring-foreground ring-offset-4 ring-offset-background" : "opacity-70 hover:opacity-100"}`} style={{ backgroundColor: c.swatch }} />)}</div></div>
          <div className="mt-12"><p className="eyebrow">Size</p><div className="mt-5 flex flex-wrap gap-7">{sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`text-sm tracking-[0.14em] transition-colors duration-500 ${size === s ? "text-foreground underline decoration-1 underline-offset-[6px]" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>)}</div></div>
          <div className="mt-12"><p className="eyebrow">Quantity</p><div className="mt-5 flex items-center gap-7 text-sm"><button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">—</button><span className="tracking-[0.14em]">{qty}</span><button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button></div></div>
          <button onClick={addToBag} className="lift eyebrow mt-14 w-full bg-foreground py-5 text-center !text-primary-foreground hover:bg-accent">Add to Bag</button>
          <button onClick={addToBag} className="eyebrow link-underline mt-8 text-foreground">Add to Wishlist</button>
        </div>
      </div>
      <div ref={endRef} />
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl transition-all duration-700 ${showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
        <div className="shell flex items-center justify-between gap-6 py-4"><div className="min-w-0"><p className="font-serif text-xl font-light">{product.name}</p><p className="eyebrow mt-1 truncate">{colour} — {size} — ₹ {product.price.toLocaleString("en-IN")}</p></div><button onClick={addToBag} className="lift eyebrow shrink-0 bg-foreground px-8 py-4 !text-primary-foreground hover:bg-accent">Add to Bag</button></div>
      </div>
    </section>
  );
}
