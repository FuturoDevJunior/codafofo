-- Seed oficial para SKINBOOSTERS (dados reais da planilha)
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Skinbooster';

INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    CATEGORY,
    PRICE,
    PIX_PRICE,
    CARD_PRICE,
    COMMISSION_PERCENT,
    COMMISSION_VALUE,
    ACTIVE,
    CREATED_AT
) VALUES (
    'DL HIALUROX SKIN PLUS 3 VIALS 4ML',
    'dl-hialurox-skin-plus-3-vials',
    'Skinbooster',
    299,
    299,
    339,
    5,
    14.95,
    TRUE,
    NOW()
),
(
    'DL SAYPHA RICH',
    'dl-saypha-rich',
    'Skinbooster',
    199,
    199,
    210,
    5,
    9.95,
    TRUE,
    NOW()
);