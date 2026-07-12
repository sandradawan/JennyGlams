import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Layout for the public-facing site. Lives in a route group so the Sanity
 * Studio at /studio renders full-screen without the site header/footer.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </>
  );
}
