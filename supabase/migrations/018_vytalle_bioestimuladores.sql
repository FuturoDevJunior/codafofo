-- Migração/seed padronizada para BIOESTIMULADORES (Vytalle)
DELETE FROM PRODUCTS;

DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Bioestimulador';

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
    'DL ELLANSE M',
    'dl-ellanse-m',
    'Bioestimulador',
    1149,
    1149,
    1199,
    3,
    34.47,
    TRUE,
    NOW()
),
(
    'DL ELLANSE S',
    'dl-ellanse-s',
    'Bioestimulador',
    965,
    965,
    999,
    3,
    28.95,
    TRUE,
    NOW()
),
(
    'DL HIALUROX BIO 1ML',
    'dl-hialurox-bio-1ml',
    'Bioestimulador',
    350,
    350,
    399,
    3,
    10.50,
    TRUE,
    NOW()
),
(
    'DL NUTRIEX CIENTIFIC',
    'dl-nutriex-cientific',
    'Bioestimulador',
    310,
    310,
    335,
    3,
    9.30,
    TRUE,
    NOW()
),
(
    'DL RADIESSE DUO 1.5CC',
    'dl-radiesse-duo-1-5cc',
    'Bioestimulador',
    770,
    770,
    799,
    3,
    23.10,
    TRUE,
    NOW()
),
(
    'DL RADIESSE DUO 3.0 CC',
    'dl-radiesse-duo-3-0cc',
    'Bioestimulador',
    1320,
    1320,
    1362,
    3,
    39.60,
    TRUE,
    NOW()
),
(
    'DL RADIESSE PLUS LIDO',
    'dl-radiesse-plus-lido',
    'Bioestimulador',
    770,
    770,
    779,
    3,
    23.10,
    TRUE,
    NOW()
),
(
    'DL RENNOVA DIAMOND INTENSE',
    'dl-rennova-diamond-intense',
    'Bioestimulador',
    499,
    499,
    519,
    3,
    14.97,
    TRUE,
    NOW()
),
(
    'DL RENNOVA ELLEVA 150MG',
    'dl-rennova-elleva-150mg',
    'Bioestimulador',
    569,
    569,
    599,
    3,
    17.07,
    TRUE,
    NOW()
),
(
    'DL RENNOVA ELLEVA 210MG',
    'dl-rennova-elleva-210mg',
    'Bioestimulador',
    799,
    799,
    835,
    3,
    23.97,
    TRUE,
    NOW()
),
(
    'DL RENNOVA ELLEVA X 630MG',
    'dl-rennova-elleva-x-630mg',
    'Bioestimulador',
    2270,
    2270,
    2349,
    3,
    68.10,
    TRUE,
    NOW()
),
(
    'DL SCULPTRA 2 FRASCOS',
    'dl-sculptra-2-frascos',
    'Bioestimulador',
    2149,
    2149,
    2289,
    3,
    64.47,
    TRUE,
    NOW()
);