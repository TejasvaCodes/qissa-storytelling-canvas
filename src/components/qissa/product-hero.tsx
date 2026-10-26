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
  originalPrice?: number;
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
  const colour = colours[0]!.name;
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customization, setCustomization] = useState("");
  const [savedCustomization, setSavedCustomization] = useState("");
  const [sizeChartUnit, setSizeChartUnit] = useState<"inches" | "cm">("inches");
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
    addItem({ id: product.id, img: product.views[0]!.src, name: product.name, colour, size, price: product.price, qty, customization: savedCustomization });
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
        <div className="order-1 lg:order-2"><div className="relative bg-secondary">{product.originalPrice && }{product.views.map((v, i) => <img key={v.alt} src={v.src} alt={v.alt} width={1408} height={1760} className={`h-[70vh] w-full object-cover transition-opacity duration-[900ms] md:h-[86vh] ${active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} />)}</div></div>
        <div className="order-3 lg:pt-6">
          <p className="eyebrow">{product.category} — {product.number}</p>
          <h1 className="display mt-5 text-[2.6rem] md:text-[3.1rem]">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-base tracking-wide">{product.originalPrice && <span className="text-muted-foreground line-through">₹ {product.originalPrice.toLocaleString("en-IN")}</span>}<span>₹ {product.price.toLocaleString("en-IN")}</span>{product.originalPrice && <><span className="text-xs text-muted-foreground">Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}</span><span className="inline-flex items-center gap-1 border border-[#b89562]/50 bg-[#11100e] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#ead6b5]">✦ Freshers 2K26</span></>}</div>{product.originalPrice && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Opening Sale · In collaboration with VESIT 2026 Freshers</p>}
          <p className="mt-8 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-14 flex flex-wrap gap-3"><button type="button" onClick={() => setShowSizeChart(true)} className="eyebrow border border-foreground px-5 py-4 transition-colors duration-500 hover:bg-foreground hover:text-primary-foreground">View Size Chart</button><button type="button" onClick={() => { setCustomization(savedCustomization); setShowCustomize(true); }} className="eyebrow border border-border px-5 py-4 transition-colors duration-500 hover:border-foreground">{savedCustomization ? "Edit Customization" : "Customize"}</button></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Rates may differ depending on the customization requested.</p>
          <div className="mt-12"><p className="eyebrow">Size</p><div className="mt-5 flex flex-wrap gap-7">{sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`text-sm tracking-[0.14em] transition-colors duration-500 ${size === s ? "text-foreground underline decoration-1 underline-offset-[6px]" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>)}</div></div>
          <div className="mt-12"><p className="eyebrow">Quantity</p><div className="mt-5 flex items-center gap-7 text-sm"><button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">—</button><span className="tracking-[0.14em]">{qty}</span><button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button></div></div>
          <button onClick={addToBag} className="lift eyebrow mt-14 w-full bg-foreground py-5 text-center !text-primary-foreground hover:bg-accent">Add to Bag</button>
          <button onClick={addToBag} className="eyebrow link-underline mt-8 text-foreground">Add to Wishlist</button>
        </div>
      </div>
      {showCustomize && <div className="fixed inset-0 z-[75] flex items-center justify-center bg-foreground/60 p-4" role="presentation" onClick={() => setShowCustomize(false)}><section role="dialog" aria-modal="true" aria-labelledby="customize-title" className="relative w-full max-w-xl border border-border bg-background p-6 text-foreground shadow-2xl sm:p-9" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Close customization" onClick={() => setShowCustomize(false)} className="absolute right-4 top-3 text-3xl leading-none text-muted-foreground hover:text-foreground">×</button><p className="eyebrow">Made personal</p><h2 id="customize-title" className="display mt-4 text-3xl sm:text-4xl">Customize your piece</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Tell us what you would like changed on this jacket. Our team will confirm feasibility and the final price before proceeding.</p><p className="mt-4 text-xs font-medium tracking-wide">Rates may differ depending on customization.</p><label className="mt-6 block"><span className="eyebrow">Your requirements</span><textarea value={customization} onChange={(event) => setCustomization(event.target.value)} maxLength={1000} rows={5} placeholder="e.g. sleeve length, fit, initials, patches, or a special design…" className="mt-3 w-full resize-y border border-border bg-transparent p-4 text-sm leading-relaxed outline-none transition-colors focus:border-foreground" /></label><p className="mt-2 text-right text-xs text-muted-foreground">{customization.length}/1000</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => { setSavedCustomization(customization.trim()); setShowCustomize(false); }} className="lift eyebrow bg-foreground px-6 py-4 !text-primary-foreground hover:bg-accent">Save Customization</button>{savedCustomization && <button type="button" onClick={() => { setCustomization(""); setSavedCustomization(""); setShowCustomize(false); }} className="eyebrow border border-border px-5 py-4 hover:border-foreground">Remove</button>}</div></section></div>}
      {showSizeChart && <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-foreground/60 p-3 sm:p-5" role="presentation" onClick={() => setShowSizeChart(false)}>
        <section role="dialog" aria-modal="true" aria-labelledby="size-chart-title" className="relative my-auto w-full max-w-4xl border border-border bg-background text-foreground shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <button type="button" aria-label="Close size chart" onClick={() => setShowSizeChart(false)} className="absolute right-4 top-3 z-10 text-3xl leading-none text-muted-foreground transition-colors hover:text-foreground">×</button>
          <div className="px-4 pb-4 pt-6 text-center sm:px-7 sm:pt-8">
            <p className="font-serif text-[2.7rem] tracking-[0.08em] sm:text-6xl">QISSAA</p>
            <h2 id="size-chart-title" className="mt-2 text-xs font-semibold tracking-[0.42em] sm:text-base">SIZE GUIDE</h2>
            <div className="mx-auto mt-3 h-px w-20 bg-border" />
            <div className="mx-auto mt-4 inline-flex overflow-hidden rounded-full border border-border">
              <button type="button" onClick={() => setSizeChartUnit("inches")} aria-pressed={sizeChartUnit === "inches"} className={`min-w-24 px-4 py-1.5 text-[11px] tracking-[0.12em] transition-colors sm:min-w-32 sm:py-2 sm:text-xs ${sizeChartUnit === "inches" ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"}`}>INCHES</button>
              <button type="button" onClick={() => setSizeChartUnit("cm")} aria-pressed={sizeChartUnit === "cm"} className={`min-w-24 border-l border-border px-4 py-1.5 text-[11px] tracking-[0.12em] transition-colors sm:min-w-32 sm:py-2 sm:text-xs ${sizeChartUnit === "cm" ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"}`}>CM</button>
            </div>
          </div>
          <div className="px-3 pb-4 sm:px-5 sm:pb-5">
            <div className="overflow-x-auto border border-border">
              <table className="w-full min-w-[520px] border-collapse text-center">
                <thead className="bg-foreground text-background"><tr><th className="px-3 py-3 text-left text-xs font-medium sm:px-5 sm:py-4 sm:text-sm">SIZE</th><th className="px-2 py-3 text-xs font-medium sm:py-4 sm:text-sm">Chest</th><th className="px-3 py-4 text-sm font-medium sm:py-5 sm:text-base">Shoulder</th><th className="px-3 py-4 text-sm font-medium sm:py-5 sm:text-base">Length</th></tr></thead>
                <tbody>{[["XS",38,18,25],["S",40,19,25.5],["M",42,20,26],["L",44,21,26.5],["XL",46,22,27],["XXL",48,23,27.5]].map((row, index) => <tr key={row[0]} className={index % 2 === 0 ? "bg-secondary" : "bg-background"}><th className="px-3 py-2.5 text-left font-serif text-lg font-normal sm:px-5 sm:py-3 sm:text-xl">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i} className="px-2 py-2.5 text-sm sm:py-3 sm:text-base">{sizeChartUnit === "cm" ? (Number(value) * 2.54).toFixed(1) : value}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">Measurements are garment measurements. {sizeChartUnit === "inches" ? "All values are in inches." : "All values are in centimetres (cm)."}</p>
          </div>
        </section>
      </div>}
      <div ref={endRef} />
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl transition-all duration-700 ${showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
        <div className="shell flex items-center justify-between gap-6 py-4"><div className="min-w-0"><p className="font-serif text-xl font-light">{product.name}</p><p className="eyebrow mt-1 truncate">{colour} — {size} — ₹ {product.price.toLocaleString("en-IN")}</p></div><button onClick={addToBag} className="lift eyebrow shrink-0 bg-foreground px-8 py-4 !text-primary-foreground hover:bg-accent">Add to Bag</button></div>
      </div>
    </section>
  );
}
