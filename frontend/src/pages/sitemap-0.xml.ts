import type { APIRoute } from "astro";
import {
  buildSitemapUrlsetXml,
  XML_HEADERS,
} from "../server/sitemap";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(buildSitemapUrlsetXml(), {
    headers: XML_HEADERS,
  });
};
