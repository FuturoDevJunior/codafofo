# SCHEMA-DB: Banco de Dados Vytalle Catalog

## products
| Campo            | Tipo         | Descrição                        |
|------------------|--------------|----------------------------------|
| id               | UUID         | PK, identificador único          |
| name             | TEXT         | Nome do produto                  |
| slug             | TEXT         | Slug único (auto)                |
| price            | DECIMAL      | Preço base                       |
| description      | TEXT         | Descrição detalhada              |
| images           | TEXT[]       | URLs das imagens                 |
| category         | TEXT         | Categoria (Botox, Dysport, etc.) |
| active           | BOOLEAN      | Produto ativo?                   |
| created_at       | TIMESTAMP    | Data de criação                  |
| discount_percent | DECIMAL      | % de desconto                    |
| supplier_id      | UUID         | FK suppliers(id)                 |
| views_count      | INTEGER      | Analytics/views                  |
| currency         | TEXT         | Moeda (BRL, USD, etc.)           |

## orders
| Campo            | Tipo         | Descrição                        |
|------------------|--------------|----------------------------------|
| id               | UUID         | PK                               |
| customer_name    | TEXT         | Nome do cliente                  |
| customer_phone   | TEXT         | Telefone do cliente              |
| items            | JSONB        | Lista de produtos (id, qty, etc) |
| total            | DECIMAL      | Total do pedido                  |
| pdf_url          | TEXT         | Link do PDF                      |
| created_at       | TIMESTAMP    | Data do pedido                   |
| status           | TEXT         | Status (pending, confirmed, ...) |
| discount_applied | DECIMAL      | Desconto aplicado                |
| notes            | TEXT         | Observações                      |

## suppliers
| Campo            | Tipo         | Descrição                        |
|------------------|--------------|----------------------------------|
| id               | UUID         | PK                               |
| name             | TEXT         | Nome do fornecedor               |
| email            | TEXT         | Email único                      |
| phone            | TEXT         | Telefone                         |
| address          | TEXT         | Endereço                         |
| created_at       | TIMESTAMP    | Data de cadastro                 |

## audits
| Campo            | Tipo         | Descrição                        |
|------------------|--------------|----------------------------------|
| id               | UUID         | PK                               |
| table_name       | TEXT         | Nome da tabela auditada          |
| record_id        | UUID         | ID do registro                   |
| action           | TEXT         | insert/update/delete             |
| old_data         | JSONB        | Dados antigos                    |
| new_data         | JSONB        | Dados novos                      |
| user_id          | UUID         | Usuário responsável              |
| timestamp        | TIMESTAMP    | Data/hora                        |

## Views
- **popular_products**: name, category, views_count
- **order_summary**: status, count, revenue

## Triggers & Functions
- **generate_slug**: auto-slug em products
- **calc_order_discount**: calcula desconto aplicado
- **audit_changes**: loga inserts/updates/deletes
- **increment_views**: analytics de views_count

## RLS (Row Level Security)
- products: SELECT público, INSERT/UPDATE/DELETE autenticado
- orders: INSERT autenticado, SELECT público
- suppliers: ALL autenticado
- audits: SELECT autenticado

## Exemplo de Query
```sql
-- Produtos ativos (sempre disponíveis sob consulta)
SELECT * FROM products WHERE active = true;

-- Pedidos confirmados do mês
SELECT * FROM orders WHERE status = 'confirmed' AND created_at >= date_trunc('month', now());

-- Top 5 produtos mais vistos
SELECT * FROM popular_products LIMIT 5;

-- Auditoria de updates em produtos
SELECT * FROM audits WHERE table_name = 'products' AND action = 'update';
``` 

## Exemplos de Queries Avançadas

-- Top 5 produtos mais vendidos no mês
SELECT name, SUM((item->>'quantidade')::int) AS total_vendidos
FROM orders, jsonb_array_elements(items) AS item
WHERE status = 'confirmed' AND created_at >= date_trunc('month', now())
GROUP BY name
ORDER BY total_vendidos DESC
LIMIT 5;

-- Resumo de pedidos por status
SELECT status, COUNT(*) AS total, SUM(total) AS receita
FROM orders
GROUP BY status;

## Explicação de Triggers
- **generate_slug**: Gera automaticamente o slug do produto ao inserir/atualizar.
- **calc_order_discount**: Calcula desconto aplicado no pedido.
- **audit_changes**: Loga inserts/updates/deletes para auditoria.
- **increment_views**: Incrementa views_count ao acessar produto.

## Como Testar Policies
- Use Supabase Studio (aba Policies) para simular queries como usuário autenticado e público.
- Exemplo:
```sql
-- Testar SELECT público em products
SET ROLE anon;
SELECT * FROM products;

-- Testar INSERT autenticado
SET ROLE authenticated;
INSERT INTO orders (...);
``` 