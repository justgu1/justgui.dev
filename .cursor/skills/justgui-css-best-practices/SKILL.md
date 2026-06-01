---
name: justgui-css-best-practices
description: Applies CSS token, naming, accessibility, and file structure conventions for the justgui frontend. Use when editing styles in src/styles or adding new stylesheets.
disable-model-invocation: true
---

# justgui CSS Best Practices

## Tokens (`default.css`)

Use CSS variables — never hardcode colors/fonts in component files:

- Colors: `--bg`, `--surface`, `--cream`, `--red`, `--red-bright`, `--gray`, `--border`, `--focus`, `--green` (só feedback positivo/WhatsApp)
- Typography: `--text-xxl` … `--text-xxs`, `--text-base` (body), `--font-primary|secondary|mono`
- Layout: `--header-height`, `--bp-sm|md|lg`

**Do not** use `--fs-h*` or tie font size to HTML tag names.

| Token | Typical use |
|-------|-------------|
| `--text-xxl` | Hero name |
| `--text-xl` | Section titles |
| `--text-lg` | Hero subtitle, card metrics |
| `--text-md` | Buttons, section title italic |
| `--text-sm` | Body copy, descrições a11y |
| `--text-base` | Body default (on `body` only) |
| `--text-xs` | Nav, labels, footer toolbar |
| `--text-xxs` | Eyebrow, footer meta, contador form |

Utilities: `.text-xxl` … `.text-xxs` in `typography.css`.

## File structure

| File | Scope |
|------|-------|
| `default.css` | reset, tokens, buttons |
| `typography.css` | size utility classes |
| `a11y.css` | skip link, focus, reduced motion |
| `accessibility-preferences.css` | prefs via `data-a11y-*` |
| `form-controls.css` | radios/checkboxes custom (`.form-control`) |
| `section.css` | section header/title |
| `header.css` | header + mobile nav |
| `footer.css` | footer sticky, toolbar, painel a11y, `.a11y-field-desc` |
| `floating-action-cell.css` | flutuantes WhatsApp + topo |
| `welcome-dialog.css` | welcome dialog modal |
| `contact.css` | formulário + `.form-hint` contador |

Import order in `globals.css` matters (tokens first).

## Footer e modais

- Sticky em `.footer.footer--pinned`; animação slide-in em `.footer-surface` (**não** em `.footer` — evita quebrar `position: fixed` de filhos)
- Idioma selecionado: `color: var(--cream)` + `background: var(--surface2)` — **não** verde
- Painel a11y: `position: fixed`, z-index 110; estilos em `footer.css`
- Welcome dialog: z-index 120; `body.welcome-open { overflow: hidden }`

## Flutuantes

- `.floating-actions--visible` — opacity/transform fade-in escalonado
- `--floating-bottom` ajustado via JS para não cobrir footer sticky
- Respeitar `prefers-reduced-motion` e `data-a11y-motion="reduce"`

## Form controls (`.form-control`)

- `appearance: none` em radio/checkbox
- Checked: `--red-bright`; alto contraste: `--focus`
- Foco reforçado: outline 4px via `data-a11y-focus="enhanced"`

## Naming

- Component prefix: `.hero-*`, `.header-*`, `.footer-*`, `.floating-actions-*`
- State classes: `.is-open`, `.is-selected`, `.floating-actions--visible`, `.footer--pinned`
- Descrições a11y: `.a11y-field-desc` (após legend, uma por seção)

## Accessibility in CSS

- `:focus-visible` — never remove outline without replacement
- `@media (prefers-reduced-motion: reduce)` + `data-a11y-motion="reduce"` — disable animations
- Use `rem` / `clamp` for display sizes
- `min-height` / `min-width` on touch targets (≥ 2.75rem)

## Responsive

- Mobile-first; `max-width` media queries
- `--bp-md` (64rem): footer stack, toolbar full-width, redes em linha horizontal

## CI

- `cd frontend && yarn ci`
- Lighthouse / axe for contrast (see `justgui-accessibility`)

## Checklist

See [checklist.md](checklist.md).
