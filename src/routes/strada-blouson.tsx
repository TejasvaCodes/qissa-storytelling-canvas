import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel2 from "@/assets/rel-2.jpg";
import rel3 from "@/assets/rel-3.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import lifeCity from "@/assets/life-city.jpg";

const product = {
  id: "strada-blouson",
  name: "Porsche Green",
  category: "Jacket",
  number: "03",
  price: 2500,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: rel2, alt: "QISSAA Porsche Green editorial view" },
    { src: rel3, alt: "QISSAA Strada Blouson detail" },
    { src: gallery3, alt: "QISSAA Strada Blouson back detail" },
    { src: lifeCity, alt: "QISSAA Strada Blouson in the city" },
  ],
};

export const Route = createFileRoute("/strada-blouson")({
  head: () => ({ meta: [
    { title: "Porsche Green — QISSAA" },
    { name: "description", content: "Porsche Green jacket by QISSAA." },
    { property: "og:title", content: "Porsche Green — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
