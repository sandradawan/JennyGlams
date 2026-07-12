import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getLooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse bridal, soft glam, editorial, and Owambe makeup looks by JennyGlams — each with a starting price.",
};

// Re-check Sanity for new looks every 30s (ISR).
export const revalidate = 30;

export default async function PortfolioPage() {
  const looks = await getLooks();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
      <header className="mb-14 text-center">
        <p className="eyebrow">The portfolio</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">Looks &amp; prices</h1>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-ink-soft">
          Every look is bookable. Tap any image to see the details and a starting
          price, then book directly on WhatsApp.
        </p>
      </header>

      <PortfolioGrid looks={looks} />
    </div>
  );
}
