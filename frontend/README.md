# justgui Frontend

Frontend do `justgui.dev`, implementado com Astro SSR e foco em acessibilidade, semântica, SEO multilíngue e confiabilidade de entrega via CI.

## Stack

- Astro (`@astrojs/node`, `@astrojs/sitemap`)
- TypeScript strict
- CSS com design tokens e escala tipográfica `--text-*`
- i18n: `en`, `pt`, `es`
- Analytics: GA4 + Meta Pixel (controlado por ambiente)

## Arquitetura (resumo)

- `src/layouts/Layout.astro`: estrutura global, skip link, header/footer
- `src/components/`: componentes e seções
- `src/langs/`: dicionários por idioma
- `src/config/`: env, SEO, site config
- `src/pages/[lang]/index.astro`: rota principal por idioma
- `src/pages/robots.txt.ts`: robots com sitemap absoluto

## Qualidade e Definition of Done

Nenhuma entrega é considerada concluída sem CI completo verde:

```bash
cd frontend && yarn ci
```

### O que o `yarn ci` executa

- `ci:quality`
  - `yarn format:check`
  - `yarn lint`
  - `yarn typecheck`
  - `yarn check:astro`
  - `yarn check:arch`
  - `yarn test`
- `ci:build`
  - `yarn build`
  - `yarn size`
- `ci:verify`
  - `yarn validate:seo`
  - `yarn test:e2e`
  - `yarn test:a11y`
  - `yarn lighthouse`

## Comandos principais

```bash
# desenvolvimento
cd frontend && yarn dev

# build local
cd frontend && yarn build
cd frontend && yarn preview

# qualidade rápida
cd frontend && yarn ci:quality

# pipeline completa
cd frontend && yarn ci
```

## Variáveis de ambiente (PUBLIC\_\*)

Copie o template na raiz do monorepo e edite só localmente:

```bash
cp .env.example .env
```

O ficheiro `.env` está no `.gitignore` e **não deve ser commitado**. Use apenas `.env.example` no repositório.

Definidas em `.env` (veja `.env.example`):

- `PUBLIC_APP_ENV`
- `PUBLIC_API_URL`
- `PUBLIC_SITE_URL`
- `PUBLIC_LINKEDIN_URL`
- `PUBLIC_GITHUB_URL`
- `PUBLIC_INSTAGRAM_URL`
- `PUBLIC_GA4_MEASUREMENT_ID` (opcional)
- `PUBLIC_META_PIXEL_ID` (opcional)
- `PUBLIC_CV_URL` (opcional)

## Testes

- Unit: Vitest (`src/**/*.test.ts`)
- E2E: Playwright (`e2e/`), incluindo axe (WCAG)
- A11y: pa11y (`.pa11yci.json`)
- SEO: validações automatizadas em `scripts/validate-seo.mjs`

## CI/CD

Workflow principal: `.github/workflows/frontend-ci.yml`

Jobs:

- `quality`
- `build`
- `verify`
- `docker` (branch principal)

## Troubleshooting rápido

### Permissão em `.astro` / cache Vite

Se aparecer erro de permissão no build local:

```bash
sudo chown -R $USER:$USER frontend/.astro frontend/node_modules/.vite
```

### Playwright sem browser instalado

```bash
cd frontend && yarn playwright:install
```
