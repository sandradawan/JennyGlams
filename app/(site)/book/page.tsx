import type { Metadata } from "next";
import BookButton from "@/components/BookButton";
import { fromPrice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Book a makeup session with ${site.name} in ${site.location}. Chat on WhatsApp to plan your look.`,
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 text-center sm:px-8 sm:pt-40">
      <p className="eyebrow">Let&apos;s create</p>
      <h1 className="display mt-4 text-5xl sm:text-6xl">Book your look</h1>
      <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
        The fastest way to book is a quick WhatsApp message. Tell me your date, the
        occasion, and the vibe you&apos;re after — I&apos;ll confirm availability
        and we&apos;ll plan the perfect look together.
      </p>

      <div className="mt-9 flex flex-col items-center gap-4">
        <BookButton
          label="Chat on WhatsApp"
          message={`Hi ${site.artist}! I'd like to book a session.%0A%0AOccasion: %0ADate: %0ALocation: %0ALook I love: `}
        />
        <a href={`mailto:${site.email}`} className="link-flourish text-sm text-ink-soft">
          or email {site.email}
        </a>
      </div>

      <p className="mt-6 text-sm text-muted">
        <span aria-hidden="true">📍</span> Studio in {site.address}
      </p>

      {/* quick price reference */}
      <div className="mt-16 rounded-2xl border border-line bg-cream-deep/50 p-8 text-left">
        <p className="eyebrow text-center">Starting prices</p>
        <ul className="mt-6 divide-y divide-line">
          {site.services.map((svc) => (
            <li
              key={svc.title}
              className="flex items-center justify-between gap-4 py-4"
            >
              <span className="font-serif text-lg font-light">{svc.title}</span>
              <span className="text-sm text-gold">{fromPrice(svc.from)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          Final quotes depend on the number of faces, location, and travel. Bridal
          bookings include a trial session.
        </p>
      </div>

      {/* socials */}
      <div className="mt-12 flex items-center justify-center gap-6 text-sm text-ink-soft">
        {site.socials.instagram && (
          <>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-flourish"
            >
              Instagram
            </a>
            <span className="text-line">·</span>
          </>
        )}
        <a
          href={site.socials.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="link-flourish"
        >
          TikTok
        </a>
      </div>
    </div>
  );
}
