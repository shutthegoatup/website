import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { writingTags } from "~/lib/site";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.enum(writingTags)).default([]),
      /** Co-located image, optimised at build. Also the social card for the piece. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Where the piece first appeared, if it was not here. Shown on the page. */
      origin: z.object({ label: z.string(), href: z.url() }).optional(),
    }),
});

export const collections = { writing };
