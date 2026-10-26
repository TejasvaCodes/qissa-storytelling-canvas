import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel3 from "@/assets/rel-3.jpg";
import rel4 from "@/assets/rel-4.jpg";
import lifeLegacy from "@/assets/life-legacy.jpg";
import craftDark from "@/assets/craft-dark.jpg";

const product = {
  id: "alba-shearling",
  name: "Black Ferrari",
  category: "Jacket",
  number: "04",
  price: 2599,
  originalPrice: 4300,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: rel3, alt: "QISSAA Black Ferrari editorial view" },
    { src: rel4, alt: "QISSAA Alba Shearling detail" },
    { src: lifeLegacy, alt: "QISSAA Alba Shearling beside a vintage car" },
    { src: craftDark, alt: "QISSAA Alba Shearling material detail" },
  ],
};

export const Route = createFileRoute("/alba-shearling")({
  head: () => ({ meta: [
    { title: "Black Ferrari — QISSAA" },
    { name: "description", content: "Black Ferrari jacket by QISSAA." },
    { property: "og:title", content: "Black Ferrari — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
