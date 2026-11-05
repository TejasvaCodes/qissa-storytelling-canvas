import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const left = [
  { label: "COLLECTIONS", to: "/collections" as const },
  { label: "JOURNAL", to: "/journal" as const },
  { label: "CUSTOM ORDER", to: "/custom-order" as const },
  { label: "BULK ORDER", to: "/bulk-order" as const },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 md:px-9 md:py-8">
      <div
        className="pointer-events-auto"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex h-7 w-[76px] flex-col justify-center gap-[8px] bg-transparent"
        >
          <span className="h-px w-full bg-white" />
          <span className="h-px w-full bg-white" />
        </button>

        <div className={"pointer-events-auto fixed left-0 top-0 h-[100svh] w-[300px] bg-black/70 px-5 pb-12 pt-28 transition-all duration-300 " + (menuOpen ? "visible translate-x-0 opacity-100" : "invisible pointer-events-none -translate-x-3 opacity-0")}>
          <nav className="flex flex-col items-start gap-9 md:gap-11" aria-label="Main navigation">
            {left.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className="text-[15px] font-light uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-60 md:text-base" activeProps={{ className: "text-white underline underline-offset-8" }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="pointer-events-auto relative z-[60] flex flex-col items-end gap-6 text-white">
        <div className="flex flex-col items-end">
          <button
            type="button"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className="border-b border-white/80 pb-2 text-[13px] uppercase tracking-[0.03em] transition-opacity hover:opacity-60"
          >
            Search
          </button>
          {searchOpen && (
            <form action="/collections" method="get" className="mt-3">
              <input
                autoFocus
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search collections"
                className="w-40 border-b border-white/70 bg-transparent px-1 py-2 text-right text-[13px] uppercase tracking-wide text-white outline-none placeholder:text-white/60"
              />
            </form>
          )}
        </div>
        <Link to="/bag" className="text-[13px] uppercase tracking-[0.04em] text-white transition-opacity hover:opacity-60" aria-label={"Bag (" + itemCount + ")"} activeProps={{ className: "underline underline-offset-4" }}>
          BAG <span className="ml-1 border-x border-white/70 px-1.5">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}
