import { defineConfig } from "astro/config";
import node from "@astrojs/node";

const site = process.env.PUBLIC_SITE_URL ?? "http://localhost:4321";

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
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
