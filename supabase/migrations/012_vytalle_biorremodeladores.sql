-- Migração para BIORREMODELADORES da Vytalle Estética

-- Inserir biorremodeladores
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
    'DL BIO EXO PLUS (EXOSSOMOS PDRN HIALURONICO) 7ML',
    'dl-bio-exo-plus-7ml',
    359.00,
    'Biorremodelador com exossomos e PDRN. Benefícios: regeneração celular, melhora textura, efeito antienvelhecimento. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Biorremodelador',
    30,
    0,
    'BRL'
),
(
    'DL EVO PDRN TRIPLE 1 VIAL 3ML',
    'dl-evo-pdrn-triple-1-vial-3ml',
    229.00,
    'Biorremodelador com PDRN triplo. Benefícios: regeneração intensiva, melhora textura, efeito lifting. Duração: 4-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Biorremodelador',
    40,
    0,
    'BRL'
),
(
    'DL EVO PDRN TRIPLE 5 VIALS 3ML',
    'dl-evo-pdrn-triple-5-vials-3ml',
    970.00,
    'Biorremodelador com PDRN triplo - pacote 5 vials. Benefícios: tratamento completo, regeneração intensiva, efeito duradouro. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Biorremodelador',
    15,
    0,
    'BRL'
),
(
    'DL PROPHILO 2ML',
    'dl-prophilo-2ml',
    889.00,
    'Biorremodelador com ácido hialurônico e aminoácidos. Benefícios: hidratação profunda, melhora textura, efeito natural. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Biorremodelador',
    20,
    0,
    'BRL'
),
(
    'DL REJUVITAL PDRN 5 VIALS 3ML',
    'dl-rejuvital-pdrn-5-vials-3ml',
    749.00,
    'Biorremodelador com PDRN - pacote 5 vials. Benefícios: regeneração celular, melhora textura, efeito antienvelhecimento. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Biorremodelador',
    18,
    0,
    'BRL'
);