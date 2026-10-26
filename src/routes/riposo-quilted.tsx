import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../BH main.jpeg";
import back from "../../BH back.jpeg";
import pf1 from "../../BH pf1.jpeg";
import pf2 from "../../BH pf2.jpeg";

const product = {
  id: "riposo-quilted",
  name: "Black Henley",
  category: "Henley",
  number: "05",
  price: 899,
  description: "A clean Henley essential designed for effortless everyday wear.",
  views: [
    { src: main, alt: "Black Henley — front" },
    { src: back, alt: "Black Henley — back" },
    { src: pf1, alt: "Black Henley — professional photo 1" },
    { src: pf2, alt: "Black Henley — professional photo 2" },
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
