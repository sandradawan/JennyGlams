/**
 * Global brand + contact settings.
 * When the CMS is wired up, these become editable fields in Jenny's dashboard
 * (the "Site Settings" document). For now they live here as placeholders.
 */
export const site = {
  name: "JennyGlams",
  artist: "Jenny",
  tagline: "Makeup Artistry",
  heroLine: "Where every face becomes editorial.",
  intro:
    "A Jos-based makeup artist crafting soft glam, bridal, and editorial looks that feel like you — only more so. Browse the portfolio, watch the reels, and book your seat in the chair.",
  location: "Jos, Plateau State",
  address: "Hwolshe, Jos, Plateau State",
  currency: "₦",
  // International format for wa.me (no +, no spaces). 08109782832 -> 2348109782832
  whatsapp: "2348109782832",
  email: "jenniferjesse@gmail.com",
  socials: {
    instagram: "", // none provided yet — link is hidden while empty
    tiktok: "https://tiktok.com/@sugarplum8698",
  },
  about: {
    heading: "The artist behind the brush",
    body: [
      "Jenny is a Jos-based makeup artist with an eye for light, skin, and the kind of glow that photographs like a dream and lasts all night.",
      "From intimate bridal mornings to high-energy editorial sets, every look starts with the person in the chair — their features, their story, the way they want to feel when they catch their reflection.",
      "Beyond the brush, she teaches, collaborates with photographers, and builds looks that turn a good day into the day.",
    ],
    stats: [
      { value: "300+", label: "Faces beat" },
      { value: "6 yrs", label: "Behind the brush" },
      { value: "80+", label: "Brides glowing" },
    ],
  },
  services: [
    {
      title: "Bridal Glam",
      description:
        "The full bridal experience — trial session, wedding-day artistry, and a look built to last through every tear and dance.",
      from: 120000,
    },
    {
      title: "Soft Glam",
      description:
        "Effortless, luminous, dinner-and-photos ready. Your features, softly amplified.",
      from: 35000,
    },
    {
      title: "Editorial & Photoshoot",
      description:
        "Bold, concept-driven looks for shoots, campaigns, and creative sets.",
      from: 60000,
    },
    {
      title: "Masterclass / 1-on-1",
      description:
        "Learn the techniques — skin prep, blending, and building a look that holds up on camera.",
      from: 50000,
    },
  ],
};

export type Site = typeof site;

/** Builds a click-to-chat WhatsApp link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a number as a "from" price, e.g. 25000 -> "From ₦25,000". */
export function fromPrice(amount: number) {
  return `From ${site.currency}${amount.toLocaleString("en-NG")}`;
}
