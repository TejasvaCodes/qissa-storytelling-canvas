import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import lifeCity from "@/assets/life-city.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import rel2 from "@/assets/rel-2.jpg";
import matHardware from "@/assets/mat-hardware.jpg";

const product = {
  id: "corso-overshirt",
  name: "Corso Overshirt",
  category: "Archive",
  number: "08",
  price: 28000,
  description: "An easy overshirt with a lighter construction, made to sit between a shirt and a jacket as the day moves on.",
  views: [
    { src: lifeCity, alt: "QISSA Corso Overshirt in the city" },
    { src: gallery4, alt: "QISSA Corso Overshirt detail" },
    { src: rel2, alt: "QISSA Corso Overshirt editorial view" },
    { src: matHardware, alt: "QISSA Corso Overshirt hardware detail" },
  ],
};

export const Route = createFileRoute("/corso-overshirt")({
  head: () => ({ meta: [
    { title: "Corso Overshirt — QISSA" },
    { name: "description", content: "The Corso Overshirt by QISSA — an easy archive layer made in limited numbers." },
    { property: "og:title", content: "Corso Overshirt — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
