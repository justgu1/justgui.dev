import { describe, expect, it } from "vitest";
import {
  alternateUrls,
  canonicalUrl,
  ogImageUrl,
  pageUrl,
  SUPPORTED_LANGS,
} from "./seo";

describe("seo config", () => {
  it("builds canonical url per language", () => {
    expect(canonicalUrl("en")).toBe("http://localhost:4321/en");
    expect(canonicalUrl("pt")).toBe("http://localhost:4321/pt");
  });

  it("lists all supported languages in alternates", () => {
    const urls = alternateUrls();
    expect(urls).toHaveLength(SUPPORTED_LANGS.length);
    expect(urls.map((u) => u.lang).sort()).toEqual([...SUPPORTED_LANGS].sort());
  });

  it("builds page url with lang prefix", () => {
    expect(pageUrl("es")).toBe("http://localhost:4321/es");
  });

  it("builds absolute og image url", () => {
    expect(ogImageUrl()).toMatch(/^http:\/\/localhost:4321\//);
  });
});
