import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Nav } from "@/components/qissa/nav";
import { Footer } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import heroMain from "@/assets/hero-main.jpg";
import rel3 from "@/assets/rel-3.jpg";
import rel1 from "@/assets/rel-1.jpg";
import rel2 from "@/assets/rel-2.jpg";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Bag — QISSA" },
      {
        name: "description",
        content:
          "Review your QISSA selection, complimentary insured delivery and atelier gift wrapping before checkout.",
      },
      { property: "og:title", content: "Your Bag — QISSA" },
      {
        property: "og:description",
        content: "Review your selection and complete your order with the QISSA atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BagPage,
});

type Line = {
  id: string;
  img: string;
  name: string;
  colour: string;
  size: string;
  price: number;
  qty: number;
};

const initial: Line[] = [
  {
    id: "velocita",
    img: heroMain,
    name: "Velocità",
    colour: "Onyx",
    size: "M",
    price: 48000,
    qty: 1,
  },
  {
    id: "alba",
    img: rel3,
    name: "Alba Shearling",
    colour: "Bone",
    size: "S",
    price: 68000,
    qty: 1,
  },
];

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;

function BagPage() {
  useReveal();
  const [lines, setLines] = useState<Line[]>(initial);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const setQty = (id: string, delta: number) =>
    setLines((ls) =>
      ls.map((l) => (l.id === id ? { ...l, qty: Math.min(9, Math.max(1, l.qty + delta)) } : l)),
    );

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-52">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">
              {lines.length} {lines.length === 1 ? "piece" : "pieces"}
            </p>
            <h1 data-reveal className="reveal display mt-8 text-[2.6rem] md:text-[4rem]">
              Your Bag
            </h1>
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <div className="shell grid gap-20 lg:grid-cols-[1fr_360px] lg:gap-24">
            <div>
              {lines.length === 0 ? (
                <div className="border-t border-border py-24">
                  <p className="text-muted-foreground">Your bag is empty for now.</p>
                  <Link
                    to="/collections"
                    className="eyebrow link-underline mt-8 inline-block text-foreground"
                  >
                    Browse the collection
                  </Link>
                </div>
              ) : (
                <ul>
                  {lines.map((l) => (
                    <li
                      key={l.id}
                      data-reveal
                      className="reveal grid grid-cols-[104px_1fr] gap-8 border-t border-border py-10 sm:grid-cols-[140px_1fr]"
                    >
                      <div className="zoom-frame bg-secondary">
                        <img
                          src={l.img}
                          alt={l.name}
                          loading="lazy"
                          width={560}
                          height={700}
                          className="aspect-[4/5] w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-between gap-8">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="font-serif text-xl font-light">{l.name}</p>
                            <p className="eyebrow mt-3">
                              {l.colour} — Size {l.size}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm tracking-wide">
                            {inr(l.price * l.qty)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-6 text-sm">
                            <button
                              aria-label={`Decrease quantity of ${l.name}`}
                              onClick={() => setQty(l.id, -1)}
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              —
                            </button>
                            <span className="tracking-[0.14em]">{l.qty}</span>
                            <button
                              aria-label={`Increase quantity of ${l.name}`}
                              onClick={() => setQty(l.id, 1)}
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => setLines((ls) => ls.filter((x) => x.id !== l.id))}
                            className="eyebrow link-underline text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-16 border-t border-border pt-10">
                <p className="eyebrow">You may also consider</p>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  {[
                    { img: rel1, name: "Notte Bomber", price: "₹ 42,000" },
                    { img: rel2, name: "Strada Blouson", price: "₹ 39,500" },
                  ].map((s) => (
                    <Link key={s.name} to="/velocita" className="group flex items-center gap-6">
                      <div className="zoom-frame w-24 shrink-0 bg-secondary">
                        <img
                          src={s.img}
                          alt={s.name}
                          loading="lazy"
                          width={384}
                          height={480}
                          className="aspect-[4/5] w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-lg font-light">{s.name}</p>
                        <p className="eyebrow mt-2">{s.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* summary */}
            <aside data-reveal className="reveal h-fit bg-secondary p-10 lg:sticky lg:top-32">
              <p className="eyebrow">Order Summary</p>

              <dl className="mt-10 space-y-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tracking-wide">{inr(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Insured Delivery</dt>
                  <dd className="tracking-wide">Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Duties & Taxes</dt>
                  <dd className="tracking-wide">Included</dd>
                </div>
              </dl>

              <div className="mt-10 flex items-baseline justify-between border-t border-border pt-8">
                <p className="eyebrow">Total</p>
                <p className="font-serif text-2xl font-light">{inr(subtotal)}</p>
              </div>

              <button className="lift eyebrow mt-12 w-full bg-foreground py-5 !text-primary-foreground hover:bg-accent">
                Proceed to Checkout
              </button>

              <Link
                to="/collections"
                className="eyebrow link-underline mt-8 inline-block text-foreground"
              >
                Continue Browsing
              </Link>

              <p className="mt-12 max-w-[34ch] text-xs leading-relaxed text-muted-foreground">
                Every order arrives in an archival garment bag with a hand-numbered card. Returns
                accepted within 14 days, unworn.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
