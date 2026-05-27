# HTML5 semântico — Checklist

## CI

- [ ] `yarn test:e2e` — `e2e/navigation.spec.ts` (landmarks, 1× h1, section ids)

## Manual

- [ ] Exatamente um `h1` na página (`#hero-heading`)
- [ ] Cada section tem `id` único (`expertise`, `projects`, `about`, `contact`)
- [ ] Cada section tem `aria-labelledby` no `h2` do título
- [ ] Headings sem elementos de bloco internos
- [ ] Listas de navegação/cards usam `ul` > `li`
- [ ] CTAs de navegação são `<a href>`; ações sem destino são `<button type="button">`
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] Decorativos com `aria-hidden="true"`
