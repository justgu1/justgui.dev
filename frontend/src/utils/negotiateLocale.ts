import { SUPPORTED_LANGS, type SupportedLang } from "../config/seo";

const DEFAULT_LOCALE: SupportedLang = "en";

export function negotiateLocale(acceptLanguage: string | null): SupportedLang {
  if (!acceptLanguage?.trim()) {
    return DEFAULT_LOCALE;
  }

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [tagPart, ...params] = part.trim().split(";");
      const tag = (tagPart ?? "").trim().toLowerCase();
      if (!tag) {
        return { tag: "", q: 0 };
      }
      let q = 1;
      for (const param of params) {
        const [key, val] = param.trim().split("=");
        if (key === "q" && val !== undefined) {
          const parsed = Number.parseFloat(val);
          if (!Number.isNaN(parsed)) {
            q = parsed;
          }
        }
      }
      return { tag, q };
    })
    .filter((c) => c.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const primary = tag.split("-")[0];
    if (SUPPORTED_LANGS.includes(primary as SupportedLang)) {
      return primary as SupportedLang;
    }
  }

  return DEFAULT_LOCALE;
}
