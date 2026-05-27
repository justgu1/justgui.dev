---
name: justgui-marketing-ads
description: Configures GA4 and Meta Pixel tracking for the justgui site with consent mode and CTA event mapping. Use when editing Analytics.astro, analytics scripts, env IDs, or data-analytics attributes.
disable-model-invocation: true
---

# justgui Marketing Ads (GA4 + Meta Pixel)

## Environment

```env
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXX
PUBLIC_META_PIXEL_ID=XXXXXXXX
PUBLIC_APP_ENV=production   # required for tags to load
```

Empty IDs = that platform not loaded. Local/dev = **no scripts** (verify in Network tab).

## Files

| File | Role |
|------|------|
| `components/Analytics.astro` | gtag + fbq snippets, consent default denied |
| `utils/analytics.ts` | `trackEvent()` types |
| `scripts/analytics.client.ts` | Delegated click on `[data-analytics]` |

## Event map

| `data-analytics` | GA4 event | Meta event |
|------------------|-----------|------------|
| (page load) | `page_view` | `PageView` |
| `cta_click` | `cta_click` | `Lead` |
| `cv_download` | `file_download` | `CompleteRegistration` |
| `outbound_click` | `click` + outbound params | `Contact` |

Add optional `data-analytics-location` or `data-analytics-network` for reporting dimensions.

## Consent (LGPD/GDPR ready)

- GA4: `gtag('consent', 'default', { analytics_storage: 'denied', ... })`
- Meta: `fbq('consent', 'revoke')` until banner grants consent
- Future banner should call `gtag('consent', 'update', ...)` and `fbq('consent', 'grant')`

## Definition of Done

- Meta Pixel Helper: PageView on production
- GA4 DebugView / Tag Assistant: events on CTA clicks
- Local: zero requests to `googletagmanager.com` / `facebook.net`
- No PII in custom event params

## Checklist

See [checklist.md](checklist.md).
