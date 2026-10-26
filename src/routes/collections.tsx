import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import bcjMain from "../../BCJ main.jpeg";
import mrjMain from "../../MRJ main.jpeg";
import pgjMain from "../../PGJ main.jpeg";
import bfjMain from "../../BFJ main.jpeg";
import bhMain from "../../BH main.jpeg";
import whMain from "../../WH main.jpeg";
import hbhMain from "../../HBH main.jpeg";
import hwhMain from "../../HWH main.jpeg";

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
  { img: bcjMain, name: "Black Crocodile", cat: "Jacket", price: "₹ 2,599", to: "/velocita" as const },
  { img: mrjMain, name: "Marlboro Red", cat: "Jacket", price: "₹ 2,599", to: "/notte-bomber" as const },
  { img: pgjMain, name: "Porsche Green", cat: "Jacket", price: "₹ 2,599", to: "/strada-blouson" as const },
  { img: bfjMain, name: "Black Ferrari", cat: "Jacket", price: "₹ 2,599", to: "/alba-shearling" as const },
  { img: bhMain, name: "Black Henley", cat: "Henley", price: "₹ 899", to: "/riposo-quilted" as const },
  { img: whMain, name: "White Henley", cat: "Henley", price: "₹ 899", to: "/sera-moto" as const },
  { img: hbhMain, name: "Half black Henley", cat: "Henley", price: "₹ 899", to: "/mezzanotte-coat" as const },
  { img: hwhMain, name: "Half white Henley", cat: "Henley", price: "₹ 899", to: "/corso-overshirt" as const },
];

function CollectionsPage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">OPENING SALE · VESIT 2026 FRESHERS</p>
            <h1 data-reveal className="reveal display mt-8 text-[2.8rem] md:text-[5rem]">Opening Sale — VESIT 2026 Freshers</h1>
            <p data-reveal className="reveal mt-12 max-w-[52ch] leading-[2] text-muted-foreground">
              Celebrating our collaboration with VESIT 2026 Freshers. Opening Sale with VESIT 2026 Freshers: jackets ₹2,599 (was ₹4,300) and Henleys ₹899 (was ₹1,900). Limited-time pricing.
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
                  <span className="mt-3 inline-flex items-center gap-1 border border-[#b89562]/50 bg-[#11100e] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#ead6b5]">✦ Freshers Fiesta 2K26</span>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2 text-sm tracking-wide"><span className="text-muted-foreground line-through">{p.cat === "Jacket" ? "₹ 4,300" : p.cat === "Henley" ? "₹ 1,900" : ""}</span><span>{p.price}</span>{p.cat === "Jacket" ? <span className="text-xs text-muted-foreground">Save ₹1,701</span> : p.cat === "Henley" ? <span className="text-xs text-muted-foreground">Save ₹1,000</span> : null}</div>
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
