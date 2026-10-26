import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import lifeNight from "@/assets/life-night.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import story from "@/assets/story.jpg";
import fit from "@/assets/fit.jpg";

const product = {
  id: "mezzanotte-coat",
  name: "Half black Henley",
  category: "Henley",
  number: "07",
  price: 899,
  description: "A short-sleeve Henley essential for easy, everyday styling.",
  views: [
    { src: lifeNight, alt: "QISSAA Half black Henley at night" },
    { src: lifeLegacy, alt: "QISSAA Mezzanotte Coat beside a vintage car" },
    { src: story, alt: "QISSAA Mezzanotte Coat editorial portrait" },
    { src: fit, alt: "QISSAA Mezzanotte Coat full length" },
  ],
};

export const Route = createFileRoute("/mezzanotte-coat")({
  head: () => ({ meta: [
    { title: "Half black Henley — QISSAA" },
    { name: "description", content: "Half black Henley by QISSAA." },
    { property: "og:title", content: "Half black Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
