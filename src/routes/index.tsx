import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter, Philosophy } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import heroMain from "@/assets/hero-main.jpg";
import craftDark from "@/assets/craft-dark.jpg";
import storyImg from "@/assets/story.jpg";
import lifeCity from "@/assets/life-city.jpg";
import lifeMotion from "@/assets/life-motion.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import rel1 from "@/assets/rel-1.jpg";
import rel3 from "@/assets/rel-3.jpg";
import rel4 from "@/assets/rel-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QISSA — Wear Your Story." },
      {
        name: "description",
        content:
          "QISSA makes leather outerwear in limited numbers — cut by hand, made to be lived in. Discover the Autumn/Winter collection.",
      },
      { property: "og:title", content: "QISSA — Wear Your Story." },
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
  { img: heroMain, name: "Velocità", price: "₹ 48,000", to: "/velocita" as const },
  { img: rel3, name: "Alba Shearling", price: "₹ 68,000" },
  { img: rel1, name: "Notte Bomber", price: "₹ 42,000" },
  { img: rel4, name: "Riposo Quilted", price: "₹ 44,000" },
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
            alt="QISSA leather outerwear, Autumn/Winter campaign"
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
                  The Velocità Jacket
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
              Qissa means story. We make a small number of garments each season, in leather that
              takes years to look its best.
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
                  <p className="eyebrow mt-2">{f.price}</p>
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
                Ninety hours, one jacket.
              </h2>
              <p className="mt-10 max-w-[40ch] leading-[2] text-background/60">
                Every panel is cut by hand, every lining set by a single maker. We finish nothing
                until it feels inevitable.
              </p>
              <Link
                to="/velocita"
                className="eyebrow link-underline mt-14 inline-block !text-background"
              >
                Read the Making
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

        <section className="mt-40 md:mt-64">
          <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div data-reveal className="reveal order-2 lg:order-1">
              <p className="eyebrow">Journal</p>
              <h2 className="display mt-8 text-[2.2rem] md:text-[3.2rem]">
                Notes from the House
              </h2>
              <p className="mt-10 max-w-[40ch] leading-[2] text-muted-foreground">
                Conversations with the makers, the tanneries and the people who wear our garments
                until they look like their own.
              </p>
              <Link to="/journal" className="eyebrow link-underline mt-14 inline-block text-foreground">
                Read the Journal
              </Link>
            </div>
            <div data-reveal className="reveal order-1 zoom-frame bg-secondary lg:order-2">
              <img
                src={storyImg}
                alt="QISSA editorial portrait"
                loading="lazy"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <Philosophy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
