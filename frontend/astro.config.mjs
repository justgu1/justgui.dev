import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const site = process.env.PUBLIC_SITE_URL ?? "http://localhost:4321";

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
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
    server: {
      allowedHosts: ["localhost", "127.0.0.1", "justgui_frontend"],
    },
  },
});
