import { describe, expect, it } from "vitest";
import { negotiateLocale } from "./negotiateLocale";

describe("negotiateLocale", () => {
  it("prefers pt-BR over en when q-values favor pt", () => {
    expect(negotiateLocale("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt");
  });

  it("returns en for English-only header", () => {
    expect(negotiateLocale("en-US,en;q=0.9")).toBe("en");
  });

  it("falls back to en when header is empty", () => {
    expect(negotiateLocale(null)).toBe("en");
    expect(negotiateLocale("")).toBe("en");
  });

  it("respects higher q-value when order differs", () => {
    expect(negotiateLocale("en;q=0.5,es;q=0.9")).toBe("es");
  });

  it("maps es-ES to es", () => {
    expect(negotiateLocale("es-ES,es;q=0.9")).toBe("es");
  });

  it("falls back to en for unsupported languages", () => {
    expect(negotiateLocale("fr-FR,fr;q=0.9")).toBe("en");
  });
});
