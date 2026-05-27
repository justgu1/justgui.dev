# justgui.dev

Monorepo do site [justgui.dev](https://github.com/justgu1/justgui.dev).

## Ambiente local

```bash
cp .env.example .env
# edite .env apenas na sua máquina — nunca faça commit deste ficheiro
```

Documentação do frontend: [frontend/README.md](frontend/README.md).

## `.env` e histórico Git

O `.env` **não** está na branch `main` atual, mas commits antigos num repositório **público** chegaram a incluí-lo. Qualquer pessoa com clone pode ver esses commits (`git show a1682db:.env`).

**O que vazou (só valores de desenvolvimento):** `DB_PASSWORD=postgres`, portas locais e URLs `PUBLIC_*` (já públicas por desenho no Astro).

**Se alguma vez colocou segredos reais no `.env` versionado:** rode credenciais (DB, GA4, Meta Pixel, etc.).

**Para apagar o ficheiro de todo o histórico** (requer `force push` e coordenação com quem clona o repo):

```bash
# requer: pip install git-filter-repo  (ou equivalente)
git filter-repo --path .env --invert-paths --force
git push origin --force --all
```

Depois do push, peça a colaboradores um clone limpo ou `git fetch --all && git reset --hard origin/main`.
