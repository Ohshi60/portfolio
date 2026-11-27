import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";

// Leave /writing/ out of the sitemap until a post is published, matching the
// header, which only shows the "Writing" link once a non-draft post exists.
const writingDir = new URL("./src/content/writing/", import.meta.url);
const hasPublishedPosts = readdirSync(writingDir)
  .filter((file) => file.endsWith(".md"))
  .some(
    (file) =>
      !/^draft:\s*true\s*$/m.test(
        readFileSync(new URL(file, writingDir), "utf8"),
      ),
  );

export default defineConfig({
  site: "https://portfolio.ohshi.dk",
  // The stylesheet is small; inlining it avoids a render-blocking request.
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      filter: (page) => hasPublishedPosts || !page.includes("/writing/"),
    }),
  ],
});
