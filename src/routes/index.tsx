import { Link, createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import prfrHero from "../../prfr.png";
import crocImage from "../../CROC.png";
import bcjMain from "../../BCJ main.jpeg";
import bfjMain from "../../BFJ main.jpeg";
import mrjMain from "../../MRJ main.jpeg";
import bhMain from "../../BH main.jpeg";
import ferrariFront from "../../Ferrari-front-high-resolution.jpg";
import adfrrImage from "../../adfrr.JPG";
import img4600 from "../../IMG_4600.JPG";
import vikramImage from "../../vikram.png";

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

function HomePage() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="relative mt-0 h-[100svh] min-h-[420px] overflow-hidden bg-[#08233d]">
          <Link to="/velocita" aria-label="Shop Black Crocodile Jacket" className="absolute inset-0 grid grid-cols-1">
            {[prfrHero].map((image, index) => (
              <div key={index} className="h-full min-w-0 overflow-hidden">
                {image && (
                  <img
                    src={image}
                    alt={`QISSAA fashion campaign portrait ${index + 1}`}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="h-full w-full object-cover object-center"
                  />
                )}
              </div>
            ))}
          </Link>
          <div className="pointer-events-none absolute bottom-[7%] right-[5%] z-10">
            <span className="block whitespace-nowrap font-serif text-[clamp(7.875rem,18.375vw,17.0625rem)] font-normal leading-none tracking-[-0.09em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.28)]">QISSAA</span>
          </div>
        </section>

        <section className="m-0 w-full bg-[#08233d] p-0">
          <Link to="/velocita" aria-label="Shop Black Crocodile Jacket" className="block">
            <img
              src={vikramImage}
              alt="QISSAA Vikram campaign"
              loading="lazy"
              className="block h-auto w-full object-contain object-center"
            />
          </Link>
        </section>

        <section className="m-0 w-full bg-[#08233d] p-0">
          <Link to="/alba-shearling" aria-label="Shop Black Ferrari Jacket" className="block">
            <img
              src={ferrariFront}
              alt="Ferrari front view"
              loading="lazy"
              className="block h-auto w-full object-contain object-center"
            />
          </Link>
        </section>

        <section className="relative m-0 w-full bg-[#08233d] p-0">
          <Link to="/black-waffle-henley" aria-label="Shop Black Waffle Henley" className="block">
            <img
              src={adfrrImage}
              alt="QISSAA campaign"
              loading="lazy"
              className="block h-auto w-full object-contain object-center"
            />
          </Link>
          <div className="pointer-events-none absolute left-[5%] top-[7%] z-10">
            <span className="block whitespace-nowrap font-serif text-[clamp(7.875rem,18.375vw,17.0625rem)] font-normal leading-none tracking-[-0.09em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.28)]">QISSAA</span>
          </div>
        </section>

        <section className="relative m-0 h-[100svh] min-h-[420px] w-full overflow-hidden bg-onyx p-0">
          <Link to="/black-waffle-henley" aria-label="Shop Black Waffle Henley" className="absolute inset-0 block">
            <img
              src={img4600}
              alt="QISSAA campaign"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </Link>
        </section>

        <section className="m-0 w-full bg-onyx py-0 md:mt-0 md:py-0">
          <div className="grid min-h-[100svh] items-center gap-0 lg:grid-cols-2 lg:gap-0">
            <div data-reveal className="reveal zoom-frame m-0 flex h-[100svh] w-full items-center justify-start overflow-hidden">
              <img
                src={crocImage}
                alt="Close-up of QISSAA black crocodile leather"
                loading="lazy"
                width={1200}
                height={1500}
                className="block h-full max-h-[100svh] w-full object-contain object-left"
              />
            </div>
            <div data-reveal className="reveal px-8 py-12 md:px-12 lg:pr-16">
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

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
