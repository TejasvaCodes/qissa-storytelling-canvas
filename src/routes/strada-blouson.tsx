import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../PGJ main.jpeg";
import back from "../../PGJ back.jpeg";
import pf1 from "../../PGJ pf1.jpeg";

const product = {
  id: "strada-blouson",
  name: "Porsche Green",
  category: "Jacket",
  number: "03",
  price: 2599,
  originalPrice: 4300,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: main, alt: "Porsche Green Jacket — front" },
    { src: back, alt: "Porsche Green Jacket — back" },
    { src: pf1, alt: "Porsche Green Jacket — professional photo 1" },
  ],
};

export const Route = createFileRoute("/strada-blouson")({
  head: () => ({ meta: [
    { title: "Porsche Green — QISSAA" },
    { name: "description", content: "Porsche Green jacket by QISSAA." },
    { property: "og:title", content: "Porsche Green — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
