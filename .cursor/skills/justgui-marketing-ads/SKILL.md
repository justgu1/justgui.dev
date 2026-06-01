---
name: justgui-marketing-ads
description: Configures GTM-first analytics for the justgui site with consent mode and dataLayer event mapping. Use when editing Analytics.astro, GtmNoscript.astro, analytics scripts, welcome dialog consent, or data-analytics attributes.
disable-model-invocation: true
---

# justgui Marketing Ads (GTM-first)

## Environment

```env
PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXXX
PUBLIC_APP_ENV=production   # required for GTM to load
```

GA4 and Meta Pixel IDs are configured **inside GTM**, not in site env. Local/dev = **no GTM scripts** (verify in Network tab).

See [docs/gtm-setup.md](../../../docs/gtm-setup.md) for GTM/GA4/Meta/Google Ads console steps.

## Files

| File | Role |
|------|------|
| `components/Analytics.astro` | Consent default + GTM head snippet |
| `components/GtmNoscript.astro` | GTM noscript iframe in `<body>` |
| `components/WelcomeDialog.astro` | cookie choice on first visit |
| `scripts/welcome-dialog.client.ts` | `grantAnalyticsConsent()` if accepted |
| `pages/api/consent.ts` | persists consent in SQLite + cookie |
| `utils/analytics.ts` | `trackEvent()` → `dataLayer.push` |
| `scripts/analytics.client.ts` | delegated click on `[data-analytics]` |

## Event map (dataLayer → configure in GTM)

| `data-analytics` / push | GA4 (GTM tag) | Meta (GTM tag) |
|-------------------------|---------------|----------------|
| (page load) | `page_view` | `PageView` |
| `contact_click` | `contact_click` | `Contact` |
| `whatsapp_click` | `whatsapp_click` | `Contact` |
| `email_click` | `email_click` | `Contact` |
| `form_submit` | `form_submit` | `Lead` |
| `portfolio_project_click` | `portfolio_project_click` | `ViewContent` |
| `cv_download` | `cv_download` | `CompleteRegistration` |
| `calendly_click` | `calendly_click` | `Schedule` |

Optional `data-analytics-location`, `data-analytics-project`, etc. for reporting dimensions.

## Consent (LGPD/GDPR)

- Consent default `denied` inline before GTM loads
- `grantAnalyticsConsent()` → `gtag('consent','update', { granted... })` via dataLayer
- Welcome dialog: "Aceitar analytics" / "Somente essenciais"
- GTM tags must require appropriate consent signals (`analytics_storage`, `ad_storage`)

## Definition of Done

- GTM Preview: tags fire after consent
- GA4 DebugView: custom events on CTA clicks
- Meta Pixel Helper: PageView after consent
- Local: zero requests to `googletagmanager.com` without production env + GTM ID
- No PII in custom event params

## Checklist

See [checklist.md](checklist.md).
