import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import lifeNight from "@/assets/life-night.jpg";

const product = {
  id: "sera-moto",
  name: "Sera Moto",
  category: "Outerwear",
  number: "06",
  price: 52000,
  description: "A sharper moto jacket with a sculpted line through the shoulder, built around the energy of the road after dark.",
  views: [
    { src: gallery2, alt: "QISSA Sera Moto editorial view" },
    { src: gallery3, alt: "QISSA Sera Moto back view" },
    { src: gallery4, alt: "QISSA Sera Moto cuff detail" },
    { src: lifeNight, alt: "QISSA Sera Moto at night" },
  ],
};

export const Route = createFileRoute("/sera-moto")({
  head: () => ({ meta: [
    { title: "Sera Moto — QISSA" },
    { name: "description", content: "The Sera Moto jacket by QISSA — motorsport-inspired leather outerwear made in limited numbers." },
    { property: "og:title", content: "Sera Moto — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
