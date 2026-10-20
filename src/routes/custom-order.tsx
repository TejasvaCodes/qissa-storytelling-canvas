import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qissa/nav";
import { Footer, Newsletter } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/custom-order")({
  head: () => ({
    meta: [
      { title: "Custom Order — QISSA" },
      {
        name: "description",
        content: "Create a QISSA piece shaped around your fit, colour and personal story.",
      },
    ],
  }),
  component: CustomOrderPage,
});

const fieldClass =
  "mt-3 w-full border-b border-border bg-transparent px-0 py-4 text-sm tracking-wide outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";
const labelClass = "eyebrow block";

function CustomOrderPage() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    piece: "",
    size: "",
    colour: "",
    details: "",
    notes: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    [
      "Hello QISSA, I'd like to discuss a custom order.",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Piece: ${form.piece || "Not decided"}`,
      `Size: ${form.size || "To discuss"}`,
      `Colour: ${form.colour || "To discuss"}`,
      `Design details: ${form.details || "To discuss"}`,
      `Additional notes: ${form.notes || "None"}`,
    ].join("\n"),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <section className="pt-40 md:pt-56">
          <div className="shell">
            <p data-reveal className="reveal eyebrow">The QISSA Atelier · Made Personal</p>
            <h1 data-reveal className="reveal display mt-8 max-w-[13ch] text-[2.8rem] md:text-[5rem]">
              A piece that tells your story.
            </h1>
            <p data-reveal className="reveal mt-10 max-w-[54ch] leading-[2] text-muted-foreground">
              Start with an idea, a silhouette or a detail you have always wanted. Share your
              preferences below and continue the conversation with our atelier.
            </p>
          </div>
        </section>

        <section className="mt-20 md:mt-32">
          <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <aside data-reveal className="reveal lg:pt-8">
              <p className="eyebrow">01 / Your brief</p>
              <h2 className="display mt-7 text-[2rem] md:text-[2.8rem]">Made around you.</h2>
              <p className="mt-7 max-w-[36ch] leading-[1.9] text-muted-foreground">
                Fit, colour, finish and personal details all begin with a conversation. We’ll
                review your brief and discuss feasibility, timing and pricing before anything is
                confirmed.
              </p>
              <p className="eyebrow mt-12 text-muted-foreground">Personal commissions · By enquiry</p>
            </aside>

            <form onSubmit={handleSubmit} className="border-t border-border pt-8">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <label className={labelClass}>
                  Full name *
                  <input className={fieldClass} autoComplete="name" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
                </label>
                <label className={labelClass}>
                  Email address *
                  <input className={fieldClass} type="email" autoComplete="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                </label>
                <label className={labelClass}>
                  WhatsApp number *
                  <input className={fieldClass} type="tel" autoComplete="tel" required value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="Include country code" />
                </label>
                <label className={labelClass}>
                  Piece / style
                  <select className={fieldClass} value={form.piece} onChange={(e) => update("piece", e.target.value)}>
                    <option value="">Choose a starting point</option>
                    <option>Leather jacket</option>
                    <option>Bomber</option>
                    <option>Overshirt</option>
                    <option>Coat</option>
                    <option>Shearling</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Size
                  <input className={fieldClass} value={form.size} onChange={(e) => update("size", e.target.value)} placeholder="Usual size or measurements" />
                </label>
                <label className={labelClass}>
                  Preferred colour
                  <input className={fieldClass} value={form.colour} onChange={(e) => update("colour", e.target.value)} placeholder="Colour, shade or finish" />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Customisation / design details *
                  <textarea className={`${fieldClass} min-h-32 resize-y`} required value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="Tell us about the silhouette, material, fit or details you have in mind." />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Additional notes
                  <textarea className={`${fieldClass} min-h-24 resize-y`} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything else we should know?" />
                </label>
              </div>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <button type="submit" className="lift eyebrow bg-foreground px-10 py-5 !text-primary-foreground transition-colors hover:bg-accent">
                  Review my brief
                </button>
                {whatsappNumber ? (
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow link-underline text-foreground"
                  >
                    Discuss on WhatsApp ↗
                  </a>
                ) : (
                  <p className="max-w-[34ch] text-xs leading-relaxed text-muted-foreground">
                    WhatsApp discussion will be enabled once the QISSA contact number is configured.
                  </p>
                )}
              </div>
              {submitted && (
                <p role="status" className="mt-8 border-l border-accent pl-5 text-sm leading-relaxed text-muted-foreground">
                  Your brief is ready to review. This form does not send or save your details yet;
                  please continue on WhatsApp when the contact link is available.
                </p>
              )}
            </form>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
