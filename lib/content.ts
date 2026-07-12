/**
 * Client-safe content types + constants.
 *
 * This module has NO server/Sanity imports, so client components can import
 * `categories` and the types without pulling the Sanity client into the browser
 * bundle. Server-side fetching lives in `lib/data.ts`.
 */

export type Look = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  fromAmount: number;
  description: string;
  featured: boolean;
  /** duotone gradient stops used by the placeholder until a real image exists */
  tone: [string, string];
  /** real image URL, populated from Sanity */
  imageUrl?: string;
};

export type Reel = {
  _id: string;
  title: string;
  caption: string;
  fromAmount?: number;
  tone: [string, string];
  /** streaming/playback URL from Sanity */
  videoUrl?: string;
  posterUrl?: string;
};

export const categories = [
  "All",
  "Bridal",
  "Soft Glam",
  "Editorial",
  "Party",
  "Owambe",
] as const;

/** Fallback gradient tone for real Sanity images (the image takes over anyway). */
export const DEFAULT_TONE: [string, string] = ["#f2ded8", "#c07c76"];
