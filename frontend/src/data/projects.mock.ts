import type { Project } from "../types/project";

function withOverrides(base: Project, overrides: Partial<Project>): Project {
  return { ...base, ...overrides };
}

const projectsEn: Project[] = [
  {
    id: "tyer-shop",
    slug: "tyer-shop",
    number: "001",
    name: "Tyer Shop",
    category: "E-Commerce",
    tech: "MedusaJS · AstroJS · Ecommerce · UX Mobile · WCAG 2.1 AA",
    description:
      "Brazilian streetwear store with themed collections, Pix discounts, free shipping, and size-variant stock management.",
    tags: ["MedusaJS", "AstroJS", "Ecommerce", "UX Mobile", "WCAG 2.1 AA"],
    href: "https://www.tyershop.com",
    featuredLabel: "E-Commerce",
    featuredYear: "2026",
    featuredTitleEm: "Shop",
    previewImageUrl: "/projects/tyershop-preview.webp",
    previewImageAlt: "Tyer Shop storefront preview",
  },
  {
    id: "baase",
    slug: "baase",
    number: "002",
    name: "Baase",
    category: "SaaS",
    tech: "Laravel · PHP · SaaS/SPA · ESG",
    description:
      "Web app with auth and session control, internal management platform with dark/light mode and data management.",
    tags: ["ESG", "UN", "Laravel", "PHP", "SaaS/SPA"],
    href: "https://baase.app",
    featuredLabel: "SaaS",
    featuredYear: "2025",
    previewImageUrl: "/projects/baase-preview.webp",
    previewImageAlt: "Baase web application preview",
  },
  {
    id: "smart-sale",
    slug: "smart-sale",
    number: "003",
    name: "Smart Sale",
    category: "SaaS",
    tech: "Laravel · PHP · SaaS/SPA · Dashboards",
    description:
      "SaaS platform for sales management and promotion with session auth and robust web app structure for commercial teams.",
    tags: [
      "Financial management",
      "Team management",
      "Dynamic dashboards",
      "Laravel",
      "PHP",
      "SaaS/SPA",
    ],
    href: "https://smart.sale",
    featuredLabel: "SaaS",
    featuredYear: "2026",
    previewImageUrl: "/projects/smartsale-preview.webp",
    previewImageAlt: "Smart Sale SaaS platform preview",
  },
  {
    id: "mc-pavers",
    slug: "mc-pavers",
    number: "004",
    name: "MC Pavers & Hardscape",
    category: "Institutional",
    tech: "WordPress · Elementor · PHP · SEO · UX/CRO",
    description:
      "Institutional site for a South Florida landscaping company focused on lead generation, online quotes, and project portfolio.",
    tags: ["WordPress", "Elementor", "PHP", "SEO", "UX/CRO"],
    href: "https://mcpavers.com",
    featuredLabel: "Institutional",
    featuredYear: "2023",
    previewImageUrl: "/projects/mcpavers-preview.webp",
    previewImageAlt: "MC Pavers & Hardscape website preview",
  },
  {
    id: "ultranutrition",
    slug: "ultranutrition",
    number: "005",
    name: "UltraNutrition Brasil",
    category: "E-Commerce",
    tech: "WordPress · Elementor · WooCommerce · Multilingual · Conversion",
    description:
      "Multilingual vitamin e-commerce with interactive product quiz, health-benefit categories, and conversion-focused navigation.",
    tags: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "Multilingual",
      "Conversion",
    ],
    href: "https://br.ultranutrients.miracooldigital.com",
    featuredLabel: "E-Commerce",
    featuredYear: "2023",
    previewImageUrl: "/projects/ultranutrients-preview.webp",
    previewImageAlt: "UltraNutrition Brasil store preview",
  },
  {
    id: "flow-by-lora",
    slug: "flow-by-lora",
    number: "006",
    name: "Flow Beach Tennis — By Lôra",
    category: "Landing Page",
    tech: "WordPress · Elementor · Landing Page · Collab · Conversion",
    description:
      "Launch landing for a special-edition racket collab with countdown, VIP list, live-sale exclusives, and product specs.",
    tags: ["WordPress", "Elementor", "Landing Page", "Collab", "Conversion"],
    href: "https://flowbeachtennis.com.br/bylora",
    featuredLabel: "Landing Page",
    featuredYear: "2024",
    previewImageUrl: "/projects/flowbylora-preview.webp",
    previewImageAlt: "Flow Beach Tennis By Lôra landing preview",
  },
  {
    id: "flow-beach-tennis-usa",
    slug: "flow-beach-tennis-usa",
    number: "007",
    name: "Flow Beach Tennis USA",
    category: "E-Commerce",
    tech: "WordPress · Elementor · WooCommerce · UX · Performance",
    description:
      "Main US beach tennis e-commerce with full racket and apparel lines, product customization, and Klarna/Afterpay/Zip.",
    tags: ["WordPress", "Elementor", "WooCommerce", "UX", "Performance"],
    href: "https://flowbeachtennis.com",
    featuredLabel: "E-Commerce",
    featuredYear: "2022",
    previewImageUrl: "/projects/flowbeachtennis-preview.webp",
    previewImageAlt: "Flow Beach Tennis USA store preview",
  },
  {
    id: "herica-realtor",
    slug: "herica-realtor",
    number: "008",
    name: "Herica Realtor",
    category: "Real Estate",
    tech: "Laravel · PHP · UX · Local SEO",
    description:
      "Custom web platform for a South Florida realtor with service presentation and contact capture.",
    tags: ["Laravel", "PHP", "UX", "Local SEO"],
    href: "https://hericarealtor.com",
    featuredLabel: "Real Estate",
    featuredYear: "2026",
    previewImageUrl: "/projects/hericarealtor-preview.webp",
    previewImageAlt: "Herica Realtor platform preview",
  },
];

