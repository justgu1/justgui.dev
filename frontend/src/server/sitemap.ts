import { ENV } from "../config/env";
import { pageUrl, SUPPORTED_LANGS } from "../config/seo";

const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function siteBase(): string {
  return ENV.SITE_URL.replace(/\/$/, "");
}

export function buildSitemapIndexXml(): string {
  const sitemapUrl = `${siteBase()}/sitemap-0.xml`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="${SITEMAP_NS}">
  <sitemap>
    <loc>${escapeXml(sitemapUrl)}</loc>
  </sitemap>
</sitemapindex>`;
}

export function buildSitemapUrlsetXml(lastModified = new Date()): string {
  const lastmod = lastModified.toISOString().slice(0, 10);
  const alternates = SUPPORTED_LANGS.map((lang) => ({
    lang,
    href: pageUrl(lang),
  }));

  const urls = SUPPORTED_LANGS.map((lang) => {
    const loc = pageUrl(lang);
    const alternateLinks = [
      ...alternates.map(
        ({ lang: altLang, href }) =>
          `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(href)}"/>`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pageUrl("en"))}"/>`,
    ].join("\n");

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternateLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${SITEMAP_NS}" xmlns:xhtml="${XHTML_NS}">
${urls}
</urlset>`;
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
} as const;
