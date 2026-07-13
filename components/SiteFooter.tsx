import Link from "next/link";
import { site } from "@/lib/site";
import BookButton from "./BookButton";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-line bg-cream-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo align="start" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Bridal, soft glam, and editorial looks — based in {site.location}.
              Booking brides, editorials, and everyday glow.
            </p>
            <div className="mt-6">
              <BookButton
                variant="outline"
                label="Book on WhatsApp"
                message={`Hi ${site.artist}, I found your site and I'd love to book a session.`}
              />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/portfolio" className="link-flourish">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/reels" className="link-flourish">
                  Reels
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-flourish">
                  About
                </Link>
              </li>
              <li>
                <Link href="/book" className="link-flourish">
                  Book
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-3 text-sm text-ink-soft">
              {site.socials.instagram && (
                <li>
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-flourish"
                  >
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={site.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-flourish"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-flourish">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {2026} {site.name}. All looks by {site.artist}.
          </p>
          <p className="tracking-wide">Crafted with care · Jos → everywhere</p>
        </div>
      </div>
    </footer>
  );
}
