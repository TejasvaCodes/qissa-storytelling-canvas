import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../BFJ main.jpeg";
import back from "../../BFJ back.jpeg";
import pf1 from "../../BFJ pf1.jpeg";
import pf2 from "../../BFJ pf2.jpeg";

const product = {
  id: "alba-shearling",
  name: "Black Ferrari",
  category: "Jacket",
  number: "04",
  price: 2599,
  originalPrice: 4300,
  description: "A statement jacket designed to bring character to your everyday look.",
  views: [
    { src: main, alt: "Black Ferrari Jacket — front" },
    { src: back, alt: "Black Ferrari Jacket — back" },
    { src: pf1, alt: "Black Ferrari Jacket — professional photo 1" },
    { src: pf2, alt: "Black Ferrari Jacket — professional photo 2" },
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
