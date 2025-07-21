-- Migração para SKINBOOSTERS da Vytalle Estética

-- Inserir skinboosters
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
    'DL HIALUROX SKIN PLUS 3 VIALS 4ML',
    'dl-hialurox-skin-plus-3-vials-4ml',
    299.00,
    'Skinbooster com ácido hialurônico - pacote 3 vials. Benefícios: hidratação profunda, melhora textura, efeito natural. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Skinbooster',
    35,
    0,
    'BRL'
),
(
    'DL RESTYLANE VITAL 1ML',
    'dl-restylane-vital-1ml',
    320.00,
    'Skinbooster com ácido hialurônico. Benefícios: hidratação profunda, melhora textura, efeito natural. Duração: 6-8 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Skinbooster',
    40,
    0,
    'BRL'
),
(
    'DL SAYPHA RICH',
    'dl-saypha-rich',
    199.00,
    'Skinbooster com ácido hialurônico rico. Benefícios: hidratação intensiva, melhora textura, efeito natural. Duração: 4-6 meses.',
    ARRAY[ 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' ],
    'Skinbooster',
    50,
    0,
    'BRL'
);