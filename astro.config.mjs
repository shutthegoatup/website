// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Article dates for sitemap lastmod. Read from the files rather than the
// content collection, which does not exist yet when the config is evaluated.
const writingDir = "src/content/writing";
const lastmod = new Map(
  readdirSync(writingDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const body = readFileSync(`${writingDir}/${file}`, "utf8");
      const updated = /^updated:\s*(\S+)/m.exec(body);
      const published = /^published:\s*(\S+)/m.exec(body);
      const date = updated?.[1] ?? published?.[1];
      return [`/writing/${file.replace(/\.md$/, "")}/`, date];
    })
    .filter(([, date]) => date),
);

export default defineConfig({
  site: "https://shutthegoatup.com",
  output: "static",
  // Compression strips the newline between an inline element and the text
  // after it, welding words together ("GOATis beatable").
  compressHTML: false,
  // Shiki inlines its theme colours, so the only way to keep code blocks on
  // palette is to have it emit variables and set them in app.css.
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize: (item) => {
        for (const [path, date] of lastmod) {
          if (item.url.endsWith(path)) return { ...item, lastmod: date };
        }
        return item;
      },
    }),
  ],
  server: { port: 4321 },
  vite: { plugins: [tailwindcss()] },
});
