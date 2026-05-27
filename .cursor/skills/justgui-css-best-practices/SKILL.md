---
name: justgui-css-best-practices
description: Applies CSS token, naming, accessibility, and file structure conventions for the justgui frontend. Use when editing styles in src/styles or adding new stylesheets.
disable-model-invocation: true
---

# justgui CSS Best Practices

## Tokens (`default.css`)

Use CSS variables — never hardcode colors/fonts in component files:

- Colors: `--bg`, `--cream`, `--red`, `--gray`, `--border`, `--focus`
- Typography: `--text-xxl` … `--text-xxs`, `--text-base` (body), `--font-primary|secondary|mono`
- Layout: `--header-height`, `--bp-sm|md|lg`

**Do not** use `--fs-h*` or tie font size to HTML tag names. Size is set per component class.

| Token | Typical use |
|-------|-------------|
| `--text-xxl` | Hero name |
| `--text-xl` | Section titles |
| `--text-lg` | Hero subtitle, card metrics |
| `--text-md` | Buttons, section title italic |
| `--text-sm` | — |
| `--text-base` | Body default (on `body` only) |
| `--text-xs` | Nav, labels, descriptions |
| `--text-xxs` | Eyebrow, footer meta |

Utilities: `.text-xxl` … `.text-xxs` in `typography.css`.

## File structure

| File | Scope |
|------|-------|
| `default.css` | reset, tokens, buttons |
| `typography.css` | size utility classes |
| `a11y.css` | skip link, focus, reduced motion |
| `section.css` | section header/title |
| `header.css` | header + mobile nav |
| `hero.css` | hero grid/cards |
| `footer.css` | footer |

Import order in `globals.css` matters (tokens first).

## Naming

- Component prefix: `.hero-*`, `.header-*`, `.footer-*`, `.section-*`
- State classes: `.is-open` (not `.open` alone)
- Avoid deep nesting; prefer single class per element

## Accessibility in CSS

- `:focus-visible` — never remove outline without replacement
- `@media (prefers-reduced-motion: reduce)` — disable animations
- Use `rem` / `clamp` for display sizes (`--text-xxl` … `--text-lg`)
- `min-height` / `min-width` on touch targets (see `default.css`)

## Responsive

- Mobile-first; `max-width` media queries
- Use `@media (max-width: 64rem)` for `--bp-md`

## CI

- `yarn lint` (style-related rules minimal)
- Lighthouse / axe for contrast (see `justgui-accessibility`)

## Checklist

See [checklist.md](checklist.md).
