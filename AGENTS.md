# AGENTS.md

Este arquivo define as regras obrigatórias para qualquer agente trabalhando neste repositório.

## Escopo

- Aplica-se ao projeto inteiro, com foco principal no frontend em `frontend/`.
- O frontend é um projeto Astro SSR (Node adapter) com i18n (`en`, `pt`, `es`), negociação de locale via middleware (`Accept-Language`, cookie `justgui_lang`, rotas `/en` `/pt` `/es`), SEO, acessibilidade WCAG 2.1 AA e pipeline CI própria.

## Regras obrigatórias

- O agente DEVE respeitar todas as regras do repositório e os checklists em `.cursor/skills/*`.
- O agente DEVE tratar CI como fonte de verdade de qualidade.
- O agente SÓ pode considerar uma tarefa concluída quando o comando abaixo passar sem falhas:

```bash
cd frontend && yarn ci
```

## Se o CI falhar

- O agente DEVE iterar até corrigir as falhas de CI.
- Se houver bloqueio externo real (ex.: dependência de credencial, indisponibilidade de serviço, limitação do ambiente), o agente DEVE documentar claramente o bloqueio e o impacto.

## Documentação obrigatória por mudança

Toda alteração relevante deve atualizar documentação em conjunto:

- `development-progress.md` (history line do produto)
- `frontend/README.md` (quando afetar uso/processo/arquitetura/comandos)
- `AGENTS.md` (quando houver mudança de processo, qualidade, regras ou Definition of Done)

## Checklists de referência

O agente deve usar e respeitar:

- `.cursor/skills/justgui-accessibility/checklist.md`
- `.cursor/skills/justgui-semantic-html5/checklist.md`
- `.cursor/skills/justgui-responsive/checklist.md`
- `.cursor/skills/justgui-seo/checklist.md`
- `.cursor/skills/justgui-marketing-ads/checklist.md`
- `.cursor/skills/justgui-frontend-best-practices/checklist.md`
- `.cursor/skills/justgui-css-best-practices/checklist.md`

## Regra de consistência

Este arquivo deve ser um retrato real do projeto. Se stack, pipeline, processos ou critérios de conclusão mudarem, `AGENTS.md` deve ser atualizado no mesmo ciclo de mudança.
