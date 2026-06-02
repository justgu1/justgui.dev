import {
  grantAnalyticsConsent,
  revokeAnalyticsConsent,
  setAnalyticsConsentCookie,
} from "../utils/consent";
import {
  applyAccessibilityPreferences,
  loadAccessibilityPreferences,
  saveAccessibilityPreferences,
} from "./accessibility-preferences";
import { readA11yForm, syncA11yForm } from "./a11y-form";
import { createFocusTrap, getFocusable } from "./focus-trap";

const WELCOME_DONE_KEY = "justgui.welcome.done";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const dialog = document.querySelector<HTMLElement>("[data-welcome-dialog]");
const dialogPanel = dialog?.querySelector<HTMLElement>(".welcome-dialog-panel");
const continueButton = document.querySelector<HTMLButtonElement>(
  "[data-welcome-continue]"
);
const acceptAnalyticsBtn = document.querySelector<HTMLButtonElement>(
  "[data-welcome-accept-analytics]"
);
const essentialOnlyBtn = document.querySelector<HTMLButtonElement>(
  "[data-welcome-essential-only]"
);
const welcomeA11yRoot = dialog?.querySelector<HTMLElement>(
  "[data-welcome-a11y-form]"
);

let analyticsChoice: boolean | null = null;
let focusTrap: ReturnType<typeof createFocusTrap> | null = null;

function getWelcomeForm(): HTMLElement | null {
  return (
    welcomeA11yRoot?.querySelector<HTMLElement>("[data-a11y-form]") ??
    welcomeA11yRoot ??
    null
  );
}

function setWelcomeCookiesClientSide(): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `justgui_welcome=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  document.cookie = `justgui_welcome_pending=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

function applyWelcomeA11yFromForm(): void {
  const form = getWelcomeForm();
  if (!form) return;
  const prefs = readA11yForm(form);
  applyAccessibilityPreferences(prefs);
  saveAccessibilityPreferences(prefs);
}

function previewWelcomeA11y(): void {
  const form = getWelcomeForm();
  if (!form) return;
  applyAccessibilityPreferences(readA11yForm(form));
}

function setCookieChoice(analytics: boolean): void {
  analyticsChoice = analytics;
  acceptAnalyticsBtn?.setAttribute(
    "aria-pressed",
    analytics ? "true" : "false"
  );
  essentialOnlyBtn?.setAttribute("aria-pressed", analytics ? "false" : "true");
  acceptAnalyticsBtn?.classList.toggle("is-selected", analytics);
  essentialOnlyBtn?.classList.toggle("is-selected", !analytics);
}

function markWelcomeCompleted(): void {
  try {
    localStorage.setItem(WELCOME_DONE_KEY, "1");
  } catch {
    /* ignore storage errors */
  }
}

function hasCompletedWelcome(): boolean {
  try {
    return localStorage.getItem(WELCOME_DONE_KEY) === "1";
  } catch {
    return false;
  }
}

async function persistConsent(analyticsGranted: boolean): Promise<void> {
  setAnalyticsConsentCookie(analyticsGranted);
  if (analyticsGranted) {
    grantAnalyticsConsent();
  } else {
    revokeAnalyticsConsent();
  }
  await fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analyticsGranted }),
  }).catch(() => {});
}

function closeDialog(): void {
  if (!dialog) return;
  focusTrap?.deactivate();
  focusTrap = null;
  dialog.hidden = true;
  document.body.classList.remove("welcome-open");
}

function openDialog(): void {
  if (!dialog || !dialogPanel) return;
  dialog.hidden = false;
  document.body.classList.add("welcome-open");
  const form = getWelcomeForm();
  if (form) syncA11yForm(form, loadAccessibilityPreferences());
  focusTrap = createFocusTrap(dialog);
  focusTrap.activate();
  getFocusable(dialog)[0]?.focus();
}

async function finishWelcome(): Promise<void> {
  if (analyticsChoice === null) {
    setCookieChoice(false);
  }

  const analyticsGranted = analyticsChoice === true;

  if (analyticsGranted) {
    setAnalyticsConsentCookie(true);
    grantAnalyticsConsent();
  } else {
    setAnalyticsConsentCookie(false);
    revokeAnalyticsConsent();
  }

  if (continueButton) {
    continueButton.disabled = true;
    continueButton.setAttribute("aria-busy", "true");
  }

  try {
    applyWelcomeA11yFromForm();
  } catch {
    /* prefs are optional for closing */
  }

  markWelcomeCompleted();
  setWelcomeCookiesClientSide();
  closeDialog();

  void persistConsent(analyticsGranted);
}

function shouldShowWelcome(): boolean {
  if (!dialog || hasCompletedWelcome()) return false;
  if (document.body.dataset.showWelcome === "true") return true;
  return document.cookie.includes("justgui_welcome_pending=1");
}

acceptAnalyticsBtn?.addEventListener("click", () => {
  setCookieChoice(true);
  setAnalyticsConsentCookie(true);
  grantAnalyticsConsent();
});
essentialOnlyBtn?.addEventListener("click", () => {
  setCookieChoice(false);
  setAnalyticsConsentCookie(false);
  revokeAnalyticsConsent();
});

dialog?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("[data-welcome-continue]")) {
    event.preventDefault();
    void finishWelcome();
  }
});

getWelcomeForm()?.addEventListener("change", previewWelcomeA11y);

if (shouldShowWelcome()) {
  openDialog();
}
