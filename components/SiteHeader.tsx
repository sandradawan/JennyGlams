"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reels", label: "Reels" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-line/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl font-light tracking-tight sm:text-2xl">
            {site.name}
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-gold sm:inline">
            {site.tagline}
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-flourish text-sm tracking-wide transition-colors ${
                isActive(item.href) ? "text-rose" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-rose"
          >
            Book
          </Link>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-serif text-3xl font-light transition-colors ${
                isActive(item.href) ? "text-rose" : "text-ink"
              }`}
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(10px)",
                opacity: open ? 1 : 0,
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
