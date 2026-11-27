import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Blog posts: one Markdown file per post in src/content/writing/.
// The filename (without .md) becomes the URL slug: /writing/<slug>/
const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Drafts are visible in `astro dev` but never built for production.
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
