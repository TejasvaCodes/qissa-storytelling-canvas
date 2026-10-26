import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import main from "../../../BCJ main.jpeg";
import back from "../../../BCJ back.jpeg";
import pf1 from "../../../BCJ pf1.jpeg";
import pf2 from "../../../BCJ pf2.jpeg";
import pf3 from "../../../BCJ pf3.jpeg";
import pf4 from "../../../BCJ pf4.jpeg";
import { useCart } from "@/lib/cart";

const views = [
  { src: main, alt: "Black Crocodile Jacket — front" },
  { src: back, alt: "Black Crocodile Jacket — back" },
  { src: pf1, alt: "Black Crocodile Jacket — professional photo 1" },
  { src: pf2, alt: "Black Crocodile Jacket — professional photo 2" },
  { src: pf3, alt: "Black Crocodile Jacket — professional photo 3" },
  { src: pf4, alt: "Black Crocodile Jacket — professional photo 4" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export function Hero() {
  const [active, setActive] = useState(0);
  const [customization, setCustomization] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<"inches" | "cm">("inches");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const el = endRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setShowBar((entry?.boundingClientRect.top ?? 0) < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const addToBag = () => {
    addItem({ id: "BCT", img: main, name: "Black Crocodile", colour: "Standard", size, price: 2599, qty, customization: customization.trim() });
    setShowAddedToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowAddedToast(false), 4500);
  };

  return (
    <section id="hero" className="pt-28 md:pt-36">
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed inset-x-4 top-20 z-50 transition-all duration-500 md:left-auto md:right-6 md:w-[380px] ${showAddedToast ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
      >
        <div className="border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <img src={main} alt="" width={72} height={90} className="h-[72px] w-[58px] shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="eyebrow">Added to your bag</p>
              <p className="mt-2 truncate font-serif text-lg font-light">Black Crocodile</p>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground">Size {size} — Qty {qty}</p>
            </div>
            <Link to="/bag" onClick={() => setShowAddedToast(false)} className="eyebrow link-underline shrink-0 text-foreground">View Bag</Link>
            <button type="button" aria-label="Dismiss added to bag message" onClick={() => setShowAddedToast(false)} className="self-start text-lg leading-none text-muted-foreground transition-colors hover:text-foreground">×</button>
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 lg:grid-cols-[80px_1fr_320px] lg:gap-14">
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {views.map((v, i) => <button key={v.alt} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-label={v.alt} className={`w-[68px] shrink-0 transition-opacity duration-500 lg:w-full ${active === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}><img src={v.src} alt={v.alt} loading="lazy" width={800} height={1008} className="h-[86px] w-full object-cover lg:h-[100px]" /></button>)}
        </div>
        <div className="order-1 lg:order-2"><div className="relative bg-secondary">{views.map((v, i) => <img key={v.alt} src={v.src} alt={v.alt} width={1408} height={1760} className={`h-[70vh] w-full object-cover transition-opacity duration-[900ms] md:h-[86vh] ${active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} />)}</div></div>
        <div className="order-3 lg:pt-6">
          <p className="eyebrow">Jacket — 01</p>
          <h1 className="display mt-5 text-[2.6rem] md:text-[3.1rem]">Black Crocodile</h1>
          <div className="mt-5 flex flex-wrap items-baseline gap-3 text-base tracking-wide"><span className="text-muted-foreground line-through">₹ 4,300</span><span>₹ 2,599</span><span className="text-xs text-muted-foreground">Save ₹1,701</span></div><p className="mt-2 text-xs text-muted-foreground">Opening Sale · In collaboration with VESIT 2026 Freshers</p>
          <p className="mt-8 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">A statement jacket designed to bring character to your everyday look.<br />Made in limited numbers, made to age well.</p>
          <div className="mt-12">
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setShowSizeChart(true)} className="eyebrow border border-foreground px-5 py-4 transition-colors duration-500 hover:bg-foreground hover:text-primary-foreground">View Size Chart</button>
              <button type="button" onClick={() => document.getElementById("velocita-customization")?.focus()} className="eyebrow border border-border px-5 py-4 transition-colors duration-500 hover:border-foreground">Customize</button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Rates may differ depending on the customization requested.</p>
            <label htmlFor="velocita-customization" className="eyebrow mt-6 block">Your customization</label>
            <textarea id="velocita-customization" value={customization} onChange={(event) => setCustomization(event.target.value)} maxLength={1000} rows={3} placeholder="Describe any changes you'd like on your jacket…" className="mt-3 w-full resize-y border border-border bg-transparent p-4 text-sm leading-relaxed outline-none transition-colors focus:border-foreground" />
          </div>
          <div className="mt-12"><p className="eyebrow">Size</p><div className="mt-5 flex flex-wrap gap-7">{sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`text-sm tracking-[0.14em] transition-colors duration-500 ${size === s ? "text-foreground underline decoration-1 underline-offset-[6px]" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>)}</div></div>
          <div className="mt-12"><p className="eyebrow">Quantity</p><div className="mt-5 flex items-center gap-7 text-sm"><button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="text-muted-foreground transition-colors hover:text-foreground">—</button><span className="tracking-[0.14em]">{qty}</span><button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity" className="text-muted-foreground transition-colors hover:text-foreground">+</button></div></div>
          <button onClick={addToBag} className="lift eyebrow mt-14 w-full bg-foreground py-5 text-center !text-primary-foreground hover:bg-accent">Add to Bag</button>
          <button onClick={addToBag} className="eyebrow link-underline mt-8 text-foreground">Add to Wishlist</button>
        </div>
      </div>

      {showSizeChart && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowSizeChart(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="velocita-size-chart-title" className="max-h-[85vh] w-full max-w-3xl overflow-auto border border-border bg-background p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="eyebrow">QISSAA</p><h2 id="velocita-size-chart-title" className="display mt-2 text-3xl sm:text-4xl">Size Guide</h2></div>
              <button type="button" onClick={() => setShowSizeChart(false)} aria-label="Close size chart" className="text-2xl">×</button>
            </div>
            <div className="mx-auto my-6 flex w-fit overflow-hidden rounded-full border border-border">
              {(["inches", "cm"] as const).map((unit) => <button key={unit} type="button" onClick={() => setSizeUnit(unit)} className={`px-6 py-2 eyebrow transition-colors ${sizeUnit === unit ? "bg-foreground text-primary-foreground" : "hover:bg-secondary"}`}>{unit === "inches" ? "Inches" : "CM"}</button>)}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-center text-sm">
                <thead className="bg-foreground text-primary-foreground"><tr>{["Size", "Chest", "Shoulder", "Length"].map((label) => <th key={label} className="px-4 py-4 font-normal">{label}</th>)}</tr></thead>
                <tbody>{[["XS",38,18,25],["S",40,19,25.5],["M",42,20,26],["L",44,21,26.5],["XL",46,22,27],["XXL",48,23,27.5]].map(([label,chest,shoulder,length], index) => <tr key={label} className={index % 2 ? "bg-secondary/50" : "bg-background"}><td className="px-4 py-4 font-medium">{label}</td>{[chest,shoulder,length].map((value, i) => <td key={i} className="px-4 py-4">{sizeUnit === "inches" ? value : (Number(value) * 2.54).toFixed(1).replace(/\.0$/, "")}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Measurements are a guide. For a tailored fit, mention your requirements in Customize.</p>
          </section>
        </div>
      )}
      <div ref={endRef} />
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl transition-all duration-700 ${showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
        <div className="shell flex items-center justify-between gap-6 py-4"><div className="min-w-0"><p className="font-serif text-xl font-light">Black Crocodile</p><p className="eyebrow mt-1 truncate">{size} — ₹ 2,599</p></div><button onClick={addToBag} className="lift eyebrow shrink-0 bg-foreground px-8 py-4 !text-primary-foreground hover:bg-accent">Add to Bag</button></div>
      </div>
    </section>
  );
}
