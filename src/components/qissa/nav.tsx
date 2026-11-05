import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const left = [
  { label: "Collections", to: "/collections" as const },
  { label: "Journal", to: "/journal" as const },
  { label: "Custom Order", to: "/custom-order" as const },
  { label: "Bulk Order", to: "/bulk-order" as const },
];

const navLinkClass =
  "eyebrow !text-[#f1c56b] transition-colors hover:!text-[#ffe3a0]";

function BagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-4 md:p-6">
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
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-sm border border-[#e9b84f] bg-[#08233d]/95 shadow-lg backdrop-blur-sm"
        >
          <span className={"h-px w-5 bg-[#e9b84f] transition-transform duration-200 " + (menuOpen ? "translate-y-[3.5px] rotate-45" : "")} />
          <span className={"h-px w-5 bg-[#e9b84f] transition-opacity duration-200 " + (menuOpen ? "opacity-0" : "")} />
          <span className={"h-px w-5 bg-[#e9b84f] transition-transform duration-200 " + (menuOpen ? "-translate-y-[7px] -rotate-45" : "")} />
        </button>

        <div className={"absolute left-0 top-full mt-2 min-w-[220px] border border-[#d5a746]/50 bg-[#08233d]/[0.98] px-6 py-6 shadow-2xl backdrop-blur-md transition-all duration-200 " + (menuOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-2 opacity-0")}>
          <nav className="flex flex-col gap-6" aria-label="Main navigation">
            {left.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)} className={navLinkClass} activeProps={{ className: "!text-[#fff0c7]" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <Link
        to="/bag"
        aria-label={"Bag (" + itemCount + ")"}
        className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#e9b84f] bg-[#08233d]/95 text-[#e9b84f] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#e9b84f] hover:text-[#08233d]"
      >
        <BagIcon />
        <span className="sr-only">Bag ({itemCount})</span>
      </Link>
    </header>
  );
}
