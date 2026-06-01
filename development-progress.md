# Development Progress

History line do projeto em tom de produto técnico, direto e sem detalhamento excessivo.

## 2026-05-31

### SQLite, welcome dialog e refinamentos UX

- Persistência server-side com SQLite (`better-sqlite3`): visitantes, submissões de contato, consentimento e prefs a11y.
- Idioma e acessibilidade movidos para **footer sticky**; flutuantes reduzidos a WhatsApp + voltar ao topo (param acima do footer).
- Flutuantes aparecem juntos após scroll (≥400px): contato à esquerda, voltar ao topo à direita; fade-in suave e footer sticky com slide-in.
- Controles customizados (radio/checkbox) no painel a11y; limites no formulário de contato (128/128/512); welcome dialog persiste após redirect i18n.
- Skills `.cursor/skills/*` atualizadas: footer sticky, flutuantes, painel a11y fora do footer, welcome dialog, form-controls, focus-trap.
- `CONTACT_TO` server-only para admin; auto-reply ao visitante após envio.
- Formulário de contato: estados loading/success/error com feedback visual (verde/vermelho).
- Célula flutuante: layout cluster corrigido, botão WhatsApp verde com ping, idioma com nomes completos, painel a11y com z-index/flip, click-outside.
- Welcome dialog no 1º acesso: cookies + atalhos a11y; APIs `/api/consent` e `/api/a11y`.
- Navegação por setas no header com roving tabindex.

### UX contato, WhatsApp e painel de acessibilidade

- Header: botão **Conversar** (primary, `wa.me`) e **Download CV** (secondary); `PUBLIC_WHATSAPP_NUMBER`.
- Célula flutuante (`FloatingActionCell`): cluster circular com WhatsApp, idioma, voltar ao topo e painel a11y.
- Painel WCAG 2.2 AA: escala de fonte, espaçamento, alto contraste, filtros de daltonismo, movimento reduzido, foco reforçado; prefs em `localStorage`.
- Navegação do menu principal por setas (←/→ desktop, ↑/↓ mobile).
- SMTP: normalização de env, TLS Hostinger e logs de diagnóstico em dev.

### Simplificação frontend-only Astro

- Removidos backend Go (`api/`), Postgres, Redis, worker, admin e blog.
- Docker reduzido a `justgui_frontend` + nginx (proxy só para Astro).
- Projetos servidos exclusivamente de `src/data/projects.mock.ts` (sem chamadas HTTP externas).
- CV estático em `public/cv/GuilhermeSantos-Curriculo-2026.pdf` via `PUBLIC_CV_URL`.
- Formulário de contato via endpoint Astro `/api/contact` + SMTP (nodemailer); React removido do stack.

## 2026-05-29

### Layout admin micro-SaaS

- Painel interno com `AdminLayout` (sidebar, topbar, main) fora do layout do portfólio.
- Rotas por secção: dashboard, blog, perfil, contatos, projetos, CV e auditoria — integradas à API `/api/admin`.
- i18n do painel em `en`/`pt`/`es` (`langs/*/admin.ts`), alinhado ao idioma do painel e cookie `justgui_lang`.

### Postgres, migrations e seeders

- API persiste em Postgres (`modules/platform/postgres`); goose migrations em `api/migrations/`.
- `cmd/migrate up` e serviço Docker `justgui_migrate` antes da API/worker.
- `cmd/seed --admin` cria admin (`ADMIN_EMAIL`), senha aleatória e envia credenciais via SMTP Hostinger.
- `cmd/seed --demo` popula projetos, blog e CV demo; store memory mantido só para testes.

### Idioma do admin (`languages`)

- Tabela Postgres `languages` (`en`, `pt`, `es`); `admin_users.language_id` FK define o idioma do painel.
- JWT inclui `languageId`/`languageCode`; rotas admin usam `AdminLang` (JWT + fallback `X-Lang`).
- API: `GET /api/admin/languages`, `PATCH /api/admin/me/language` (emite novo token).
- Frontend admin persiste idioma no login e expõe seletor no dashboard (`/admin`).

### Fix env Docker no frontend (login admin)

- Vite lia `PUBLIC_API_URL=http://localhost:8080` baked na imagem Docker (prioridade sobre `.env`).
- `docker-compose` passa `PUBLIC_*` em `environment:`; Dockerfile limpa env público após `yarn build`.
- Login admin mostra mensagem de erro real da API (rede vs credenciais).

### Login dedicado em `/login`

