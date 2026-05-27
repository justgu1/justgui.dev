import { trackEvent, type AnalyticsEvent } from "../utils/analytics";

function parseParams(el: HTMLElement): Record<string, string> {
  const params: Record<string, string> = {};
  for (const { name, value } of Array.from(el.attributes)) {
    if (name.startsWith("data-analytics-") && name !== "data-analytics") {
      params[name.replace("data-analytics-", "")] = value;
    }
  }
  return params;
}

document.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-analytics]"
  );
  if (!target) return;

  const eventName = target.dataset.analytics as AnalyticsEvent | undefined;
  if (!eventName) return;

  trackEvent(eventName, parseParams(target));
});
