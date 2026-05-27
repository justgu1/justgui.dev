# SEO — Checklist de comprovação

## CI (job `verify`)

- [ ] `yarn validate:seo` — title, description, canonical, hreflang, JSON-LD
- [ ] `yarn test:e2e` — `e2e/seo.spec.ts`
- [ ] Lighthouse SEO ≥ 90 (`lighthouserc.cjs`)

## Manual

- [ ] `og:image` resolve (URL absoluta)
- [ ] `robots.txt` aponta para sitemap
- [ ] `noindex` em `PUBLIC_APP_ENV=local`
- [ ] `index,follow` em production

## Pós-deploy

- [ ] Search Console: sitemap enviado
- [ ] Sem erros de hreflang no relatório internacional
