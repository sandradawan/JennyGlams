import type { Metadata } from "next";
import ReelFeed from "@/components/ReelFeed";
import { getReels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reels",
  description:
    "Short makeup videos and look breakdowns by JennyGlams — swipe through and book the look you love.",
};

// Re-check Sanity for new reels every 30s (ISR).
export const revalidate = 30;

export default async function ReelsPage() {
  const reels = await getReels();
  return <ReelFeed reels={reels} />;
}
