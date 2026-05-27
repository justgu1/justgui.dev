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
- [ ] Client JS apenas para menu e analytics
- [ ] `getStaticPaths` atualizado se novas rotas `[lang]`
