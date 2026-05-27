import { describe, expect, it } from "vitest";
import { ENV, IS_PRODUCTION } from "./env";

describe("env", () => {
  it("exposes required public env vars", () => {
    expect(ENV.SITE_URL).toBe("http://localhost:4321");
    expect(ENV.APP_ENV).toBe("local");
  });

  it("IS_PRODUCTION is false in test env", () => {
    expect(IS_PRODUCTION).toBe(false);
  });
});
