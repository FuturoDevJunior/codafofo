-- Seed oficial para MICROCÂNULAS (dados reais da planilha)
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Microcânula';

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
    'DL MICROCÂNULA PRO DEEP (22GX50MM)',
    'dl-microcanula-pro-deep-22gx50mm',
    'Microcânula',
    15,
    15,
    17,
    5,
    0.75,
    TRUE,
    NOW()
),
(
    'DL MICROCÂNULA PRO DEEP (25GX50MM)',
    'dl-microcanula-pro-deep-25gx50mm',
    'Microcânula',
    15,
    15,
    17,
    5,
    0.75,
    TRUE,
    NOW()
),
(
    'DL MICROCÂNULA PRO DEEP (22GX70MM)',
    'dl-microcanula-pro-deep-22gx70mm',
    'Microcânula',
    15,
    15,
    17,
    5,
    0.75,
    TRUE,
    NOW()
),
(
    'DL MICROCÂNULA PRO DEEP (18GX100MM)',
    'dl-microcanula-pro-deep-18gx100mm',
    'Microcânula',
    18,
    18,
    20,
    5,
    0.90,
    TRUE,
    NOW()
),
(
    'DL MICROCÂNULA PRO DEEP (18GX70MM)',
    'dl-microcanula-pro-deep-18gx70mm',
    'Microcânula',
    18,
    18,
    20,
    5,
    0.90,
    TRUE,
    NOW()
),
(
    'DL MICROCÂNULA PRO DEEP (25GX38MM)',
    'dl-microcanula-pro-deep-25gx38mm',
    'Microcânula',
    15,
    15,
    17,
    5,
    0.75,
    TRUE,
    NOW()
);

-- Seed oficial para ENZIMAS (dados reais da planilha)
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Enzima';

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
    'DL HILAURONIDASE 3 VIALS 2.000 UTR',
    'dl-hialuronidase-3-vials-2000-utr',
    'Enzima',
    170,
    170,
    180,
    5,
    9.00,
    TRUE,
    NOW()
);