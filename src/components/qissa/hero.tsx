import { useEffect, useRef, useState } from "react";

import heroMain from "@/assets/hero-main.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { addToCart } from "@/lib/cart";

const views = [
  { src: heroMain, alt: "QISSA Velocità leather jacket, front view" },
  { src: gallery2, alt: "Collar and zipper detail of the Velocità jacket" },
  { src: gallery3, alt: "Back view of the Velocità jacket" },
  { src: gallery4, alt: "Cuff and sleeve detail of the Velocità jacket" },
];

const colours = [
  { name: "Onyx", swatch: "oklch(0.2 0.002 0)" },
  { name: "Tobacco", swatch: "oklch(0.5 0.06 60)" },
  { name: "Bone", swatch: "oklch(0.91 0.014 82)" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export function Hero() {
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(colours[0]!.name);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = endRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar((entry?.boundingClientRect.top ?? 0) < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAdd = () => {
    addToCart({
      id: "velocita",
      name: "Velocità",
      colour,
      size,
      price: 48000,
      qty,
      image: heroMain,
    });
  };

  return (
    <section id="hero" className="pt-28 md:pt-36">
      <div className="shell grid gap-10 lg:grid-cols-[80px_1fr_320px] lg:gap-14">
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {views.map((v, i) => (
            <button key={v.alt} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-label={v.alt} className={`w-[68px] shrink-0 transition-opacity duration-500 lg:w-full ${active === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}>
              <img src={v.src} alt={v.alt} loading="lazy" width={800} height={1008} className="h-[86px] w-full object-cover lg:h-[100px]" />
            </button>
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative bg-secondary">
            {views.map((v, i) => (
              <img key={v.alt} src={v.src} alt={v.alt} width={1408} height={1760} className={`h-[70vh] w-full object-cover transition-opacity duration-[900ms] md:h-[86vh] ${active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} />
            ))}
          </div>
        </div>

        <div className="order-3 lg:pt-6">
          <p className="eyebrow">Outerwear — 01</p>
          <h1 className="display mt-5 text-[2.6rem] md:text-[3.1rem]">Velocità</h1>
          <p className="mt-5 text-base tracking-wide">₹ 48,000</p>
          <p className="mt-8 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
            A racing silhouette drawn in glove-soft lambskin.<br />
            Made in limited numbers, made to age well.
          </p>

          <div className="mt-14">
            <p className="eyebrow">Colour — {colour}</p>
            <div className="mt-5 flex gap-4">
              {colours.map((c) => (
                <button key={c.name} onClick={() => setColour(c.name)} aria-label={c.name} className={`h-7 w-7 rounded-full transition-all duration-500 ${colour === c.name ? "ring-1 ring-foreground ring-offset-4 ring-offset-background" : "opacity-70 hover:opacity-100"}`} style={{ backgroundColor: c.swatch }} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow">Size</p>
            <div className="mt-5 flex flex-wrap gap-7">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`text-sm tracking-[0.14em] transition-colors duration-500 ${size === s ? "text-foreground underline decoration-1 underline-offset-[6px]" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow">Quantity</p>
            <div className="mt-5 flex items-center gap-7 text-sm">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="text-muted-foreground transition-colors hover:text-foreground">—</button>
              <span className="tracking-[0.14em]">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity" className="text-muted-foreground transition-colors hover:text-foreground">+</button>
            </div>
          </div>

          <button onClick={handleAdd} className="lift eyebrow mt-14 w-full bg-foreground py-5 text-center !text-primary-foreground hover:bg-accent">Add to Bag</button>
          <button className="eyebrow link-underline mt-8 text-foreground">Add to Wishlist</button>
        </div>
      </div>
      <div ref={endRef} />

      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl transition-all duration-700 ${showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
        <div className="shell flex items-center justify-between gap-6 py-4">
          <div className="min-w-0">
            <p className="font-serif text-xl font-light">Velocità</p>
            <p className="eyebrow mt-1 truncate">{colour} — {size} — ₹ 48,000</p>
          </div>
          <button onClick={handleAdd} className="lift eyebrow shrink-0 bg-foreground px-8 py-4 !text-primary-foreground hover:bg-accent">Add to Bag</button>
        </div>
      </div>
    </section>
  );
}
