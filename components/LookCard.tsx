import ArtImage from "./ArtImage";
import { fromPrice } from "@/lib/site";
import type { Look } from "@/lib/content";

type Props = {
  look: Look;
  onOpen?: () => void;
  priority?: boolean;
};

/** A single portfolio look — photo, title, category, and "from" price. */
export default function LookCard({ look, onOpen, priority }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left"
      aria-label={`View ${look.title}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-cream-deep shadow-soft">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]">
          <ArtImage
            tone={look.tone}
            imageUrl={look.imageUrl}
            alt={look.title}
            priority={priority}
          />
        </div>
        {/* gradient scrim for legibility on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft backdrop-blur-sm">
          {look.category}
        </span>
        <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View look →
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-light leading-tight">{look.title}</h3>
        <span className="whitespace-nowrap text-sm text-gold">
          {fromPrice(look.fromAmount)}
        </span>
      </div>
    </button>
  );
}
