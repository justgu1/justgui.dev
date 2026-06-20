import { describe, expect, it } from "vitest";
import { buildSeoJsonLd, parseSeoList } from "./seo-schema";

describe("parseSeoList", () => {
  it("splits comma-separated values", () => {
    expect(parseSeoList("A, B, C")).toEqual(["A", "B", "C"]);
  });
});

describe("buildSeoJsonLd", () => {
  it("builds graph with brand, services, and project list", () => {
    const jsonLd = buildSeoJsonLd({
      canonical: "https://justgui.dev/pt",
      lang: "pt",
      title: "Just Gui Software | E-commerce",
      description: "Desenvolvimento de software e e-commerce.",
      serviceName: "Just Gui Software",
      websiteAlternateNames: ["justgui", "Just Gui"],
      personAlternateNames: ["Guilherme Dev", "Gui Dev"],
      knowsAbout: ["E-commerce", "Laravel"],
      serviceTypes: ["E-commerce", "Software development"],
      personName: "Guilherme Santos",
      jobTitle: "Engenheiro de Software",
      sameAs: ["https://github.com/justgu1"],
      projectsListName: "Projetos",
      projects: [
        {
          id: "demo",
          slug: "demo",
          number: "001",
          name: "Demo Shop",
          category: "E-Commerce",
          tech: "Laravel",
          description: "Demo e-commerce project.",
          tags: ["Laravel", "E-commerce"],
          href: "https://example.com",
          featuredLabel: "E-Commerce",
          featuredYear: "2026",
          previewImageUrl: "/projects/demo.webp",
          previewImageAlt: "Demo preview",
        },
      ],
    });

    const graph = (jsonLd["@graph"] ?? []) as Record<string, unknown>[];
    const website = graph.find((node) => node["@type"] === "WebSite");
    const person = graph.find((node) => node["@type"] === "Person");
    const service = graph.find(
      (node) => node["@type"] === "ProfessionalService"
    );
    const itemList = graph.find((node) => node["@type"] === "ItemList");

    expect(website).toMatchObject({
      name: "Just Gui Software",
      alternateName: ["justgui", "Just Gui"],
    });
    expect(person).toMatchObject({
      name: "Guilherme Santos",
      alternateName: ["Guilherme Dev", "Gui Dev"],
      knowsAbout: ["E-commerce", "Laravel"],
    });
    expect(service).toMatchObject({
      name: "Just Gui Software",
      serviceType: ["E-commerce", "Software development"],
    });
    expect(itemList).toMatchObject({
      name: "Projetos",
    });
    const items = itemList?.itemListElement as
      | { item: { name: string } }[]
      | undefined;
    expect(items?.[0]?.item.name).toBe("Demo Shop");
  });
});
