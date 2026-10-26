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
      { title: "Journal — QISSAA" },
      {
        name: "description",
        content:
          "Stories from QISSAA — the places, materials and ideas behind what we make.",
      },
    ],
  }),
  component: JournalPage,
});

const entries = [
  {
    number: "01",
    tag: "OUR STORY",
    title: "Style is personal.",
    body: "Trends come and go. Personal style stays with you. It lives in the jacket you reach for, the colours you return to and the details that feel unmistakably yours. The best outfit is the one that feels like you.",
    image: lifeCity,
    label: "Wear it your way",
  },
  {
    number: "02",
    tag: "THE STATEMENT PIECE",
    title: "Some pieces speak for themselves.",
    body: "A great jacket can change the feel of an outfit. From motorsport-inspired designs to distinctive textures and classic silhouettes, find the fit, material and details that express your personality.",
    image: craftDark,
    label: "Find your fit",
  },
  {
    number: "03",
    tag: "THE EVERYDAY EDIT",
    title: "The pieces you keep coming back to.",
    body: "A well-chosen Henley. A comfortable fit. A colour that works with almost everything. Everyday essentials make getting dressed feel effortless—and give your personal style room to grow.",
    image: lifeMotion,
    label: "Explore the collection",
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
            alt="QISSAA campaign"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-onyx/55" />

          <div className="shell relative flex min-h-screen flex-col justify-end pb-16 pt-36 md:pb-24 md:pt-48">
            <p data-reveal className="reveal eyebrow !text-background/60">
              QISSAA / JOURNAL / VOL. 01
            </p>
            <h1
              data-reveal
              className="reveal display mt-8 max-w-[10ch] text-[4.4rem] leading-[0.88] text-background md:text-[8.5rem]"
            >
              Wear your story.
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
            <p data-reveal className="reveal eyebrow lg:col-span-3">THE QISSAA POINT OF VIEW</p>
            <div data-reveal className="reveal lg:col-span-8 lg:col-start-5">
              <h2 className="display text-[2.6rem] leading-[1.15] md:text-[4.6rem]">
                More than clothes. A way to express yourself.
              </h2>
              <p className="mt-10 max-w-[52ch] leading-[2] text-muted-foreground">
                QISSAA brings together thoughtful designs, versatile styles and quality materials for a generation that wants to look good, feel confident and make its own choices. No fixed rules. No single definition of style. Just clothing that lets you be yourself.
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
              “Wear what you love. Make it your own.”
            </blockquote>
            <p className="eyebrow mt-14 !text-background/50">— QISSAA</p>
          </div>
        </section>

        {/* Closing image */}
        <section className="relative h-[70vh] md:h-screen">
          <img
            src={lifeLegacy}
            alt="QISSAA legacy story"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-onyx/20" />
          <div className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
            <div className="shell">
              <p className="eyebrow !text-background/70">THE NEXT CHAPTER</p>
              <h2 className="display mt-6 max-w-[13ch] text-[3rem] text-background md:text-[5.5rem]">
                Your style. Your story. Your QISSAA.
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
