# justgui Frontend

Frontend do `justgui.dev`, implementado com Astro SSR e foco em acessibilidade, semântica, SEO multilíngue e confiabilidade de entrega via CI.

## Stack

- Astro (`@astrojs/node`, `@astrojs/sitemap`)
- TypeScript strict
- CSS com design tokens e escala tipográfica `--text-*`
- i18n: `en`, `pt`, `es`
- Analytics: GA4 + Meta Pixel (controlado por ambiente)
- Contato: endpoint server-side `/api/contact` com envio SMTP (nodemailer) + SQLite
- Persistência: SQLite (`better-sqlite3`) para visitantes, contatos, consentimento e prefs a11y

## Arquitetura (resumo)

- `src/layouts/Layout.astro`: estrutura global, skip link, header/footer
- `src/components/`: componentes e seções
- `src/langs/`: dicionários por idioma
- `src/config/`: env, SEO, site config
- `src/data/`: projetos estáticos (`projects.mock.ts`)
- `src/pages/[lang]/index.astro`: rota principal por idioma
- `src/pages/api/contact.ts`: envio de mensagens de contato
- `src/pages/api/consent.ts`: registo de consentimento (LGPD)
- `src/pages/api/a11y.ts`: sync de preferências a11y
- `src/server/db/`: SQLite (migrations, repositories)
- `src/server/mail/`: configuração e transporte SMTP
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

## Variáveis de ambiente

Copie o template na raiz do monorepo e edite só localmente:

```bash
cp .env.example .env
```

O ficheiro `.env` está no `.gitignore` e **não deve ser commitado**. Use apenas `.env.example` no repositório.

### Públicas (`PUBLIC_*`)

- `PUBLIC_APP_ENV`
- `PUBLIC_SITE_URL`
- `PUBLIC_LINKEDIN_URL`
- `PUBLIC_GITHUB_URL`
- `PUBLIC_INSTAGRAM_URL`
- `PUBLIC_GA4_MEASUREMENT_ID` (opcional)
- `PUBLIC_META_PIXEL_ID` (opcional)
- `PUBLIC_CV_URL` (opcional; default `/cv/GuilhermeSantos-Curriculo-2026.pdf`)
- `PUBLIC_WHATSAPP_NUMBER` (link `wa.me` no header e célula flutuante)

### Server-side (contato SMTP)

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
- `SMTP_FROM`, `SMTP_FROM_NAME`
- `CONTACT_TO` (destinatário admin das mensagens — **nunca** expor como `PUBLIC_*`)

### Server-side (SQLite / visitantes)

- `DATABASE_PATH` (default `./data/justgui.sqlite`; Docker: `/var/www/data/justgui.sqlite`)
- `VISITOR_IP_SALT` (hash de IP para metadata LGPD)

Sem SMTP configurado, o endpoint `/api/contact` responde `503` e o formulário mostra mensagem de indisponibilidade.

## Detecção de idioma

- **`/`** sem prefixo: redireciona (302) para `/{lang}` com base em `Accept-Language` (`negotiateLocale`).
- **`/en`** (locale padrão SEO): se o browser preferir `pt` ou `es` e não existir cookie `justgui_lang`, redireciona para o mesmo path em `pt`/`es`.
- A home `src/pages/[lang]/index.astro` usa SSR (`prerender = false`) para o middleware aplicar negociação em `/en`, `/pt` e `/es`.
- **`/pt` e `/es`**: não são alterados automaticamente (links partilháveis).
- **Seletor de idioma e acessibilidade**: footer sticky (`Footer` toolbar); cookie `justgui_lang` ao servir `/{lang}`.
- **Flutuantes**: WhatsApp (ícone, verde + ping) e voltar ao topo lado a lado; aparecem juntos após scroll (≥400px) e sobem para não cobrir o footer.
- Em Docker, o nginx repassa `Accept-Language` ao frontend.
- Nginx usa DNS embebido do Docker (`resolver 127.0.0.11`) para re-resolver upstreams após rebuild de containers (evita 502 por IP stale).

## CV

O botão de download usa `PUBLIC_CV_URL`. O PDF padrão fica em `public/cv/GuilhermeSantos-Curriculo-2026.pdf`.

## Célula flutuante e acessibilidade

- **Footer sticky**: idioma (nomes completos) + painel WCAG 2.2 AA.
- **Flutuantes** (`FloatingActionCell`): WhatsApp à esquerda + voltar ao topo à direita; visíveis após scroll; sobem quando o footer entra na viewport.
- Welcome dialog no 1º acesso: cookies (analytics) + atalhos a11y; cookie `justgui_welcome`.
- Menu principal: navegação por setas com roving tabindex (←/→/↑/↓).

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
