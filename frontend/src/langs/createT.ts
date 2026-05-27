import type { Dictionary } from "./types";

export function createT(dict: Dictionary) {
  return (key: string, params?: Record<string, string>) => {
    let text = dict[key] ?? key;
    if (params) {
      for (const [paramKey, value] of Object.entries(params)) {
        text = text.replace(`{${paramKey}}`, value);
      }
    }
    return text;
  };
}
