# Marketing Ads — Checklist de comprovação

## CI

- [ ] `cd frontend && yarn ci`

## Produção (manual / pós-deploy)

- [ ] `PUBLIC_APP_ENV=production` + IDs GA4/Meta definidos
- [ ] Welcome dialog: “Aceitar analytics” ativa tags; “Somente essenciais” mantém denied
- [ ] Meta Pixel Helper: PageView após consent
- [ ] GA4 DebugView: eventos recebidos
- [ ] CTAs disparam `cta_click` / `cv_download` / `outbound_click`
- [ ] Flutuante WhatsApp: `data-analytics-network="whatsapp"`

## Privacidade

- [ ] Consent default denied até welcome dialog (`Analytics.astro`)
- [ ] Cookie `justgui_welcome` + `localStorage` após Continuar
- [ ] `/api/consent` persiste escolha no SQLite
- [ ] Sem PII em parâmetros de evento
