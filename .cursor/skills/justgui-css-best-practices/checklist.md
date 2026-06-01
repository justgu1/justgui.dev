# CSS — Checklist

- [ ] Cores/fontes via variáveis `:root`
- [ ] Tipografia usa `--text-*` (nunca `--fs-h*` nem tamanho inferido de `h1`–`h6`)
- [ ] `body` define `--text-base`; seletor `*` sem `font-size`
- [ ] Novo domínio visual = novo arquivo em `styles/`, import em `globals.css`
- [ ] `:focus-visible` preservado em elementos interativos e `.form-control`
- [ ] Animações respeitam `prefers-reduced-motion` e `data-a11y-motion="reduce"`
- [ ] Footer: animação em `.footer-surface`, não em `.footer` (fixed children)
- [ ] Idioma selecionado no footer: `--cream`, não `--green`
- [ ] Flutuantes: fade-in com `.floating-actions--visible`; sem `display: none` abrupto
- [ ] Descrições a11y: `.a11y-field-desc` só após `<legend>`, não por input
- [ ] Sem magic numbers repetidos (extrair para variável)
- [ ] Testado em `--bp-sm` e `--bp-md`

## CI

- [ ] `cd frontend && yarn ci`
- [ ] Lighthouse accessibility ≥ 100
