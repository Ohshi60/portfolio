import { getCollection } from "astro:content";

/** Posts to build and list: everything in dev, only non-drafts in production. */
export async function getVisiblePosts() {
  const posts = await getCollection(
    "writing",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Whether any post is published; drives the "Writing" nav link. */
export async function hasPublishedPosts() {
  const published = await getCollection("writing", ({ data }) => !data.draft);
  return published.length > 0;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
