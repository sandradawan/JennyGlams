/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity image CDN (used once the CMS is wired up)
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Mux thumbnails/posters for reels
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
};

export default nextConfig;
