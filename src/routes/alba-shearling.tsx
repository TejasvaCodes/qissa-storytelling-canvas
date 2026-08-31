import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel3 from "@/assets/rel-3.jpg";
import rel4 from "@/assets/rel-4.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import craftDark from "@/assets/craft-dark.jpg";

const product = {
  id: "alba-shearling",
  name: "Alba Shearling",
  category: "Shearling",
  number: "04",
  price: 68000,
  description: "A substantial shearling layer with a soft hand and generous proportion, made for cold mornings and long drives.",
  views: [
    { src: rel3, alt: "QISSA Alba Shearling editorial view" },
    { src: rel4, alt: "QISSA Alba Shearling detail" },
    { src: lifeLegacy, alt: "QISSA Alba Shearling beside a vintage car" },
    { src: craftDark, alt: "QISSA Alba Shearling material detail" },
  ],
};

export const Route = createFileRoute("/alba-shearling")({
  head: () => ({ meta: [
    { title: "Alba Shearling — QISSA" },
    { name: "description", content: "The Alba Shearling by QISSA — a considered shearling layer made in limited numbers." },
    { property: "og:title", content: "Alba Shearling — QISSA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
