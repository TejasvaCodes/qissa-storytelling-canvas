import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Nav } from "@/components/qissa/nav";
import { Footer } from "@/components/qissa/sections";
import { useReveal } from "@/hooks/use-reveal";

import storyImg from "@/assets/story.jpg";
import heroMain from "@/assets/hero-main.jpg";
import rel4 from "@/assets/rel-4.jpg";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — QISSA" },
      {
        name: "description",
        content:
          "Sign in to your QISSA account to follow orders, saved pieces, atelier appointments and archive access.",
      },
      { property: "og:title", content: "Account — QISSA" },
      {
        property: "og:description",
        content: "Orders, saved pieces and atelier appointments, in one quiet place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

const orders = [
  { id: "QS-10428", date: "12 June 2026", item: "Riposo Quilted", img: rel4, status: "Delivered" },
  { id: "QS-10193", date: "04 March 2026", item: "Velocità", img: heroMain, status: "In Atelier" },
];

function AccountPage() {
  useReveal();
  const [mode, setMode] = useState<"signin" | "register">("signin");

  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        {/* Sign in / register */}
        <section className="pt-40 md:pt-52">
          <div className="shell grid gap-20 lg:grid-cols-2 lg:gap-28">
            <div data-reveal className="reveal">
              <p className="eyebrow">The House of Qissa</p>
              <h1 className="display mt-8 text-[2.6rem] md:text-[4rem]">Your Account</h1>
              <p className="mt-10 max-w-[42ch] leading-[2] text-muted-foreground">
                Follow your orders, keep the pieces you are considering, and reserve time with our
                atelier — nothing more, nothing louder.
              </p>

              <div className="mt-16 flex gap-10">
                {(["signin", "register"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`eyebrow transition-colors duration-500 ${
                      mode === m
                        ? "!text-foreground underline decoration-1 underline-offset-[8px]"
                        : "hover:!text-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign In" : "Create Account"}
                  </button>
                ))}
              </div>

              <form className="mt-12 max-w-md space-y-10" onSubmit={(e) => e.preventDefault()}>
                {mode === "register" && (
                  <div>
                    <label htmlFor="name" className="eyebrow">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="mt-4 w-full border-b border-border bg-transparent py-3 text-sm tracking-wide outline-none transition-colors focus:border-accent"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="account-email" className="eyebrow">
                    Email Address
                  </label>
                  <input
                    id="account-email"
                    type="email"
                    required
                    className="mt-4 w-full border-b border-border bg-transparent py-3 text-sm tracking-wide outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="account-password" className="eyebrow">
                    Password
                  </label>
                  <input
                    id="account-password"
                    type="password"
                    required
                    className="mt-4 w-full border-b border-border bg-transparent py-3 text-sm tracking-wide outline-none transition-colors focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="lift eyebrow w-full bg-foreground py-5 !text-primary-foreground hover:bg-accent"
                >
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </button>

                <button type="button" className="eyebrow link-underline text-foreground">
                  Forgot your password
                </button>
              </form>
            </div>

            <div data-reveal className="reveal zoom-frame bg-secondary">
              <img
                src={storyImg}
                alt="QISSA editorial portrait"
                loading="lazy"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </section>

        {/* Orders */}
        <section className="mt-40 md:mt-56">
          <div className="shell">
            <h2 data-reveal className="reveal display text-[2.2rem] md:text-[3rem]">
              Recent Orders
            </h2>
            <ul className="mt-16">
              {orders.map((o) => (
                <li
                  key={o.id}
                  data-reveal
                  className="reveal grid grid-cols-[88px_1fr] items-center gap-8 border-t border-border py-8"
                >
                  <div className="zoom-frame bg-secondary">
                    <img
                      src={o.img}
                      alt={o.item}
                      loading="lazy"
                      width={352}
                      height={440}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <p className="font-serif text-xl font-light">{o.item}</p>
                      <p className="eyebrow mt-3">
                        {o.id} — {o.date}
                      </p>
                    </div>
                    <p className="eyebrow !text-accent">{o.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Details */}
        <section className="mt-32 md:mt-44">
          <div className="shell grid gap-20 md:grid-cols-3">
            {[
              ["Saved Pieces", "Three pieces are waiting in your wishlist."],
              ["Addresses", "One shipping address and one billing address on file."],
              ["Atelier Appointments", "No upcoming visits. Book a private fitting."],
            ].map(([h, p]) => (
              <div key={h} data-reveal className="reveal">
                <p className="eyebrow">{h}</p>
                <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
                <Link to="/collections" className="eyebrow link-underline mt-8 inline-block text-foreground">
                  Manage
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-40 bg-secondary py-28 md:mt-56 md:py-40">
          <div className="shell">
            <h2 data-reveal className="reveal display max-w-[22ch] text-[2rem] md:text-[3.2rem]">
              A wardrobe is a record of where you've been.
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
