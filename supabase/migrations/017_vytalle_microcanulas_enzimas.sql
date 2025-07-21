-- Migração para MICROCÂNULAS E ENZIMAS da Vytalle Estética

-- Inserir microcânulas
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
) VALUES (
    'DL MICROCÂNULA PRO DEEP (22GX50MM)',
    'dl-microcanula-pro-deep-22gx50mm',
    15.00,
    'Microcânula profissional para aplicação profunda. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores e bioestimuladores.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    100,
    0,
    'BRL'
),
(
    'DL MICROCÂNULA PRO DEEP (25GX50MM)',
    'dl-microcanula-pro-deep-25gx50mm',
    15.00,
    'Microcânula profissional para aplicação profunda - calibre fino. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores e bioestimuladores.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    100,
    0,
    'BRL'
),
(
    'DL MICROCÂNULA PRO DEEP (22GX70MM)',
    'dl-microcanula-pro-deep-22gx70mm',
    15.00,
    'Microcânula profissional para aplicação profunda - tamanho maior. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores e bioestimuladores.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    80,
    0,
    'BRL'
),
(
    'DL MICROCÂNULA PRO DEEP (18GX100MM)',
    'dl-microcanula-pro-deep-18gx100mm',
    18.00,
    'Microcânula profissional para aplicação profunda - calibre grosso. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores volumétricos.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    60,
    0,
    'BRL'
),
(
    'DL MICROCÂNULA PRO DEEP (18GX70MM)',
    'dl-microcanula-pro-deep-18gx70mm',
    18.00,
    'Microcânula profissional para aplicação profunda - calibre grosso, tamanho médio. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores volumétricos.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    70,
    0,
    'BRL'
),
(
    'DL MICROCÂNULA PRO DEEP (25GX38MM)',
    'dl-microcanula-pro-deep-25gx38mm',
    15.00,
    'Microcânula profissional para aplicação profunda - calibre fino, tamanho menor. Benefícios: aplicação precisa, menor trauma, resultado natural. Uso: preenchedores e bioestimuladores.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Microcânula',
    90,
    0,
    'BRL'
);

-- Inserir enzimas
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
) VALUES (
    'DL HIALURONIDASE 3 VIALS 2.000 UTR',
    'dl-hialuronidase-3-vials-2000-utr',
    170.00,
    'Enzima hialuronidase para dissolução de ácido hialurônico. Benefícios: dissolve preenchimentos, corrige resultados, tratamento de emergência. Uso: 2000 UTR por vial.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Enzima',
    25,
    0,
    'BRL'
);