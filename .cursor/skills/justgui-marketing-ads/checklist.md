# Marketing Ads — Checklist de comprovação

## CI (job `verify`)

- [ ] `yarn test:e2e` — `e2e/analytics.spec.ts` (sem tags em `local`)

## Produção (manual / pós-deploy)

- [ ] `PUBLIC_APP_ENV=production` + IDs GA4/Meta definidos
- [ ] Meta Pixel Helper: PageView
- [ ] GA4 DebugView: eventos recebidos
- [ ] CTAs disparam `cta_click` / `cv_download` / `outbound_click`

## Privacidade

- [ ] Consent default denied até banner (`Analytics.astro`)
- [ ] Sem PII em parâmetros de evento
