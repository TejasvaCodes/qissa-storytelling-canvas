import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../BCWH main.png";
import back from "../../BCWH back.png";

const product = {
  id: "black-waffle-henley",
  name: "Black Waffle Henley",
  category: "Henley",
  number: "09",
  price: 952,
  originalPrice: 1400,
  description: "A textured waffle-knit Henley designed for effortless everyday wear.",
  views: [
    { src: main, alt: "Black Waffle Henley — front" },
    { src: back, alt: "Black Waffle Henley — back" },
  ],
};

export const Route = createFileRoute("/black-waffle-henley")({
  head: () => ({ meta: [
    { title: "Black Waffle Henley — QISSAA" },
    { name: "description", content: "Black Waffle Henley by QISSAA." },
    { property: "og:title", content: "Black Waffle Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
