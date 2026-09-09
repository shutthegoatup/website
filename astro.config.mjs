// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://shutthegoatup.com",
  output: "static",
  // Compression strips the newline between an inline element and the text
  // after it, welding words together ("GOATis beatable").
  compressHTML: false,
  // Shiki inlines its theme colours, so the only way to keep code blocks on
  // palette is to have it emit variables and set them in app.css.
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  server: { port: 4321 },
  vite: { plugins: [tailwindcss()] },
});
