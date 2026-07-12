import Image from "next/image";

type Props = {
  tone: [string, string];
  imageUrl?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Fills its (relatively-positioned) parent. Shows a real photo once `imageUrl`
 * is present; until then, renders a tasteful duotone gradient with a faint
 * monogram so the layout reads like finished editorial work.
 */
export default function ArtImage({
  tone,
  imageUrl,
  alt,
  label,
  className = "",
  priority = false,
}: Props) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover ${className}`}
      />
    );
  }

  const [c1, c2] = tone;
  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(130% 110% at 28% 18%, ${c1} 0%, transparent 58%), linear-gradient(152deg, ${c1} 0%, ${c2} 100%)`,
      }}
    >
      {/* soft top-light bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 70% 12%, rgba(255,255,255,0.35), transparent 70%)",
        }}
      />
      {/* gentle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(36,29,25,0.28) 100%)",
        }}
      />
      {/* monogram */}
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-serif text-[5rem] font-light leading-none text-white/25 select-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          JG
        </span>
      </div>
      {label && (
        <span className="absolute bottom-4 left-4 text-[0.62rem] uppercase tracking-[0.28em] text-white/60">
          {label}
        </span>
      )}
    </div>
  );
}
