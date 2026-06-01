import type { MiddlewareHandler } from "astro";
import { IS_PRODUCTION } from "../config/env";
import { SUPPORTED_LANGS, type SupportedLang } from "../config/seo";
import { pathLang, replacePathLang } from "../utils/localePath";
import { negotiateLocale } from "../utils/negotiateLocale";

const DEFAULT_LOCALE: SupportedLang = "en";
const LANG_COOKIE = "justgui_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type AstroContext = Parameters<MiddlewareHandler>[0];

function setLangCookie(context: AstroContext, lang: SupportedLang): void {
  context.cookies.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: IS_PRODUCTION,
  });
}

function redirect302(context: AstroContext, location: string) {
  return context.redirect(location, 302);
}

function isIgnoredPath(pathname: string): boolean {
  return (
    pathname.startsWith("/favicons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/sitemap") ||
    pathname === "/robots.txt"
  );
}

function readCookieLang(context: AstroContext): SupportedLang | null {
  const cookieValue = context.cookies.get(LANG_COOKIE)?.value;
  if (cookieValue && SUPPORTED_LANGS.includes(cookieValue as SupportedLang)) {
    return cookieValue as SupportedLang;
  }
  return null;
}

function stripLegacySetLangQuery(
  context: AstroContext
): ReturnType<typeof redirect302> | undefined {
  if (!context.url.searchParams.has("setLang")) {
    return undefined;
  }
  const cleanUrl = new URL(context.url);
  cleanUrl.searchParams.delete("setLang");
  const destination = `${cleanUrl.pathname}${cleanUrl.search}`;
  const current = `${context.url.pathname}${context.url.search}`;
  if (destination !== current) {
    return redirect302(context, destination);
  }
  return undefined;
}

function handleNegotiatedLang(
  context: AstroContext,
  pathname: string,
  negotiated: SupportedLang,
  currentPathLang: SupportedLang | null,
  cookieLang: SupportedLang | null
): ReturnType<typeof redirect302> | "next" {
  if (!currentPathLang) {
    const target = cookieLang ?? negotiated;
    return redirect302(context, `/${target}`);
  }

  if (cookieLang) {
    return "next";
  }

  if (currentPathLang === DEFAULT_LOCALE && negotiated !== DEFAULT_LOCALE) {
    return redirect302(context, replacePathLang(pathname, negotiated));
  }

  return "next";
}

export const LanguagesMiddleware: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;

  if (isIgnoredPath(pathname)) {
    return next();
  }

  const legacyRedirect = stripLegacySetLangQuery(context);
  if (legacyRedirect) {
    return legacyRedirect;
  }

  const negotiated = negotiateLocale(
    context.request.headers.get("accept-language")
  );
  const cookieLang = readCookieLang(context);
  const currentPathLang = pathLang(pathname);

  const negotiatedResult = handleNegotiatedLang(
    context,
    pathname,
    negotiated,
    currentPathLang,
    cookieLang
  );
  if (negotiatedResult !== "next") {
    return negotiatedResult;
  }

  if (currentPathLang) {
    setLangCookie(context, currentPathLang);
  }

  return next();
};
