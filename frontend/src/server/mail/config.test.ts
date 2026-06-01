import { describe, expect, it } from "vitest";
import { getMailConfig, isMailConfigured } from "./config";

describe("mail config", () => {
  it("detects configured SMTP from env", () => {
    expect(isMailConfigured()).toBe(true);
  });

  it("includes siteUrl from PUBLIC_SITE_URL", () => {
    expect(getMailConfig().siteUrl).toBe("http://localhost:4321");
  });

  it("falls back to ADMIN_EMAIL when CONTACT_TO is unset", () => {
    const originalContactTo = process.env.CONTACT_TO;
    const originalAdminEmail = process.env.ADMIN_EMAIL;

    delete process.env.CONTACT_TO;
    process.env.ADMIN_EMAIL = "admin@example.com";

    expect(getMailConfig().contactTo).toBe("admin@example.com");

    if (originalContactTo === undefined) {
      delete process.env.CONTACT_TO;
    } else {
      process.env.CONTACT_TO = originalContactTo;
    }

    if (originalAdminEmail === undefined) {
      delete process.env.ADMIN_EMAIL;
    } else {
      process.env.ADMIN_EMAIL = originalAdminEmail;
    }
  });
});
