import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const left = [
  { label: "Collections", to: "/collections" as const },
  { label: "The Jacket", to: "/velocita" as const },
];

const right = [
  { label: "Account", to: "/account" as const },
  { label: "Bag (0)", to: "/bag" as const },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ${
        solid
          ? "bg-background/80 py-4 backdrop-blur-xl md:py-5"
          : "bg-transparent py-6 md:py-9"
      }`}
    >
      <div className="shell flex items-center justify-between">
        <nav className="hidden flex-1 items-center gap-9 md:flex">
          {left.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="eyebrow link-underline text-foreground"
              activeProps={{ className: "!text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="font-serif text-2xl font-light tracking-[0.42em] text-foreground md:text-[1.75rem]"
        >
          QISSA
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-9 md:flex">
          {right.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="eyebrow link-underline text-foreground"
              activeProps={{ className: "!text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/bag" className="eyebrow link-underline text-foreground md:hidden">
          Bag (0)
        </Link>
      </div>
    </header>
  );
}
