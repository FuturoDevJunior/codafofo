-- Seed oficial para FIOS BIOESTIMULAÇÃO (dados reais da planilha)
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Fio Bioestimulação';

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
    'DL APRIL BRIDE 18GX100MMX160MM ESPICULADO PACK 4 FIOS',
    'dl-april-bride-18gx100mmx160mm-espiculado-pack-4-fios',
    'Fio Bioestimulação',
    396,
    396,
    380,
    4,
    15.84,
    TRUE,
    NOW()
),
(
    'DL APRIL BRIDE 19GX100MMX160MM ESPICULADO PACK 4 FIOS',
    'dl-april-bride-19gx100mmx160mm-espiculado-pack-4-fios',
    'Fio Bioestimulação',
    396,
    396,
    380,
    4,
    15.84,
    TRUE,
    NOW()
),
(
    'DL APRIL BRIDE 29GX40MMX50MM PACK 10 UN',
    'dl-april-bride-29gx40mmx50mm-pack-10-un',
    'Fio Bioestimulação',
    180,
    180,
    165,
    4,
    7.20,
    TRUE,
    NOW()
),
(
    'DL APRIL BRIDE FILLER 21GX38MMX50MM PACK 4 FIOS',
    'dl-april-bride-filler-21gx38mmx50mm-pack-4-fios',
    'Fio Bioestimulação',
    375,
    375,
    360,
    4,
    15.00,
    TRUE,
    NOW()
),
(
    'DL APRIL BRIDE FILLER 21GX60MMX80MM PACK 4 FIOX',
    'dl-april-bride-filler-21gx60mmx80mm-pack-4-fiox',
    'Fio Bioestimulação',
    375,
    375,
    360,
    4,
    15.00,
    TRUE,
    NOW()
),
(
    'DL BIOFILS LISO AGULHADO 30GX25MMX30MM PACK 10 UN',
    'dl-biofils-liso-agulhado-30gx25mmx30mm-pack-10-un',
    'Fio Bioestimulação',
    260,
    260,
    240,
    4,
    10.40,
    TRUE,
    NOW()
),
(
    'DL BIOFILS 19GX100MMX170MM ESPICULADO PACK 4UN',
    'dl-biofils-19gx100mmx170mm-espiculado-pack-4un',
    'Fio Bioestimulação',
    375,
    375,
    349,
    4,
    15.00,
    TRUE,
    NOW()
),
(
    'DL BIOFILS 23GX38MMX50MM FILLER PACK 4UN',
    'dl-biofils-23gx38mmx50mm-filler-pack-4un',
    'Fio Bioestimulação',
    375,
    375,
    349,
    4,
    15.00,
    TRUE,
    NOW()
),
(
    'DL ITHREAD 21GX38MMX50MM FILLER PACK 20UN',
    'dl-ithread-21gx38mmx50mm-filler-pack-20un',
    'Fio Bioestimulação',
    1969,
    1969,
    1838,
    4,
    78.76,
    TRUE,
    NOW()
),
(
    'DL ITHREAD 21GX60MMX90MM FILLER PACK 20UN',
    'dl-ithread-21gx60mmx90mm-filler-pack-20un',
    'Fio Bioestimulação',
    1969,
    1969,
    1838,
    4,
    78.76,
    TRUE,
    NOW()
),
(
    'DL ITHREAD 29GX38MM AGULHADO PACK 20UN',
    'dl-ithread-29gx38mm-agulhado-pack-20un',
    'Fio Bioestimulação',
    499,
    499,
    460,
    4,
    19.96,
    TRUE,
    NOW()
),
(
    'DL ITHREAD 30GX25MM AGULHADO PACK 20UN',
    'dl-ithread-30gx25mm-agulhado-pack-20un',
    'Fio Bioestimulação',
    499,
    499,
    460,
    4,
    19.96,
    TRUE,
    NOW()
),
(
    'DL ITHREAD ESPICULADO 19GX100X160MM PACK 20UN',
    'dl-ithread-espiculado-19gx100x160mm-pack-20un',
    'Fio Bioestimulação',
    1899,
    1899,
    1820,
    4,
    75.96,
    TRUE,
    NOW()
);