import { groq } from "next-sanity";

/** All looks, ordered by manual order then newest first. */
export const looksQuery = groq`
  *[_type == "look"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    fromAmount,
    description,
    featured,
    image
  }
`;

/** Featured looks only (for the homepage). */
export const featuredLooksQuery = groq`
  *[_type == "look" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    fromAmount,
    description,
    featured,
    image
  }
`;

/** A single look by slug (for the detail view / share links). */
export const lookBySlugQuery = groq`
  *[_type == "look" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    fromAmount,
    description,
    featured,
    image
  }
`;

/** All reels, ordered. Dereferences the uploaded video file to a playable URL. */
export const reelsQuery = groq`
  *[_type == "reel"] | order(order asc, _createdAt desc) {
    _id,
    title,
    caption,
    fromAmount,
    "videoUrl": video.asset->url,
    poster
  }
`;
