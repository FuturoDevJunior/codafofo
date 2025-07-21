-- Migração para popular produtos de exemplo completos
-- Vytalle Estética - Produtos Premium

-- Limpar produtos existentes para recriar com dados mais completos
DELETE FROM PRODUCTS;

-- Inserir produtos de exemplo completos
INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    PRICE,
    DESCRIPTION,
    IMAGES,
    CATEGORY,
    STOCK,
    DISCOUNT_PERCENT,
    CURRENCY
) VALUES
 -- BOTOX
(
    'Botox® 50U - Toxina Botulínica',
    'botox-50u-toxina-botulinica',
    1200.00,
    'Toxina botulínica tipo A para redução de rugas faciais. Benefícios: aparência lisa e rejuvenescida, trata enxaquecas crônicas, reduz suor excessivo. Duração: 3-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    25,
    0,
    'BRL'
),
(
    'Botox® 100U - Dose Dupla',
    'botox-100u-dose-dupla',
    1950.00,
    'Dose maior para áreas extensas e rugas profundas. Benefícios: redução profunda de rugas, resultado natural e duradouro. Duração: 3-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    15,
    10,
    'BRL'
),
(
    'Botox® 200U - Tratamento Completo',
    'botox-200u-tratamento-completo',
    3200.00,
    'Tratamento completo para todo o rosto. Benefícios: rejuvenescimento facial completo, redução de rugas em todas as áreas, resultado harmonioso. Duração: 4-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    10,
    15,
    'BRL'
),
 
-- DYSPORT
(
    'Dysport® 300U - Difusão Ampliada',
    'dysport-300u-difusao-ampliada',
    1400.00,
    'Toxina botulínica com difusão mais ampla. Benefícios: resultados mais rápidos, efeito natural e suave. Duração: 3-4 meses. Indicado para hiperidrose.',
    ARRAY[ 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Dysport',
    20,
    0,
    'BRL'
),
(
    'Dysport® 500U - Tratamento Intensivo',
    'dysport-500u-tratamento-intensivo',
    2200.00,
    'Dose intensiva para resultados mais pronunciados. Benefícios: efeito mais duradouro, cobertura ampla, ideal para casos moderados a severos. Duração: 4-5 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Dysport',
    12,
    5,
    'BRL'
),
 
-- XEOMIN
(
    'Xeomin® 50U - Toxina Pura',
    'xeomin-50u-toxina-pura',
    900.00,
    'Toxina botulínica pura, sem proteínas complexas. Benefícios: menor risco de resistência, efeito mais preciso e controlado. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Xeomin',
    30,
    0,
    'BRL'
),
(
    'Xeomin® 100U - Dose Dupla Pura',
    'xeomin-100u-dose-dupla-pura',
    1600.00,
    'Dose maior da toxina pura para rugas profundas. Benefícios: efeito puro e duradouro, menor risco de alergias. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Xeomin',
    18,
    8,
    'BRL'
),
 
-- VISCOSUPLEMENTAÇÃO
(
    'Ácido Hialurônico - Hidratação Facial',
    'acido-hialuronico-hidratacao-facial',
    800.00,
    'Ácido hialurônico para hidratação profunda da pele. Benefícios: hidratação intensiva, preenchimento de rugas finas, melhora textura da pele. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Visco-supl.',
    40,
    0,
    'BRL'
),
(
    'Preenchimento Labial - Volume Natural',
    'preenchimento-labial-volume-natural',
    1200.00,
    'Preenchimento labial com ácido hialurônico. Benefícios: volume natural, definição do contorno, melhora proporções faciais. Duração: 8-12 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Visco-supl.',
    25,
    0,
    'BRL'
),
(
    'Viscosuplementação Articular - Joelho',
    'viscosuplementacao-articular-joelho',
    2500.00,
    'Ácido hialurônico para alívio de dores articulares. Benefícios: melhora mobilidade, reduz inflamação, lubrifica articulação. Duração: 6-12 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Visco-supl.',
    8,
    0,
    'BRL'
),
(
    'Preenchimento de Rugas - Ácido Hialurônico',
    'preenchimento-rugas-acido-hialuronico',
    1800.00,
    'Preenchimento de rugas profundas com ácido hialurônico. Benefícios: preenchimento natural, melhora contorno facial, resultado duradouro. Duração: 8-12 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Visco-supl.',
    15,
    10,
    'BRL'
);

-- Atualizar produtos com fornecedores
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
    SUPPLIER_ID = (
        SELECT
            ID
        FROM
            SUPPLIERS
        WHERE
            NAME = 'Fornecedor Dysport'
    )
WHERE
    CATEGORY = 'Dysport';

-- Criar fornecedor para Xeomin e Visco-supl se não existir
INSERT INTO SUPPLIERS (
    NAME,
    EMAIL,
    PHONE
)
    SELECT
        'Fornecedor Xeomin',
        'xeomin@supplier.com',
        '5562777777777'
    WHERE
        NOT EXISTS (
            SELECT
                1
            FROM
                SUPPLIERS
            WHERE
                NAME = 'Fornecedor Xeomin'
        );

INSERT INTO SUPPLIERS (
    NAME,
    EMAIL,
    PHONE
)
    SELECT
        'Fornecedor Visco-supl',
        'visco@supplier.com',
        '5562666666666'
    WHERE
        NOT EXISTS (
            SELECT
                1
            FROM
                SUPPLIERS
            WHERE
                NAME = 'Fornecedor Visco-supl'
        );

-- Atualizar produtos restantes com fornecedores
UPDATE PRODUCTS
SET
    SUPPLIER_ID = (
        SELECT
            ID
        FROM
            SUPPLIERS
        WHERE
            NAME = 'Fornecedor Xeomin'
    )
WHERE
    CATEGORY = 'Xeomin';

UPDATE PRODUCTS
SET
    SUPPLIER_ID = (
        SELECT
            ID
        FROM
            SUPPLIERS
        WHERE
            NAME = 'Fornecedor Visco-supl'
    )
WHERE
    CATEGORY = 'Visco-supl.';