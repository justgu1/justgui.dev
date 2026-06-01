# Marketing / GTM checklist

## Env & deploy

- [ ] `PUBLIC_GTM_CONTAINER_ID` in production `.env` / GitHub secret
- [ ] `PUBLIC_APP_ENV=production` on production build
- [ ] GA4 and Meta Pixel configured in GTM only — not in site env

## GTM container

- [ ] GA4 Google Tag — All Pages, consent `analytics_storage`
- [ ] Meta Pixel base — All Pages, consent `ad_storage`
- [ ] Custom event tags for each dataLayer event (see `docs/gtm-setup.md`)
- [ ] Container published

## Site behavior

- [ ] Welcome dialog: "Aceitar analytics" grants consent; "Somente essenciais" keeps denied
- [ ] GTM Preview / Tag Assistant: tags after accept
- [ ] GA4 DebugView: `contact_click`, `whatsapp_click`, `form_submit`, etc.
- [ ] Meta Pixel Helper: PageView after consent
- [ ] Local dev: no GTM network requests

## Conversions (panels)

- [ ] GA4: `form_submit`, `whatsapp_click` marked as conversions
- [ ] Google Ads: import GA4 conversions
- [ ] Meta: audiences for remarketing
