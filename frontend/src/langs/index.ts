import en from "./en";
import pt from "./pt";
import es from "./es";

import type { Dictionary } from "./types";

export const languages: Record<string, Dictionary> = {
  en,
  pt,
  es,
};

export function getLang(lang: string): Dictionary {
  return languages[lang] || en;
}