# Escopo Técnico — **Catálogo & Pedido WhatsApp** – Vytalle Estética (Versão 1.0)

> **Data:** 19 jul 2025
> **Contexto:** Vytalle Estética & Viscosuplementação oferece tratamentos faciais e corporais de alta performance com as principais marcas de toxina botulínica (Botox®, Dysport®, Xeomin®) e aplicações de visco-supletação para alívio de dores articulares. Perfil Instagram: *@vytalle.estetica*.

---

## 1 · Objetivo

Entregar um **Catálogo Web/PWA** mobile-first que:

1. Exiba **produtos/serviços** (Botox®, Dysport®, Xeomin®, Visco-supl.), com foto, nome e preço.
2. Permita ao cliente montar um **carrinho** de procedimentos.
3. Gere automaticamente:

   * **Pedido via WhatsApp** para contato imediato com Vytalle.
   * **Nota PDF** pronta para envio ao fornecedor.

## 2 · Público‑Alvo e Contexto de Uso

* **Persona:** Pacientes em busca de estética avançada e alívio de dores articulares.
* **Jornada:** Cliente navega pelo catálogo → escolhe serviços → envia pedido/consulta direto no WhatsApp.

---

## 3 · Requisitos Funcionais (RF)

| Código | Descrição |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF01   | Lista de **serviços** com imagem (ex.: frasco, região facial), nome (ex.: Botox® 50U), preço unitário e categoria (Botox, Visco). |
| RF02   | Página detalhe: até 5 fotos, descrição resumida (benefícios, duração), input **quantidade** e botão **Adicionar ao Carrinho**. |
| RF03   | **Carrinho persistente** (IndexedDB) exibindo itens, qty, subtotal e total. |
| RF04   | **Checkout**:<br>• Envia para WhatsApp Vytalle mensagem com template dinâmico (itens, qty, total, saudação regional).<br>• Gera e salva **Nota PDF** (logo, endereço, tabela itens, total). |
| RF05   | **Admin** (pós-lançamento): CRUD de serviços via Supabase Dashboard. |
| RF06   | Otimização de imagens (<1 MB) e SEO (title, meta tags, OG). |
| RF07   | PWA: instalável, cache offline do catálogo. |

---

## 4 · Requisitos Não Funcionais (RNF)

| Código | Descrição |
| ------ | ----------------------------------------------------------- |
| RNF01  | Performance: LCP ≤2 s em 3G; Lighthouse ≥90. |
| RNF02  | Disponibilidade: 99 % uptime (Vercel + Supabase Free Tier). |
| RNF03  | Custo Zero até 50 k pageviews e 1 k pedidos via free tiers. |
| RNF04  | Segurança: HTTPS, CSP, auth hashed (bcrypt) no Admin. |
| RNF05  | Acessibilidade: WCAG 2.2 AA. |

---

## 5 · Arquitetura & Ferramentas

```
[Cliente]⇆CDN⇆[Next.js @ Vercel]⇆[Supabase RPC Functions]
    │                     │                    │
    │                     └─ EdgeFunction /checkout ➜ WhatsApp API (cliente)
    │                                           └─ PDFGen Worker ➜ Storage ➜ WhatsApp API (fornecedor)
    └─ Service Worker (PWA)
```

* **Frontend:** Next.js 14 + Tailwind CSS + Zustand
* **Backend:** Supabase Edge Functions (Deno/TS) para checkout & PDF
* **DB & Storage:** Supabase Postgres + Storage
* **PDF:** `pdf-lib`
* **Mensageria:** WhatsApp Cloud API
* **Deploy:** Vercel & GitHub Actions

---

## 6 · Modelagem de Dados

```
Product(
  id, name, slug, price, description, images[], category, active
)
Order(
  id, customer_name, customer_phone, items JSONB, total, pdf_url, created_at
)
```

* **Categoria**: "Botox", "Dysport", "Xeomin", "Visco-supl."

---

## 7 · Templates WhatsApp

### Cliente → Vytalle

```
Olá {{1}}, tudo bem?
Gostaria de agendar/consultar estes serviços:
{{#each items}}
• {{name}} ×{{qty}} → R${{price}}
{{/each}}
Total: R${{total}}
```

* 1 = Saudação regional (ex.: "Oi, bom dia").

### Vytalle → Fornecedor

```
Pedido Vytalle Estética:
PDF: {{pdf_url}}
Envio até: {{date}}
```

---

## 8 · Passo‑a‑Passo de Implementação (5 dias)

1. **Kickoff & Setup** (GitHub, Vercel, Supabase, ENV)
2. **Dados & Modelagem** (tabelas, policies)
3. **Catálogo (SSR/ISR)**: listagem e página detalhe
4. **Carrinho & Persistência** (Zustand + IndexedDB)
5. **Edge Function Checkout** (orders + WhatsApp + PDF)
6. **PWA & SEO** (manifest, service worker, meta)
7. **Testes & Otimização** (Lighthouse, cross-device)
8. **Deploy & Documentação** (README + manual rápido)

---

## 9 · Contexto de Conteúdo

* **Fotos e descrições** extraídas do Instagram: destaque marcas **Botox®, Dysport®, Xeomin®**, visco-supletação e benefícios (duração média, indicação).
* **Cores e tipografia**: manter identidade leve e profissional (tons neutros com detalhes em lilás/roxo, seguindo feed).
* **Contato direto**: botão WhatsApp fixo na UI, sempre visível.

---

## 10 · Critérios de Sucesso

* ≥90 no Lighthouse (perf. e acess.), PWA reconhecido.
* Checkout WA funcional com template completo.
* PDF legível e link expirando em 24 h.
* Deploy entregando site em `vytalle-estetica.vercel.app`.

---

*Ass.: DevFerreiraG*
*#VytalleCatalog #EsteticaDigital*

