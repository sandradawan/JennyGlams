/**
 * Sanity connection settings, read from environment variables.
 * The site works with mock data until NEXT_PUBLIC_SANITY_PROJECT_ID is set —
 * see .env.example for the two values you need.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// JennyGlams Sanity project. The Project ID is public (not a secret), so it's
// safe to hardcode as the default — env vars still override it if ever needed.
// NEXT_PUBLIC_* is read by the website; SANITY_STUDIO_* by the `sanity` CLI.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "gwyrhsa7";

/** True once a real project id is configured — flips the site from mock to live CMS. */
export const isSanityConfigured = projectId.length > 0;
