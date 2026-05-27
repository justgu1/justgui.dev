# WCAG 2.1 AA — Checklist de comprovação

## Automatizado (CI)

- [ ] `yarn test:a11y` — pa11y-ci WCAG2AA em `/en/`, `/pt/`, `/es/` (job `verify`)
- [ ] `yarn test:e2e` — axe em `navigation.spec.ts` (job `verify`)
- [ ] Lighthouse accessibility = 100 (job `verify`)

## Perceivable (1.x)

- [ ] 1.1.1: imagens/SVG decorativos com `aria-hidden`; conteúdo informativo com texto alternativo
- [ ] 1.3.1: landmarks (`header`, `nav`, `main`, `section`, `footer`); um `h1` por página
- [ ] 1.4.3: contraste texto normal ≥ 4.5:1 (tokens em `default.css`)
- [ ] 1.4.11: contraste bordas/controles UI ≥ 3:1
- [ ] 1.4.10: reflow em 320px — `e2e/responsive.spec.ts`

## Operable (2.x)

- [ ] 2.1.1: toda ação disponível via teclado
- [ ] 2.1.2: menu mobile — `e2e/keyboard.spec.ts` (Escape)
- [ ] 2.4.1: skip link — `e2e/keyboard.spec.ts`
- [ ] 2.4.7: `:focus-visible` em `a11y.css`
- [ ] 2.5.5: alvos de toque ≥ 44px (`default.css`)

## Understandable (3.x)

- [ ] 3.1.1: `<html lang={lang}>` por rota
- [ ] 3.2.3: navegação consistente entre idiomas

## Robust (4.x)

- [ ] 4.1.1: HTML válido — `yarn lint` (eslint-plugin-astro)
- [ ] 4.1.2: botões/links com nome acessível

## Manual (release)

- [ ] Navegação só com Tab/Shift+Tab/Enter/Escape
- [ ] Zoom 200% sem perda de conteúdo
- [ ] VoiceOver ou NVDA: landmarks e headings corretos
