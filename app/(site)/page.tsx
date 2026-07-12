import Link from "next/link";
import ArtImage from "@/components/ArtImage";
import PortraitImage from "@/components/PortraitImage";
import LookCard from "@/components/LookCard";
import Reveal from "@/components/Reveal";
import BookButton from "@/components/BookButton";
import { getFeaturedLooks, getReels } from "@/lib/data";
import { fromPrice, site } from "@/lib/site";

// Re-check Sanity for new content every 30s (ISR).
export const revalidate = 30;

export default async function HomePage() {
  const [featured, reels] = await Promise.all([
    getFeaturedLooks(4),
    getReels(),
  ]);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">{site.location}</p>
            <h1 className="display mt-5 text-5xl sm:text-6xl lg:text-[4.6rem]">
              Where every face
              <br />
              becomes <span className="italic text-rose">editorial.</span>
            </h1>
            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
              {site.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookButton
                label="Book a session"
                message={`Hi ${site.artist}, I'd love to book a makeup session.`}
              />
              <Link
                href="/portfolio"
                className="link-flourish text-sm font-medium tracking-wide text-ink"
              >
                View the portfolio →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[6px] shadow-lift">
              <ArtImage
                tone={["#f2ded8", "#c07c76"]}
                imageUrl={featured[0]?.imageUrl}
                alt="Signature JennyGlams bridal look"
                priority
                label="Signature look"
              />
            </div>
            {/* floating price chip */}
            <div className="absolute -bottom-5 -left-2 rounded-full bg-cream px-5 py-3 shadow-soft sm:-left-6">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Bridal from
              </p>
              <p className="font-serif text-lg">{site.currency}120,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE STRIP ---------------- */}
      <section className="relative z-10 overflow-hidden border-y border-line bg-cream-deep py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 text-center font-serif text-lg font-light text-ink-soft sm:text-xl">
          <span>Bridal</span>
          <span className="text-gold">✦</span>
          <span>Soft Glam</span>
          <span className="text-gold">✦</span>
          <span>Editorial</span>
          <span className="text-gold">✦</span>
          <span>Owambe</span>
          <span className="text-gold">✦</span>
          <span>Masterclasses</span>
        </div>
      </section>

      {/* ---------------- FEATURED LOOKS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Featured looks</h2>
          </div>
          <Link
            href="/portfolio"
            className="link-flourish hidden text-sm font-medium text-ink sm:block"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((look, i) => (
            <Reveal key={look._id} delay={i * 80}>
              <Link href="/portfolio">
                <LookCard look={look} priority={i < 2} />
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/portfolio" className="link-flourish text-sm font-medium">
            See all looks →
          </Link>
        </div>
      </section>

      {/* ---------------- ABOUT TEASER ---------------- */}
      <section className="relative z-10 bg-cream-deep py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[6px] shadow-soft">
            <PortraitImage
              src={site.portrait}
              tone={["#e6d3ad", "#b0894f"]}
              alt={`${site.founderName}, ${site.founderRole} of ${site.name}`}
              label={site.founderName}
            />
          </div>
          <div>
            <p className="eyebrow">The artist</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              {site.about.heading}
            </h2>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
              {site.about.body[0]}
            </p>
            <div className="mt-10 flex gap-10">
              {site.about.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-light text-rose">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="link-flourish mt-9 inline-block text-sm font-medium text-ink"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- REELS PEEK ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">In motion</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Reels</h2>
          </div>
          <Link
            href="/reels"
            className="link-flourish hidden text-sm font-medium text-ink sm:block"
          >
            Watch all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {reels.slice(0, 4).map((reel, i) => (
            <Reveal key={reel._id} delay={i * 80}>
              <Link href="/reels" className="group block">
                <div className="relative aspect-[9/16] overflow-hidden rounded-lg shadow-soft">
                  <ArtImage tone={reel.tone} alt={reel.title} />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <span className="ml-0.5 text-cream">▶</span>
                    </span>
                  </div>
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-xs text-cream">
                    {reel.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SERVICES + CTA ---------------- */}
      <section className="relative z-10 bg-ink py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="display mt-3 text-4xl text-cream sm:text-5xl">
                Book your seat
                <br />
                in the chair.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
                Every booking starts with a quick WhatsApp chat so we can plan the
                perfect look for your day.
              </p>
              <div className="mt-8">
                <BookButton
                  variant="solid"
                  className="!bg-cream !text-ink hover:!bg-blush-soft"
                  label="Start on WhatsApp"
                  message={`Hi ${site.artist}, I'd like to book a session.`}
                />
              </div>
            </div>

            <ul className="divide-y divide-cream/15 border-t border-cream/15">
              {site.services.map((svc) => (
                <li
                  key={svc.title}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <div>
                    <p className="font-serif text-xl font-light">{svc.title}</p>
                    <p className="mt-1 max-w-md text-sm text-cream/60">
                      {svc.description}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-sm text-gold-soft">
                    {fromPrice(svc.from)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
