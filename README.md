# shutthegoatup.com

Marketing site and brand home for **Shut The Goat Up**.

Astro 5, static output, Tailwind v4, self-hosted variable fonts. No client
framework, no third-party CDN, no trackers — the site ships as plain HTML/CSS
with two small inline scripts.

## Commands

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # static site to dist/
npm run preview        # serve dist/
npm run validate       # typecheck + lint + format check
npm run brand:icons    # regenerate the icon/social pack from brand/*.svg
```

`brand:icons` needs `rsvg-convert` (librsvg), `magick` (ImageMagick 7) and
`chromium` on PATH. It is not part of the build — run it only when the marks
change, and commit the results.

## Layout

| Path                       | What                                              |
| -------------------------- | ------------------------------------------------- |
| `src/pages/`               | One `.astro` file per route                       |
| `src/components/sections/` | Landing page sections                             |
| `src/lib/site.ts`          | All copy and site data, typed — edit content here |
| `src/styles/app.css`       | Theme tokens, brand device, animation             |
| `brand/`                   | Vector masters. **Edit these**, never the exports |
| `public/brand/`            | Generated distributable assets                    |
| `scripts/`                 | Asset generation and screenshot helpers           |

## Brand

The device is a **redaction bar** — a censor bar over the loudest voice in the
room. It is the logo (bar across the goat's muzzle), the headline treatment
(the word "Goat" gets struck out), and the reason there is exactly one accent
colour.

| Token  | Hex       | Use                                |
| ------ | --------- | ---------------------------------- |
| Bone   | `#F2EFE6` | Primary ground                     |
| Ink    | `#0F0E0C` | Type, rules, inverted sections     |
| Signal | `#FF3B12` | The redaction, one accent per view |
| Ash    | `#8C8577` | Secondary labels only              |

Type: **Bricolage Grotesque** (display), **Bodoni Moda Italic** (the word
"Goat", always redacted), **Instrument Sans** (body), **Martian Mono** (labels).

The live kit, with downloads, is at [`/brand`](https://shutthegoatup.com/brand).

## Deploying

`npm run build` produces a fully static `dist/`, so any static host works.

**Cloudflare Pages** — build command `npm run build`, output directory `dist`.
`public/_headers` is picked up automatically for caching and security headers.

**S3 + CloudFront** — sync `dist/` to the bucket and serve via OAC. Set the
default root object to `index.html` and map 404s to `/404.html`. Astro emits
directory-style routes (`/brand/index.html`), so either enable a
directory-index Function or use `build.format: "file"` in `astro.config.mjs`.

**Container** — `build/package/Dockerfile` builds the site and serves `dist/`
from nginx, for the existing Helm chart in `deployment/`.
