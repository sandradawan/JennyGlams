"use client";

import { useEffect, useMemo, useState } from "react";
import ArtImage from "./ArtImage";
import LookCard from "./LookCard";
import BookButton from "./BookButton";
import { categories, type Look } from "@/lib/content";
import { fromPrice, site } from "@/lib/site";

export default function PortfolioGrid({ looks }: { looks: Look[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? looks : looks.filter((l) => l.category === active)),
    [active, looks]
  );

  const current = looks.find((l) => l._id === openId) ?? null;

  // lock body scroll + close on Escape while the lightbox is open
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current]);

  return (
    <div>
      {/* filter pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
              active === cat
                ? "border-ink bg-ink text-cream"
                : "border-line text-ink-soft hover:border-ink/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((look, i) => (
          <LookCard
            key={look._id}
            look={look}
            priority={i < 3}
            onOpen={() => setOpenId(look._id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">No looks in this category yet.</p>
      )}

      {/* lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-cream shadow-lift md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenId(null)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink transition-colors hover:bg-blush-soft"
            >
              ✕
            </button>

            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px]">
              <ArtImage
                tone={current.tone}
                imageUrl={current.imageUrl}
                alt={current.title}
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <span className="eyebrow">{current.category}</span>
              <h2 className="font-serif text-3xl font-light leading-tight">
                {current.title}
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                {current.description}
              </p>
              <p className="text-lg text-gold">{fromPrice(current.fromAmount)}</p>
              <div className="pt-2">
                <BookButton
                  label="Book this look"
                  message={`Hi ${site.artist}, I'd love to book the "${current.title}" look. Are you available?`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
