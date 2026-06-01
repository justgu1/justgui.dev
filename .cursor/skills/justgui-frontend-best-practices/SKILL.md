---
name: justgui-frontend-best-practices
description: Applies Astro, i18n, env, analytics, and performance conventions for the justgui frontend. Use when adding pages, components, env vars, client scripts, or dependencies.
disable-model-invocation: true
---

# justgui Frontend Best Practices

## Astro

- Prefer `.astro` components; avoid React islands unless needed
- Client scripts: `<script src="../scripts/foo.client.ts"></script>` em component (mesmo padrão de `Header.astro`)
- SSR: `@astrojs/node` adapter; middleware em `src/middleware.ts` via `sequence()`

### Middleware (ordem importa)

```ts
sequence(VisitorsMiddleware, LanguagesMiddleware)
```

| Middleware | Papel |
|------------|-------|
| `VisitorsMiddleware` | cookie `justgui_vid`, `showWelcome`, `justgui_welcome_pending` |
| `LanguagesMiddleware` | negociação `/` → `/{lang}`, cookie `justgui_lang` |

Visitantes **antes** de idioma garante cookies no 1º acesso mesmo com redirect 302.

### Rotas `[lang]` e locale

- **Parâmetro de idioma**: em `src/pages/[lang]/**` usar sempre `Astro.params.lang` (com fallback `?? "en"`). **Nunca** `Astro.props.lang`.
- **Home** (`[lang]/index.astro`): `prerender = false` para o middleware aplicar negociação.
- **Utilitários**: `negotiateLocale.ts`, `localePath.ts`
- **Cookie** `justgui_lang`: definido ao servir `/{lang}`; evita redirect automático de `/en` após escolha explícita.
- **Seletor de idioma**: footer toolbar (`Footer.astro` + `footer-toolbar.client.ts`) — listbox com nomes nativos; **sem** query `?setLang=`.
- **Redirects automáticos (302)**: `/` → idioma negociado; `/en` → `pt`/`es` se browser preferir e não houver cookie.
- **Docker/nginx**: `proxy_set_header Accept-Language $http_accept_language;`

## Shell global (`Layout.astro`)

Ordem no `<body>`:

```
skip-link → Header → main → Footer → AccessibilityPanel → FloatingActionCell → WelcomeDialog
```

- `AccessibilityPanel` **fora** do footer (evita que `transform`/`animation` quebrem `position: fixed`)
- `data-show-welcome="true|false"` no body para o welcome dialog

## Footer sticky + flutuantes

| Peça | Comportamento |
|------|---------------|
| `.footer.footer--pinned` | sticky após `scrollY > 0` |
| `.footer-surface` | animação slide-in; contém copyright, toolbar, redes |
| Footer toolbar | idioma (listbox) + botão a11y |
| Redes sociais | linha horizontal em `<64rem`, estilo toolbar |
| `FloatingActionCell` | WhatsApp (esq.) + topo (dir.); visíveis juntos após scroll ≥400px; fade-in |

Scripts: `floating-actions.client.ts`, `footer-toolbar.client.ts`.

## Welcome dialog (1º acesso)

- Form a11y completo via `AccessibilityPanelForm.astro` (`showReset={false}`)
- **Continuar** sempre fecha; default “somente essenciais” se cookies não escolhidos
- Persistência: `localStorage` `justgui.welcome.done` + cookies client-side + `/api/consent`
- Focus trap: `focus-trap.ts` no dialog inteiro

## Componentização e tamanho de arquivo

- **Limite rígido: 300 linhas por arquivo** (`.astro`, `.ts`, `.css`)
- Seções (`components/sections/*.astro`) são orquestradores finos
- Extrair por domínio: `hero/`, `expertise/`, `projects/`, `about/`, `contact/`
- Tipos em `src/types/`; dados em `src/data/`
- CSS por domínio em `src/styles/`; import em `globals.css`

## Contact

- Tema escuro; envio via `/api/contact` (SMTP)
- Limites: nome 128, email 128, mensagem 512 — client + server (`contactMessages.ts`)
- Contador `{current} / {max}` abaixo do textarea (`contact.client.ts`)
- `CONTACT_TO` server-only no `.env`

## i18n

- Strings in `langs/{en,pt,es}/*.ts`, merged in `index.ts`
- Nomes de idioma: `languages.ts` — forma nativa (Português, English, Español)
- Painel a11y: `a11y-panel.ts` — labels + **descrições por seção** (`*Desc` após legend)
- Use `createT(dict)(key, { param: value })` for interpolation
- Never hardcode user-visible copy in components

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `PUBLIC_SITE_URL` | yes | Canonical, OG, sitemap |
| `PUBLIC_APP_ENV` | yes | `production` enables indexing + analytics |
| `PUBLIC_WHATSAPP_NUMBER` | yes | Header + flutuante WhatsApp |
| `PUBLIC_GA4_MEASUREMENT_ID` | no | Google Analytics 4 |
| `PUBLIC_META_PIXEL_ID` | no | Meta Pixel |
| `PUBLIC_CV_URL` | no | CV download link |
| `CONTACT_TO` | server | Email admin para contato |
| `DATABASE_PATH` | server | SQLite (visitantes, consent, contato) |

Access via `config/env.ts` — never `import.meta.env` in components directly.

## Analytics

- `data-analytics="cta_click|cv_download|outbound_click"` on interactive elements
- Consent via welcome dialog → `grantAnalyticsConsent()` + `/api/consent`
- Tags load only when `IS_PRODUCTION` and IDs set (`Analytics.astro`)

## Performance

- Fonts: `display=swap`, `preconnect` to Google Fonts
- Client JS mínimo documentado; novas exceções no PR
- Lighthouse performance ≥ 85 (warn), SEO/a11y = 100

## File organization

```
src/
  components/
    AccessibilityPanel.astro
    AccessibilityPanelForm.astro
    FloatingActionCell.astro
    WelcomeDialog.astro
    Footer.astro
  scripts/
    focus-trap.ts
    a11y-form.ts
    footer-toolbar.client.ts
    floating-actions.client.ts
    welcome-dialog.client.ts
  middlewares/
    visitors.ts          # antes de languages
    languages.ts
  pages/api/
    consent.ts
    a11y.ts
    contact.ts
  server/
    contact/contactMessages.ts
    db/
  styles/
    form-controls.css
    footer.css
    floating-action-cell.css
    welcome-dialog.css
```

## Checklist

See [checklist.md](checklist.md).
