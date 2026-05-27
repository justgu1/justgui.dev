---
name: justgui-frontend-best-practices
description: Applies Astro, i18n, env, analytics, and performance conventions for the justgui frontend. Use when adding pages, components, env vars, client scripts, or dependencies.
disable-model-invocation: true
---

# justgui Frontend Best Practices

## Astro

- Prefer `.astro` components; avoid React islands unless needed
- Client scripts: `<script>import "../scripts/foo.client.ts"</script>` in component
- Prerender language pages: `getStaticPaths` + `prerender = true` in `[lang]/index.astro`
- SSR: `@astrojs/node` adapter; middleware for language redirect

## i18n

- Strings in `langs/{en,pt,es}/*.ts`, merged in `index.ts`
- Use `createT(dict)(key, { param: value })` for interpolation
- Never hardcode user-visible copy in components

## Environment (`PUBLIC_*`)

| Variable | Required | Purpose |
|----------|----------|---------|
| `PUBLIC_SITE_URL` | yes | Canonical, OG, sitemap |
| `PUBLIC_APP_ENV` | yes | `production` enables indexing + analytics |
| `PUBLIC_GA4_MEASUREMENT_ID` | no | Google Analytics 4 |
| `PUBLIC_META_PIXEL_ID` | no | Meta Pixel |
| `PUBLIC_CV_URL` | no | CV download link |

Access via `config/env.ts` — never `import.meta.env` in components directly.

## Analytics

- `data-analytics="cta_click|cv_download|outbound_click"` on interactive elements
- Optional `data-analytics-location`, `data-analytics-network`
- Delegated handler in `scripts/analytics.client.ts`
- Tags load only when `IS_PRODUCTION` and IDs set (`Analytics.astro`)

## Performance

- Fonts: `display=swap`, `preconnect` to Google Fonts
- Minimize client JS (header menu + analytics only)
- OG image: `public/favicons/favicon_512x512.png` or dedicated asset

## File organization

```
src/
  components/     # UI
  components/sections/
  config/         # env, seo, site
  langs/          # i18n
  layouts/
  pages/
  scripts/        # *.client.ts
  styles/         # domain CSS
  utils/
```

## Checklist

See [checklist.md](checklist.md).
