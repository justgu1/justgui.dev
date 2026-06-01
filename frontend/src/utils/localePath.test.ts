import { describe, expect, it } from "vitest";
import { pathLang, pathSuffix, replacePathLang } from "./localePath";

describe("localePath", () => {
  it("detects path language", () => {
    expect(pathLang("/en")).toBe("en");
    expect(pathLang("/pt/blog")).toBe("pt");
    expect(pathLang("/")).toBe(null);
  });

  it("replaces language in path", () => {
    expect(replacePathLang("/en/blog", "pt")).toBe("/pt/blog");
    expect(replacePathLang("/en", "pt")).toBe("/pt");
  });

  it("extracts suffix after language prefix", () => {
    expect(pathSuffix("/en/blog", "en")).toBe("/blog");
    expect(pathSuffix("/en", "en")).toBe("");
  });
});
