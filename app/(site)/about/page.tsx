import type { Metadata } from "next";
import PortraitImage from "@/components/PortraitImage";
import Reveal from "@/components/Reveal";
import BookButton from "@/components/BookButton";
import { fromPrice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.artist}, the makeup artist behind ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36">
      {/* intro */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative order-2 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[6px] shadow-lift lg:order-1">
            <PortraitImage
              src={site.portrait}
              tone={["#f2ded8", "#c07c76"]}
              alt={`${site.founderName}, ${site.founderRole} of ${site.name}`}
              priority
              label={site.founderName}
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">{site.location}</p>
            <h1 className="display mt-4 text-5xl sm:text-6xl">
              {site.about.heading}
            </h1>
            <p className="mt-4 font-serif text-xl font-light">
              {site.founderName}
              <span className="text-muted">
                {" "}
                — {site.founderRole}, {site.name}
              </span>
            </p>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
              {site.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex gap-10">
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
          </div>
        </div>
      </section>

      {/* services */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 text-center">
          <p className="eyebrow">What I offer</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Services</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {site.services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 70}>
              <div className="flex h-full flex-col justify-between rounded-lg border border-line bg-cream-deep/40 p-7">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-light">{svc.title}</h3>
                    <span className="whitespace-nowrap text-sm text-gold">
                      {fromPrice(svc.from)}
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {svc.description}
                  </p>
                </div>
                <div className="mt-6">
                  <BookButton
                    variant="outline"
                    label={`Book ${svc.title}`}
                    message={`Hi ${site.artist}, I'd like to book: ${svc.title}.`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
