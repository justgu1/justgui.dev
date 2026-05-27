# Development Progress

History line do projeto em tom de produto técnico, direto e sem detalhamento excessivo.

## 2026-05-26

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