const tyerEn = projectsEn[0]!;
const baaseEn = projectsEn[1]!;
const smartEn = projectsEn[2]!;
const mcEn = projectsEn[3]!;
const ultraEn = projectsEn[4]!;
const loraEn = projectsEn[5]!;
const flowUsaEn = projectsEn[6]!;
const hericaEn = projectsEn[7]!;

const projectsPt: Project[] = [
  withOverrides(tyerEn, {
    description:
      "Loja de moda streetwear brasileira com coleções temáticas, sistema de desconto via Pix, frete grátis e gestão de estoque por variação de tamanho.",
    featuredLabel: "E-Commerce",
  }),
  withOverrides(baaseEn, {
    description:
      "Aplicação web com autenticação e controle de sessão, estrutura de plataforma voltada para gestão interna com suporte a dark/light mode e gerenciamento de dados.",
    tags: ["ESG", "ONU", "Laravel", "PHP", "SaaS/SPA"],
    featuredLabel: "SaaS",
  }),
  withOverrides(smartEn, {
    description:
      "Plataforma SaaS de gestão e divulgação de vendas, com autenticação via sessão e estrutura de aplicação web robusta voltada para equipes comerciais.",
    tags: [
      "Gestão financeira",
      "Gestão de time",
      "Dashboards dinâmicos",
      "Laravel",
      "PHP",
      "SaaS/SPA",
    ],
    featuredLabel: "SaaS",
  }),
  withOverrides(mcEn, {
    description:
      "Site institucional para empresa de paisagismo e remodelação de exteriores em South Florida, com foco em geração de leads, orçamentos online e exibição de portfólio de projetos.",
    category: "Institucional",
    featuredLabel: "Institucional",
  }),
  withOverrides(ultraEn, {
    name: "UltraNutrition Brasil",
    description:
      "E-commerce multilíngue de suplementos vitamínicos, com quiz interativo de recomendação de produtos, categorias por benefício de saúde e navegação orientada à conversão.",
    tech: "WordPress · Elementor · WooCommerce · Multilíngue · Conversão",
    tags: ["WordPress", "Elementor", "WooCommerce", "Multilíngue", "Conversão"],
    featuredLabel: "E-Commerce",
  }),
  withOverrides(loraEn, {
    description:
      "Landing page de lançamento de edição especial de raquete em collab com Carolina Dieckmann, com countdown timer, lista VIP, venda exclusiva via live e specs técnicas do produto.",
    category: "Landing Page",
    featuredLabel: "Landing Page",
  }),
  withOverrides(flowUsaEn, {
    description:
      "E-commerce principal da maior marca americana de beach tennis, com linha completa de raquetes, vestuário e acessórios, personalização de produtos e integração com Klarna, Afterpay e Zip.",
    featuredLabel: "E-Commerce",
  }),
  withOverrides(hericaEn, {
    description:
      "Plataforma web personalizada para corretora de imóveis em South Florida (Coral Springs / Delray Beach), com apresentação de serviços e captação de contatos.",
    category: "Imobiliário",
    tech: "Laravel · PHP · UX · SEO Local",
    tags: ["Laravel", "PHP", "UX", "SEO Local"],
    featuredLabel: "Imobiliário",
  }),
];

