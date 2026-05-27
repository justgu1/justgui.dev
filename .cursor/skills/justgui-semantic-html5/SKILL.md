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
│   └── nav[aria-label]
├── main#main-content
│   ├── section#hero
│   │   ├── div.hero-intro (intro content)
│   │   ├── nav.hero-actions
│   │   └── aside.hero-aside
│   │       ├── ul > li > article.hero-card
│   │       └── footer.hero-status
│   └── section#expertise|projects|about|contact
│       ├── header.section-header > h2
│       └── div.section-content
└── footer.footer
    └── nav[aria-label] (social)
```

## Rules

1. **One `h1` per page** — only in `Hero.astro`
2. **Section titles** — `h2` via `Title.astro` with stable `id`
3. **No `<div>` inside headings** — use `<span>` only
4. **Lists** — groups of links/cards use `<ul>` + `<li>`
5. **Stats/cards** — `<article>` per card in hero
6. **Role line** — `<p class="hero-subtitle">`, not `h2`
7. **Actions** — `<nav aria-label>` for CTA groups; `<a>` for navigation, `<button>` for actions without URL
8. **Decorative** — separators, icons, bg text: `aria-hidden="true"`

## Section component

Use `Section.astro` with required `id` matching header anchors:

```astro
<Section id="expertise" number="..." description="..." title="..." />
```

## Anti-patterns

| Avoid | Use |
|-------|-----|
| `div.left-column` | `div.hero-intro` or named region |
| `div.card` | `article.hero-card` |
| `div.hero-buttons-container` | `nav.hero-actions` |
| Multiple `h1` in sections | `h2` in `Title.astro` |
| `div` in `h2` | `span` groups |

## Checklist

See [checklist.md](checklist.md).
