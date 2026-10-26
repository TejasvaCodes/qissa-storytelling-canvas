import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel4 from "@/assets/rel-4.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import lifeMotion from "@/assets/life-motion.jpg";
import matLining from "@/assets/mat-lining.jpg";

const product = {
  id: "riposo-quilted",
  name: "Black Henley",
  category: "Henley",
  number: "05",
  price: 900,
  description: "A clean Henley essential designed for effortless everyday wear.",
  views: [
    { src: rel4, alt: "QISSAA Black Henley editorial view" },
    { src: gallery2, alt: "QISSAA Riposo Quilted detail" },
    { src: lifeMotion, alt: "QISSAA Riposo Quilted in motion" },
    { src: matLining, alt: "QISSAA Riposo Quilted lining detail" },
  ],
};

export const Route = createFileRoute("/riposo-quilted")({
  head: () => ({ meta: [
    { title: "Black Henley — QISSAA" },
    { name: "description", content: "Black Henley by QISSAA." },
    { property: "og:title", content: "Black Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
