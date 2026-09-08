# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

The shutthegoatup.com marketing site. Astro 5 with `output: "static"`, Tailwind
v4 via `@tailwindcss/vite`, self-hosted Fontsource variable fonts. There is no
React and no client framework — keep it that way unless something genuinely
needs hydration.

## Commands

```bash
npm run dev          # http://localhost:4321
npm run build        # static output to dist/
npm run validate     # typecheck + lint + format check — run before committing
npm run brand:icons  # regenerate icons from brand/*.svg (needs rsvg-convert, magick, chromium)
```

`scripts/capture.sh <page> <width> <height> <out.png>` screenshots the built
site with animations neutralised — use it to check visual changes rather than
screenshotting the dev server, which catches mid-animation frames.

## Conventions

- **Copy lives in `src/lib/site.ts`**, typed and `as const`. Do not hardcode
  marketing text in components.
- **Brand assets are generated.** Edit `brand/*.svg`; never hand-edit anything
  under `public/brand/`, `public/icon-*`, `public/favicon.ico` or `public/og.png`.
- **One accent per view.** `--color-signal` is the redaction bar and at most one
  other element. Resist adding a second accent colour.
- **The redaction device** (`.redact` / `.redact__bar` in `src/styles/app.css`)
  is the identity. Reuse it rather than inventing new emphasis treatments.
- Type-aware ESLint rules are disabled for `.astro` files because
  `astro-eslint-parser` cannot type template expressions; `astro check` covers
  those files instead. Keep type-aware linting on for `.ts`.
- Entrance animations are gated behind an `html.js` class so a failed script
  never blanks the page. Any new `.reveal` element inherits this automatically.

## Shared resources

Nothing in this repo touches a shared database or service. The dev server binds
port 4321 and `scripts/capture.sh` binds 4399 — check nothing else is on them
before starting, since sibling worktrees share the machine.
