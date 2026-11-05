import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const left = [
  { label: "Collections", to: "/collections" as const },
  { label: "Journal", to: "/journal" as const },
  { label: "Custom Order", to: "/custom-order" as const },
  { label: "Bulk Order", to: "/bulk-order" as const },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 md:px-9 md:py-8">
      <div
        className="pointer-events-auto relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-7 w-[76px] flex-col justify-center gap-[8px] bg-transparent"
        >
          <span className="h-px w-full bg-white" />
          <span className="h-px w-full bg-white" />
        </button>

        <div className={"absolute left-0 top-full mt-5 min-w-[210px] bg-black/90 px-0 py-5 transition-all duration-200 " + (menuOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-2 opacity-0")}>
          <nav className="flex flex-col gap-5" aria-label="Main navigation">
            {left.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className="text-[13px] uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-60" activeProps={{ className: "text-white underline underline-offset-4" }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="pointer-events-auto flex flex-col items-end gap-6 text-white">
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
          Bag <span className="ml-1 border-x border-white/70 px-1.5">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}
