import {
  DEFAULT_A11Y_PREFERENCES,
  type AccessibilityPreferences,
  type FontScale,
  type VisionFilter,
} from "./accessibility-preferences";

export function syncA11yForm(
  form: HTMLElement,
  prefs: AccessibilityPreferences
): void {
  const fontRadio = form.querySelector<HTMLInputElement>(
    `[data-a11y-font-scale][value="${prefs.fontScale}"]`
  );
  if (fontRadio) fontRadio.checked = true;

  const visionRadio = form.querySelector<HTMLInputElement>(
    `[data-a11y-vision][value="${prefs.visionFilter}"]`
  );
  if (visionRadio) visionRadio.checked = true;

  const spacing = form.querySelector<HTMLInputElement>("[data-a11y-spacing]");
  const contrast = form.querySelector<HTMLInputElement>("[data-a11y-contrast]");
  const motion = form.querySelector<HTMLInputElement>("[data-a11y-motion]");
  const focus = form.querySelector<HTMLInputElement>("[data-a11y-focus]");

  if (spacing) spacing.checked = prefs.textSpacing;
  if (contrast) contrast.checked = prefs.highContrast;
  if (motion) motion.checked = prefs.reduceMotion;
  if (focus) focus.checked = prefs.enhancedFocus;
}

export function readA11yForm(form: HTMLElement): AccessibilityPreferences {
  const fontScale =
    form.querySelector<HTMLInputElement>("[data-a11y-font-scale]:checked")
      ?.value ?? "100";
  const visionFilter =
    form.querySelector<HTMLInputElement>("[data-a11y-vision]:checked")?.value ??
    "none";

  return {
    fontScale: fontScale as FontScale,
    visionFilter: visionFilter as VisionFilter,
    textSpacing: Boolean(
      form.querySelector<HTMLInputElement>("[data-a11y-spacing]")?.checked
    ),
    highContrast: Boolean(
      form.querySelector<HTMLInputElement>("[data-a11y-contrast]")?.checked
    ),
    reduceMotion: Boolean(
      form.querySelector<HTMLInputElement>("[data-a11y-motion]")?.checked
    ),
    enhancedFocus: Boolean(
      form.querySelector<HTMLInputElement>("[data-a11y-focus]")?.checked
    ),
  };
}

export function readA11yFormOrDefault(
  form: HTMLElement | null
): AccessibilityPreferences {
  if (!form) return DEFAULT_A11Y_PREFERENCES;
  return readA11yForm(form);
}
