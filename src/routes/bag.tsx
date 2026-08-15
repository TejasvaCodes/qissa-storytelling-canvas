import { Link, createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Nav } from "@/components/qissa/nav";
import { Footer } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Bag — QISSA" },
      { name: "description", content: "Review your QISSA selection before checkout." },
      { property: "og:title", content: "Your Bag — QISSA" },
      { property: "og:description", content: "Review your selection and continue to WhatsApp checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BagPage,
});

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;

function BagPage() {
  useReveal();
  const { items, itemCount, subtotal, setQuantity, removeItem } = useCart();
  const whatsappNumber = "REPLACE_WITH_QISSA_WHATSAPP_NUMBER";

  const checkoutOnWhatsApp = () => {
    const lines = items.map((item) => `${item.name} — ${item.colour} — Size ${item.size} — Qty ${item.qty} — ${inr(item.price * item.qty)}`);
    const message = [
      "Hi QISSA, I'd like to place an order.",
      "",
      ...lines,
      "",
      `Total: ${inr(subtotal)}`,
      "",
      "Please help me complete the order and payment.",
    ].join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-52"><div className="shell"><p data-reveal className="reveal eyebrow">{itemCount} {itemCount === 1 ? "piece" : "pieces"}</p><h1 data-reveal className="reveal display mt-8 text-[2.6rem] md:text-[4rem]">Your Bag</h1></div></section>
        <section className="mt-20 md:mt-28">
          <div className="shell grid gap-20 lg:grid-cols-[1fr_360px] lg:gap-24">
            <div>
              {items.length === 0 ? (
                <div className="border-t border-border py-24"><p className="text-muted-foreground">Your bag is empty for now.</p><Link to="/collections" className="eyebrow link-underline mt-8 inline-block text-foreground">Browse the collection</Link></div>
              ) : (
                <ul>{items.map((item) => <li key={`${item.id}-${item.colour}-${item.size}`} data-reveal className="reveal grid grid-cols-[104px_1fr] gap-8 border-t border-border py-10 sm:grid-cols-[140px_1fr]">
                  <div className="zoom-frame bg-secondary"><img src={item.img} alt={item.name} loading="lazy" width={560} height={700} className="aspect-[4/5] w-full object-cover" /></div>
                  <div className="flex flex-col justify-between gap-8">
                    <div className="flex items-start justify-between gap-6"><div><p className="font-serif text-xl font-light">{item.name}</p><p className="eyebrow mt-3">{item.colour} — Size {item.size}</p></div><p className="shrink-0 text-sm tracking-wide">{inr(item.price * item.qty)}</p></div>
                    <div className="flex items-center justify-between gap-6"><div className="flex items-center gap-6 text-sm"><button aria-label={`Decrease quantity of ${item.name}`} onClick={() => setQuantity(item.id, item.size, -1)} className="text-muted-foreground transition-colors hover:text-foreground">—</button><span className="tracking-[0.14em]">{item.qty}</span><button aria-label={`Increase quantity of ${item.name}`} onClick={() => setQuantity(item.id, item.size, 1)} className="text-muted-foreground transition-colors hover:text-foreground">+</button></div><button onClick={() => removeItem(item.id, item.size)} className="eyebrow link-underline text-foreground">Remove</button></div>
                  </div>
                </li>)}</ul>
              )}
            </div>
            <aside data-reveal className="reveal h-fit bg-secondary p-10 lg:sticky lg:top-32">
              <p className="eyebrow">Order Summary</p>
              <dl className="mt-10 space-y-6 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tracking-wide">{inr(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Insured Delivery</dt><dd className="tracking-wide">Complimentary</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Duties & Taxes</dt><dd className="tracking-wide">Included</dd></div></dl>
              <div className="mt-10 flex items-baseline justify-between border-t border-border pt-8"><p className="eyebrow">Total</p><p className="font-serif text-2xl font-light">{inr(subtotal)}</p></div>
              <button disabled={items.length === 0} onClick={checkoutOnWhatsApp} className="lift eyebrow mt-12 w-full bg-foreground py-5 !text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40">Checkout on WhatsApp</button>
              <Link to="/collections" className="eyebrow link-underline mt-8 inline-block text-foreground">Continue Browsing</Link>
              <p className="mt-12 max-w-[34ch] text-xs leading-relaxed text-muted-foreground">Your cart is saved on this device. Payment will be completed securely through our WhatsApp order flow.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
