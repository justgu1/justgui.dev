# Development Progress

History line do projeto em tom de produto técnico, direto e sem detalhamento excessivo.

## 2026-05-26

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

---

## Regra de atualização deste arquivo

Adicionar uma nova entrada quando houver mudança relevante de:

- arquitetura
- pipeline/qualidade
- contrato de produto
- observabilidade/SEO/analytics
- experiência de desenvolvimento
