/**
 * The JennyGlams logo — approved "Editorial Wordmark" (Concept 01).
 * Live text in the brand's Fraunces face, so it stays crisp at any size and
 * adapts to its surrounding color (uses currentColor for the wordmark).
 *
 * variant="lockup"  — full: eyebrow + wordmark + ruled tagline (footer, hero)
 * variant="compact" — tight two-line stack for the header nav bar
 */
export default function Logo({
  className = "",
  align = "center",
  variant = "lockup",
}: {
  className?: string;
  align?: "center" | "start";
  variant?: "lockup" | "compact";
}) {
  const items = align === "start" ? "items-start" : "items-center";

  if (variant === "compact") {
    return (
      <div className={`inline-flex flex-col ${items} ${className}`}>
        <span className="text-[0.5rem] font-medium uppercase leading-none tracking-[0.3em] text-gold">
          Makeup Artistry
        </span>
        <span className="mt-1 font-serif text-xl font-light leading-none tracking-[-0.01em] sm:text-2xl">
          JennyGlams
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col ${items} ${className}`}>
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.34em] text-gold">
        Makeup Artistry
      </span>
      <span className="mt-1.5 font-serif text-[2rem] font-light leading-none tracking-[-0.01em]">
        JennyGlams
      </span>
      <span className="mt-2 flex items-center gap-2.5 text-[0.56rem] uppercase tracking-[0.3em] text-muted">
        <span className="h-px w-6 bg-gold/60" aria-hidden="true" />
        Jos · Nigeria
        <span className="h-px w-6 bg-gold/60" aria-hidden="true" />
      </span>
    </div>
  );
}
