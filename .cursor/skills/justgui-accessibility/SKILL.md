---
name: justgui-accessibility
description: Validates and implements WCAG 2.1 AA accessibility for the justgui Astro frontend. Use when editing components, CSS focus states, ARIA, i18n a11y strings, or running accessibility audits.
disable-model-invocation: true
---

# justgui Accessibility (WCAG 2.1 AA)

## Definition of Done

- 0 violations with `yarn a11y` (pa11y-ci, standard WCAG2AA) on `/en/`, `/pt/`, `/es/`
- Manual checklist in [checklist.md](checklist.md) completed
- All user-facing strings for ARIA/labels come from `langs/{en,pt,es}/a11y.ts`

## Project patterns

| Pattern | Location |
|---------|----------|
| Skip link | `Layout.astro` → `#main-content` |
| Focus styles | `styles/a11y.css` → `:focus-visible` |
| Reduced motion | `styles/a11y.css` → `prefers-reduced-motion` |
| i18n labels | `a11y.skipToContent`, `a11y.mainNavigation`, `a11y.externalLink`, etc. |
| Sections | `aria-labelledby` on `<section>`, matching `h2` id |
| External links | `rel="noopener noreferrer"`, `aria-label` with `{label}` param |
| Decorative UI | `aria-hidden="true"` on separators, SVGs, background text |
| Touch targets | min 2.75rem on interactive elements (`default.css`) |
| Contrast | body text uses `--gray` on `--bg`; verify new tokens |

## Workflow

1. Implement semantic HTML + ARIA (see `justgui-semantic-html5` skill)
2. Run `yarn dev`, then `yarn a11y` with preview server on port 4321
3. Fix violations; re-run until clean
4. Complete manual checklist (keyboard, 200% zoom, screen reader smoke test)

## Commands

```bash
cd frontend && yarn test:a11y      # pa11y-ci (preview running)
cd frontend && yarn test:e2e     # includes axe in navigation.spec.ts
cd frontend && yarn lighthouse   # a11y score must be 100
```

CI: GitHub Actions job `verify`.

## Additional resources

- Full test checklist: [checklist.md](checklist.md)