const projectsEs: Project[] = [
  withOverrides(tyerEn, {
    description:
      "Tienda streetwear brasileña con colecciones temáticas, descuentos Pix, envío gratis y gestión de stock por talla.",
    featuredLabel: "E-Commerce",
  }),
  withOverrides(baaseEn, {
    description:
      "Aplicación web con autenticación y control de sesión, plataforma de gestión interna con modo oscuro/claro y administración de datos.",
    tags: ["ESG", "ONU", "Laravel", "PHP", "SaaS/SPA"],
    featuredLabel: "SaaS",
  }),
  withOverrides(smartEn, {
    description:
      "Plataforma SaaS de gestión y promoción de ventas, con autenticación por sesión y estructura robusta para equipos comerciales.",
    tags: [
      "Gestión financiera",
      "Gestión de equipo",
      "Dashboards dinámicos",
      "Laravel",
      "PHP",
      "SaaS/SPA",
    ],
    featuredLabel: "SaaS",
  }),
  withOverrides(mcEn, {
    description:
      "Sitio institucional para empresa de paisajismo en South Florida, enfocado en leads, presupuestos online y portafolio de proyectos.",
    category: "Institucional",
    featuredLabel: "Institucional",
  }),
  withOverrides(ultraEn, {
    description:
      "E-commerce multilingüe de suplementos vitamínicos, con quiz interactivo, categorías por beneficio de salud y navegación orientada a conversión.",
    tech: "WordPress · Elementor · WooCommerce · Multilingüe · Conversión",
    tags: ["WordPress", "Elementor", "WooCommerce", "Multilingüe", "Conversión"],
    featuredLabel: "E-Commerce",
  }),
  withOverrides(loraEn, {
    description:
      "Landing de lanzamiento de edición especial de raqueta en collab, con countdown, lista VIP, venta exclusiva en live y especificaciones técnicas.",
    featuredLabel: "Landing Page",
  }),
  withOverrides(flowUsaEn, {
    description:
      "E-commerce principal de beach tennis en EE.UU., con línea completa de raquetas, ropa y accesorios, personalización e integración Klarna, Afterpay y Zip.",
    featuredLabel: "E-Commerce",
  }),
  withOverrides(hericaEn, {
    description:
      "Plataforma web para corredora de bienes raíces en South Florida, con presentación de servicios y captación de contactos.",
    category: "Inmobiliaria",
    tech: "Laravel · PHP · UX · SEO Local",
    tags: ["Laravel", "PHP", "UX", "SEO Local"],
    featuredLabel: "Inmobiliaria",
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
