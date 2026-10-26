import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import lifeNight from "@/assets/life-night.jpg";

const product = {
  id: "sera-moto",
  name: "White Henley",
  category: "Henley",
  number: "06",
  price: 899,
  description: "A clean Henley essential designed for effortless everyday wear.",
  views: [
    { src: gallery2, alt: "QISSAA White Henley editorial view" },
    { src: gallery3, alt: "QISSAA Sera Moto back view" },
    { src: gallery4, alt: "QISSAA Sera Moto cuff detail" },
    { src: lifeNight, alt: "QISSAA Sera Moto at night" },
  ],
};

export const Route = createFileRoute("/sera-moto")({
  head: () => ({ meta: [
    { title: "White Henley — QISSAA" },
    { name: "description", content: "White Henley by QISSAA." },
    { property: "og:title", content: "White Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
