-- Migração para produtos reais da Vytalle Estética
-- TOXINAS BOTULÍNICAS

-- Limpar produtos existentes
DELETE FROM PRODUCTS
WHERE
    CATEGORY IN ('Botox', 'Dysport', 'Xeomin');

-- Inserir toxinas botulínicas
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
    'DL BOTOX 50UI',
    'dl-botox-50ui',
    530.00,
    'Toxina botulínica tipo A para redução de rugas faciais. Benefícios: aparência lisa e rejuvenescida, trata enxaquecas crônicas, reduz suor excessivo. Duração: 3-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    50,
    0,
    'BRL'
),
(
    'DL BOTOX 100UI',
    'dl-botox-100ui',
    799.00,
    'Dose maior para áreas extensas e rugas profundas. Benefícios: redução profunda de rugas, resultado natural e duradouro. Duração: 3-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    30,
    0,
    'BRL'
),
(
    'DL BOTOX 200UI',
    'dl-botox-200ui',
    1400.00,
    'Tratamento completo para todo o rosto. Benefícios: rejuvenescimento facial completo, redução de rugas em todas as áreas, resultado harmonioso. Duração: 4-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    20,
    0,
    'BRL'
),
(
    'DL BOTULIFT 100UI',
    'dl-botulift-100ui',
    775.00,
    'Toxina botulínica para lifting facial. Benefícios: efeito lifting natural, melhora contorno facial, reduz flacidez. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    25,
    0,
    'BRL'
),
(
    'DL BOTULIFT 150UI',
    'dl-botulift-150ui',
    940.00,
    'Dose maior para lifting facial intensivo. Benefícios: efeito lifting mais pronunciado, melhora significativa do contorno facial. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    15,
    0,
    'BRL'
),
(
    'DL BOTULIFT 200UI',
    'dl-botulift-200ui',
    1245.00,
    'Tratamento completo de lifting facial. Benefícios: lifting facial completo, melhora contorno e definição facial. Duração: 4-5 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    10,
    0,
    'BRL'
),
(
    'DL BOTULIM 50UI',
    'dl-botulim-50ui',
    499.00,
    'Toxina botulínica para redução de rugas finas. Benefícios: efeito suave e natural, ideal para primeiras aplicações. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    40,
    0,
    'BRL'
),
(
    'DL BOTULIM 100UI',
    'dl-botulim-100ui',
    649.00,
    'Dose maior para rugas moderadas. Benefícios: redução efetiva de rugas, resultado natural e duradouro. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    25,
    0,
    'BRL'
),
(
    'DL BOTULIM 200UI',
    'dl-botulim-200ui',
    1065.00,
    'Tratamento completo com Botulim. Benefícios: rejuvenescimento facial completo, redução de rugas em todas as áreas. Duração: 4-5 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    15,
    0,
    'BRL'
),
 
-- DYSPORT
(
    'DL DYSPORT 300UI',
    'dl-dysport-300ui',
    959.00,
    'Toxina botulínica com difusão mais ampla. Benefícios: resultados mais rápidos, efeito natural e suave. Duração: 3-4 meses. Indicado para hiperidrose.',
    ARRAY[ 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Dysport',
    30,
    0,
    'BRL'
),
(
    'DL DYSPORT 500UI',
    'dl-dysport-500ui',
    1349.00,
    'Dose intensiva para resultados mais pronunciados. Benefícios: efeito mais duradouro, cobertura ampla, ideal para casos moderados a severos. Duração: 4-5 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Dysport',
    20,
    0,
    'BRL'
),
 
-- XEOMIN
(
    'DL XEOMIN 100UI',
    'dl-xeomin-100ui',
    620.00,
    'Toxina botulínica pura, sem proteínas complexas. Benefícios: menor risco de resistência, efeito mais preciso e controlado. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Xeomin',
    25,
    0,
    'BRL'
),
 
-- NABOTA
(
    'DL NABOTA 100UI',
    'dl-nabota-100ui',
    620.00,
    'Toxina botulínica coreana de alta qualidade. Benefícios: efeito natural, duradouro e acessível. Duração: 3-4 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Botox',
    35,
    0,
    'BRL'
);