import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("pushes event to dataLayer", () => {
    trackEvent("contact_click", { location: "hero" });
    expect(window.dataLayer).toEqual([
      { event: "contact_click", location: "hero" },
    ]);
  });

  it("pushes form_submit without extra params", () => {
    trackEvent("form_submit");
    expect(window.dataLayer).toEqual([{ event: "form_submit" }]);
  });

  it("does not throw when dataLayer is missing", () => {
    delete window.dataLayer;
    expect(() => trackEvent("whatsapp_click")).not.toThrow();
    expect(window.dataLayer).toEqual([{ event: "whatsapp_click" }]);
  });
});
