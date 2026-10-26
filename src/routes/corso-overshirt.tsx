import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../HWH main.jpeg";
import back from "../../HWH back.jpeg";

const product = {
  id: "corso-overshirt",
  name: "Half white Henley",
  category: "Henley",
  number: "08",
  price: 899,
  description: "A short-sleeve Henley essential for easy, everyday styling.",
  views: [
    { src: main, alt: "Half White Henley — front" },
    { src: back, alt: "Half White Henley — back" },
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
