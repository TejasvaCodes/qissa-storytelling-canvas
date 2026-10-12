import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Nav } from "@/components/qissa/nav";
import { Footer } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";
import { cartCount, cartEventName, cartTotal, readCart, removeFromCart, updateCartQuantity, type CartItem } from "@/lib/cart";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Bag — QISSA" },
      { name: "description", content: "Review your QISSA selection before continuing securely on WhatsApp." },
      { property: "og:title", content: "Your Bag — QISSA" },
      { property: "og:description", content: "Review your selection and continue your order on WhatsApp." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BagPage,
});

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;
const WHATSAPP_NUMBER = ""; // Add the QISSA WhatsApp Business number before launch, e.g. 919876543210.

function BagPage() {
  useReveal();
  const [lines, setLines] = useState<CartItem[]>([]);
  const [details, setDetails] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" });

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener(cartEventName, sync);
    return () => window.removeEventListener(cartEventName, sync);
  }, []);

  const subtotal = useMemo(() => cartTotal(lines), [lines]);
  const count = cartCount(lines);
  const canCheckout = Boolean(WHATSAPP_NUMBER) && lines.length > 0 && details.name && details.phone && details.address && details.city && details.state && details.pincode;

  const setQty = (item: CartItem, delta: number) => updateCartQuantity(item.id, item.colour, item.size, item.qty + delta);

  const checkoutOnWhatsApp = () => {
    if (!canCheckout) return;
    const products = lines.map((l) => `• ${l.name} — ${l.colour} — Size ${l.size} × ${l.qty} — ${inr(l.price * l.qty)}`).join("\n");
    const message = [
      "Hi QISSA, I'd like to place an order.",
      "",
      "ORDER REQUEST",
      products,
      `Total: ${inr(subtotal)}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      details.email ? `Email: ${details.email}` : "",
      `Address: ${details.address}, ${details.city}, ${details.state} - ${details.pincode}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-52">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">{count} {count === 1 ? "piece" : "pieces"}</p>
            <h1 data-reveal className="reveal display mt-8 text-[2.6rem] md:text-[4rem]">Your Bag</h1>
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <div className="shell grid gap-20 lg:grid-cols-[1fr_360px] lg:gap-24">
            <div>
              {lines.length === 0 ? (
                <div className="border-t border-border py-24">
                  <p className="text-muted-foreground">Your bag is empty for now.</p>
                  <Link to="/collections" className="eyebrow link-underline mt-8 inline-block text-foreground">Browse the collection</Link>
                </div>
              ) : (
                <ul>
                  {lines.map((l) => (
                    <li key={`${l.id}-${l.colour}-${l.size}`} className="grid grid-cols-[104px_1fr] gap-8 border-t border-border py-10 sm:grid-cols-[140px_1fr]">
                      <div className="zoom-frame bg-secondary"><img src={l.image} alt={l.name} loading="lazy" width={560} height={700} className="aspect-[4/5] w-full object-cover" /></div>
                      <div className="flex flex-col justify-between gap-8">
                        <div className="flex items-start justify-between gap-6">
                          <div><p className="font-serif text-xl font-light">{l.name}</p><p className="eyebrow mt-3">{l.colour} — Size {l.size}</p></div>
                          <p className="shrink-0 text-sm tracking-wide">{inr(l.price * l.qty)}</p>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-6 text-sm">
                            <button aria-label={`Decrease quantity of ${l.name}`} onClick={() => setQty(l, -1)} className="text-muted-foreground transition-colors hover:text-foreground">—</button>
                            <span className="tracking-[0.14em]">{l.qty}</span>
                            <button aria-label={`Increase quantity of ${l.name}`} onClick={() => setQty(l, 1)} className="text-muted-foreground transition-colors hover:text-foreground">+</button>
                          </div>
                          <button onClick={() => removeFromCart(l.id, l.colour, l.size)} className="eyebrow link-underline text-foreground">Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {lines.length > 0 && (
                <div className="mt-16 border-t border-border pt-10">
                  <p className="eyebrow">Delivery details</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {(["name", "phone", "email", "pincode", "city", "state"] as const).map((field) => (
                      <input key={field} value={details[field]} onChange={(e) => setDetails((d) => ({ ...d, [field]: e.target.value }))} placeholder={field === "pincode" ? "Pincode" : field[0].toUpperCase() + field.slice(1)} type={field === "email" ? "email" : field === "phone" || field === "pincode" ? "tel" : "text"} className="border-b border-border bg-transparent px-0 py-4 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground" />
                    ))}
                    <textarea value={details.address} onChange={(e) => setDetails((d) => ({ ...d, address: e.target.value }))} placeholder="Full delivery address" rows={3} className="border-b border-border bg-transparent px-0 py-4 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground sm:col-span-2" />
                  </div>
                </div>
              )}
            </div>

            <aside className="h-fit bg-secondary p-10 lg:sticky lg:top-32">
              <p className="eyebrow">Order Summary</p>
              <dl className="mt-10 space-y-6 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tracking-wide">{inr(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Insured Delivery</dt><dd className="tracking-wide">Complimentary</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Duties & Taxes</dt><dd className="tracking-wide">Included</dd></div>
              </dl>
              <div className="mt-10 flex items-baseline justify-between border-t border-border pt-8"><p className="eyebrow">Total</p><p className="font-serif text-2xl font-light">{inr(subtotal)}</p></div>
              <button disabled={!canCheckout} onClick={checkoutOnWhatsApp} className="lift eyebrow mt-12 w-full bg-foreground py-5 !text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40">Checkout on WhatsApp</button>
              {!WHATSAPP_NUMBER && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">WhatsApp checkout will activate once the QISSA Business number is added.</p>}
              {WHATSAPP_NUMBER && !canCheckout && lines.length > 0 && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Please complete your name, phone and delivery details to continue.</p>}
              <Link to="/collections" className="eyebrow link-underline mt-8 inline-block text-foreground">Continue Browsing</Link>
              <p className="mt-12 max-w-[34ch] text-xs leading-relaxed text-muted-foreground">Every order is prepared by the QISSA atelier. Returns are accepted within 14 days, unworn.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
