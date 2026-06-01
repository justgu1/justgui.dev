---
name: justgui-responsive
description: Implements responsive layout for the justgui frontend using project breakpoints and mobile-first CSS. Use when editing layout CSS, header menu, footer toolbar, hero grid, or section spacing.
disable-model-invocation: true
---

# justgui Responsive

## Breakpoints (CSS variables)

| Token | Value | Usage |
|-------|-------|-------|
| `--bp-sm` | 40rem (640px) | Hero cards single column; flutuantes menores |
| `--bp-md` | 64rem (1024px) | Header drawer, hero stack, footer stack, toolbar full-width |
| `--bp-lg` | 80rem (1280px) | Desktop layout |

## Mobile-first rules

1. Base styles = mobile; add `@media (max-width: …)` enhancements
2. Hero: single column below `--bp-md`; cards 1-col below `--bp-sm`
3. Header: hamburger + panel `#primary-nav` below `--bp-md`
4. Footer below `--bp-md`:
   - `.footer-surface` em coluna (copyright → toolbar → redes)
   - Toolbar idioma + a11y em linha (`flex: 1` por botão)
   - **Redes sociais em linha horizontal** (mesmo padrão da toolbar), não coluna
5. Flutuantes: row horizontal (WhatsApp esq., topo dir.); offset acima do footer sticky
6. Typography: use `clamp()` tokens from `:root`, not fixed `px` for text
7. Avoid `100vh` as sole height on mobile — use `min-height` / `dvh`

## Header mobile

- Toggle: `[data-menu-toggle]` with `aria-expanded`, `aria-controls="primary-nav"`
- Panel: `.header-nav-panel.is-open`
- Script: `scripts/header.client.ts` (Escape, focus trap, close on link click)

## Footer mobile (`≤64rem`)

- Copyright com padding; borda inferior
- Listbox de idioma abre para cima (`bottom: calc(100% + …)`)
- Painel a11y reposicionado via JS (`footer-toolbar.client.ts`); max-height com scroll

## WCAG reflow (1.4.10)

Test at **320px** width: no horizontal scroll for main content; all CTAs reachable.

## Checklist

See [checklist.md](checklist.md).
