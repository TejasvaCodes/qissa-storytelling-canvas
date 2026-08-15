import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const left = [
  { label: "Collections", to: "/collections" as const },
  { label: "The Jacket", to: "/velocita" as const },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ${solid ? "bg-background/80 py-4 backdrop-blur-xl md:py-5" : "bg-transparent py-6 md:py-9"}`}>
      <div className="shell flex items-center justify-center md:justify-between">
        <nav className={`hidden flex-1 items-center gap-9 transition-all duration-500 md:flex ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!solid}>
          {left.map((l) => <Link key={l.label} to={l.to} tabIndex={solid ? 0 : -1} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>{l.label}</Link>)}
        </nav>
        <Link to="/" aria-label="QISSA — Wear Your Story" className="block w-[112px] shrink-0 overflow-hidden md:w-[148px]">
          <img src="/qissa-logo.svg" alt="QISSA — Wear Your Story" className="h-auto w-full" />
        </Link>
        <nav className={`hidden flex-1 items-center justify-end gap-9 transition-all duration-500 md:flex ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!solid}>
          <Link to="/account" tabIndex={solid ? 0 : -1} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>Account</Link>
          <Link to="/bag" tabIndex={solid ? 0 : -1} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>Bag ({itemCount})</Link>
        </nav>
        <Link to="/bag" aria-label={`Bag (${itemCount})`} tabIndex={solid ? 0 : -1} className={`eyebrow link-underline absolute right-4 text-foreground transition-all duration-500 md:hidden ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>Bag ({itemCount})</Link>
      </div>
    </header>
  );
}
