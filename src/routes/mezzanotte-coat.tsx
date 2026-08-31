import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import lifeNight from "@/assets/life-night.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import story from "@/assets/story.jpg";
import fit from "@/assets/fit.jpg";

const product = {
  id: "mezzanotte-coat",
  name: "Mezzanotte Coat",
  category: "Archive",
  number: "07",
  price: 74000,
  description: "A long-form leather coat with an elongated line and quiet presence, kept from the archive for those who prefer depth over novelty.",
  views: [
    { src: lifeNight, alt: "QISSA Mezzanotte Coat at night" },
    { src: lifeLegacy, alt: "QISSA Mezzanotte Coat beside a vintage car" },
    { src: story, alt: "QISSA Mezzanotte Coat editorial portrait" },
    { src: fit, alt: "QISSA Mezzanotte Coat full length" },
  ],
};

export const Route = createFileRoute("/mezzanotte-coat")({
  head: () => ({ meta: [
    { title: "Mezzanotte Coat — QISSA" },
    { name: "description", content: "The Mezzanotte Coat by QISSA — an archive leather coat made in limited numbers." },
    { property: "og:title", content: "Mezzanotte Coat — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
