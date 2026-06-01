---
name: justgui-accessibility
description: Validates and implements WCAG 2.1 AA accessibility for the justgui Astro frontend. Use when editing components, CSS focus states, ARIA, i18n a11y strings, welcome dialog, footer toolbar, or running accessibility audits.
disable-model-invocation: true
---

# justgui Accessibility (WCAG 2.1 AA)

## Definition of Done

- 0 violations with `yarn a11y` (pa11y-ci, standard WCAG2AA) on `/en/`, `/pt/`, `/es/`
- Manual checklist in [checklist.md](checklist.md) completed
- All user-facing strings for ARIA/labels come from `langs/{en,pt,es}/a11y.ts` and `a11y-panel.ts`

## Project patterns

| Pattern | Location |
|---------|----------|
| Skip link | `Layout.astro` → `#main-content` |
| Focus styles | `styles/a11y.css` → `:focus-visible` |
| Reduced motion | `styles/a11y.css` + `data-a11y-motion="reduce"` em `accessibility-preferences.css` |
| i18n labels | `a11y.*`, `a11yPanel.*`, `welcome.*` em `langs/{en,pt,es}/` |
| Footer toolbar | `Footer.astro` — idioma (listbox) + botão painel a11y |
| Accessibility panel | `AccessibilityPanel.astro` no **nível do `Layout`** (fora do footer); form em `AccessibilityPanelForm.astro` |
| Prefs WCAG 2.2 | `accessibility-preferences.ts` — `data-a11y-*` no `<html>`; persistência em `localStorage` + sync `/api/a11y` |
| Controles customizados | `styles/form-controls.css` — classe `.form-control` em radios/checkboxes; adapta alto contraste e foco reforçado |
| Descrições do painel | **Uma por seção** (`a11y-field-desc` após `<legend>`), nunca por input individual |
| Focus trap modais | `scripts/focus-trap.ts` — `createFocusTrap`, `setPageLayersInert`; Tab preso no modal; `inert` no resto da página |
| Form sync | `scripts/a11y-form.ts` — `readA11yForm`, `syncA11yForm` |
| Welcome dialog (1º acesso) | `WelcomeDialog.astro` + `welcome-dialog.client.ts` — cookies + form completo de a11y; **Continuar sempre fecha** |
| Flutuantes | `FloatingActionCell.astro` — WhatsApp + voltar ao topo; aparecem juntos após scroll ≥400px |
| Nav arrow keys | `header.client.ts` — ←/→ desktop, ↑/↓ mobile no menu principal |
| Sections | `aria-labelledby` on `<section>`, matching `h2` id |
| External links | `rel="noopener noreferrer"`, `aria-label` with `{label}` param |
| Touch targets | min 2.75rem on interactive elements (`default.css`) |

## Welcome dialog

- Middleware: `VisitorsMiddleware` **antes** de `LanguagesMiddleware` (`middleware.ts`)
- Cookies: `justgui_welcome` (concluído), `justgui_welcome_pending` (aguardando); `localStorage` `justgui.welcome.done`
- **Continuar** fecha sempre; se cookies não escolhidos, assume “somente essenciais”
- Fechamento: prefs a11y + cookies client-side + `localStorage`; sync `/api/consent` em background
- Escape **não** fecha; click-outside **não** fecha
- Form a11y inline = `AccessibilityPanelForm` (`showReset={false}`)

## Painel a11y (footer)

- `position: fixed`; z-index 110; posicionado acima do botão do footer via `footer-toolbar.client.ts`
- **Nunca** renderizar dentro de `<footer>` — `transform`/`animation` no footer quebra `position: fixed`
- Animação slide-in do footer sticky fica em `.footer-surface`, não em `.footer`
- Click-outside e Escape fecham; focus trap ativo enquanto aberto

## Workflow

1. Implement semantic HTML + ARIA (see `justgui-semantic-html5` skill)
2. Run `yarn dev`, then `yarn a11y` with preview server on port 4321
3. Fix violations; re-run until clean
4. Complete manual checklist (keyboard, 200% zoom, screen reader smoke test)

## Commands

```bash
cd frontend && yarn test:a11y      # pa11y-ci (preview running)
cd frontend && yarn test:e2e     # keyboard, reduced-motion, locale
cd frontend && yarn lighthouse   # a11y score must be 100
```

CI: `cd frontend && yarn ci`.

## Additional resources

- Full test checklist: [checklist.md](checklist.md)
