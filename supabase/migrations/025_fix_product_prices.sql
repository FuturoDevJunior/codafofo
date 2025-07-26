-- Correção dos preços dos produtos para valores decimais corretos
-- Baseado na análise da imagem do site

UPDATE PRODUCTS
SET
    PRICE_PIX = 745.00,
    PRICE_PRAZO = 789.00
WHERE
    SLUG = 'dl-botox-100ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 1365.00,
    PRICE_PRAZO = 1399.00
WHERE
    SLUG = 'dl-botox-200ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 489.00,
    PRICE_PRAZO = 525.00
WHERE
    SLUG = 'dl-botox-50ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 775.00,
    PRICE_PRAZO = 791.00
WHERE
    SLUG = 'dl-botulift-100ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 940.00,
    PRICE_PRAZO = 973.00
WHERE
    SLUG = 'dl-botulift-150ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 1245.00,
    PRICE_PRAZO = 1273.00
WHERE
    SLUG = 'dl-botulift-200ui';

UPDATE PRODUCTS
SET
    PRICE_PIX = 649.00,
    PRICE_PRAZO = 689.00
WHERE
    SLUG = 'dl-botulim-100ui';

-- Garantir que todos os preços tenham 2 casas decimais
UPDATE PRODUCTS
SET
    PRICE_PIX = ROUND(
        PRICE_PIX,
        2
    ),
    PRICE_PRAZO = ROUND(
        PRICE_PRAZO,
        2
    )
WHERE
    CATEGORY = 'Toxina Botulínica';