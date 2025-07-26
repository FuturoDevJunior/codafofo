-- Migração/seed padronizada para BIOREMODELADORES (Vytalle)
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Bioremodelador';

INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    CATEGORY,
    PRICE_PIX,
    PRICE_PRAZO,
    CARD_PRICE,
    COMMISSION_PERCENT,
    COMMISSION_VALUE,
    ACTIVE,
    CREATED_AT
) VALUES (
    'DL BIO EXO PLUS (EXOSSOMOS PDRN HIALURONICO) 7ML',
    'dl-bio-exo-plus-7ml',
    'Bioremodelador',
    330,
    363,
    359,
    5,
    16.50,
    TRUE,
    NOW()
),
(
    'DL EVO PDRN TRIPLE 1 VIAL 3ML',
    'dl-evo-pdrn-triple-3ml',
    'Bioremodelador',
    229,
    252,
    245,
    5,
    11.45,
    TRUE,
    NOW()
),
(
    'DL PROPHILO 2ML',
    'dl-prophilo-2ml',
    'Bioremodelador',
    889,
    978,
    916,
    5,
    44.45,
    TRUE,
    NOW()
),
(
    'DL REJUVITAL PDRN 5 VIALS 3ML',
    'dl-rejuvital-pdrn-5-vials',
    'Bioremodelador',
    749,
    824,
    799,
    5,
    37.45,
    TRUE,
    NOW()
);

-- Seeds para Biorremodeladores
INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    PRICE_PIX,
    PRICE_PRAZO,
    CARD_PRICE,
    COMMISSION_PERCENT,
    COMMISSION_VALUE,
    DESCRIPTION,
    IMAGES,
    CATEGORY,
    STOCK,
    DISCOUNT_PERCENT,
    CURRENCY
) VALUES (
    'Biorremodelador Profhilo 2ml',
    'biorremodelador-profhilo-2ml',
    2100.00,
    2310.00,
    0,
    0,
    0,
    'Biorremodelador Profhilo para rejuvenescimento global. Indicado para face, pescoço e mãos. Duração: 6-12 meses.',
    ARRAY['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800&h=600&fit=crop'],
    'Bioremodelador',
    10,
    0,
    'BRL'
),
(
    'Biorremodelador NucleoFill 2ml',
    'biorremodelador-nucleofill-2ml',
    1900.00,
    2090.00,
    0,
    0,
    0,
    'Biorremodelador NucleoFill para bioestimulação e hidratação profunda. Duração: 6-12 meses.',
    ARRAY['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop'],
    'Bioremodelador',
    8,
    0,
    'BRL'
);