export type AnalyticsEvent =
  | "contact_click"
  | "whatsapp_click"
  | "email_click"
  | "form_submit"
  | "portfolio_project_click"
  | "cv_download"
  | "calendly_click";

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
