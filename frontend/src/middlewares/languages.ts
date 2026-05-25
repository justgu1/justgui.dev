import type { MiddlewareHandler } from "astro";

const supported = ["pt", "en", "es"];

export const LanguagesMiddleware: MiddlewareHandler =
  async (context, next) => {
    const pathname = context.url.pathname;

    // ignora assets
    if (
      pathname.startsWith("/favicons") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/api")
    ) {
      return next();
    }

    // já possui idioma
    const hasLang = supported.some((lang) =>
      pathname.startsWith(`/${lang}`)
    );

    if (hasLang) {
      return next();
    }

    const browserLang =
      context.request.headers
        .get("accept-language")
        ?.split(",")[0]
        .split("-")[0] || "en";

    const lang = supported.includes(browserLang)
      ? browserLang
      : "en";

    return context.redirect(`/${lang}`);
  };