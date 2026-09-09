import type { APIRoute } from "astro";
import { isProduction } from "~/lib/env";
import { site } from "~/lib/site";

const welcome = `User-agent: *
Allow: /

# Answer engines and model crawlers are welcome. Named explicitly so the
# intent survives anyone tightening the wildcard above.
User-agent: Googlebot
User-agent: Google-Extended
User-agent: Bingbot
User-agent: DuckDuckBot
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-User
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`;

// Not the production domain, so nothing here should be indexed. The pages
// carry a noindex of their own — this only stops the crawl earlier.
const closed = `User-agent: *
Disallow: /
`;

export const GET: APIRoute = () =>
  new Response(isProduction ? welcome : closed, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
