import { SUPPORTED_LANGS, type SupportedLang } from "../config/seo";

export function pathLang(pathname: string): SupportedLang | null {
  for (const lang of SUPPORTED_LANGS) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      return lang;
    }
  }
  return null;
}

export function replacePathLang(
  pathname: string,
  newLang: SupportedLang
): string {
  const current = pathLang(pathname);
  if (!current) {
    return `/${newLang}`;
  }
  if (pathname === `/${current}`) {
    return `/${newLang}`;
  }
  return `/${newLang}${pathname.slice(current.length + 1)}`;
}

export function pathSuffix(
  pathname: string,
  currentLang: SupportedLang
): string {
  if (pathname === `/${currentLang}`) {
    return "";
  }
  if (pathname.startsWith(`/${currentLang}/`)) {
    return pathname.slice(currentLang.length + 1);
  }
  return "";
}

export function isSupportedLang(value: string): value is SupportedLang {
  return SUPPORTED_LANGS.includes(value as SupportedLang);
}
