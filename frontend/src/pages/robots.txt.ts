import type { APIRoute } from "astro";
import { ENV } from "../config/env";

export const prerender = true;

export const GET: APIRoute = () => {
  const base = ENV.SITE_URL.replace(/\/$/, "");
  const sitemap = `${base}/sitemap-index.xml`;

  // In local/dev we allow crawling for Lighthouse/CI validation.
  // Production environments can still control indexing via meta robots.
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
