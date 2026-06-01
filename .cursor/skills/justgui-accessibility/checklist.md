# WCAG 2.1 AA — Checklist de comprovação

## Automatizado (CI)

- [ ] `yarn ci` — inclui pa11y, e2e, Lighthouse
- [ ] `yarn test:a11y` — pa11y-ci WCAG2AA em `/en/`, `/pt/`, `/es/`
- [ ] `yarn test:e2e` — `keyboard.spec.ts`, `reduced-motion.spec.ts`
- [ ] Lighthouse accessibility = 100

## Perceivable (1.x)

- [ ] 1.1.1: imagens/SVG decorativos com `aria-hidden`; conteúdo informativo com texto alternativo
- [ ] 1.3.1: landmarks (`header`, `nav`, `main`, `section`, `footer`); um `h1` por página
- [ ] 1.4.3: contraste texto normal ≥ 4.5:1 (tokens em `default.css`)
- [ ] 1.4.4: escala de fonte via painel a11y (`data-a11y-font-scale`)
- [ ] 1.4.11: contraste bordas/controles UI ≥ 3:1 (`.form-control` customizado)
- [ ] 1.4.12: espaçamento de texto via painel (`data-a11y-spacing`)
- [ ] 1.4.10: reflow em 320px — `e2e/responsive.spec.ts`

## Operable (2.x)

- [ ] 2.1.1: toda ação disponível via teclado
- [ ] 2.1.2: menu mobile — `e2e/keyboard.spec.ts` (Escape)
- [ ] 2.2.2 / 2.3.3: movimento reduzido — painel a11y + `prefers-reduced-motion` + fade-in dos flutuantes respeita prefs
- [ ] 2.4.1: skip link — `e2e/keyboard.spec.ts`
- [ ] 2.4.7: `:focus-visible` em `a11y.css` e `.form-control`
- [ ] 2.4.11 / 2.4.13 (WCAG 2.2): foco reforçado via painel (`data-a11y-focus`)
- [ ] 2.5.5: alvos de toque ≥ 44px (`default.css`, footer toolbar, flutuantes)
- [ ] Menu principal: roving tabindex + setas ←/→/↑/↓ — `e2e/keyboard.spec.ts`
- [ ] Welcome dialog: Tab preso no modal (`focus-trap.ts`); Continuar fecha; Escape/click-outside não fecham
- [ ] Painel a11y: focus trap + `inert` na página; posicionado acima do footer; fora do DOM do `<footer>`

## Understandable (3.x)

- [ ] 3.1.1: `<html lang={lang}>` por rota — `Astro.params.lang`
- [ ] 3.2.3: idioma via **footer toolbar** (listbox); nomes completos (English, Português, Español); selecionado em `--cream`, não verde
- [ ] Seletor de idioma: listbox popover acima do footer; click-outside fecha
- [ ] Formulário de contato: limites 128/128/512; contador abaixo do textarea; feedback success/error + `aria-busy`
- [ ] Painel a11y: descrição **por seção** (`a11y-field-desc` após legend), não por input

## Robust (4.x)

- [ ] 4.1.1: HTML válido — `yarn lint` (eslint-plugin-astro)
- [ ] 4.1.2: botões/links com nome acessível

## Manual (release)

- [ ] Navegação com Tab/Shift+Tab/Enter/Escape e setas no menu
- [ ] Welcome dialog: Continuar fecha mesmo sem escolher cookies (default essenciais)
- [ ] Painel a11y: daltonismo, contraste e fonte aplicam sem quebrar layout
- [ ] Zoom 200% sem perda de conteúdo
- [ ] VoiceOver ou NVDA: landmarks e headings corretos
