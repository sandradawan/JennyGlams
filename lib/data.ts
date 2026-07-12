/**
 * Content layer.
 *
 * When Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set) these functions
 * pull live content from the CMS. Until then — or if a query returns nothing —
 * they fall back to the mock content below, so the site always looks complete.
 *
 * The `tone` field drives the elegant gradient placeholder that stands in for a
 * real photo. Real Sanity images set `imageUrl`, which takes over automatically.
 */
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import {
  looksQuery,
  featuredLooksQuery,
  lookBySlugQuery,
  reelsQuery,
} from "@/sanity/lib/queries";
import { DEFAULT_TONE, type Look, type Reel } from "./content";

// Re-export the client-safe types/constants so existing server imports keep working.
export { categories, type Look, type Reel } from "./content";

// ---- Sanity → app-type mappers ----------------------------------------------

type SanityLook = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  fromAmount: number;
  description?: string;
  featured?: boolean;
  image?: Parameters<typeof urlFor>[0];
};

type SanityReel = {
  _id: string;
  title: string;
  caption?: string;
  fromAmount?: number;
  videoUrl?: string;
  poster?: Parameters<typeof urlFor>[0];
};

function mapLook(d: SanityLook): Look {
  return {
    _id: d._id,
    title: d.title,
    slug: d.slug,
    category: d.category,
    fromAmount: d.fromAmount,
    description: d.description ?? "",
    featured: Boolean(d.featured),
    tone: DEFAULT_TONE,
    imageUrl: d.image
      ? urlFor(d.image).width(1000).height(1250).fit("crop").auto("format").url()
      : undefined,
  };
}

function mapReel(d: SanityReel): Reel {
  return {
    _id: d._id,
    title: d.title,
    caption: d.caption ?? "",
    fromAmount: d.fromAmount ?? undefined,
    tone: DEFAULT_TONE,
    videoUrl: d.videoUrl,
    posterUrl: d.poster ? urlFor(d.poster).width(800).url() : undefined,
  };
}

/** Run a Sanity query, returning null on any failure so callers can fall back. */
async function trySanity<T>(query: string, params?: Record<string, unknown>) {
  if (!isSanityConfigured) return null;
  try {
    // Revalidate every 30s so newly-published content appears without a redeploy.
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 30 },
    });
  } catch {
    return null;
  }
}

// ---- Mock fallback content --------------------------------------------------

const LOOKS: Look[] = [
  {
    _id: "l1",
    title: "The Ivory Bride",
    slug: "the-ivory-bride",
    category: "Bridal",
    fromAmount: 120000,
    description:
      "A luminous bridal beat — flawless skin, feathered brows, and a soft champagne eye built to glow through vows and photos.",
    featured: true,
    tone: ["#f2ded8", "#c07c76"],
  },
  {
    _id: "l2",
    title: "Golden Hour Glow",
    slug: "golden-hour-glow",
    category: "Soft Glam",
    fromAmount: 35000,
    description:
      "Warm, dewy, dinner-ready. Bronzed lids and a lit-from-within finish.",
    featured: true,
    tone: ["#e6d3ad", "#b0894f"],
  },
  {
    _id: "l3",
    title: "Editorial Noir",
    slug: "editorial-noir",
    category: "Editorial",
    fromAmount: 60000,
    description:
      "A graphic, high-contrast concept look — smoked liner and a matte sculpted cheek for the camera.",
    featured: true,
    tone: ["#d9cfc6", "#4b3f38"],
  },
  {
    _id: "l4",
    title: "Rose Champagne",
    slug: "rose-champagne",
    category: "Party",
    fromAmount: 40000,
    description: "A shimmering rose-gold eye with a glossy nude lip. Made to dance.",
    featured: true,
    tone: ["#f2ded8", "#d8a8a0"],
  },
  {
    _id: "l5",
    title: "Owambe Royalty",
    slug: "owambe-royalty",
    category: "Owambe",
    fromAmount: 45000,
    description:
      "Bold, radiant, and gele-ready — full glam that holds up under the afternoon sun and the flash.",
    featured: false,
    tone: ["#e6d3ad", "#c07c76"],
  },
  {
    _id: "l6",
    title: "Soft Mocha",
    slug: "soft-mocha",
    category: "Soft Glam",
    fromAmount: 35000,
    description: "Everyday elegance — warm mocha tones and a satin skin finish.",
    featured: false,
    tone: ["#e0d2c4", "#8a7c72"],
  },
  {
    _id: "l7",
    title: "Blush Muse",
    slug: "blush-muse",
    category: "Editorial",
    fromAmount: 60000,
    description: "A monochrome blush story — lids, cheeks, and lips in one soft rosy wash.",
    featured: false,
    tone: ["#f2ded8", "#d8a8a0"],
  },
  {
    _id: "l8",
    title: "Midnight Emerald",
    slug: "midnight-emerald",
    category: "Party",
    fromAmount: 42000,
    description: "A jewel-toned smokey eye with a crisp nude lip for evenings that matter.",
    featured: false,
    tone: ["#cdd6c9", "#3f4a3f"],
  },
  {
    _id: "l9",
    title: "The Second-Look Bride",
    slug: "second-look-bride",
    category: "Bridal",
    fromAmount: 120000,
    description: "The reception reveal — deeper eye, bolder lip, same flawless base.",
    featured: false,
    tone: ["#efe0d0", "#b0894f"],
  },
];

const REELS: Reel[] = [
  {
    _id: "r1",
    title: "Bridal base, start to finish",
    caption: "60-second skin prep + flawless base for the Ivory Bride look.",
    fromAmount: 120000,
    tone: ["#f2ded8", "#c07c76"],
  },
  {
    _id: "r2",
    title: "Golden halo eye",
    caption: "How I build that lit-from-within champagne lid.",
    fromAmount: 35000,
    tone: ["#e6d3ad", "#b0894f"],
  },
  {
    _id: "r3",
    title: "Gele + glam transition",
    caption: "From bare face to Owambe royalty in 15 seconds.",
    fromAmount: 45000,
    tone: ["#e6d3ad", "#c07c76"],
  },
  {
    _id: "r4",
    title: "The perfect nude lip",
    caption: "My go-to combo for a glossy, your-lips-but-better finish.",
    tone: ["#efe0d0", "#8a7c72"],
  },
  {
    _id: "r5",
    title: "Editorial liner play",
    caption: "Graphic liner breakdown for the Noir concept look.",
    fromAmount: 60000,
    tone: ["#d9cfc6", "#4b3f38"],
  },
];

// ---- Public query functions -------------------------------------------------

export async function getLooks(category?: string): Promise<Look[]> {
  const docs = await trySanity<SanityLook[]>(looksQuery);
  const looks = docs?.length ? docs.map(mapLook) : LOOKS;
  if (!category || category === "All") return looks;
  return looks.filter((l) => l.category === category);
}

export async function getFeaturedLooks(limit = 4): Promise<Look[]> {
  const docs = await trySanity<SanityLook[]>(featuredLooksQuery);
  const looks = docs?.length ? docs.map(mapLook) : LOOKS.filter((l) => l.featured);
  return looks.slice(0, limit);
}

export async function getLookBySlug(slug: string): Promise<Look | undefined> {
  const doc = await trySanity<SanityLook | null>(lookBySlugQuery, { slug });
  if (doc) return mapLook(doc);
  return LOOKS.find((l) => l.slug === slug);
}

export async function getReels(): Promise<Reel[]> {
  const docs = await trySanity<SanityReel[]>(reelsQuery);
  return docs?.length ? docs.map(mapReel) : REELS;
}
