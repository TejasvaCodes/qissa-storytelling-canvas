import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel1 from "@/assets/rel-1.jpg";
import rel2 from "@/assets/rel-2.jpg";
import lifeNight from "@/assets/life-night.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const product = {
  id: "notte-bomber",
  name: "Marlboro Red",
  category: "Jacket",
  number: "02",
  price: 2610,
  originalPrice: 4300,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: rel1, alt: "QISSAA Marlboro Red editorial view" },
    { src: rel2, alt: "QISSAA Notte Bomber detail" },
    { src: lifeNight, alt: "QISSAA Notte Bomber at night" },
    { src: gallery4, alt: "QISSAA Notte Bomber sleeve detail" },
  ],
};

export const Route = createFileRoute("/notte-bomber")({
  head: () => ({ meta: [
    { title: "Marlboro Red — QISSAA" },
    { name: "description", content: "Marlboro Red jacket by QISSAA." },
    { property: "og:title", content: "Marlboro Red — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
