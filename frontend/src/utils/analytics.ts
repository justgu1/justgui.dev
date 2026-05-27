export type AnalyticsEvent = "cta_click" | "cv_download" | "outbound_click";

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const META_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  cta_click: "Lead",
  cv_download: "CompleteRegistration",
  outbound_click: "Contact",
};

export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  const metaEvent = META_EVENTS[name];
  if (metaEvent && typeof window.fbq === "function") {
    window.fbq("track", metaEvent, params);
  }
}
