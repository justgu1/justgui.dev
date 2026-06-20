import type { Project } from "../types/project";

export type SeoSchemaInput = {
  canonical: string;
  lang: string;
  title: string;
  description: string;
  serviceName: string;
  websiteAlternateNames: string[];
  personAlternateNames: string[];
  knowsAbout: string[];
  serviceTypes: string[];
  personName: string;
  jobTitle: string;
  sameAs: string[];
  projectsListName: string;
  projects: Project[];
};

export function parseSeoList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildSeoJsonLd(input: SeoSchemaInput): Record<string, unknown> {
  const personId = `${input.canonical}#person`;
  const websiteId = `${input.canonical}#website`;
  const serviceId = `${input.canonical}#service`;

  const itemListElement = input.projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebSite",
      name: project.name,
      description: project.description,
      url: project.href,
      keywords: project.tags.join(", "),
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: input.canonical,
        name: input.serviceName,
        alternateName: input.websiteAlternateNames,
        description: input.description,
        inLanguage: input.lang,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: input.personName,
        alternateName: input.personAlternateNames,
        jobTitle: input.jobTitle,
        knowsAbout: input.knowsAbout,
        url: input.canonical,
        sameAs: input.sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: input.serviceName,
        url: input.canonical,
        serviceType: input.serviceTypes,
        areaServed: "Worldwide",
        provider: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${input.canonical}#projects`,
        name: input.projectsListName,
        itemListElement,
      },
    ],
  };
}
