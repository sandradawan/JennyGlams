# Connecting the CMS (one-time, ~5 minutes)

The site already works with placeholder content. Follow these steps once to let
**Jenny upload her own looks and reels** through the Sanity dashboard.

> **Architecture:** the website (this Next.js app) *reads* published content from
> Sanity. The **Studio** (the admin where Jenny uploads) runs separately — either
> locally (`npx sanity dev`) or hosted for free by Sanity at
> `jennyglams.sanity.studio` (`npx sanity deploy`). This keeps the website fast
> and fully decoupled from the admin.

## 1. Create a free Sanity project

1. Go to **https://www.sanity.io/manage** and sign in (Google/GitHub/email — free).
2. Click **Create new project**. Name it `JennyGlams`.
3. Create a dataset named **`production`** and make it **public** (so the website
   can read published looks without a token).
4. Open the project → **API** tab → copy the **Project ID** (e.g. `a1b2c3d4`).

## 2. Add the Project ID ✅ already done

The JennyGlams Project ID **`gwyrhsa7`** is already hardcoded in
[`sanity/env.ts`](sanity/env.ts), so the website is connected — no `.env.local`
needed. The site reads from the `production` dataset and falls back to the elegant
placeholders only while nothing is published yet. New content appears within ~30s
of publishing (ISR).

> The Project ID is public (not a secret), so committing it is fine. If you ever
> want to switch projects, set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`.

## 3. Open Jenny's dashboard (the Studio)

**Option A — run it locally** (quickest to try):

```
npx sanity dev
```

Opens the Studio at **http://localhost:3333**.

**Option B — host it for free** (best for Jenny, gives her a permanent link):

```
npx sanity deploy
```

Pick a name like `jennyglams` → her dashboard lives at
**https://jennyglams.sanity.studio**, reachable from any phone or laptop.

Either way, Jenny logs in with the Sanity account and sees:

- **Look** — photo, title, category, starting price, description, "feature on
  homepage" toggle.
- **Reel** — a short vertical video file, caption, optional poster + price.

Hit **Publish** → it appears on the live website within seconds. No code, ever.

## 4. Allow the website to read (CORS)

In **sanity.io/manage → API → CORS origins**, add (with "Allow credentials"):

- `http://localhost:3000`
- your Vercel URL later, e.g. `https://jennyglams.vercel.app`

## Deploying the website to Vercel

Add the two `NEXT_PUBLIC_SANITY_*` variables in **Vercel → Settings → Environment
Variables**, then deploy. Add the Vercel domain to Sanity CORS (step 4).

## Later upgrade: Mux for reels

Reels currently stream from Sanity's file storage — perfect to start. If Jenny
posts a lot of video, we can add the official **`sanity-plugin-mux-input`** for
adaptive streaming; it slots into the same Studio.
