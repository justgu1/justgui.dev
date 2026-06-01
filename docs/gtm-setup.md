# GTM + GA4 + Meta Ads — justgui.dev

Guia de configuração nos painéis externos. O site só carrega o container GTM; GA4 e Meta Pixel ficam **dentro do GTM**.

## IDs

| Plataforma | Variável / local | Notas |
|------------|------------------|-------|
| Google Tag Manager | `.env` → `PUBLIC_GTM_CONTAINER_ID` | Único ID no site; aparece no HTML (público) |
| Google Analytics 4 | Tag no GTM (Measurement ID) | **Não** vai no `.env` do site |
| Meta Pixel | Tag no GTM (Pixel ID) | **Não** vai no `.env` do site |

Copia os IDs reais dos painéis Google/Meta ao configurar o GTM. Não commites IDs de produção na documentação.

**Não** colar snippets de GA4 (`gtag.js`) nem Meta (`fbq`) no código do site.

---

## 1. Google Tag Manager

Container: valor de `PUBLIC_GTM_CONTAINER_ID` no `.env` de produção

### A. Consent Mode

- *Admin → Container Settings → Enable consent overview*
- O site envia consent default `denied` antes do GTM carregar; ao aceitar cookies no welcome dialog, envia `consent update granted`.

### B. Tag GA4 (base)

- Tipo: **Google Tag**
- Measurement ID: o ID da propriedade GA4 (painel Google Analytics)
- Trigger: **All Pages**
- Consent: requer `analytics_storage`

### C. Tag Meta Pixel (base)

- Tipo: **Facebook Pixel** (galeria GTM)
- Pixel ID: o ID do pixel (Meta Events Manager)
- Event: **PageView**
- Trigger: **All Pages**
- Consent: requer `ad_storage`

### D. Tags de eventos custom

O site envia eventos via `dataLayer.push({ event: '...' })`. Criar trigger **Custom Event** para cada nome e tags GA4 Event + Meta correspondentes:

| Evento dataLayer | Tag GA4 (event name) | Tag Meta |
|------------------|----------------------|----------|
| `form_submit` | `form_submit` | `Lead` |
| `whatsapp_click` | `whatsapp_click` | `Contact` |
| `contact_click` | `contact_click` | `Contact` |
| `email_click` | `email_click` | `Contact` |
| `portfolio_project_click` | `portfolio_project_click` | `ViewContent` |
| `cv_download` | `cv_download` | `CompleteRegistration` |
| `calendly_click` | `calendly_click` | `Schedule` |

Parâmetros opcionais nos cliques: `location`, `project`, `project-name` (via `data-analytics-*`).

### E. Publicar e testar

- GTM **Preview** + [Tag Assistant](https://tagassistant.google.com/)
- Aceitar analytics no welcome dialog antes de validar tags

---

## 2. Google Analytics 4

1. Propriedade GA4 (Measurement ID no painel)
2. *Admin → Events* → marcar como **conversões**:
   - `form_submit`
   - `whatsapp_click`
   - `calendly_click` (quando existir link Calendly)
3. *DebugView*: validar eventos após consent
4. *Admin → Product links → Google Ads*: vincular conta

---

## 3. Meta Events Manager

1. Pixel no Events Manager (Pixel ID no painel)
2. *Test Events* + Meta Pixel Helper após consent
3. Mapeamento de conversões (via tags GTM acima)
4. Audiências remarketing sugeridas:
   - Visitou site nos últimos 30 dias
   - Visitou secção projetos
   - Clicou contato / WhatsApp
   - Não enviou formulário

---

## 4. Google Ads

1. Vincular GA4
2. *Goals → Conversions → Import* do GA4:
   - `form_submit`
   - `whatsapp_click`
   - `calendly_click`
3. URLs de campanha com UTM:

```text
Instagram:  https://justgui.dev/?utm_source=instagram&utm_medium=social&utm_campaign=portfolio
LinkedIn:   https://justgui.dev/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio
Meta Ads:   https://justgui.dev/?utm_source=meta&utm_medium=paid&utm_campaign=lead_gen
```

---

## 5. Deploy em produção

```bash
# GitHub secret (repo justgui): PUBLIC_GTM_CONTAINER_ID=<seu-container>

# VPS /opt/infra-swarm/.env
PUBLIC_GTM_CONTAINER_ID=<seu-container>

cd /opt/infra-swarm
git pull
bash scripts/deploy-stack.sh justgui
```

---

## Eventos no código (referência)

| Evento | Origem |
|--------|--------|
| `contact_click` | Links `#contact` (header, hero) |
| `whatsapp_click` | Links WhatsApp |
| `email_click` | `mailto:` em ContactLinks |
| `form_submit` | Sucesso do formulário de contato |
| `portfolio_project_click` | Links de projetos |
| `cv_download` | Download do CV |
| `calendly_click` | Reservado para futuro link Calendly |

`page_view` é automático via tag GA4 no GTM (All Pages).
