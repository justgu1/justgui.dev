# Frontend — Checklist

## CI (Definition of Done)

- [ ] `cd frontend && yarn ci` passa sem falhas

## CI (job `quality`)

- [ ] `yarn format:check`
- [ ] `yarn lint`
- [ ] `yarn typecheck`
- [ ] `yarn check:astro`
- [ ] `yarn check:arch` (depcruise + madge)
- [ ] `yarn test` (Vitest)

## Manual

- [ ] Rotas `pages/[lang]/**`: idioma via `Astro.params.lang` (não `Astro.props`)
- [ ] Páginas que dependem do middleware: `prerender = false` (ex.: home)
- [ ] Middleware: `VisitorsMiddleware` antes de `LanguagesMiddleware`
- [ ] Footer: toolbar idioma + a11y; sticky após scroll; redes em linha em `<64rem`
- [ ] Flutuantes: WhatsApp + topo juntos após scroll ≥400px; fade-in; acima do footer
- [ ] `AccessibilityPanel` no `Layout`, **não** dentro do footer
- [ ] Welcome dialog: form a11y completo; Continuar fecha; cookies default essenciais
- [ ] Contato: limites 128/128/512 + contador no textarea
- [ ] SQLite: `DATABASE_PATH`; APIs `/api/consent`, `/api/a11y`, `/api/contact`
- [ ] Novas strings em en, pt, es (incl. `a11y-panel.ts`, `welcome.ts`, `contact.ts`)
- [ ] Env documentado em `.env.example`
- [ ] **Nenhum arquivo passa de 300 linhas**
- [ ] Dados estáticos via `src/data/`; endpoints em `src/pages/api/`

## Locale (middleware)

- [ ] `yarn test` — `negotiateLocale.test.ts`, `localePath.test.ts`, `languages.test.ts`
- [ ] `yarn test:e2e` — `e2e/locale.spec.ts`
- [ ] Welcome persiste após redirect `/` → `/{lang}` (cookie `justgui_welcome_pending`)
- [ ] Não reintroduzir `?setLang=`

## UI portfolio

- [ ] Cabeçalho de seção: `description` à esquerda; `title` à direita
- [ ] Âncoras com `scroll-margin-top: var(--header-height)`
- [ ] **Projetos** (`ProjectAccordion`): 3 itens iniciais; primeiro aberto; um `<details>` por vez; painel aberto = grid featured; «Ver mais» (+5) / «Ver menos» (`projects-accordion.client.ts`)
- [ ] Preview: link externo com `aria-label`; WebP em `public/projects/`; `yarn images:projects:webp`; preload só do 1º; lazy ao abrir
- [ ] **About**: timeline só marcos; `AboutCommitment.astro` na coluna esquerda (não em Projects)
- [ ] Accordion: chevron ↓/↑ visível; sem JSX em variável no frontmatter Astro
- [ ] Controles a11y: `.form-control` + descrição por seção (`a11y-field-desc`)
