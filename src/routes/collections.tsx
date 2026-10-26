import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import heroMain from "@/assets/hero-main.jpg";
import rel1 from "@/assets/rel-1.jpg";
import rel2 from "@/assets/rel-2.jpg";
import rel3 from "@/assets/rel-3.jpg";
import rel4 from "@/assets/rel-4.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import lifeNight from "@/assets/life-night.jpg";
import lifeCity from "@/assets/life-city.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — QISSAA Leather Outerwear" },
      { name: "description", content: "Browse the QISSAA collection: leather outerwear, shearling and quilted pieces made in limited numbers by our atelier." },
      { property: "og:title", content: "Collections — QISSAA" },
      { property: "og:description", content: "Leather outerwear made in limited numbers. Wear Your Story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

const pieces = [
  { img: heroMain, name: "Black Crocodile", cat: "Jacket", price: "₹ 2,500", to: "/velocita" as const },
  { img: rel1, name: "Marlboro Red", cat: "Jacket", price: "₹ 2,500", to: "/notte-bomber" as const },
  { img: rel2, name: "Porsche Green", cat: "Jacket", price: "₹ 2,500", to: "/strada-blouson" as const },
  { img: rel3, name: "Black Ferrari", cat: "Jacket", price: "₹ 2,500", to: "/alba-shearling" as const },
  { img: rel4, name: "Black Henley", cat: "Henley", price: "₹ 900", to: "/riposo-quilted" as const },
  { img: gallery2, name: "White Henley", cat: "Henley", price: "₹ 900", to: "/sera-moto" as const },
  { img: lifeNight, name: "Half black Henley", cat: "Henley", price: "₹ 900", to: "/mezzanotte-coat" as const },
  { img: lifeCity, name: "Half white Henley", cat: "Henley", price: "₹ 900", to: "/corso-overshirt" as const },
];

function CollectionsPage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">Autumn / Winter — Chapter II</p>
            <h1 data-reveal className="reveal display mt-8 text-[2.8rem] md:text-[5rem]">The Collection</h1>
            <p data-reveal className="reveal mt-12 max-w-[52ch] leading-[2] text-muted-foreground">
              Eight pieces, one QISSAA point of view: statement jackets and everyday Henleys, made to wear your story.
            </p>
          </div>
        </section>

        <section className="mt-24 md:mt-32">
          <div className="shell">
            <div className="mt-0 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {pieces.map((p) => (
                <Link key={p.name} to={p.to} data-reveal className="reveal group">
                  <div className="zoom-frame bg-secondary">
                    <img src={p.img} alt={`${p.name} — ${p.cat}`} loading="lazy" width={912} height={1200} className="aspect-[3/4] w-full object-cover" />
                  </div>
                  <p className="font-serif mt-6 text-xl font-light">{p.name}</p>
                  <p className="eyebrow mt-2">{p.cat}</p>
                  <p className="mt-3 text-sm tracking-wide">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
