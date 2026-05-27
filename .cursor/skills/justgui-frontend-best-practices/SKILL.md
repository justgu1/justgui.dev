---
name: justgui-frontend-best-practices
description: Applies Astro, i18n, env, analytics, and performance conventions for the justgui frontend. Use when adding pages, components, env vars, client scripts, or dependencies.
disable-model-invocation: true
---

# justgui Frontend Best Practices

## Astro

- Prefer `.astro` components; avoid React islands unless needed
- Client scripts: `<script src="../scripts/foo.client.ts"></script>` in component (mesmo padrão de `Header.astro`)
- Prerender language pages: `getStaticPaths` + `prerender = true` em `[lang]/index.astro`
- SSR: `@astrojs/node` adapter; middleware for language redirect

## Componentização e tamanho de arquivo

- **Limite rígido: 300 linhas por arquivo** (`.astro`, `.ts`, `.css`). Se um arquivo se aproxima disso, dividir — é sinal de responsabilidade demais num único módulo.
- Seções (`components/sections/*.astro`) são **orquestradores finos**: compõem subcomponentes, passam props e i18n; não concentram markup/CSS extenso.
- Extrair para `components/` por domínio, por exemplo:
  - `components/hero/` — `HeroIntro`, `HeroAside`, `HeroTicker`, `HeroStatCard`
  - `components/expertise/` — `ExpertiseCard`, `ExpertiseGrid`
  - `components/projects/` — `ProjectFeatured`, `ProjectAccordion`, `ProjectAccordionItem`
  - `components/about/` — `AboutIntro`, `AboutTimeline`, `TimelineEntry`, `AboutA11yStatement`
  - `components/contact/` — `ContactIntro`, `ContactForm`, `ContactLinks`
- Tipos e contratos em `src/types/`; mocks/loaders em `src/data/` até a API existir.
- CSS por domínio em `src/styles/` (`hero.css`, `projects.css`, …); seções com conteúdo full-bleed usam `<Section flush>`.

## Layout e UI do portfolio (justgui)

### Cabeçalho de seção (`Title.astro` + `sections.*` i18n)

- **Esquerda** (ao lado do número): `sections.<id>.description` — frase descritiva longa.
- **Direita**: `sections.<id>.title` — rótulo curto da seção (ex.: "Core Expertise", "Story").
- Não inverter esses papéis nos arquivos de i18n.

### Navegação e âncoras

- `html { scroll-behavior: smooth; }` em `default.css`.
- `.section { scroll-margin-top: var(--header-height); }` para âncoras (`#expertise`, etc.) não ficarem atrás do header sticky.
- Respeitar `prefers-reduced-motion` (já em `a11y.css`).

### Hero

- Layout full-bleed: `.hero-section .section-content` sem padding; grid sem gap; coluna direita com bordas até a viewport.
- Ticker de skills: marquee com **pausa no hover** (`animation-play-state: paused` em `.hero-ticker:hover .hero-ticker-inner`).
- Altura do hero: `min-height: calc(100dvh - var(--header-height) - 1px)` (borda da coluna direita).
- Mobile (`≤64rem`): sem `border-left` em cards/status da coluna direita.

### Expertise

- Borda esquerda animada no **card** (`::before` em `.exp-block`), padrão do header nav.
- Numerais romanos (`.eb-num`): **apenas troca de cor no hover** (`var(--red-bright)`), sem animação de borda no número.

### Projects

- Featured + acordeão `<details>`; dados via `getProjects()` / `getAccordionProjects()` em `src/data/projects.ts`.
- **Um item aberto por vez**: `scripts/projects-accordion.client.ts` + `data-project-accordion`; registrar também em `astro:page-load`.
- Chevron **sempre visível**: `↓` fechado, rotação 180° (`↑`) quando `[open]` — não esconder seta só no hover (acessibilidade e inferência visual).
- Bloco "Accessibility Commitment" **não** fica em Projects — ver About.

### About (Story)

- Grid intro + timeline; abaixo, `AboutA11yStatement` (compromisso de acessibilidade integrado à seção).
- `.about-layout` com `border-bottom` para separar visualmente de Contact.
- CTAs: `display: inline-flex; align-items: center; justify-content: center` nos botões da story.

### Contact

- Tema escuro (`--surface` / `--cream`), alinhado ao design system — não usar bloco cream invertido do mock HTML antigo.
- Email de contato em i18n (`contact.email`); valor atual: `support@justgui.dev`.
- Formulário estruturado com a11y; desabilitado até endpoint de API existir.

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
- Client JS mínimo: header menu, analytics, acordeão de projetos (`projects-accordion.client.ts`). Novas exceções devem ser documentadas no PR.
- OG image: `public/favicons/favicon_512x512.png` or dedicated asset

## Dados e API

- Consumir listas dinâmicas (projetos, etc.) via `src/data/` ou `src/services/`, não inline nas seções.
- Mocks tipados com o mesmo contrato que o fetch usará (ex.: `Project` + `projects.mock.ts`).
- Componentes recebem dados normalizados; não conhecem URLs de API.

## File organization

```
src/
  components/           # UI atômica e composta
  components/sections/  # Orquestração por seção da página
  components/hero/
  components/projects/
  components/about/
  components/contact/
  config/
  data/
  types/
  langs/
  layouts/
  pages/
  scripts/              # *.client.ts
  styles/
  utils/
```

## Checklist

See [checklist.md](checklist.md).
