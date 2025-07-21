INSERT INTO SUPPLIERS (
    NAME,
    EMAIL,
    PHONE
) VALUES (
    'Fornecedor Botox',
    'botox@supplier.com',
    '5562999999999'
),
(
    'Fornecedor Dysport',
    'dysport@supplier.com',
    '5562888888888'
);

UPDATE PRODUCTS
SET
    SUPPLIER_ID = (
        SELECT
            ID
        FROM
            SUPPLIERS
        WHERE
            NAME = 'Fornecedor Botox'
    )
WHERE
    CATEGORY = 'Botox';

UPDATE PRODUCTS
SET
    STOCK = 50,
    DISCOUNT_PERCENT = 10
WHERE
    NAME LIKE 'Botox%';