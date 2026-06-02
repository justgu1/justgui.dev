const CONSENT_COOKIE = "justgui_analytics_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const CONSENT_GRANTED = {
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const;

const CONSENT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

function pushConsent(
  command: "default" | "update",
  state: Record<string, string>
): void {
  if (typeof window === "undefined") return;
  ensureGtag()("consent", command, state);
}

/** Call after user accepts cookies (LGPD/GDPR banner). */
export function grantAnalyticsConsent(): void {
  if (typeof window === "undefined") return;

  pushConsent("update", { ...CONSENT_GRANTED });

  // GTM may load after the welcome dialog; retry so consent update is not lost.
  for (const delayMs of [50, 250, 1000, 2500]) {
    window.setTimeout(
      () => pushConsent("update", { ...CONSENT_GRANTED }),
      delayMs
    );
  }
}

export function revokeAnalyticsConsent(): void {
  if (typeof window === "undefined") return;
  pushConsent("update", { ...CONSENT_DENIED });
}

export function hasAnalyticsConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${CONSENT_COOKIE}=1`);
}

export function setAnalyticsConsentCookie(granted: boolean): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  if (granted) {
    document.cookie = `${CONSENT_COOKIE}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  } else {
    document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  }
}

/** Re-apply granted consent on page load when the user already accepted. */
export function restoreAnalyticsConsentIfGranted(): void {
  if (!hasAnalyticsConsentCookie()) return;
  grantAnalyticsConsent();
}
