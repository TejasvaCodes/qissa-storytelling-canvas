import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const left = [
  { label: "Collections", to: "/collections" as const },
  { label: "Journal", to: "/journal" as const },
  { label: "Custom Order", to: "/custom-order" as const },
  { label: "Bulk Order", to: "/bulk-order" as const },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ${solid ? "bg-background/80 py-4 backdrop-blur-xl md:py-5" : "bg-transparent py-6 md:py-9"}`}>
      <Link to="/collections" className="group flex min-h-9 items-center justify-center gap-3 border-b border-[#b89562]/30 bg-[#090909] px-3 text-center text-[#f3e5ce] transition-colors hover:bg-[#17130e]">
        <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[#d8c4a5]/80 sm:inline">New season. Same stories.</span>
        <span aria-hidden="true" className="text-[#c6a36b]">✦</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">Freshers Fiesta <span className="bg-gradient-to-r from-[#f6e8c9] via-[#7ea9d4] to-[#c89b60] bg-clip-text text-transparent">2K26</span></span>
        <span aria-hidden="true" className="text-[#c6a36b]">✦</span>
        <span className="hidden text-[9px] uppercase tracking-[0.2em] sm:inline">Up to 53% off</span>
      </Link>
      <div className="shell flex items-center justify-center md:justify-between">
        <nav className={`hidden flex-1 items-center gap-9 transition-all duration-500 md:flex ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!solid}>
          {left.map((l) => <Link key={l.label} to={l.to} tabIndex={solid ? 0 : -1} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>{l.label}</Link>)}
        </nav>
        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="absolute left-4 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden">
          <span className={`h-px w-5 bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
        </button>
        <Link to="/" aria-label="QISSAA — Wear Your Story" onClick={() => setMenuOpen(false)} className="block w-[112px] shrink-0 overflow-hidden md:w-[148px]">
          <img src="/qissa-logo.svg" alt="QISSAA — Wear Your Story" className="h-auto w-full" />
        </Link>
        <nav className={`hidden flex-1 items-center justify-end gap-9 transition-all duration-500 md:flex ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!solid}>
          <Link to="/bag" tabIndex={solid ? 0 : -1} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>Bag ({itemCount})</Link>
        </nav>
        <Link to="/bag" aria-label={`Bag (${itemCount})`} tabIndex={solid ? 0 : -1} className={`eyebrow link-underline absolute right-4 text-foreground transition-all duration-500 md:hidden ${solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>Bag ({itemCount})</Link>
      </div>
      <div className={`absolute inset-x-0 top-full border-t border-border bg-background/95 px-6 pb-8 pt-6 shadow-sm backdrop-blur-xl transition-all duration-300 md:hidden ${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"}`} aria-hidden={!menuOpen}>
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          {left.map((l) => <Link key={l.label} to={l.to} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="eyebrow link-underline text-foreground" activeProps={{ className: "!text-accent" }}>{l.label}</Link>)}
          <Link to="/bag" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="eyebrow link-underline text-foreground">Bag ({itemCount})</Link>
        </nav>
      </div>
    </header>
  );
}
