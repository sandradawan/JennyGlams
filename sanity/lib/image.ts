import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** The shape an image field must have to build a URL (derived from the builder). */
export type ImageSource = Parameters<typeof builder.image>[0];

/** Build an optimized Sanity CDN URL from an image field. */
export function urlFor(source: ImageSource) {
  return builder.image(source);
}
