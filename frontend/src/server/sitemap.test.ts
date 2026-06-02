import { describe, expect, it } from "vitest";
import { buildSitemapIndexXml, buildSitemapUrlsetXml } from "./sitemap";

describe("sitemap", () => {
  it("builds sitemap index pointing to sitemap-0.xml", () => {
    const xml = buildSitemapIndexXml();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain("<sitemapindex");
    expect(xml).toContain("http://localhost:4321/sitemap-0.xml");
  });

  it("lists all language homepages with hreflang alternates", () => {
    const xml = buildSitemapUrlsetXml(new Date("2026-06-02T12:00:00Z"));
    expect(xml).toContain("<urlset");
    expect(xml).toContain("http://localhost:4321/en");
    expect(xml).toContain("http://localhost:4321/pt");
    expect(xml).toContain("http://localhost:4321/es");
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).toContain("<lastmod>2026-06-02</lastmod>");
  });
});
