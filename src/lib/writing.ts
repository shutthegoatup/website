import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"writing">;

/**
 * Everything we have written. A piece whose text has not been brought across
 * yet still gets a page — it carries the metadata and sends the reader on, so
 * the index never hands anyone off before they have reached us.
 */
export const allWriting = async (): Promise<Article[]> =>
  (await getCollection("writing")).sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );

/**
 * Whether the text is here yet. Derived from the file rather than a flag, so
 * pasting a body in is the whole job — there is nothing to remember to flip.
 */
export const hasBody = (article: Article): boolean =>
  (article.body ?? "").replace(/<!--[\s\S]*?-->/g, "").trim().length > 0;

export const articleUrl = (article: Article): string =>
  `/writing/${article.id}/`;

export const articleDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Rough, and rounded up. Matches what a reader expects from the count. */
export const readingTime = (body: string): number =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
