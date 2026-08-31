import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import story from "@/assets/story.jpg";
import craftDark from "@/assets/craft-dark.jpg";
import lifeCity from "@/assets/life-city.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import lifeNight from "@/assets/life-night.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — The Story of QISSA" },
      {
        name: "description",
        content:
          "The story and philosophy behind QISSA — considered leather outerwear, made in limited numbers for a life well lived.",
      },
      { property: "og:title", content: "Journal — QISSA" },
      {
        property: "og:description",
        content: "The story, craft and philosophy behind QISSA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        {/* Opening chapter */}
        <section className="pt-40 md:pt-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">
              The QISSA Journal
            </p>
            <h1
              data-reveal
              className="reveal display mt-8 max-w-[14ch] text-[3.4rem] leading-[0.98] md:text-[6.5rem]"
            >
              Every garment has a story.
            </h1>
            <p
              data-reveal
              className="reveal mt-12 max-w-[52ch] text-[1.05rem] leading-[2] text-muted-foreground md:mt-16"
            >
              QISSA means story. This is ours — why we began, what we believe, and why we choose
              to make fewer things with more intention.
            </p>
          </div>
        </section>

        <section className="mt-24 md:mt-36">
          <div data-reveal className="reveal zoom-frame">
            <img
              src={story}
              alt="QISSA editorial portrait in a concrete corridor"
              width={1600}
              height={1100}
              className="h-[62vh] w-full object-cover md:h-[78vh]"
            />
          </div>
        </section>

        {/* Origin */}
        <section className="py-32 md:py-56">
          <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p data-reveal className="reveal eyebrow">
                Chapter I — The Beginning
              </p>
            </div>
            <div data-reveal className="reveal lg:col-span-7 lg:col-start-6">
              <h2 className="display text-[2.5rem] leading-[1.15] md:text-[4rem]">
                We wanted clothes that could become memories.
              </h2>
              <div className="mt-12 space-y-7 leading-[2] text-muted-foreground">
                <p>
                  QISSA began with a simple observation: the best pieces in a wardrobe are rarely
                  the newest ones. They are the jackets that have travelled, softened, collected
                  marks and become inseparable from the person wearing them.
                </p>
                <p>
                  We looked to the confidence of vintage motorsport, the discipline of atelier
                  craft and the quiet practicality of everyday outerwear. Then we removed the
                  excess. What remained was a belief that a great jacket should feel considered
                  today and even better years from now.
                </p>
                <p>
                  That belief became QISSA — a house built around the idea that what you wear can
                  hold a chapter of your life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy statement */}
        <section className="bg-onyx py-32 text-background md:py-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow !text-background/50">
              Chapter II — Our Philosophy
            </p>
            <h2
              data-reveal
              className="reveal mt-10 max-w-[17ch] display text-[3rem] leading-[1.05] md:text-[5.5rem]"
            >
              Make less. Make it matter.
            </h2>
            <p
              data-reveal
              className="reveal mt-16 max-w-[52ch] text-[1rem] leading-[2] text-background/60 md:mt-24"
            >
              We do not design for a season that disappears in three months. We design for the
              years after the purchase — for the places you will go, the people you will meet,
              and the memories that will slowly become part of the garment itself.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-32 md:py-56">
          <div className="shell">
            <div className="grid gap-16 md:grid-cols-3 md:gap-10">
              {[
                {
                  number: "01",
                  title: "Intention",
                  body: "Every seam, pocket and piece of hardware has a purpose. We remove decoration when it does not serve the garment.",
                },
                {
                  number: "02",
                  title: "Longevity",
                  body: "We choose materials and construction for a long life. Wear creates character; it should never be something to hide.",
                },
                {
                  number: "03",
                  title: "Individuality",
                  body: "A QISSA piece is finished by the person who wears it. No two stories unfold in quite the same way.",
                },
              ].map((item) => (
                <article key={item.number} data-reveal className="reveal border-t border-border pt-7">
                  <p className="eyebrow text-accent">{item.number}</p>
                  <h3 className="display mt-7 text-[2rem] md:text-[2.5rem]">{item.title}</h3>
                  <p className="mt-6 leading-[1.9] text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Craft */}
        <section className="bg-secondary py-32 md:py-56">
          <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div data-reveal className="reveal zoom-frame">
              <img
                src={craftDark}
                alt="Close-up of QISSA leather and stitching"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div data-reveal className="reveal">
              <p className="eyebrow">Chapter III — The Making</p>
              <h2 className="display mt-8 text-[2.5rem] md:text-[4rem]">
                Time is part of the design.
              </h2>
              <p className="mt-10 max-w-[42ch] leading-[2] text-muted-foreground">
                Our pieces are made in limited numbers and finished with the patience that good
                leather demands. Panels are cut carefully, construction is checked by hand, and
                the final garment is judged by how it feels rather than how quickly it can leave
                the atelier.
              </p>
              <p className="mt-7 max-w-[42ch] leading-[2] text-muted-foreground">
                We would rather make fewer jackets and know every one of them deserves its place
                in someone's story.
              </p>
            </div>
          </div>
        </section>

        {/* Life and patina */}
        <section className="py-32 md:py-56">
          <div className="shell">
            <div className="max-w-[42ch]">
              <p data-reveal className="reveal eyebrow">
                Chapter IV — Worn In
              </p>
              <h2 data-reveal className="reveal display mt-8 text-[2.5rem] md:text-[4rem]">
                The first mark is the beginning, not the end.
              </h2>
            </div>

            <div className="mt-20 grid gap-8 md:mt-32 md:grid-cols-12">
              <div data-reveal className="reveal zoom-frame md:col-span-7">
                <img
                  src={lifeCity}
                  alt="QISSA jacket worn in the city"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div data-reveal className="reveal zoom-frame md:col-span-4 md:col-start-9 md:mt-40">
                <img
                  src={lifeLegacy}
                  alt="QISSA jacket resting beside a vintage car"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-20 grid items-center gap-12 md:mt-32 md:grid-cols-12">
              <div data-reveal className="reveal md:col-span-5 md:col-start-2">
                <img
                  src={lifeNight}
                  alt="QISSA portrait at night"
                  loading="lazy"
                  width={1408}
                  height={912}
                  className="w-full object-cover"
                />
              </div>
              <blockquote data-reveal className="reveal md:col-span-5 md:col-start-8">
                <p className="display text-[1.8rem] italic leading-[1.3] md:text-[2.5rem]">
                  “A garment should not announce you. It should remember you.”
                </p>
                <footer className="eyebrow mt-8">QISSA Atelier — Notes, No. 04</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border py-32 md:py-48">
          <div className="shell text-center">
            <p data-reveal className="reveal eyebrow">
              The next chapter is yours.
            </p>
            <h2
              data-reveal
              className="reveal mx-auto mt-8 max-w-[13ch] display text-[3rem] md:text-[5rem]"
            >
              Wear Your Story.
            </h2>
            <Link
              to="/collections"
              className="lift eyebrow mt-12 inline-flex bg-foreground px-10 py-5 !text-primary-foreground hover:bg-accent"
            >
              Explore the Collection
            </Link>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
