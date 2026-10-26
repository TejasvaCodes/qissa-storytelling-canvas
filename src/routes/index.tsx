import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter, Philosophy } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import heroMain from "@/assets/hero-main.jpg";
import craftDark from "@/assets/craft-dark.jpg";
import lifeCity from "@/assets/life-city.jpg";
import lifeMotion from "@/assets/life-motion.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import bcjMain from "../../BCJ main.jpeg";
import bfjMain from "../../BFJ main.jpeg";
import mrjMain from "../../MRJ main.jpeg";
import bhMain from "../../BH main.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QISSAA — Wear Your Story." },
      {
        name: "description",
        content:
          "QISSAA makes leather outerwear in limited numbers — cut by hand, made to be lived in. Discover the Autumn/Winter collection.",
      },
      { property: "og:title", content: "QISSAA — Wear Your Story." },
      {
        property: "og:description",
        content:
          "Leather outerwear made in limited numbers, cut by hand and made to be lived in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const featured = [
  { img: bcjMain, name: "Black Crocodile Jacket", price: "₹ 2,599", to: "/velocita" as const },
  { img: bfjMain, name: "Black Ferrari Jacket", price: "₹ 2,599", to: "/alba-shearling" as const },
  { img: mrjMain, name: "Marlboro Red Jacket", price: "₹ 2,599", to: "/notte-bomber" as const },
  { img: bhMain, name: "Black Henley", price: "₹ 899", to: "/riposo-quilted" as const },
];

function HomePage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="relative">
          <img
            src={heroMain}
            alt="QISSAA leather outerwear, Autumn/Winter campaign"
            width={1408}
            height={1760}
            className="h-[92vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-onyx/25" />
          <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
            <div className="shell">
              <p className="eyebrow !text-background/80">Autumn / Winter — Chapter II</p>
              <h1 className="display mt-6 max-w-[16ch] text-[2.8rem] text-background md:text-[5.4rem]">
                Wear Your Story.
              </h1>
              <div className="mt-12 flex flex-wrap gap-10">
                <Link
                  to="/collections"
                  className="lift eyebrow bg-background px-10 py-5 !text-foreground hover:bg-accent hover:!text-primary-foreground"
                >
                  Discover the Collection
                </Link>
                <Link
                  to="/velocita"
                  className="eyebrow link-underline self-center !text-background"
                >
                  The Black Crocodile Jacket
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-52">
          <div className="shell">
            <h2
              data-reveal
              className="reveal display max-w-[26ch] text-[1.9rem] leading-[1.35] md:text-[3rem]"
            >
              QISSAA is for the stories you choose to tell. From statement jackets to everyday essentials, we bring together distinctive style, thoughtful details, and pieces made to feel unmistakably yours.
            </h2>
          </div>
        </section>

        <section>
          <div className="shell">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h2 data-reveal className="reveal display text-[2.2rem] md:text-[3.2rem]">
                Featured Pieces
              </h2>
              <Link to="/collections" className="eyebrow link-underline text-foreground">
                View All
              </Link>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
              {featured.map((f) => (
                <Link key={f.name} to={f.to ?? "/collections"} data-reveal className="reveal group">
                  <div className="zoom-frame bg-secondary">
                    <img
                      src={f.img}
                      alt={f.name}
                      loading="lazy"
                      width={912}
                      height={1200}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                  <p className="font-serif mt-6 text-xl font-light">{f.name}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2"><p className="eyebrow">{f.price}</p><span className="inline-flex items-center gap-1 border border-[#b89562]/50 bg-[#11100e] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#ead6b5]">✦ Freshers 2K26</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-40 bg-onyx py-32 md:mt-64 md:py-52">
          <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div data-reveal className="reveal zoom-frame">
              <img
                src={craftDark}
                alt="Macro detail of full-grain lambskin"
                loading="lazy"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div data-reveal className="reveal">
              <p className="eyebrow">The Atelier</p>
              <h2 className="display mt-8 text-[2.2rem] text-background md:text-[3.4rem]">
                Made to be worn. Made to be remembered.
              </h2>
              <p className="mt-10 max-w-[40ch] leading-[2] text-background/60">
                Thoughtful design, considered details, and versatile pieces made to bring character to your everyday wardrobe.
              </p>
              <Link
                to="/collections"
                className="eyebrow link-underline mt-14 inline-block !text-background"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-40 md:mt-64">
          <div className="shell grid gap-8 md:grid-cols-3">
            {[
              { img: lifeCity, cap: "The City", txt: "Mornings that begin before the light." },
              { img: lifeMotion, cap: "In Motion", txt: "A jacket that moves with the day." },
              { img: lifeLegacy, cap: "Legacy", txt: "Worn in, handed down, worn again." },
            ].map((i) => (
              <figure key={i.cap} data-reveal className="reveal">
                <div className="zoom-frame bg-secondary">
                  <img
                    src={i.img}
                    alt={i.cap}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-6">
                  <p className="eyebrow">{i.cap}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{i.txt}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Philosophy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
