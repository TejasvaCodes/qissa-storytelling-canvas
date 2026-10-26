import { Nav } from "@/components/qissa/nav";
import { ProductHero, type ProductConfig } from "@/components/qissa/product-hero";
import { CareAndService, Footer, Lifestyle, Newsletter, Philosophy } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

export function ProductPage({ product }: { product: ProductConfig }) {
  useReveal();
  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <ProductHero product={product} />
        <Lifestyle />
        <CareAndService />
        <Philosophy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
