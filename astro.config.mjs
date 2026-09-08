// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://shutthegoatup.com",
  output: "static",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  server: { port: 4321 },
  vite: { plugins: [tailwindcss()] },
});
