# Frontend — Checklist

## CI (job `quality`)

- [ ] `yarn format:check`
- [ ] `yarn lint`
- [ ] `yarn typecheck`
- [ ] `yarn check:astro`
- [ ] `yarn check:arch` (depcruise + madge)
- [ ] `yarn test` (Vitest)

## Manual

- [ ] Novas strings em en, pt, es
- [ ] Env documentado em `.env.example`
- [ ] Client JS: menu, analytics, acordeão de projetos — outras exceções documentadas no PR
- [ ] `getStaticPaths` atualizado se novas rotas `[lang]`
- [ ] **Nenhum arquivo novo/alterado passa de 300 linhas** — dividir em subcomponentes, utils ou CSS por domínio
- [ ] Seções são orquestradores; markup pesado em `components/<domínio>/`
- [ ] Dados dinâmicos via `src/data/` ou `src/services/`; mocks tipados até API
- [ ] Cabeçalho de seção: `description` (frase longa) à esquerda do número; `title` (rótulo curto) à direita
- [ ] Âncoras com `scroll-margin-top: var(--header-height)`; scroll suave em `html`
- [ ] Hero ticker pausa no hover; expertise com cor no numeral (sem borda animada no número)
- [ ] Accordion de projetos: um aberto, chevron ↓/↑ sempre visível
- [ ] Compromisso de acessibilidade em About (`AboutA11yStatement`), não em Projects
- [ ] About separado de Contact (`border-bottom` em `about-layout`); Contact em tema escuro
