export type FontScale = "100" | "112" | "125" | "150";
export type VisionFilter =
  | "none"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export type AccessibilityPreferences = {
  fontScale: FontScale;
  textSpacing: boolean;
  highContrast: boolean;
  visionFilter: VisionFilter;
  reduceMotion: boolean;
  enhancedFocus: boolean;
};

export const A11Y_STORAGE_KEY = "justgui.a11y.prefs";

export const DEFAULT_A11Y_PREFERENCES: AccessibilityPreferences = {
  fontScale: "100",
  textSpacing: false,
  highContrast: false,
  visionFilter: "none",
  reduceMotion: false,
  enhancedFocus: false,
};

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === "undefined") return DEFAULT_A11Y_PREFERENCES;

  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<AccessibilityPreferences>;
    return {
      ...DEFAULT_A11Y_PREFERENCES,
      ...parsed,
      reduceMotion: parsed.reduceMotion === true,
    };
  } catch {
    return DEFAULT_A11Y_PREFERENCES;
  }
}

export function saveAccessibilityPreferences(
  prefs: AccessibilityPreferences
): void {
  window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  syncA11yToServer(prefs);
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;

function syncA11yToServer(prefs: AccessibilityPreferences): void {
  if (typeof window === "undefined") return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    void fetch("/api/a11y", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefs }),
    }).catch(() => {});
  }, 500);
}

export function applyAccessibilityPreferences(
  prefs: AccessibilityPreferences,
  root: HTMLElement = document.documentElement
): void {
  root.dataset.a11yFontScale = prefs.fontScale;
  root.dataset.a11ySpacing = prefs.textSpacing ? "comfortable" : "default";
  root.dataset.a11yContrast = prefs.highContrast ? "high" : "default";
  root.dataset.a11yVision = prefs.visionFilter;
  root.dataset.a11yMotion = prefs.reduceMotion ? "reduce" : "default";
  root.dataset.a11yFocus = prefs.enhancedFocus ? "enhanced" : "default";
}

export function resetAccessibilityPreferences(): AccessibilityPreferences {
  window.localStorage.removeItem(A11Y_STORAGE_KEY);
  applyAccessibilityPreferences(DEFAULT_A11Y_PREFERENCES);
  return DEFAULT_A11Y_PREFERENCES;
}

export function initAccessibilityPreferences(): AccessibilityPreferences {
  const prefs = loadAccessibilityPreferences();
  applyAccessibilityPreferences(prefs);
  return prefs;
}
