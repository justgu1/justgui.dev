declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Call after user accepts cookies (LGPD/GDPR banner). */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}
