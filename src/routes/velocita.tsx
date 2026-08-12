import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Hero } from "@/components/qissa/hero";
import {
  CareAndService,
  CompleteStory,
  Craft,
  Fit,
  Footer,
  Lifestyle,
  Material,
  Newsletter,
  Philosophy,
  Story,
} from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/velocita")({
  head: () => ({
    meta: [
      { title: "Velocità Leather Jacket — QISSA" },
      {
        name: "description",
        content:
          "The Velocità jacket: glove-soft lambskin drawn from motorsport heritage, made in limited numbers by the Qissa atelier.",
      },
      { property: "og:title", content: "Velocità Leather Jacket — QISSA" },
      {
        property: "og:description",
        content:
          "Motorsport heritage, modern wardrobe. Full-grain lambskin, quilted lining, made to age well.",
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
        <Story />
        <Craft />
        <Material />
        <Lifestyle />
        <Fit />
        <CareAndService />
        <CompleteStory />
        <Philosophy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
