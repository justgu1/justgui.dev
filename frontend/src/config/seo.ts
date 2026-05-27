import { ENV, IS_PRODUCTION } from "./env";

export const SUPPORTED_LANGS = ["en", "pt", "es"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const OG_LOCALES: Record<SupportedLang, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
};

export const DEFAULT_OG_IMAGE = "/favicons/favicon_512x512.png";

export function pageUrl(lang: string, path = ""): string {
  const base = ENV.SITE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function canonicalUrl(lang: string): string {
  return pageUrl(lang);
}

export function alternateUrls(): { lang: string; href: string }[] {
  return SUPPORTED_LANGS.map((lang) => ({
    lang,
    href: canonicalUrl(lang),
  }));
}

export function ogLocale(lang: string): string {
  return OG_LOCALES[lang as SupportedLang] ?? OG_LOCALES.en;
}

export function ogImageUrl(): string {
  const base = ENV.SITE_URL.replace(/\/$/, "");
  return `${base}${DEFAULT_OG_IMAGE}`;
}

export function isIndexable(): boolean {
  return IS_PRODUCTION;
}
