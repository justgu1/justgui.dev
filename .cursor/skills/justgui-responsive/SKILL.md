---
name: justgui-responsive
description: Implements responsive layout for the justgui frontend using project breakpoints and mobile-first CSS. Use when editing layout CSS, header menu, hero grid, or section spacing.
disable-model-invocation: true
---

# justgui Responsive

## Breakpoints (CSS variables)

| Token | Value | Usage |
|-------|-------|-------|
| `--bp-sm` | 40rem (640px) | Hero cards single column |
| `--bp-md` | 64rem (1024px) | Header drawer, hero stack, footer stack |
| `--bp-lg` | 80rem (1280px) | Desktop layout |

## Mobile-first rules

1. Base styles = mobile; add `@media (max-width: …)` enhancements
2. Hero: single column below `--bp-md`; cards 1-col below `--bp-sm`
3. Header: hamburger + panel `#primary-nav` below `--bp-md`
4. Footer: column layout below `--bp-md`
5. Typography: use `clamp()` tokens from `:root`, not fixed `px` for text
6. Avoid `100vh` as sole height on mobile — use `min-height`

## Header mobile

- Toggle: `[data-menu-toggle]` with `aria-expanded`, `aria-controls="primary-nav"`
- Panel: `.header-nav-panel.is-open`
- Script: `scripts/header.client.ts` (Escape, focus trap, close on link click)

## WCAG reflow (1.4.10)

Test at **320px** width: no horizontal scroll for main content; all CTAs reachable.

## Checklist

See [checklist.md](checklist.md).
