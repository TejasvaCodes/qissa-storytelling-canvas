import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/qissa/product-page";
import rel1 from "@/assets/rel-1.jpg";
import rel2 from "@/assets/rel-2.jpg";
import lifeNight from "@/assets/life-night.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const product = {
  id: "notte-bomber",
  name: "Notte Bomber",
  category: "Outerwear",
  number: "02",
  price: 42000,
  description: "A compact bomber silhouette in supple leather, cut for evenings that run longer than planned.",
  views: [
    { src: rel1, alt: "QISSAA Notte Bomber editorial view" },
    { src: rel2, alt: "QISSAA Notte Bomber detail" },
    { src: lifeNight, alt: "QISSAA Notte Bomber at night" },
    { src: gallery4, alt: "QISSAA Notte Bomber sleeve detail" },
  ],
};

export const Route = createFileRoute("/notte-bomber")({
  head: () => ({ meta: [
    { title: "Notte Bomber — QISSAA" },
    { name: "description", content: "The Notte Bomber by QISSAA — considered leather outerwear made in limited numbers." },
    { property: "og:title", content: "Notte Bomber — QISSAA" },
    { property: "og:type", content: "product" },
  ] }),
  component: () => <ProductPage product={product} />,
});
