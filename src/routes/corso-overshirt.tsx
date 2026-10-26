import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import lifeCity from "@/assets/life-city.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import rel2 from "@/assets/rel-2.jpg";
import matHardware from "@/assets/mat-hardware.jpg";

const product = {
  id: "corso-overshirt",
  name: "Half white Henley",
  category: "Henley",
  number: "08",
  price: 899,
  description: "A short-sleeve Henley essential for easy, everyday styling.",
  views: [
    { src: lifeCity, alt: "QISSAA Half white Henley in the city" },
    { src: gallery4, alt: "QISSAA Corso Overshirt detail" },
    { src: rel2, alt: "QISSAA Corso Overshirt editorial view" },
    { src: matHardware, alt: "QISSAA Corso Overshirt hardware detail" },
  ],
};

export const Route = createFileRoute("/corso-overshirt")({
  head: () => ({ meta: [
    { title: "Half white Henley — QISSAA" },
    { name: "description", content: "Half white Henley by QISSAA." },
    { property: "og:title", content: "Half white Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
