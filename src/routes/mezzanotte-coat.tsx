import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import main from "../../HBH main.jpeg";
import back from "../../HBH back.jpeg";

const product = {
  id: "mezzanotte-coat",
  name: "Half black Henley",
  category: "Henley",
  number: "07",
  price: 899,
  description: "A short-sleeve Henley essential for easy, everyday styling.",
  views: [
    { src: main, alt: "Half Black Henley — front" },
    { src: back, alt: "Half Black Henley — back" },
  ],
};

export const Route = createFileRoute("/mezzanotte-coat")({
  head: () => ({ meta: [
    { title: "Half black Henley — QISSAA" },
    { name: "description", content: "Half black Henley by QISSAA." },
    { property: "og:title", content: "Half black Henley — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
