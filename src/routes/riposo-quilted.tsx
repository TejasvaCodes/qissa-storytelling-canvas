import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel4 from "@/assets/rel-4.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import lifeMotion from "@/assets/life-motion.jpg";
import matLining from "@/assets/mat-lining.jpg";

const product = {
  id: "riposo-quilted",
  name: "Riposo Quilted",
  category: "Quilted",
  number: "05",
  price: 44000,
  description: "A lightweight quilted layer with a quiet sheen, balancing warmth, movement and an easy everyday silhouette.",
  views: [
    { src: rel4, alt: "QISSA Riposo Quilted editorial view" },
    { src: gallery2, alt: "QISSA Riposo Quilted detail" },
    { src: lifeMotion, alt: "QISSA Riposo Quilted in motion" },
    { src: matLining, alt: "QISSA Riposo Quilted lining detail" },
  ],
};

export const Route = createFileRoute("/riposo-quilted")({
  head: () => ({ meta: [
    { title: "Riposo Quilted — QISSA" },
    { name: "description", content: "The Riposo Quilted jacket by QISSA — considered outerwear made in limited numbers." },
    { property: "og:title", content: "Riposo Quilted — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
