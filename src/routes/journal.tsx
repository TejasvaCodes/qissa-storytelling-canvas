import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import heroMain from "@/assets/hero-main.jpg";
import craftDark from "@/assets/craft-dark.jpg";
import lifeCity from "@/assets/life-city.jpg";
import lifeMotion from "@/assets/life-motion.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — QISSA" },
      {
        name: "description",
        content:
          "Stories from QISSA — the places, materials and ideas behind what we make.",
      },
    ],
  }),
  component: JournalPage,
});

const entries = [
  {
    number: "01",
    tag: "THE HOUSE",
    title: "Why we chose to begin with a story.",
    body: "QISSA was never meant to be a collection of objects that simply look good in photographs. We wanted to make pieces that gather evidence of the lives lived in them.",
    image: lifeCity,
    label: "Read the story",
  },
  {
    number: "02",
    tag: "THE MATERIAL",
    title: "A surface that gets better with time.",
    body: "Leather remembers. Light changes it, movement softens it and years give it a character that cannot be designed on a screen.",
    image: craftDark,
    label: "Inside the atelier",
  },
  {
    number: "03",
    tag: "IN MOTION",
    title: "Clothes are made for the life outside the frame.",
    body: "A good garment should disappear when you wear it and become part of the way you move through a city, a night or a season.",
    image: lifeMotion,
    label: "Continue reading",
  },
];

function JournalPage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative min-h-screen bg-onyx text-background">
          <img
            src={heroMain}
            alt="QISSA campaign"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-onyx/55" />

          <div className="shell relative flex min-h-screen flex-col justify-end pb-16 pt-36 md:pb-24 md:pt-48">
            <p data-reveal className="reveal eyebrow !text-background/60">
              QISSA / JOURNAL / VOL. 01
            </p>
            <h1
              data-reveal
              className="reveal display mt-8 max-w-[10ch] text-[4.4rem] leading-[0.88] text-background md:text-[8.5rem]"
            >
              Stories worth wearing.
            </h1>
            <div className="mt-14 flex flex-wrap items-end justify-between gap-10 border-t border-background/20 pt-7">
              <p data-reveal className="reveal max-w-[48ch] leading-[1.9] text-background/70">
                Notes on craft, movement, memory and the people who give clothes a life beyond the first wear.
              </p>
              <p className="eyebrow !text-background/60">Scroll to begin ↓</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-28 md:py-48">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <p data-reveal className="reveal eyebrow lg:col-span-3">An introduction</p>
            <div data-reveal className="reveal lg:col-span-8 lg:col-start-5">
              <h2 className="display text-[2.6rem] leading-[1.15] md:text-[4.6rem]">
                Not a blog. Not a catalogue. A place for everything around the garment.
              </h2>
              <p className="mt-10 max-w-[52ch] leading-[2] text-muted-foreground">
                The Journal is where QISSA slows down. Here, we keep the references, materials, places and thoughts that shape each chapter. Some stories begin with a jacket. Others have nothing to do with one.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial entries */}
        <section className="border-t border-border">
          {entries.map((entry, index) => (
            <article
              key={entry.number}
              className={`shell grid gap-10 border-b border-border py-16 md:py-28 lg:grid-cols-12 lg:gap-16 ${index % 2 === 1 ? "" : ""}`}
            >
              <div data-reveal className="reveal lg:col-span-2">
                <p className="font-serif text-4xl font-light">{entry.number}</p>
                <p className="eyebrow mt-4">{entry.tag}</p>
              </div>

              <div data-reveal className="reveal zoom-frame bg-secondary lg:col-span-5">
                <img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div data-reveal className="reveal flex flex-col justify-center lg:col-span-4 lg:col-start-9">
                <h2 className="display text-[2.4rem] leading-[1.05] md:text-[3.5rem]">
                  {entry.title}
                </h2>
                <p className="mt-8 leading-[1.9] text-muted-foreground">{entry.body}</p>
                <a href="#top" className="eyebrow link-underline mt-10 w-fit text-foreground">
                  {entry.label}
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Manifesto */}
        <section className="bg-onyx py-28 text-background md:py-48">
          <div className="shell">
            <p data-reveal className="reveal eyebrow !text-background/50">A note to keep</p>
            <blockquote data-reveal className="reveal display mt-10 max-w-[17ch] text-[3.2rem] leading-[1.05] md:mt-16 md:text-[6.2rem]">
              “The best things do not stay new. They become yours.”
            </blockquote>
            <p className="eyebrow mt-14 !text-background/50">— QISSA</p>
          </div>
        </section>

        {/* Closing image */}
        <section className="relative h-[70vh] md:h-screen">
          <img
            src={lifeLegacy}
            alt="QISSA legacy story"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-onyx/20" />
          <div className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
            <div className="shell">
              <p className="eyebrow !text-background/70">THE NEXT CHAPTER</p>
              <h2 className="display mt-6 max-w-[13ch] text-[3rem] text-background md:text-[5.5rem]">
                Still being written.
              </h2>
              <Link
                to="/collections"
                className="eyebrow link-underline mt-10 inline-block !text-background"
              >
                Explore the collection
              </Link>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
