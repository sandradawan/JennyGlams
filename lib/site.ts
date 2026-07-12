/**
 * Global brand + contact settings.
 * When the CMS is wired up, these become editable fields in Jenny's dashboard
 * (the "Site Settings" document). For now they live here as placeholders.
 */
export const site = {
  name: "JennyGlams",
  artist: "Jenny",
  founderName: "Jennifer Jesse",
  founderRole: "Founder & CEO",
  // Her portrait: save the photo in the /public folder and set its path here.
  // Until that file exists, an elegant placeholder shows automatically — no broken image.
  portrait: "/jennifer.jpg",
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
    heading: "The artist behind the glow",
    body: [
      "JennyGlams is the vision of Jennifer Jesse — a Jos-based makeup artist and the founder behind the brand. She believes the best makeup never hides you; it reveals you. Every look begins with the skin: prepped, hydrated, and glowing, so what follows feels less like a mask and more like the most radiant version of yourself.",
      "Her artistry moves easily between worlds — the quiet intimacy of a bride's morning, the colour and joy of an Owambe celebration, the drama of an editorial set. From a barely-there soft glam to a bold, camera-ready statement, Jenny reads each face for its light and builds a look designed to last from the first photo to the final dance.",
      "Beyond the brush, she shares her craft through one-on-one masterclasses and collaborates with photographers and creatives across Nigeria. Time in her chair is meant to feel like an experience — unhurried, personal, and complete the moment you catch your reflection and smile.",
    ],
    stats: [
      { value: "Bridal", label: "Weddings & trials" },
      { value: "Glam", label: "Soft to full" },
      { value: "Editorial", label: "Shoots & sets" },
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
