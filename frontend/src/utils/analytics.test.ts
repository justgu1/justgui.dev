import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.fbq = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls gtag with event name", () => {
    trackEvent("cta_click", { location: "hero" });
    expect(window.gtag).toHaveBeenCalledWith("event", "cta_click", {
      location: "hero",
    });
  });

  it("calls fbq for mapped meta events", () => {
    trackEvent("cv_download");
    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "CompleteRegistration",
      {}
    );
  });

  it("does not throw when gtag and fbq are missing", () => {
    delete window.gtag;
    delete window.fbq;
    expect(() => trackEvent("cta_click")).not.toThrow();
  });
});
