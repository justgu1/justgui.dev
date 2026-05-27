import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const site = process.env.PUBLIC_SITE_URL ?? "http://localhost:4321";

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          pt: "pt",
          es: "es",
        },
      },
    }),
  ],
  server: {
    host: true,
    port: Number(process.env.PORT || 4321),
  },
  vite: {
    envDir: "../",
    cacheDir: "/tmp/justgui-vite-cache",
  },
});
