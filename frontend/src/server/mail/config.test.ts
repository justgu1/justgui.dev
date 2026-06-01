import { describe, expect, it } from "vitest";
import { isMailConfigured } from "./config";

describe("mail config", () => {
  it("detects configured SMTP from env", () => {
    expect(isMailConfigured()).toBe(true);
  });
});
