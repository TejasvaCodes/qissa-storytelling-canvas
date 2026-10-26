import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../MRJ main.jpeg";
import back from "../../MRJ back.jpeg";
import pf1 from "../../MRJ pf1.jpeg";
import pf2 from "../../MRJ pf2.jpeg";
import pf3 from "../../MRJ pf3.jpeg";
import pf4 from "../../MRJ pf4.jpeg";

const product = {
  id: "notte-bomber",
  name: "Marlboro Red",
  category: "Jacket",
  number: "02",
  price: 2599,
  originalPrice: 4300,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: main, alt: "Marlboro Red Jacket — front" },
    { src: back, alt: "Marlboro Red Jacket — back" },
    { src: pf1, alt: "Marlboro Red Jacket — professional photo 1" },
    { src: pf2, alt: "Marlboro Red Jacket — professional photo 2" },
    { src: pf3, alt: "Marlboro Red Jacket — professional photo 3" },
    { src: pf4, alt: "Marlboro Red Jacket — professional photo 4" },
  ],
};

export const Route = createFileRoute("/notte-bomber")({
  head: () => ({ meta: [
    { title: "Marlboro Red — QISSAA" },
    { name: "description", content: "Marlboro Red jacket by QISSAA." },
    { property: "og:title", content: "Marlboro Red — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
