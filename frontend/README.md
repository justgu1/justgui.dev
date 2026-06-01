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

# reconverter screenshots de projetos (PNG → WebP lossless; requer cwebp)
cd frontend && yarn images:projects:webp
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
- `CONTACT_TO` (destinatário admin das mensagens — **nunca** expor como `PUBLIC_*`; alias legado: `ADMIN_EMAIL`)

### Server-side (SQLite / visitantes)

- `DATABASE_PATH` (default `./data/justgui.sqlite`; Docker: `/var/www/data/justgui.sqlite`)
- `VISITOR_IP_SALT` (hash de IP para metadata LGPD)

Sem SMTP configurado, o endpoint `/api/contact` responde `503` e o formulário mostra mensagem de indisponibilidade.

## E-mail de contato

O formulário dispara **dois e-mails** via SMTP (nodemailer):

| E-mail                | Destino             | Reply-To            | Formato                  |
| --------------------- | ------------------- | ------------------- | ------------------------ |
| Notificação admin     | `CONTACT_TO`        | E-mail do visitante | Texto plano              |
| Auto-reply (obrigado) | E-mail do visitante | `CONTACT_TO`        | HTML + texto (multipart) |

### Variáveis e papéis

| Variável                  | Papel                                                                    |
| ------------------------- | ------------------------------------------------------------------------ |
| `SMTP_FROM` / `SMTP_USER` | Identidade de envio (ex.: `support@justgui.dev` no Hostinger)            |
| `CONTACT_TO`              | E-mail pessoal admin — recebe notificações e é o `replyTo` do auto-reply |
| `ADMIN_EMAIL`             | Alias legado de `CONTACT_TO` (resolvido se `CONTACT_TO` estiver vazio)   |
| `PUBLIC_SITE_URL`         | URLs absolutas de logo e links no template HTML                          |

Configure em produção (Docker repassa via `docker-compose.yaml`):

```env
CONTACT_TO=seu-email-pessoal@example.com
```

O remetente (`SMTP_FROM`) e o destino admin (`CONTACT_TO`) são distintos: o SMTP envia como caixa institucional, mas notificações e respostas do visitante vão para o e-mail pessoal.

### Auto-reply branded

- Template em `src/server/mail/contactAutoReplyTemplate.ts`
- Copy i18n em `src/server/mail/autoReplyMessages.ts` (`en`, `pt`, `es`)
- Design alinhado aos tokens do site (fundo escuro, cream/gray, accent red-bright)
- Acessibilidade: `lang` por idioma, preheader, alt no logo, contraste ≥ 4.5:1, fallback texto plano, escape HTML do nome

### Troubleshooting de entrega

- Confirmar `CONTACT_TO` (ou `ADMIN_EMAIL`) no `.env` de produção — sem isso, notificações caem em `SMTP_FROM` (`support@justgui.dev`)
- No Docker, `docker-compose.yaml` repassa `CONTACT_TO` com fallback para `ADMIN_EMAIL`
- Em dev (`PUBLIC_APP_ENV=local`): log `[mail] admin notification to:` mostra o destino real antes do envio

- Verificar spam/quarentena no Gmail ou outro provedor pessoal
- Validar SPF/DKIM de `justgui.dev` no painel Hostinger
- Em dev (`PUBLIC_APP_ENV=local`): logs `[mail] sendMail to admin failed` e `[mail] auto-reply failed`

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

## Previews de projetos

- Screenshots em `public/projects/*-preview.webp` (`yarn images:projects:webp`, `cwebp -lossless`).
- Dados em `src/data/projects.mock.ts`; componentes em `components/projects/`.
- **Accordion**: 3 itens visíveis (Tyer aberto por padrão); painel aberto = grid featured (texto + preview); só um `<details>` aberto; preview é link para o site.
- **Ver mais / Ver menos**: carrega lotes de 5 projetos (`PROJECTS_LOAD_MORE_COUNT`); «Ver menos» recolhe os itens carregados.
- **Performance**: preload WebP só do primeiro projeto; lazy ao abrir cada item.
- **Motion**: pan via `object-position`; estático com `prefers-reduced-motion` ou `data-a11y-motion="reduce"`.
- **Astro**: não usar JSX atribuído a variável no frontmatter (`.astro`); markup no template do componente.

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
