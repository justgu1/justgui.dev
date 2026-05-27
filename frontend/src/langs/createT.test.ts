import { describe, expect, it } from "vitest";
import { createT } from "./createT";

describe("createT", () => {
  it("returns dictionary value for key", () => {
    const t = createT({ hello: "world" });
    expect(t("hello")).toBe("world");
  });

  it("returns key when missing", () => {
    const t = createT({});
    expect(t("missing.key")).toBe("missing.key");
  });

  it("interpolates params", () => {
    const t = createT({ "a11y.externalLink": "{label} (opens in new tab)" });
    expect(t("a11y.externalLink", { label: "GitHub" })).toBe(
      "GitHub (opens in new tab)"
    );
  });
});
