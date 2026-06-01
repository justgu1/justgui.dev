import { describe, expect, it, beforeEach } from "vitest";
import { initDbForTests, resetDbForTests } from "./client";
import { hashIp } from "./ipHash";
import { ensureVisitor, hasConsent } from "./repositories/visitors";
import { recordConsent } from "./repositories/consent";
import {
  createContactSubmission,
  markContactSent,
} from "./repositories/contact";

describe("ipHash", () => {
  it("hashes ip with salt", () => {
    process.env.VISITOR_IP_SALT = "test-salt";
    const a = hashIp("192.168.1.1");
    const b = hashIp("192.168.1.1");
    expect(a).toBe(b);
    expect(a).not.toBe("192.168.1.1");
  });
});

describe("db repositories", () => {
  beforeEach(() => {
    resetDbForTests();
    initDbForTests();
  });

  it("creates visitor and visit on first ensure", () => {
    const { isNew } = ensureVisitor({
      visitorId: "vid-1",
      ipHash: "hash1",
      userAgent: "test",
      acceptLanguage: "pt-BR",
      path: "/pt/",
      lang: "pt",
    });
    expect(isNew).toBe(true);
  });

  it("records consent and contact submission", () => {
    const db = initDbForTests();
    ensureVisitor({
      visitorId: "vid-2",
      ipHash: "hash2",
      userAgent: null,
      acceptLanguage: null,
      path: "/en/",
      lang: "en",
    });
    recordConsent({
      visitorId: "vid-2",
      analyticsGranted: true,
      adGranted: false,
    });
    expect(hasConsent(db, "vid-2")).toBe(true);

    const id = createContactSubmission({
      visitorId: "vid-2",
      name: "Test",
      email: "test@example.com",
      message: "Hello",
      lang: "en",
    });
    markContactSent(id);
  });
});
