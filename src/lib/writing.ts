import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"writing">;

const byNewest = (articles: Article[]): Article[] =>
  articles.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );

/**
 * Everything we have written, including pieces that still only exist on
 * LinkedIn. The index lists these and links out to the original.
 */
export const allWriting = async (): Promise<Article[]> =>
  byNewest(await getCollection("writing"));

/** Pieces whose text lives here, so they get a page of their own. */
export const hostedWriting = async (): Promise<Article[]> =>
  byNewest(await getCollection("writing", ({ data }) => !data.draft));

export const articleDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Where a row on the index should point, or null when there is nowhere yet. */
export const articleHref = (article: Article): string | null =>
  article.data.draft
    ? (article.data.origin?.href ?? null)
    : `/writing/${article.id}/`;
