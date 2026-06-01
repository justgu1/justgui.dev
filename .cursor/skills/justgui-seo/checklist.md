# SEO — Checklist de comprovação

## CI

- [ ] `cd frontend && yarn ci` (inclui validate SEO + Lighthouse)
- [ ] `yarn validate:seo` — title, description, canonical, hreflang, JSON-LD

## Locale / hreflang

- [ ] Três URLs indexáveis (`/en/`, `/pt/`, `/es/`) com conteúdo distinto por idioma (não só URL traduzida com copy em inglês)
- [ ] Redirects de negociação são 302; não alterar `/pt`/`/es` por header do browser
- [ ] `hreflang` + canonical em `SeoHead.astro` alinhados com `SUPPORTED_LANGS` em `config/seo.ts`

## Manual

- [ ] `og:image` resolve (URL absoluta)
- [ ] `robots.txt` aponta para sitemap
- [ ] `noindex` em `PUBLIC_APP_ENV=local`
- [ ] `index,follow` em production

## Pós-deploy

- [ ] Search Console: sitemap enviado
- [ ] Sem erros de hreflang no relatório internacional
