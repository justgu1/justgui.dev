import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "./whatsapp";

describe("whatsapp utils", () => {
  it("normalizes phone number", () => {
    expect(normalizeWhatsAppNumber("+55 (11) 97659-8853")).toBe(
      "5511976598853"
    );
  });

  it("builds wa.me url with encoded message", () => {
    const url = buildWhatsAppUrl(
      "5511976598853",
      "Olá, entrei em contato através do seu site."
    );
    expect(url).toMatch(/^https:\/\/wa\.me\/5511976598853\?text=/);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toBe(
      "Olá, entrei em contato através do seu site."
    );
  });
});
