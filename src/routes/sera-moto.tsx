import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../WH main.jpeg";
import back from "../../WH back.jpeg";
import pf1 from "../../WH pf1.jpeg";

const product = {
  id: "sera-moto",
  name: "White Henley",
  category: "Henley",
  number: "06",
  price: 899,
  description: "A clean Henley essential designed for effortless everyday wear.",
  views: [
    { src: main, alt: "White Henley — front" },
    { src: back, alt: "White Henley — back" },
    { src: pf1, alt: "White Henley — professional photo 1" },
  ],
};

export const Route = createFileRoute("/sera-moto")({
  head: () => ({ meta: [
    { title: "White Henley — QISSAA" },
    { name: "description", content: "White Henley by QISSAA." },
    { property: "og:title", content: "White Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
