# CSS — Checklist

- [ ] Cores/fontes via variáveis `:root`
- [ ] Tipografia usa `--text-*` (nunca `--fs-h*` nem tamanho inferido de `h1`–`h6`)
- [ ] `body` define `--text-base`; seletor `*` sem `font-size`
- [ ] Novo domínio visual = novo arquivo em `styles/`, import em `globals.css`
- [ ] `:focus-visible` preservado em elementos interativos
- [ ] Animações respeitam `prefers-reduced-motion`
- [ ] Sem magic numbers repetidos (extrair para variável)
- [ ] Testado em `--bp-sm` e `--bp-md`

## CI

- [ ] `yarn test:e2e` (responsive.spec.ts)
- [ ] Lighthouse accessibility ≥ 100 (job `verify`)
