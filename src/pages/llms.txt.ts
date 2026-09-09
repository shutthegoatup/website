import type { APIRoute } from "astro";
import { capabilities, principles, products, site, team } from "~/lib/site";
import { allWriting, articleDate, articleUrl } from "~/lib/writing";

const statusNote: Record<(typeof products)[number]["status"], string> = {
  live: "live",
  building: "in build",
  classified: "not announced",
};

// Generated from the same copy the pages render, so a model reading this
// cannot be told something the site does not say.
const body = (writing: Awaited<ReturnType<typeof allWriting>>) =>
  [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.legalEntity} — ${site.jurisdiction} no. ${site.companyNumber}. Founded ${site.founded}, working out of ${site.city}. Contact: ${site.email}`,
    "",
    "## Products",
    "",
    ...products.map((product) => {
      const where = product.href ? ` (${product.href})` : "";
      return `- ${product.name}${where} — ${product.category}, ${statusNote[product.status]}. Coming for ${product.takes}. ${product.blurb}`;
    }),
    "",
    "## Disciplines",
    "",
    ...capabilities.map(
      (capability) => `- ${capability.title} — ${capability.body}`,
    ),
    "",
    "## Position",
    "",
    ...principles.map(
      (principle) => `- ${principle.heading} — ${principle.body}`,
    ),
    "",
    "## People",
    "",
    ...team.map((person) => `- ${person.name}, ${person.role}. ${person.bio}`),
    "",
    ...(writing.length > 0
      ? [
          "## Writing",
          "",
          ...writing.map((article) => {
            const facets = [
              articleDate(article.data.published),
              ...(article.data.kind ? [article.data.kind] : []),
              ...article.data.tags,
            ].join(", ");
            return `- [${article.data.title}](${site.url}${articleUrl(article)}) — ${facets}. ${article.data.description}`;
          }),
          "",
        ]
      : []),
    "## Pages",
    "",
    `- [Home](${site.url}/): products, position, disciplines and the team.`,
    `- [Brand](${site.url}/brand): the mark, the redaction device, colour, type and downloadable assets.`,
    ...(writing.length > 0
      ? [`- [Writing](${site.url}/writing): long-form notes on the work.`]
      : []),
    `- [Privacy](${site.url}/privacy): what this site does and does not collect.`,
    "",
  ].join("\n");

export const GET: APIRoute = async () =>
  new Response(body(await allWriting()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
