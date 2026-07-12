# JennyGlams — Web Magazine & Portfolio

An elegant, editorial portfolio site for **JennyGlams** makeup artistry. Clients
browse looks (with starting prices), watch short-form reels, and book directly on
WhatsApp. Built to deploy on **Vercel**.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — design tokens in [`app/globals.css`](app/globals.css)
- **next/font** — Fraunces (serif display) + Inter (body)
- Content is currently **mock data** in [`lib/data.ts`](lib/data.ts) and
  [`lib/site.ts`](lib/site.ts) — structured so it swaps to **Sanity CMS** with no
  page/component changes (every query function is already `async`).

## Run it locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, featured looks, about teaser, reels peek, services |
| `/portfolio` | Filterable gallery + tap-to-open look detail (with "from" price + Book) |
| `/reels` | Vertical, scroll-snapping short-video feed (video-ready) |
| `/about` | Jenny's story + services |
| `/book` | WhatsApp booking + price reference |

## Placeholders → real content

The elegant duotone gradients are **placeholders**. They vanish the moment real
media is attached:

- **Photos:** set `imageUrl` on a look (this is what the Sanity image CDN returns).
- **Reels:** set `videoUrl` (+ optional `posterUrl`) — the `<video>` player and
  autoplay-in-view logic are already wired in [`components/ReelFeed.tsx`](components/ReelFeed.tsx).

## Before launch — swap in `lib/site.ts`

- `whatsapp` — Jenny's real number, international format, no `+` or spaces
- `email`, `socials.instagram`, `socials.tiktok`
- `about`, `services`, prices, `location`

## Content management (Sanity CMS)

Looks and reels are managed in **Sanity**. The website reads published content;
Jenny uploads through the **Studio** (run locally with `npx sanity dev` or hosted
free at `jennyglams.sanity.studio` via `npx sanity deploy`). The data functions in
`lib/data.ts` already query Sanity and fall back to mock content until a project is
connected — see **[SANITY-SETUP.md](SANITY-SETUP.md)** for the ~5-minute setup.

- Schemas: [`sanity/schemaTypes/`](sanity/schemaTypes/) (`look`, `reel`)
- Studio config: [`sanity.config.ts`](sanity.config.ts) · CLI: [`sanity.cli.ts`](sanity.cli.ts)
- Client-safe types/constants: [`lib/content.ts`](lib/content.ts) (keeps the CMS
  client out of the browser bundle)

## Roadmap (next phases)

1. **Connect Sanity** — create the project, add the Project ID (SANITY-SETUP.md).
2. **Mux** for reels — official `sanity-plugin-mux-input` for adaptive streaming.
3. **Deploy** to Vercel + connect a custom domain.
