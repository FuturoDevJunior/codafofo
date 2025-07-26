-- Adiciona campos de precificação e comissão à tabela PRODUCTS
ALTER TABLE PRODUCTS
    ADD COLUMN CARD_PRICE DECIMAL(
        10,
        2
    ), ADD COLUMN COMMISSION_PERCENT DECIMAL(
        5,
        2
    ), ADD COLUMN COMMISSION_VALUE DECIMAL(
        10,
        2
    );