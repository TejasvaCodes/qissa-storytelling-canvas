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

function BagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d5a746]/45 bg-[#08233d] shadow-[0_8px_30px_rgba(3,16,29,0.18)]">
      <div className="relative mx-auto flex min-h-[76px] w-full max-w-none items-center justify-between px-5 md:min-h-[88px] md:px-8 lg:px-16 xl:px-20">
        <nav className="hidden min-w-0 flex-1 items-center justify-start gap-6 md:flex lg:gap-9 xl:gap-10" aria-label="Main navigation">
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
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-sm border border-[#e9b84f]/70 bg-[#e9b84f] md:hidden"
        >
          <span className={"h-px w-5 bg-[#08233d] transition-transform duration-300 " + (menuOpen ? "translate-y-[3px] rotate-45" : "")} />
          <span className={"h-px w-5 bg-[#08233d] transition-all duration-300 " + (menuOpen ? "opacity-0" : "")} />
          <span className={"h-px w-5 bg-[#08233d] transition-transform duration-300 " + (menuOpen ? "-translate-y-[9px] -rotate-45" : "")} />
        </button>

        <Link
          to="/"
          aria-label="QISSAA — Wear Your Story"
          onClick={() => setMenuOpen(false)}
          className="absolute left-1/2 flex w-[142px] -translate-x-1/2 shrink-0 flex-col items-center justify-center text-[#f0b94b] md:static md:w-[190px] md:translate-x-0"
        >
          <span className="font-serif text-[29px] leading-[0.95] tracking-[0.075em] transition-colors group-hover:text-[#ffd77a] md:text-[40px]">
            QISSAA
          </span>
          <span className="mt-1 flex w-full items-center justify-center gap-2 font-serif text-[10px] leading-none tracking-[0.02em] md:text-[13px]">
            <span aria-hidden="true" className="h-px w-4 bg-[#f0b94b]/70 md:w-7" />
            <span className="whitespace-nowrap">Wear Your Story</span>
            <span aria-hidden="true" className="h-px w-4 bg-[#f0b94b]/70 md:w-7" />
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end md:flex" aria-label="Shopping navigation">
          <Link to="/bag" className="eyebrow inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] border border-[#e9b84f] bg-transparent px-5 !text-[#e9b84f] shadow-none transition-all hover:bg-[#e9b84f]/10 hover:!text-[#ffd77a] lg:px-6" activeProps={{ className: "!bg-[#e9b84f]/10" }}>
            <BagIcon />
            <span>Bag ({itemCount})</span>
          </Link>
        </nav>

        <Link to="/bag" aria-label={"Bag (" + itemCount + ")"} className="eyebrow inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[3px] border border-[#e9b84f] bg-transparent px-3 !text-[#e9b84f] transition-colors hover:bg-[#e9b84f]/10 md:hidden">
          <BagIcon className="h-4 w-4" />
          <span>Bag ({itemCount})</span>
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
          <Link to="/bag" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="eyebrow inline-flex min-h-10 w-fit items-center justify-center gap-2 border border-[#e9b84f] bg-transparent px-5 !text-[#e9b84f] transition-colors hover:bg-[#e9b84f]/10">
            <BagIcon className="h-4 w-4" />
            Bag ({itemCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}
