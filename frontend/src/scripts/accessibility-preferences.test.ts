import { describe, expect, it, beforeEach } from "vitest";
import {
  A11Y_STORAGE_KEY,
  DEFAULT_A11Y_PREFERENCES,
  applyAccessibilityPreferences,
  loadAccessibilityPreferences,
  resetAccessibilityPreferences,
  saveAccessibilityPreferences,
  type AccessibilityPreferences,
} from "./accessibility-preferences";

describe("accessibility-preferences", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-a11y-font-scale");
    document.documentElement.removeAttribute("data-a11y-spacing");
    document.documentElement.removeAttribute("data-a11y-contrast");
    document.documentElement.removeAttribute("data-a11y-vision");
    document.documentElement.removeAttribute("data-a11y-motion");
    document.documentElement.removeAttribute("data-a11y-focus");
  });

  it("returns defaults when storage is empty", () => {
    expect(loadAccessibilityPreferences()).toEqual(DEFAULT_A11Y_PREFERENCES);
  });

  it("persists and loads preferences", () => {
    const prefs: AccessibilityPreferences = {
      ...DEFAULT_A11Y_PREFERENCES,
      fontScale: "125",
      highContrast: true,
    };
    saveAccessibilityPreferences(prefs);
    expect(loadAccessibilityPreferences()).toEqual(prefs);
    expect(window.localStorage.getItem(A11Y_STORAGE_KEY)).toBeTruthy();
  });

  it("applies dataset attributes on html", () => {
    applyAccessibilityPreferences({
      ...DEFAULT_A11Y_PREFERENCES,
      fontScale: "150",
      textSpacing: true,
      highContrast: true,
      visionFilter: "deuteranopia",
      reduceMotion: true,
      enhancedFocus: true,
    });

    expect(document.documentElement.dataset.a11yFontScale).toBe("150");
    expect(document.documentElement.dataset.a11ySpacing).toBe("comfortable");
    expect(document.documentElement.dataset.a11yContrast).toBe("high");
    expect(document.documentElement.dataset.a11yVision).toBe("deuteranopia");
    expect(document.documentElement.dataset.a11yMotion).toBe("reduce");
    expect(document.documentElement.dataset.a11yFocus).toBe("enhanced");
  });

  it("resets preferences", () => {
    saveAccessibilityPreferences({
      ...DEFAULT_A11Y_PREFERENCES,
      fontScale: "125",
    });
    const prefs = resetAccessibilityPreferences();
    expect(prefs).toEqual(DEFAULT_A11Y_PREFERENCES);
    expect(loadAccessibilityPreferences()).toEqual(DEFAULT_A11Y_PREFERENCES);
  });
});
