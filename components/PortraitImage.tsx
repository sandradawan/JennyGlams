"use client";

import { useState } from "react";
import Image from "next/image";
import ArtImage from "./ArtImage";

type Props = {
  /** e.g. "/jennifer.jpg" — a file in the /public folder */
  src?: string;
  tone: [string, string];
  alt: string;
  label?: string;
  priority?: boolean;
};

/**
 * Shows the real portrait from /public when the file exists; if the path is
 * empty OR the image fails to load (file not added yet), it falls back to the
 * elegant gradient placeholder — so the page never shows a broken image.
 */
export default function PortraitImage({
  src,
  tone,
  alt,
  label,
  priority,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ArtImage tone={tone} alt={alt} label={label} priority={priority} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 40vw"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
