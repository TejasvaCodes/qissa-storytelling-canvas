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
import fit from "@/assets/fit.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — QISSA Leather Outerwear" },
      { name: "description", content: "Browse the QISSA collection: leather outerwear, shearling and quilted pieces made in limited numbers by our atelier." },
      { property: "og:title", content: "Collections — QISSA" },
      { property: "og:description", content: "Leather outerwear made in limited numbers. Wear Your Story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

const filters = ["All", "Outerwear", "Shearling", "Quilted", "Archive"];

const pieces = [
  { img: heroMain, name: "Velocità", cat: "Outerwear", price: "₹ 48,000", to: "/velocita" as const },
  { img: rel1, name: "Notte Bomber", cat: "Outerwear", price: "₹ 42,000", to: "/notte-bomber" as const },
  { img: rel2, name: "Strada Blouson", cat: "Outerwear", price: "₹ 39,500", to: "/strada-blouson" as const },
  { img: rel3, name: "Alba Shearling", cat: "Shearling", price: "₹ 68,000", to: "/alba-shearling" as const },
  { img: rel4, name: "Riposo Quilted", cat: "Quilted", price: "₹ 44,000", to: "/riposo-quilted" as const },
  { img: gallery2, name: "Sera Moto", cat: "Outerwear", price: "₹ 52,000", to: "/sera-moto" as const },
  { img: lifeNight, name: "Mezzanotte Coat", cat: "Archive", price: "₹ 74,000", to: "/mezzanotte-coat" as const },
  { img: lifeCity, name: "Corso Overshirt", cat: "Archive", price: "₹ 28,000", to: "/corso-overshirt" as const },
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
              Eight pieces, cut from a single idea: outerwear that carries a life in it. Each garment is produced in a limited run and finished by hand in our atelier.
            </p>
          </div>
        </section>

        <section className="mt-24 md:mt-32">
          <div className="shell">
            <div className="flex flex-wrap gap-8 border-b border-border pb-6">
              {filters.map((f, i) => <button key={f} className={`eyebrow transition-colors duration-500 ${i === 0 ? "!text-foreground" : "hover:!text-foreground"}`}>{f}</button>)}
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
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

        <section className="mt-40 md:mt-64">
          <div className="shell grid items-center gap-16 lg:grid-cols-2">
            <div data-reveal className="reveal zoom-frame bg-secondary">
              <img src={fit} alt="Model wearing a QISSA leather jacket, full length" loading="lazy" width={1200} height={1500} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div data-reveal className="reveal">
              <p className="eyebrow">Private Appointment</p>
              <h2 className="display mt-8 text-[2.2rem] md:text-[3.2rem]">See the collection in person.</h2>
              <p className="mt-10 max-w-[42ch] leading-[2] text-muted-foreground">Our atelier receives a small number of guests each week for fittings, alterations and archive viewings.</p>
              <button className="lift eyebrow mt-14 bg-foreground px-10 py-5 !text-primary-foreground hover:bg-accent">Book an Appointment</button>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
