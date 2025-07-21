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