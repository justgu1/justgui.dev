#!/usr/bin/env node

const BASE_URL = process.env.SEO_BASE_URL ?? "http://localhost:4321";
const LANGS = ["en", "pt", "es"];

const checks = [
  { name: "title", test: (html) => /<title>[^<]+<\/title>/i.test(html) },
  {
    name: "meta description",
    test: (html) =>
      /<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html),
  },
  {
    name: "canonical",
    test: (html) =>
      /<link\s+rel=["']canonical["']\s+href=["']https?:\/\/[^"']+["']/i.test(
        html
      ),
  },
  {
    name: "hreflang en",
    test: (html) =>
      /<link\s+rel=["']alternate["']\s+hreflang=["']en["']/i.test(html),
  },
  {
    name: "hreflang pt",
    test: (html) =>
      /<link\s+rel=["']alternate["']\s+hreflang=["']pt["']/i.test(html),
  },
  {
    name: "hreflang es",
    test: (html) =>
      /<link\s+rel=["']alternate["']\s+hreflang=["']es["']/i.test(html),
  },
  {
    name: "og:image",
    test: (html) =>
      /<meta\s+property=["']og:image["']\s+content=["'][^"']+["']/i.test(html),
  },
  {
    name: "json-ld",
    test: (html) =>
      /<script\s+type=["']application\/ld\+json["']/i.test(html) &&
      /"@type"\s*:\s*"Person"/i.test(html),
  },
];

let failed = 0;

for (const lang of LANGS) {
  const url = `${BASE_URL.replace(/\/$/, "")}/${lang}/`;
  let html;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[${lang}] HTTP ${response.status} for ${url}`);
      failed++;
      continue;
    }
    html = await response.text();
  } catch (error) {
    console.error(`[${lang}] Failed to fetch ${url}:`, error.message);
    failed++;
    continue;
  }

  for (const check of checks) {
    if (!check.test(html)) {
      console.error(`[${lang}] Missing: ${check.name}`);
      failed++;
    }
  }
}

const base = BASE_URL.replace(/\/$/, "");

for (const [sitemapPath, marker] of [
  ["/sitemap-index.xml", "<sitemapindex"],
  ["/sitemap-0.xml", "<urlset"],
]) {
  try {
    const response = await fetch(`${base}${sitemapPath}`);
    const body = await response.text();
    if (!response.ok) {
      console.error(`[sitemap] HTTP ${response.status} for ${sitemapPath}`);
      failed++;
      continue;
    }
    if (!body.startsWith("<?xml") || !body.includes(marker)) {
      console.error(`[sitemap] Invalid XML body for ${sitemapPath}`);
      failed++;
    }
  } catch (error) {
    console.error(`[sitemap] Failed to fetch ${sitemapPath}:`, error.message);
    failed++;
  }
}

try {
  const robotsResponse = await fetch(`${base}/robots.txt`);
  const robotsBody = await robotsResponse.text();
  if (!robotsResponse.ok || !robotsBody.includes("Sitemap:")) {
    console.error("[robots] Missing or invalid robots.txt");
    failed++;
  }
} catch (error) {
  console.error("[robots] Failed to fetch robots.txt:", error.message);
  failed++;
}

if (failed > 0) {
  console.error(`\nSEO validation failed with ${failed} issue(s).`);
  process.exit(1);
}

console.log("SEO validation passed for all languages.");
