import type { APIRoute } from "astro";
import { site } from "~/lib/site";
import { allWriting, articleUrl } from "~/lib/writing";

const escape = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RSS wants RFC 822, which is what toUTCString already gives us. */
const stamp = (date: Date): string => date.toUTCString();

export const GET: APIRoute = async () => {
  const articles = await allWriting();
  const latest = articles[0]?.data.updated ?? articles[0]?.data.published;

  const items = articles
    .map((article) => {
      const url = new URL(articleUrl(article), site.url).href;
      const categories = article.data.tags
        .map((tag) => `      <category>${escape(tag)}</category>`)
        .join("\n");
      return [
        "    <item>",
        `      <title>${escape(article.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escape(article.data.description)}</description>`,
        `      <pubDate>${stamp(article.data.published)}</pubDate>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Writing</title>
    <link>${site.url}/writing/</link>
    <description>${escape(site.description)}</description>
    <language>en-GB</language>
    <copyright>${escape(site.legalEntity)}</copyright>
${latest ? `    <lastBuildDate>${stamp(latest)}</lastBuildDate>\n` : ""}    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
