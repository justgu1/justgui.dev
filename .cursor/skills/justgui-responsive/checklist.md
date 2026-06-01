# Responsividade — Checklist

## CI

- [ ] `cd frontend && yarn ci`
- [ ] `yarn test:e2e` — `e2e/responsive.spec.ts` (320 / 768 / 1024)
- [ ] `yarn test:e2e` — projeto Playwright `mobile` (Pixel 5)

## Manual

- [ ] 1440px — grid hero proporcional
- [ ] Orientação portrait e landscape
- [ ] Header drawer abre/fecha; foco retorna ao botão
- [ ] Section titles empilham em mobile
- [ ] Footer `<64rem`: copyright → toolbar (idioma + a11y) → redes **em linha**
- [ ] Flutuantes visíveis após scroll; não cobrem footer sticky
- [ ] Welcome dialog scrollável em viewport baixa (`max-height: 90vh`)
