---
name: justgui-semantic-html5
description: Enforces semantic HTML5 structure for the justgui Astro portfolio. Use when creating or refactoring sections, components, headings, landmarks, lists, and interactive elements.
disable-model-invocation: true
---

# justgui Semantic HTML5

## Landmarks map

```
body
├── a.skip-link
├── header.header
│   └── nav[aria-label] (menu principal)
├── main#main-content
│   ├── section#hero
│   └── section#expertise|projects|about|contact
├── footer.footer
│   ├── p.footer-copyright
│   ├── div.footer-toolbar[aria-label]
│   │   ├── div.footer-lang (listbox idioma)
│   │   └── button (painel a11y)
│   └── nav.footer-social-nav[aria-label]
├── #accessibility-panel[role=dialog]  ← Layout, fora do footer
├── aside.floating-actions
└── div.welcome-dialog[role=dialog]
```

## Rules

1. **One `h1` per page** — only in `Hero.astro`
2. **Section titles** — `h2` via `Title.astro` with stable `id`
3. **No `<div>` inside headings** — use `<span>` only
4. **Lists** — groups of links/cards use `<ul>` + `<li>`
5. **Actions** — `<a>` for navigation/URLs; `<button type="button">` for ações sem destino
6. **Decorative** — separators, icons, bg text: `aria-hidden="true"`
7. **Modais** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; focus trap via `focus-trap.ts`
8. **Form a11y** — `<fieldset>` + `<legend>` por grupo; descrição da seção em `<p class="a11y-field-desc">` após legend

## Footer toolbar

- Idioma: `role="listbox"` / `role="option"` com `aria-selected`
- Botão a11y: `aria-haspopup="dialog"`, `aria-expanded`
- Links sociais: `<nav>` + `<ul>` + `<a>` externos

## Section component

Use `Section.astro` with required `id` matching header anchors.

## Anti-patterns

| Avoid | Use |
|-------|-----|
| Painel a11y dentro de `<footer>` | `AccessibilityPanel` no `Layout.astro` |
| `transform`/`animation` em `.footer` com filhos `fixed` | animar `.footer-surface` |
| Descrição por `<input>` | uma `.a11y-field-desc` por `<fieldset>` |
| `div` como botão de idioma | `<button>` + listbox |
| Multiple `h1` in sections | `h2` in `Title.astro` |

## Checklist

See [checklist.md](checklist.md).
