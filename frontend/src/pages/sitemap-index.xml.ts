import type { APIRoute } from "astro";
import {
  buildSitemapIndexXml,
  XML_HEADERS,
} from "../server/sitemap";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(buildSitemapIndexXml(), {
    headers: XML_HEADERS,
  });
};
