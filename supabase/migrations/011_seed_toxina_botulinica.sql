-- Seed profissional para TOXINA BOTULINICA
DELETE FROM PRODUCTS
WHERE
    CATEGORY = 'Toxina Botulínica';

INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    CATEGORY,
    PRICE_PIX,
    PRICE_PRAZO,
    DESCRIPTION,
    ACTIVE,
    CREATED_AT
) VALUES (
    'DL BOTOX 100UI',
    'dl-botox-100ui',
    'Toxina Botulínica',
    745,
    789,
    'Toxina botulínica tipo A, 100 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTOX 200UI',
    'dl-botox-200ui',
    'Toxina Botulínica',
    1365,
    1399,
    'Toxina botulínica tipo A, 200 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTOX 50UI',
    'dl-botox-50ui',
    'Toxina Botulínica',
    489,
    525,
    'Toxina botulínica tipo A, 50 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIFT 100UI',
    'dl-botulift-100ui',
    'Toxina Botulínica',
    775,
    791,
    'Toxina botulínica tipo A, 100 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIFT 150UI',
    'dl-botulift-150ui',
    'Toxina Botulínica',
    940,
    973,
    'Toxina botulínica tipo A, 150 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIFT 200UI',
    'dl-botulift-200ui',
    'Toxina Botulínica',
    1245,
    1273,
    'Toxina botulínica tipo A, 200 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIM 100UI',
    'dl-botulim-100ui',
    'Toxina Botulínica',
    649,
    689,
    'Toxina botulínica tipo A, 100 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIM 200UI',
    'dl-botulim-200ui',
    'Toxina Botulínica',
    1065,
    1099,
    'Toxina botulínica tipo A, 200 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL BOTULIM 50UI',
    'dl-botulim-50ui',
    'Toxina Botulínica',
    499,
    525,
    'Toxina botulínica tipo A, 50 unidades internacionais',
    TRUE,
    NOW()
),
(
    'DL DYSPORT 300UI',
    'dl-dysport-300ui',
    'Toxina Botulínica',
    990,
    1090,
    'Dysport 300UI: toxina botulínica reconhecida internacionalmente, resultados rápidos e duradouros',
    TRUE,
    NOW()
),
(
    'DL DYSPORT 500UI',
    'dl-dysport-500ui',
    'Toxina Botulínica',
    1359,
    1459,
    'Dysport 500UI: alta performance para tratamentos completos de rejuvenescimento facial',
    TRUE,
    NOW()
),
(
    'DL NABOTA 100UI',
    'dl-nabota-100ui',
    'Toxina Botulínica',
    620,
    649,
    'Nabota 100UI: toxina botulínica premium, indicada para resultados naturais e expressivos',
    TRUE,
    NOW()
),
(
    'DL XEOMIN 100UI',
    'dl-xeomin-100ui',
    'Toxina Botulínica',
    620,
    645,
    'Xeomin 100UI: toxina botulínica sem complexos de proteínas, reduz risco de resistência e alergias',
    TRUE,
    NOW()
);

-- Atualização de descrições e imagens para produtos de toxina botulínica

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Toxina botulínica tipo A, referência mundial em rejuvenescimento facial. Proporciona suavização de rugas e linhas de expressão, com segurança e resultados naturais. Indicado para uso profissional.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-botox-100ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Toxina botulínica de alta concentração, ideal para procedimentos de maior demanda. Resultados previsíveis e duradouros.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-botox-200ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Dose reduzida de toxina botulínica, indicada para retoques e áreas delicadas. Segurança e precisão no rejuvenescimento.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-botox-50ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulift 100UI: toxina botulínica para relaxamento muscular facial, proporcionando efeito lifting natural.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-botulift-100ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulift 150UI: indicado para tratamentos de áreas amplas, com excelente custo-benefício e performance.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-botulift-150ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulift 200UI: máxima potência para procedimentos de toxina botulínica em grandes regiões faciais.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-botulift-200ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulim 100UI: toxina botulínica de alta pureza, indicada para resultados naturais e seguros.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-botulim-100ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulim 200UI: ideal para procedimentos de maior volume, mantendo a qualidade e eficácia.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-botulim-200ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Botulim 50UI: dose ajustada para retoques e aplicações em áreas pequenas.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-botulim-50ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Dysport 300UI: toxina botulínica reconhecida internacionalmente, resultados rápidos e duradouros.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-dysport-300ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Dysport 500UI: alta performance para tratamentos completos de rejuvenescimento facial.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-dysport-500ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Nabota 100UI: toxina botulínica premium, indicada para resultados naturais e expressivos.',
    IMAGES = ARRAY[ 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' ]
WHERE
    SLUG = 'dl-nabota-100ui';

UPDATE PRODUCTS
SET
    DESCRIPTION = 'Xeomin 100UI: toxina botulínica sem complexos de proteínas, reduz risco de resistência e alergias.',
    IMAGES = ARRAY[ 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400' ]
WHERE
    SLUG = 'dl-xeomin-100ui';