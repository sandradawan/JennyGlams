"use client";

import { useEffect, useRef, useState } from "react";
import ArtImage from "./ArtImage";
import BookButton from "./BookButton";
import { fromPrice, site } from "@/lib/site";
import type { Reel } from "@/lib/content";

export default function ReelFeed({ reels }: { reels: Reel[] }) {
  const [muted, setMuted] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // play whichever reel is centered in the viewport, pause the rest
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          const video = videoRefs.current[idx];
          if (entry.isIntersecting) {
            setActiveIdx(idx);
            video?.play().catch(() => {});
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".reel-slide").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reels.length]);

  return (
    <div className="relative">
      {/* global mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink/80 text-cream backdrop-blur transition-colors hover:bg-rose"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="reel-track h-[calc(100vh-4rem)] overflow-y-scroll sm:h-[calc(100vh-5rem)]">
        {reels.map((reel, idx) => (
          <section
            key={reel._id}
            data-idx={idx}
            className="reel-slide grid h-[calc(100vh-4rem)] place-items-center px-4 sm:h-[calc(100vh-5rem)]"
          >
            <div className="relative aspect-[9/16] h-[82%] max-h-[760px] w-auto overflow-hidden rounded-2xl bg-cream-deep shadow-lift">
              {reel.videoUrl ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={reel.videoUrl}
                  poster={reel.posterUrl}
                  className="h-full w-full object-cover"
                  loop
                  muted={muted}
                  playsInline
                  preload="metadata"
                />
              ) : (
                <ArtImage
                  tone={reel.tone}
                  alt={reel.title}
                  priority={idx === 0}
                  label="Reel · preview"
                />
              )}

              {/* play glyph for the placeholder state */}
              {!reel.videoUrl && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-cream/25 backdrop-blur-sm">
                    <span className="ml-1 text-2xl text-cream">▶</span>
                  </div>
                </div>
              )}

              {/* bottom info overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 pt-16">
                <p className="font-serif text-xl font-light text-cream">
                  {reel.title}
                </p>
                <p className="mt-1 text-sm leading-snug text-cream/80">
                  {reel.caption}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <BookButton
                    label={reel.fromAmount ? "Book this look" : "Book a session"}
                    variant="solid"
                    className="!bg-cream !text-ink hover:!bg-blush-soft"
                    message={`Hi ${site.artist}, I saw your "${reel.title}" reel and I'd love to book.`}
                  />
                  {reel.fromAmount && (
                    <span className="text-sm text-cream/90">
                      {fromPrice(reel.fromAmount)}
                    </span>
                  )}
                </div>
              </div>

              {/* progress dots */}
              <div className="absolute right-4 top-4 flex flex-col gap-1.5">
                {reels.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      i === activeIdx ? "bg-cream" : "bg-cream/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
