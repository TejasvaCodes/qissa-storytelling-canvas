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
  "eyebrow link-underline !text-[#f1c56b] transition-colors hover:!text-[#ffe3a0]";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d5a746]/40 bg-[#08233d] shadow-[0_8px_30px_rgba(3,16,29,0.18)]">
      <Link
        to="/collections"
        className="group flex min-h-9 items-center justify-center gap-3 border-b border-[#d5a746]/40 bg-[#061a2d] px-3 text-center text-[#f7e9c9] transition-colors hover:bg-[#0c2c49]"
      >
        <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[#f1d9a3]/80 sm:inline">
          New season. Same stories.
        </span>
        <span aria-hidden="true" className="text-[#e9b84f]">✦</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
          Freshers Fiesta <span className="text-[#f1c56b]">2K26</span>
        </span>
        <span aria-hidden="true" className="text-[#e9b84f]">✦</span>
        <span className="hidden text-[9px] uppercase tracking-[0.2em] sm:inline">
          Up to 53% off
        </span>
      </Link>

      <div className="shell relative flex min-h-[76px] items-center justify-center md:min-h-[88px] md:justify-between">
        <nav className="hidden flex-1 items-center gap-7 lg:gap-9 md:flex" aria-label="Main navigation">
          {left.map((l) => (
            <Link key={l.label} to={l.to} className={navLinkClass} activeProps={{ className: "!text-[#fff0c7]" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="absolute left-4 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-sm border border-[#e9b84f]/70 bg-[#e9b84f] md:hidden"
        >
          <span className={"h-px w-5 bg-[#08233d] transition-transform duration-300 " + (menuOpen ? "translate-y-[3px] rotate-45" : "")} />
          <span className={"h-px w-5 bg-[#08233d] transition-all duration-300 " + (menuOpen ? "opacity-0" : "")} />
          <span className={"h-px w-5 bg-[#08233d] transition-transform duration-300 " + (menuOpen ? "-translate-y-[9px] -rotate-45" : "")} />
        </button>

        <Link
          to="/"
          aria-label="QISSAA — Wear Your Story"
          onClick={() => setMenuOpen(false)}
          className="group flex w-[150px] shrink-0 flex-col items-center justify-center text-[#f0b94b] md:w-[190px]"
        >
          <span className="font-serif text-[31px] leading-[0.95] tracking-[0.075em] transition-colors group-hover:text-[#ffd77a] md:text-[40px]">
            QISSAA
          </span>
          <span className="mt-1 flex w-full items-center justify-center gap-2 font-serif text-[11px] leading-none tracking-[0.02em] md:text-[13px]">
            <span aria-hidden="true" className="h-px w-5 bg-[#f0b94b]/70 md:w-7" />
            <span>Wear Your Story</span>
            <span aria-hidden="true" className="h-px w-5 bg-[#f0b94b]/70 md:w-7" />
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-end md:flex" aria-label="Shopping navigation">
          <Link to="/bag" className="eyebrow inline-flex min-h-10 items-center justify-center border border-[#e9b84f] bg-[#e9b84f] px-5 !text-[#08233d] transition-colors hover:bg-[#ffdc86]" activeProps={{ className: "!bg-[#ffdc86]" }}>
            Bag ({itemCount})
          </Link>
        </nav>

        <Link to="/bag" aria-label={"Bag (" + itemCount + ")"} className="eyebrow absolute right-4 inline-flex min-h-9 items-center justify-center border border-[#e9b84f] bg-[#e9b84f] px-3 !text-[#08233d] md:hidden">
          Bag ({itemCount})
        </Link>
      </div>

      <div
        className={"absolute inset-x-0 top-full border-t border-[#d5a746]/40 bg-[#08233d] px-6 pb-8 pt-6 shadow-xl transition-all duration-300 md:hidden " + (menuOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-2 opacity-0")}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          {left.map((l) => (
            <Link key={l.label} to={l.to} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className={navLinkClass} activeProps={{ className: "!text-[#fff0c7]" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/bag" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="eyebrow inline-flex min-h-10 w-fit items-center justify-center border border-[#e9b84f] bg-[#e9b84f] px-5 !text-[#08233d]">
            Bag ({itemCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}
