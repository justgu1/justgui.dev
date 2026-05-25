import type { Dictionary } from "./types";

export function createT(dict: Dictionary) {
  return (key: string) => {
    return dict[key] ?? key;
  };
}