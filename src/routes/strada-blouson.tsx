import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel2 from "@/assets/rel-2.jpg";
import rel3 from "@/assets/rel-3.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import lifeCity from "@/assets/life-city.jpg";

const product = {
  id: "strada-blouson",
  name: "Strada Blouson",
  category: "Outerwear",
  number: "03",
  price: 39500,
  description: "A clean blouson with a relaxed shoulder and understated hardware, designed for everyday movement.",
  views: [
    { src: rel2, alt: "QISSA Strada Blouson editorial view" },
    { src: rel3, alt: "QISSA Strada Blouson detail" },
    { src: gallery3, alt: "QISSA Strada Blouson back detail" },
    { src: lifeCity, alt: "QISSA Strada Blouson in the city" },
  ],
};

export const Route = createFileRoute("/strada-blouson")({
  head: () => ({ meta: [
    { title: "Strada Blouson — QISSA" },
    { name: "description", content: "The Strada Blouson by QISSA — considered leather outerwear made in limited numbers." },
    { property: "og:title", content: "Strada Blouson — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
