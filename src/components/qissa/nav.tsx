import { useEffect, useState } from "react";

const links = ["Collections", "Journal", "Atelier", "Stockists"];

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
          {links.slice(0, 2).map((l) => (
            <a key={l} href="#story" className="eyebrow link-underline text-foreground">
              {l}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="font-serif text-2xl font-light tracking-[0.42em] text-foreground md:text-[1.75rem]"
        >
          QISSA
        </a>

        <nav className="hidden flex-1 items-center justify-end gap-9 md:flex">
          {links.slice(2).map((l) => (
            <a key={l} href="#philosophy" className="eyebrow link-underline text-foreground">
              {l}
            </a>
          ))}
          <a href="#hero" className="eyebrow link-underline text-foreground">
            Bag (0)
          </a>
        </nav>

        <a href="#hero" className="eyebrow link-underline text-foreground md:hidden">
          Bag (0)
        </a>
      </div>
    </header>
  );
}
