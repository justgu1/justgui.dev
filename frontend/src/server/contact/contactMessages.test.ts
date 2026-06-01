import { describe, expect, it } from "vitest";
import {
  contactMessage,
  isValidEmail,
  resolveContactLang,
  validateContactPayload,
} from "./contactMessages";

describe("resolveContactLang", () => {
  it("returns supported langs from header", () => {
    expect(resolveContactLang("pt")).toBe("pt");
    expect(resolveContactLang("es")).toBe("es");
  });

  it("defaults to en", () => {
    expect(resolveContactLang(null)).toBe("en");
    expect(resolveContactLang("fr")).toBe("en");
  });
});

describe("validateContactPayload", () => {
  it("accepts valid payload", () => {
    expect(
      validateContactPayload({
        name: "Guilherme",
        email: "hello@example.com",
        message: "Hello",
      })
    ).toEqual({
      name: "Guilherme",
      email: "hello@example.com",
      message: "Hello",
    });
  });

  it("rejects invalid payload", () => {
    expect(validateContactPayload(null)).toBeNull();
    expect(
      validateContactPayload({ name: "", email: "bad", message: "" })
    ).toBeNull();
  });

  it("rejects payload exceeding field limits", () => {
    expect(
      validateContactPayload({
        name: "a".repeat(129),
        email: "hello@example.com",
        message: "Hello",
      })
    ).toBeNull();
    expect(
      validateContactPayload({
        name: "Guilherme",
        email: "hello@example.com",
        message: "a".repeat(513),
      })
    ).toBeNull();
  });
});

describe("isValidEmail", () => {
  it("validates email format", () => {
    expect(isValidEmail("hello@example.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
  });
});

describe("contactMessage", () => {
  it("returns localized messages", () => {
    expect(contactMessage("pt", "success")).toContain("Obrigado");
    expect(contactMessage("en", "error")).toContain("Could not send");
  });
});
