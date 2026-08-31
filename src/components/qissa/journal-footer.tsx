export function JournalFooter() {
  const footerCols = [
    { h: "Journal", items: ["Atelier Notes", "Interviews", "Heritage"] },
    { h: "About", items: ["The House", "Sustainability", "Careers"] },
    { h: "Support", items: ["Contact", "Shipping", "Returns", "Book Appointment"] },
  ];

  return (
    <footer className="border-t border-border pb-44 pt-24 md:pb-36">
      <div className="shell">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <p className="font-serif text-xl font-light tracking-[0.4em]">QISSA</p>
            <p className="eyebrow mt-5">Wear Your Story.</p>
          </div>

          {footerCols.map((c) => (
            <div key={c.h}>
              <p className="eyebrow">{c.h}</p>
              <ul className="mt-6 space-y-3">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#top" className="link-underline text-sm text-muted-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-8">
            <a
              href="https://www.instagram.com/qissalabel/"
              target="_blank"
              rel="noreferrer"
              className="eyebrow link-underline text-foreground"
            >
              Instagram
            </a>
            <a href="#top" className="eyebrow link-underline text-foreground">
              Pinterest
            </a>
          </div>
          <p className="eyebrow">© {new Date().getFullYear()} Qissa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
