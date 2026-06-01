import type { Project } from "../types/project";

function withOverrides(base: Project, overrides: Partial<Project>): Project {
  return { ...base, ...overrides };
}

const projectsEn: Project[] = [
  {
    id: "ultrafarma",
    slug: "ultrafarma-nutrition",
    number: "001",
    name: "Ultrafarma",
    category: "E-Commerce",
    tech: "WordPress · PHP · Performance · A11Y",
    description:
      "High-performance e-commerce focused on accessible interaction, conversion-oriented UX, and fast navigation across desktop, mobile, and assistive technologies.",
    tags: ["WordPress", "PHP", "Performance", "A11Y"],
    href: "#",
    featured: true,
    featuredLabel: "Featured · E-Commerce",
    featuredYear: "2024",
    featuredTitleEm: "Nutrition",
    previewImageUrl: "/projects/ultrafarma-preview.svg",
    previewImageAlt: "Ultrafarma Nutrition project preview",
  },
  {
    id: "dashboard",
    slug: "accessible-dashboard",
    number: "002",
    name: "Accessible Dashboard",
    category: "SaaS · 2024",
    tech: "Vue · Go · PostgreSQL",
    description:
      "Analytics dashboard with keyboard-first navigation, semantic structure, and real-time data views built for assistive technologies.",
    tags: ["Vue", "Go", "PostgreSQL"],
    href: "#",
    previewImageUrl: "/projects/dashboard-preview.svg",
    previewImageAlt: "Accessible dashboard project preview",
  },
  {
    id: "gateway",
    slug: "integration-gateway",
    number: "003",
    name: "Integration Gateway",
    category: "API · 2024",
    tech: "Go · Redis · Docker",
    description:
      "Gateway for third-party integrations with rate limiting, observability, and resilient async processing.",
    tags: ["Go", "Redis", "Docker"],
    href: "#",
    previewImageUrl: "/projects/gateway-preview.svg",
    previewImageAlt: "Integration gateway project preview",
  },
  {
    id: "analytics",
    slug: "real-time-analytics",
    number: "004",
    name: "Real-Time Analytics",
    category: "Web App · 2023",
    tech: "React · Laravel · WebSockets",
    description:
      "Real-time metrics platform with accessible charts, reduced-motion fallbacks, and responsive layouts.",
    tags: ["React", "Laravel", "WebSockets"],
    href: "#",
    previewImageUrl: "/projects/analytics-preview.svg",
    previewImageAlt: "Real-time analytics project preview",
  },
];

const featuredEn = projectsEn[0]!;
const dashboardEn = projectsEn[1]!;
const gatewayEn = projectsEn[2]!;
const analyticsEn = projectsEn[3]!;

const projectsPt: Project[] = [
  withOverrides(featuredEn, {
    description:
      "E-commerce de alta performance com interação acessível, UX orientada à conversão e navegação rápida em desktop, mobile e tecnologias assistivas.",
    featuredLabel: "Destaque · E-Commerce",
  }),
  withOverrides(dashboardEn, {
    name: "Dashboard Acessível",
    description:
      "Dashboard analítico com navegação por teclado, estrutura semântica e visualizações em tempo real para tecnologias assistivas.",
  }),
  withOverrides(gatewayEn, {
    name: "Gateway de Integração",
    description:
      "Gateway para integrações com rate limiting, observabilidade e processamento assíncrono resiliente.",
  }),
  withOverrides(analyticsEn, {
    name: "Analytics em Tempo Real",
    description:
      "Plataforma de métricas em tempo real com gráficos acessíveis, fallbacks de movimento reduzido e layouts responsivos.",
  }),
];

const projectsEs: Project[] = [
  withOverrides(featuredEn, {
    description:
      "E-commerce de alto rendimiento con interacción accesible, UX orientada a conversión y navegación rápida en desktop, móvil y tecnologías de asistencia.",
    featuredLabel: "Destacado · E-Commerce",
  }),
  withOverrides(dashboardEn, {
    name: "Panel Accesible",
    description:
      "Panel analítico con navegación por teclado, estructura semántica y vistas de datos en tiempo real para tecnologías de asistencia.",
  }),
  withOverrides(gatewayEn, {
    name: "Gateway de Integración",
    description:
      "Gateway para integraciones con rate limiting, observabilidad y procesamiento asíncrono resiliente.",
  }),
  withOverrides(analyticsEn, {
    name: "Analytics en Tiempo Real",
    description:
      "Plataforma de métricas en tiempo real con gráficos accesibles, alternativas de movimiento reducido y diseños responsivos.",
  }),
];

const byLang: Record<string, Project[]> = {
  en: projectsEn,
  pt: projectsPt,
  es: projectsEs,
};

export function getProjectsMock(lang: string): Project[] {
  return byLang[lang] ?? projectsEn;
}
