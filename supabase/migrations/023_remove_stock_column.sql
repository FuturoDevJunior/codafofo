-- ====================================================
-- MIGRAÇÃO 023: REMOÇÃO COMPLETA DO CONTROLE DE ESTOQUE
-- ====================================================
-- 
-- Remove todas as referências a estoque do banco de dados
-- Adaptação para modelo REPRESENTANTE COMERCIAL
--

-- 1. Remover trigger de verificação de estoque
DROP TRIGGER IF EXISTS TRG_CHECK_STOCK ON PRODUCTS;

-- 2. Remover função de verificação de estoque
DROP FUNCTION IF EXISTS CHECK_STOCK();

-- 3. Remover coluna de estoque da tabela produtos
ALTER TABLE PRODUCTS 
DROP COLUMN IF EXISTS STOCK;

-- 4. Comentário de auditoria
COMMENT ON TABLE PRODUCTS IS 'Tabela de produtos - Modelo representante comercial sem controle de estoque físico. Produtos sempre disponíveis sob consulta.';

-- 5. Inserir registro de auditoria da mudança
INSERT INTO AUDITS (
    TABLE_NAME,
    ACTION,
    DESCRIPTION,
    METADATA,
    CREATED_AT
) VALUES (
    'PRODUCTS',
    'SCHEMA_CHANGE',
    'Remoção completa do controle de estoque - Adaptação para modelo representante comercial',
    '{
        "migration": "023_remove_stock_column",
        "changes": [
            "Removed STOCK column",
            "Removed CHECK_STOCK function", 
            "Removed TRG_CHECK_STOCK trigger"
        ],
        "business_model": "sales_representative",
        "products_availability": "always_available_on_demand"
    }'::jsonb,
    CURRENT_TIMESTAMP
);