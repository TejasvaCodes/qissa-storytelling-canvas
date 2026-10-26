import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Hero } from "@/components/qissa/hero";
import {
  CareAndService,
  CompleteStory,
  Craft,
  Footer,
  Lifestyle,
  Material,
  Newsletter,
  Philosophy,
} from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/velocita")({
  head: () => ({
    meta: [
      { title: "Black Crocodile — QISSAA" },
      {
        name: "description",
        content:
          "Black Crocodile jacket by QISSAA.",
      },
      { property: "og:title", content: "Black Crocodile — QISSAA" },
      {
        property: "og:description",
        content:
          "A statement jacket designed to bring character to your everyday look.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Craft />
        <Material />
        <Lifestyle />
        <CareAndService />
        <CompleteStory />
        <Philosophy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