- `/login` é a URL canônica do formulário de admin; `/pt/login` e `/es/login` redirecionam para `/login`.
- `/admin` serve só o dashboard; sessão ausente redireciona no cliente para `/login`.
- Layout auth mínimo (`AuthLayout`) sem header/footer; estilos globais em `login.css` e `admin.css`.
- Catch-all `/admin/*` serve o mesmo `AdminApp` (sem 404 em sub-rotas).

### Detecção de idioma (locale)

- Middleware negocia `Accept-Language` na raiz `/` e redireciona `/en` para `pt`/`es` quando o browser prefere outro idioma (302, sem cookie).
- Cookie `justgui_lang` ao visitar `/{lang}`; seletor no header só com `/en`, `/pt`, `/es` (sem query); nginx repassa `Accept-Language`.
- Fix: home `[lang]/index.astro` usa `Astro.params.lang` (conteúdo seguia em inglês).
- Skills/checklists atualizados: `justgui-frontend-best-practices`, `justgui-accessibility`, `justgui-seo`, `justgui-semantic-html5`, `AGENTS.md`.

## 2026-05-26

### Backend API, blog, admin e fila

- API Go com envelope i18n, token interno nginx, JWT admin, store em memória e fila Asynq/Redis (fallback em memória).
- Arquitetura **DDD + hexagonal** em `api/modules/` (blog com domain/ports/application/adapters; bootstrap em `cmd/api/bootstrap`).
- Blog público (`/api/blog/*`) e CMS admin (`/api/admin/blog/*`); publicar post dispara regeneração de cache CV.
- Worker `cmd/worker`, Redis e serviços Docker atualizados; documentação em `api/README.md`.

### Correções blog, admin e a11y

- `/admin` global (sem idioma); `/pt/admin` e `/es/admin` redirecionam para `/admin`.
- Blog com tokens do design system (contraste WCAG); pa11y CI inclui `/en|pt|es/blog`.
- i18n do blog (UI + tags); links do header na home usam `/{lang}#secção`.

### Frontend — blog, admin e integração API

- Rotas `/[lang]/blog` e artigo com layout alinhado ao design system; link Blog no header e footer.
- `apiClient`, `ButtonLoading`, `AlertDialog`, contact form ativo e dashboard `/admin` (login + publish).
- Projects e blog com fallback mock quando a API não está disponível (CI local).

### Skills — padrões visuais do portfolio

- `justgui-frontend-best-practices` atualizado com layout de seções, hero, expertise, accordion, about/contact e navegação por âncoras (após aprovação dos ajustes finos).

### Frontend — seções do portfolio finalizadas

- Hero refatorado em subcomponentes (`hero/*`) com layout full-bleed, ticker de skills e coluna direita alinhada ao header.
- Expertise, Projects, About e Contact implementados com `Section flush`, i18n `en`/`pt`/`es` e CSS por domínio.
- Projects com camada `data/projects` + tipo `Project`; acordeão exclusivo via `<details>` e `projects-accordion.client.ts` (mock até API).
- Contact em tema escuro alinhado ao design system; formulário estruturado e desabilitado até integração.
- Governança: limite de 300 linhas/arquivo e componentização documentados em `justgui-frontend-best-practices`.

### Qualidade e governança de entrega

- Consolidamos a esteira de qualidade do frontend com `yarn ci` como gate único de conclusão.
- A pipeline cobre formatação, lint, typecheck, validação Astro, arquitetura, testes unitários, E2E, acessibilidade, SEO, performance e auditoria de dependências.

### Acessibilidade, semântica e responsividade

- Evoluímos a base para WCAG 2.1 AA com landmarks semânticos, foco visível, reflow e validações automatizadas.
- Ajustamos contraste e seletores de testes para estabilidade em desktop e mobile.

### SEO e marketing readiness

- Estruturamos SEO multilíngue (`en`, `pt`, `es`) com canonical, hreflang, JSON-LD e sitemap.
- Preparamos instrumentação de analytics (GA4/Meta) com controle por ambiente e padrões de rastreamento.

### Docker e CI pragmático

- Corrigimos build do frontend no Docker com envs públicas disponíveis na etapa de build.
- Removemos geração de lixo no repositório durante verificações (artefatos de lighthouse fora da árvore do projeto e limpeza automática).

### Segurança de variáveis de ambiente

- Removemos `.env` do tracking Git; o template permanece em `.env.example`.
- Reforçámos `.gitignore` para variantes `.env.*` (exceto o exemplo).
- O histórico público ainda contém commits antigos com `.env` de desenvolvimento — ver nota de rotação/limpeza no README do monorepo se necessário.

---

## Regra de atualização deste arquivo

Adicionar uma nova entrada quando houver mudança relevante de:

- arquitetura
- pipeline/qualidade
- contrato de produto
- observabilidade/SEO/analytics
- experiência de desenvolvimento
