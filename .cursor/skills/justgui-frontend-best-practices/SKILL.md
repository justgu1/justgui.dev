---
name: justgui-frontend-best-practices
description: Applies Astro, i18n, env, analytics, and performance conventions for the justgui frontend. Use when adding pages, components, env vars, client scripts, or dependencies.
disable-model-invocation: true
---

# justgui Frontend Best Practices

## Astro

- Prefer `.astro` components; avoid React islands unless needed
- **Frontmatter**: só TypeScript; HTML condicional no template do ficheiro — **não** `const el = (<div class="…">…</div>)` (parser Astro falha)
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
| `.footer-surface` | slide-in **sem** `opacity: 0` inicial; contém copyright, toolbar, redes |
| `main` | `scroll-padding-bottom` quando footer pinned (evita conteúdo sob o footer) |
| Footer toolbar | idioma (listbox) + botão a11y |
| Redes sociais | linha horizontal em `<64rem`, estilo toolbar |
| `FloatingActionCell` | WhatsApp (esq.) + topo (dir.); visíveis juntos após scroll ≥400px; fade-in |

Scripts: `floating-actions.client.ts` (`ResizeObserver`, `animationend` no footer), `footer-toolbar.client.ts`.

## Projects (portfólio)

- Dados: `src/data/projects.mock.ts` + tipos em `src/types/projects.ts`
- UI: `ProjectAccordion.astro` → `ProjectAccordionItem.astro` + `ProjectPreview.astro`
- Comportamento: 3 projetos visíveis; só o primeiro aberto; **um** `<details>` aberto; painel aberto replica layout featured (2 colunas + preview)
- «Ver mais projetos»: lotes de 5 (`PROJECTS_LOAD_MORE_COUNT`); «Ver menos» remove itens carregados extra
- Preview: `<a>` para URL do projeto quando `href` existe; `aria-label` i18n; WebP lossless em `public/projects/*-preview.webp` — `yarn images:projects:webp` (`cwebp`)
- Performance: `preload` + `fetchpriority="high"` só no 1º; imagens dos itens fechados via slot `data-project-preview` montado ao abrir
- Motion: pan com `object-position`; estático com `prefers-reduced-motion` / `data-a11y-motion="reduce"`
- Client: `projects-accordion.client.ts`

## About

- Timeline: entradas em `langs/*/about.ts` (marcos 2014–2024 + micro-resumos)
- Compromisso acessibilidade: `AboutCommitment.astro` na coluna esquerda de `AboutIntro.astro` — **não** na secção Projects nem como entrada da timeline

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
| `PUBLIC_GTM_CONTAINER_ID` | no | Google Tag Manager container (GA4/Meta configured inside GTM) |
| `PUBLIC_CV_URL` | no | CV download link |
| `CONTACT_TO` | server | Email admin para contato |
| `DATABASE_PATH` | server | SQLite (visitantes, consent, contato) |

Access via `config/env.ts` — never `import.meta.env` in components directly.

## Analytics

- `data-analytics="contact_click|whatsapp_click|email_click|form_submit|portfolio_project_click|cv_download|calendly_click"` on interactive elements
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
    projects/ProjectAccordion.astro
    about/AboutCommitment.astro
    AccessibilityPanel.astro
    FloatingActionCell.astro
    Footer.astro
  data/projects.mock.ts
  scripts/
    projects-accordion.client.ts
    floating-actions.client.ts
    footer-toolbar.client.ts
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
