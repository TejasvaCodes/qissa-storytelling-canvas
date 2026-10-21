import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";
import { saveBulkOrderEnquiry } from "@/lib/save-enquiry.server";

export const Route = createFileRoute("/bulk-order")({
  head: () => ({
    meta: [
      { title: "Bulk & Trade Enquiries — QISSA" },
      {
        name: "description",
        content: "Enquire about QISSA bulk orders, trade quantities and delivery timelines.",
      },
    ],
  }),
  component: BulkOrderPage,
});

const fieldClass =
  "mt-3 w-full border-b border-border bg-transparent px-0 py-4 text-sm tracking-wide outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";
const labelClass = "eyebrow block";

function BulkOrderPage() {
  useReveal();
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    contactName: "",
    businessName: "",
    email: "",
    whatsapp: "",
    category: "",
    quantity: "",
    budget: "",
    timeline: "",
    destination: "",
    requirements: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitError("");
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    [
      "Hello QISSA, I'd like to make a bulk / trade enquiry.",
      `Contact name: ${form.contactName}`,
      `Business: ${form.businessName || "Not provided"}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Product / category: ${form.category}`,
      `Estimated quantity: ${form.quantity}`,
      `Budget range: ${form.budget}`,
      `Delivery timeline: ${form.timeline}`,
      `Destination: ${form.destination}`,
      `Requirements: ${form.requirements || "None provided"}`,
      "If you have any reference designs, please attach them as an image or PDF in this WhatsApp chat.",
    ].join("\n"),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!whatsappNumber) {
      setSubmitError("WhatsApp is not connected yet. Please try again later.");
      return;
    }
    try {
      await saveBulkOrderEnquiry({ data: form });
      window.location.assign(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`);
    } catch {
      setSubmitError("We couldn’t save your enquiry. Please check the database connection and try again.");
    }
  }

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">QISSA · Trade & Partnerships</p>
            <h1 data-reveal className="reveal display mt-8 max-w-[14ch] text-[2.8rem] md:text-[5rem]">
              A larger story, together.
            </h1>
            <p data-reveal className="reveal mt-10 max-w-[54ch] leading-[2] text-muted-foreground">
              For boutiques, retailers, stylists and businesses interested in a considered
              quantity of QISSA pieces. Share a few details so we can understand your brief.
            </p>
          </div>
        </section>

        <section className="mt-20 md:mt-32">
          <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <aside data-reveal className="reveal lg:pt-8">
              <p className="eyebrow">01 / Trade enquiry</p>
              <h2 className="display mt-7 text-[2rem] md:text-[2.8rem]">Tell us what you need.</h2>
              <p className="mt-7 max-w-[36ch] leading-[1.9] text-muted-foreground">
                Quantity, assortment, budget and destination help us understand the right next
                step. Pricing, availability and timelines will be confirmed after review.
              </p>
              <p className="eyebrow mt-12 text-muted-foreground">Boutiques · Retail · Styling · Business</p>
            </aside>

            <form onSubmit={handleSubmit} className="border-t border-border pt-8">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <label className={labelClass}>
                  Contact name *
                  <input className={fieldClass} autoComplete="name" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} placeholder="Your name" />
                </label>
                <label className={labelClass}>
                  Business name
                  <input className={fieldClass} autoComplete="organization" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Company / boutique" />
                </label>
                <label className={labelClass}>
                  Email address *
                  <input className={fieldClass} type="email" autoComplete="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@business.com" />
                </label>
                <label className={labelClass}>
                  WhatsApp number *
                  <input className={fieldClass} type="tel" autoComplete="tel" required value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="Include country code" />
                </label>
                <label className={labelClass}>
                  Product / category *
                  <select className={fieldClass} required value={form.category} onChange={(e) => update("category", e.target.value)}>
                    <option value="">Choose a category</option>
                    <option>Leather outerwear</option>
                    <option>Shearling</option>
                    <option>Quilted pieces</option>
                    <option>Mixed assortment</option>
                    <option>Custom / private label enquiry</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Estimated quantity *
                  <select className={fieldClass} required value={form.quantity} onChange={(e) => update("quantity", e.target.value)}>
                    <option value="">Select quantity</option>
                    <option>5–10 pieces</option>
                    <option>11–25 pieces</option>
                    <option>26–50 pieces</option>
                    <option>51–100 pieces</option>
                    <option>100+ pieces</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Budget range *
                  <select className={fieldClass} required value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                    <option value="">Choose a budget range</option>
                    <option>Under ₹1,00,000</option>
                    <option>₹1,00,000–₹3,00,000</option>
                    <option>₹3,00,000–₹5,00,000</option>
                    <option>₹5,00,000+</option>
                    <option>To be discussed</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Delivery timeline *
                  <select className={fieldClass} required value={form.timeline} onChange={(e) => update("timeline", e.target.value)}>
                    <option value="">Choose timeline</option>
                    <option>As soon as possible</option>
                    <option>Within 1 month</option>
                    <option>Within 2–3 months</option>
                    <option>Flexible / planning ahead</option>
                  </select>
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Delivery destination *
                  <input className={fieldClass} required value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="City, country" />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Requirements / notes
                  <textarea className={`${fieldClass} min-h-32 resize-y`} value={form.requirements} onChange={(e) => update("requirements", e.target.value)} placeholder="Assortment, sizing, intended use or any other requirements." />
                </label>
              </div>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <button type="submit" className="lift eyebrow bg-foreground px-10 py-5 !text-primary-foreground transition-colors hover:bg-accent">
                  Send bulk enquiry on WhatsApp ↗
                </button>
                <p className="max-w-[36ch] text-xs leading-relaxed text-muted-foreground">
                  WhatsApp will open with your trade enquiry ready to send.
                </p>
              </div>
              {submitError && <p role="alert" className="mt-6 text-sm leading-relaxed text-red-700">{submitError}</p>}
            </form>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
