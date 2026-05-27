---
name: justgui-seo
description: Implements and validates SEO for the justgui multilingual Astro site including meta tags, hreflang, JSON-LD, and sitemap. Use when editing SeoHead, seo config, robots, or language routes.
disable-model-invocation: true
---

# justgui SEO

## Components & config

| Piece | File |
|-------|------|
| Meta, OG, Twitter, JSON-LD | `components/SeoHead.astro` |
| URL helpers | `config/seo.ts` |
| Copy per lang | `langs/{en,pt,es}/seo.ts` |
| Sitemap | `@astrojs/sitemap` in `astro.config.mjs` |
| Robots | `public/robots.txt` |

## Required per language URL (`/{lang}/`)

- Unique `<title>` and `meta description` (≈150–160 chars)
- `link rel="canonical"` (absolute, from `PUBLIC_SITE_URL`)
- `hreflang` for `en`, `pt`, `es` + `x-default` → `/en/`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`
- Twitter `summary_large_image`
- JSON-LD: `Person` + `WebSite` in `@graph`
- `meta robots`: `index,follow` in production; `noindex` in local

## Definition of Done

- `yarn seo` passes (server running on 4321)
- Lighthouse SEO ≥ 90 on `/en/`, `/pt/`, `/es/` (manual)
- Rich Results Test: JSON-LD valid (manual, post-deploy)

## Commands

```bash
cd frontend && yarn dev
SEO_BASE_URL=http://localhost:4321 yarn seo
```

## Checklist

See [checklist.md](checklist.md).
