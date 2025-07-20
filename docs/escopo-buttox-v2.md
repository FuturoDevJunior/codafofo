# Escopo Técnico — **Catálogo & Pedido WhatsApp** – Buttox (Versão 2.0)

## 1 · Objetivo

Construir uma plataforma **mobile‑first** (Web/PWA) onde o representante comercial **Buttox** exibe seus produtos (Renova, Toxina Botoclinica, etc.), o cliente monta um **carrinho**, gera automaticamente um **pedido via WhatsApp** e, paralelamente, o sistema cria uma **nota de compra** (PDF) pronta para envio ao fornecedor.

## 2 · Requisitos Funcionais (RF)

| Código | Descrição |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | Listagem de produtos (nome, foto, preço) com filtro por categoria (Renova, Toxina, Kits, etc.). |
| **RF02** | Página de produto: galeria (≤ 5 fotos), variantes e botão **Adicionar ao Carrinho**. |
| **RF03** | Carrinho persistente (IndexedDB) com quantidade, subtotal e notas adicionais. |
| **RF04** | Checkout que gera dois fluxos simultâneos:<br>• **Cliente → WhatsApp Buttox** com lista resumida;<br>• **Buttox → Fornecedor** com PDF/nota completa. |
| **RF05** | Painel Admin minimalista: CRUD Produtos + visualização de Pedidos (status: novo, enviado fornecedor, concluído). |
| **RF06** | Upload de imagem otimizado (< 1 MB) com compressão automática. |
| **RF07** | PWA instalável e funcional offline (cache catálogo). |
| **RF08** | SEO básico + OG tags. |
| **RF09** | Integração oficial **WhatsApp Cloud API** com templates dinâmicos por região/saudação. |
| **RF10** | Geração automática de **Nota PDF** usando template A4 (logo, endereço, tabela itens, total). |

## 3 · Requisitos Não Funcionais (RNF)

| Código | Descrição |
| ------ | ------------------------------------------------------------------ |
| **RNF01** | **Performance**: LCP ≤ 2 s em 3G; Lighthouse ≥ 90. |
| **RNF02** | **Disponibilidade**: 99 % mensal (Vercel Hobby + Supabase). |
| **RNF03** | **Custo Zero** em free tiers até 50 k pageviews/mês e 1 k pedidos. |
| **RNF04** | **Segurança**: HTTPS, Auth hashed (bcrypt), OWASP mitigado. |
| **RNF05** | **Acessibilidade**: WCAG 2.2 AA. |

## 4 · Arquitetura

```
┌───────────────┐          HTTPS          ┌──────────────┐   Webhook ←─────┐
│   Navegador   │⇆ CDN ⇆ Vercel (Next.js) │ Edge Function │──▶ WA Cliente   │
└───────────────┘                         └──────────────┘                 │
      ▲  ▲                                       │ REST                    │
      │  │                                       ▼                         │
      │  └── Service Worker (PWA)        Supabase RPC ─────────┐           │
      │                                              │        │           │
      ▼                                              ▼        │           │
IndexedDB (Carrinho)                        Postgres & Storage │           │
                                                        │     │           │
                                                        ▼     │           ▼
                                                PDFGen Worker │   WA Fornecedor
                                                              │   (template PDF link)
                                                              └───────────────
```

* **Next.js** gera página estática + hydrata carrinho client‑side.
* **Supabase Edge Function** (Deno) recebe checkout, cria **Order**, chama WhatsApp [cliente] e aciona **PDFGen Worker**.
* **PDFGen Worker** usa `pdf-lib` para renderizar nota e salva em Storage; URL é incorporada na mensagem para fornecedor.

## 5 · Stack

| Camada | Tecnologia | Free? |
| ---------- | ----------------------------------- | ------------------------ |
| Frontend | Next.js 14 + Tailwind CSS + Zustand | Vercel Hobby |
| Backend | Supabase Edge Functions (Deno/TS) | Free (500k inv.) |
| DB | Supabase Postgres (1 GB) | Free |
| Storage | Supabase Storage (1 GB) | Free |
| PDF | `pdf-lib` + `supabase/storage` | Executa na Edge Function |
| Mensageria | WhatsApp Cloud API (1 k conv./mês) | Free |
| CI/CD | GitHub Actions | Free |

## 6 · Modelo de Dados

```
Product(id, name, slug, price, description, images[], active, category)
Cart (client‑side only)
Order(id, customer_name, customer_phone, items JSONB, total, status, pdf_url, created_at)
OrderItem(id, order_id, product_id, quantity, price)
```

## 7 · Templates WhatsApp

### 7.1 Cliente → Buttox

```
Olá {{1}}, tudo bem?
Seguem meus itens:
{{#each items}}
• {{name}} x{{qty}} → R${{price}}
{{/each}}
Total: R${{total}}
```

Parâmetros:
1 = Saudação regional ("Fala aí, parceiro" / "Boa tarde")
`items` = lista dinâmica (máx 10 linhas por template – enviar +msgs se exceder).

### 7.2 Buttox → Fornecedor

```
Pedido gerado pelo representante Buttox.
PDF: {{pdf_url}}
Observações: enviar até {{date}}.
```

`pdf_url` aponta para nota no Storage.

## 8 · Geração da Nota PDF

1. Edge Function chama `generatePdf(order)`.
2. PDF usa template A4 com logo Buttox, endereço, tabela de itens, resumo financeiro e QR Code para visualização online.
3. Arquivo salvo em `storage/notes/{orderId}.pdf`.
4. URL pública (assinada 24 h) embutida na mensagem WhatsApp ao fornecedor.

## 9 · Passo‑a‑Passo de Implementação

### 9.1 Setup (Dia 1)

* Criar repositório GitHub (`buttox-catalog`).
* Provisionar projeto Supabase + Vercel (conectar repo).
* Definir variáveis env: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `WA_TOKEN`, `WA_PHONE_ID`.

### 9.2 Backlog de Sprints (5 dias úteis)

| Dia | Tarefas | Resultados |
| --- | ------------------------------------------- | ------------------------ |
| 1 | Modelo Produto + página catálogo | Lista produtos via SSR |
| 2 | Carrinho client, Zustand, IndexedDB | Adicionar/Remover OK |
| 3 | Edge Function checkout + Order tables | Pedido salvo DB |
| 4 | PDFGen + mensagem WA (cliente & fornecedor) | Links WhatsApp funcionam |
| 5 | PWA, SEO, testes Lighthouse, hand‑off docs | Deploy Prod |

### 9.3 Checklist de Deploy

* [ ] Criar template WA cliente/fornecedor e aguardar aprovação Meta.
* [ ] Inserir domínio ou subdomínio Vercel + SSL.
* [ ] Testar fluxo fim‑a‑fim em sandbox (1 pedido).
* [ ] Gerar backup inicial DB.
* [ ] Entregar manual rápido ao representante.

## 10 · Manual Rápido (Buttox)

1. **Login Admin** (link Supabase Studio) → “Products” → “New”.
2. Preencha **nome, preço** e **foto** (arrastar JPG ≤ 1 MB).
3. Clique **Save & Publish**.
4. Cliente acessa site, monta carrinho e clica **Enviar no WhatsApp**.
5. Você recebe a lista, confirma estoque.
6. O fornecedor recebe automaticamente o PDF da nota – basta confirmar disponibilidade.

## 11 · Critérios de Aceitação

* Carrinho gera mensagem WA correta com ≥ 1 e ≤ 20 itens.
* Nota PDF legível, total correto, QR Code funcional.
* Lighthouse Performance ≥ 90, A11y ≥ 90.
* Fluxo teste sandBox concluído sem erros 500.

