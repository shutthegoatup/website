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

`npm run build` produces a fully static `dist/`, served by Cloudflare Pages
(project `shutthegoatup`), which builds this repo itself through its GitHub
integration. There is no deploy workflow.

| Environment | Trigger                  | Hostname                           | Indexing                               |
| ----------- | ------------------------ | ---------------------------------- | -------------------------------------- |
| Production  | push to `master`         | `shutthegoatup.com`                | `PUBLIC_SITE_DOMAIN` set, so indexed   |
| Preview     | push to any other branch | `<branch>.shutthegoatup.pages.dev` | variable unset, so the build noindexes |

Cloudflare comments each preview's URL on its pull request.

DNS is on Cloudflare. The apex is a proxied CNAME to the Pages project.
`www-redirect/` is a Worker bound to `www.shutthegoatup.com` that 301s
everything to `https://shutthegoatup.com`, keeping path and query. Deploy it
with `npx wrangler deploy` from that directory. It rarely changes.

The old S3 and CloudFront stacks live in `renderappio/aws-org-management`
(`terraform/05_workloads/stgu-website{,-notprod}`). Production no longer serves
anything. `unstable.shutthegoatup.com` still points at the notprod distribution
and stops updating with this change, so remove that DNS record before
destroying the stacks.

**Container** — `build/package/Dockerfile` builds the site and serves `dist/`
from nginx. Unused by the pipeline above, kept for local container runs; the
security headers it sets are the ones CloudFront still needs configured.
