-- Migration para remover tabela suppliers e dependências
-- NOTA: Esta migration pode ser mantida no Git para uso da comunidade,
-- mas deve ser aplicada no ambiente de produção do cliente

-- Remover foreign key constraint do campo supplier_id na tabela products
ALTER TABLE PRODUCTS DROP CONSTRAINT IF EXISTS products_supplier_id_fkey;

-- Remover coluna supplier_id da tabela products
ALTER TABLE PRODUCTS DROP COLUMN IF EXISTS SUPPLIER_ID;

-- Remover índice relacionado
DROP INDEX IF EXISTS IDX_PRODUCTS_SUPPLIER;

-- Remover tabela suppliers
DROP TABLE IF EXISTS SUPPLIERS;