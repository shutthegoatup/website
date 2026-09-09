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

`npm run build` produces a fully static `dist/`, published to S3 and served by
CloudFront. Both environments live in their own AWS account, so a preview
deploy cannot reach production.

|              | Production          | Preview                      |
| ------------ | ------------------- | ---------------------------- |
| Trigger      | push to `master`    | every pull request           |
| Account      | `488658242048`      | `784620264214`               |
| Hostname     | `shutthegoatup.com` | `unstable.shutthegoatup.com` |
| Distribution | `E3KH41IQXL64RE`    | `E3L0YRAD1RYM8M`             |

`.github/workflows/deploy.yaml` builds, assumes `gha-website-deployer` in the
target account over GitHub OIDC, syncs `dist/`, then invalidates CloudFront.
The distribution is looked up by its alias rather than hardcoded, so a replaced
distribution needs no change here. Invalidation is skipped with a notice if no
distribution serves the hostname yet — the upload still counts as success.

The OIDC trust is scoped per environment: production accepts only
`ref:refs/heads/master`, preview only the `pull_request` event.

Infrastructure lives in `renderappio/aws-org-management` under
`terraform/05_workloads/stgu-website{,-notprod}`. Bucket names are derived
there, not chosen here.

DNS is served by Cloudflare, not Route 53 — the domain is registered with
Cloudflare Registrar, which requires its own nameservers. ACM validation
records are therefore mirrored into Cloudflare by hand; the Route 53 zone the
Terraform writes into is not authoritative for this domain.

**Container** — `build/package/Dockerfile` builds the site and serves `dist/`
from nginx. Unused by the pipeline above, kept for local container runs; the
security headers it sets are the ones CloudFront still needs configured.
