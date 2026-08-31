import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Craft, Footer, Lifestyle, Material, Newsletter, Philosophy, Story } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";
import heroMain from "@/assets/hero-main.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — The Story of QISSA" },
      { name: "description", content: "The story, craft and philosophy behind QISSA — garments made with intention, built to become part of your story." },
      { property: "og:title", content: "Journal — QISSA" },
      { property: "og:description", content: "The story, craft and philosophy behind QISSA." },
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
        <section className="relative min-h-[88vh] overflow-hidden bg-onyx text-background">
          <img src={heroMain} alt="QISSA leather jacket editorial campaign" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="shell relative flex min-h-[88vh] items-end pb-20 pt-40 md:pb-28 md:pt-56">
            <div className="max-w-[58rem]">
              <p data-reveal className="reveal eyebrow !text-background/65">The QISSA Journal — Chapter I</p>
              <h1 data-reveal className="reveal display mt-8 max-w-[12ch] text-[3.6rem] leading-[0.94] md:text-[7rem]">Wear Your Story.</h1>
              <p data-reveal className="reveal mt-8 max-w-[48ch] text-base leading-[1.9] text-background/75 md:mt-12 md:text-lg">
                QISSA means story. This is ours — where it began, what we believe, and why we make garments meant to live with you rather than simply be worn by you.
              </p>
              <Link to="/collections" data-reveal className="reveal lift eyebrow mt-10 inline-flex border border-background/60 px-9 py-5 !text-background hover:bg-background hover:!text-foreground">Explore the Collection</Link>
            </div>
          </div>
        </section>

        <Story />
        <Craft />
        <Material />
        <Lifestyle />
        <Philosophy />

        <section className="border-t border-border py-32 md:py-52">
          <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
            <p data-reveal className="reveal eyebrow lg:col-span-3">The QISSA Journal — Final Note</p>
            <div data-reveal className="reveal lg:col-span-7 lg:col-start-5">
              <h2 className="display text-[2.8rem] leading-[1.08] md:text-[5rem]">Nothing is released until it is finished.</h2>
              <p className="mt-10 max-w-[50ch] leading-[2] text-muted-foreground">
                Qissa means story. We make a small number of garments each season, in leather that takes years to look its best, for people who have no interest in looking new. Nothing is released until it is finished — and nothing is finished until it feels inevitable.
              </p>
              <blockquote className="mt-14 border-l border-accent pl-7">
                <p className="display text-[1.5rem] italic md:text-[2rem]">“A garment should not announce you. It should remember you.”</p>
                <footer className="eyebrow mt-5">QISSA Atelier — Notes, No. 04</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
