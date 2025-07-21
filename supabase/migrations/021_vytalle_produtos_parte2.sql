-- Migration: 021 - Produtos Vytalle Parte 2 (Preenchedores, Fios, Microcânulas, Enzimas)
-- Description: Continuação dos produtos reais com preços PIX da Vytalle

-- =============================================
-- PREENCHEDORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- Belotero
('DL BELOTERO BALANCE LIDO', 'dl-belotero-balance-lido', 265.00, 'Preenchedor Belotero Balance com lidocaína. Tecnologia CPM para integração natural e resultados suaves.', ARRAY['/images/products/belotero-balance-lido.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL BELOTERO INTENSE LIDO', 'dl-belotero-intense-lido', 275.00, 'Preenchedor Belotero Intense com lidocaína. Maior densidade para rugas moderadas a severas.', ARRAY['/images/products/belotero-intense-lido.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL BELOTERO VOLUME LIDO', 'dl-belotero-volume-lido', 525.00, 'Preenchedor Belotero Volume com lidocaína. Alta viscosidade para volumização e contorno facial.', ARRAY['/images/products/belotero-volume-lido.jpg'], 'PREENCHEDOR', 25, 1, true),

-- Bio Lift
('DL BIO LIFT 24MG', 'dl-bio-lift-24mg', 179.00, 'Preenchedor Bio Lift 24mg com excelente custo-benefício. Ideal para rugas finas e hidratação cutânea.', ARRAY['/images/products/bio-lift-24mg.jpg'], 'PREENCHEDOR', 50, 1, true),

-- Biogelis
('DL BIOGELIS FINE LINES 2ML', 'dl-biogelis-fine-lines-2ml', 460.00, 'Preenchedor Biogelis Fine Lines 2ML. Especializado para rugas finas e linhas de expressão delicadas.', ARRAY['/images/products/biogelis-fine-lines-2ml.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL BIOGELIS GLOBAL 2ML', 'dl-biogelis-global-2ml', 499.00, 'Preenchedor Biogelis Global 2ML. Versátil para múltiplas aplicações faciais e corporais.', ARRAY['/images/products/biogelis-global-2ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL BIOGELIS VOLUME 2ML', 'dl-biogelis-volume-2ml', 499.00, 'Preenchedor Biogelis Volume 2ML. Alta viscosidade para volumização e contorno facial avançado.', ARRAY['/images/products/biogelis-volume-2ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL BIOGELIS VOLUMAX 2ML', 'dl-biogelis-volumax-2ml', 699.00, 'Preenchedor Biogelis VoluMax 2ML. Máxima capacidade de volumização para resultados dramáticos.', ARRAY['/images/products/biogelis-volumax-2ml.jpg'], 'PREENCHEDOR', 20, 1, true),

-- Neuramis
('DL NEURAMIS DEEP', 'dl-neuramis-deep', 199.00, 'Preenchedor Neuramis Deep para rugas profundas. Excelente relação custo-benefício com tecnologia coreana.', ARRAY['/images/products/neuramis-deep.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL NEURAMIS LIDOCAINE', 'dl-neuramis-lidocaine', 199.00, 'Preenchedor Neuramis com lidocaína. Máximo conforto durante aplicação com anestésico incorporado.', ARRAY['/images/products/neuramis-lidocaine.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL NEURAMIS VOLUME', 'dl-neuramis-volume', 199.00, 'Preenchedor Neuramis Volume para volumização facial. Densidade ideal para contorno e projeção.', ARRAY['/images/products/neuramis-volume.jpg'], 'PREENCHEDOR', 35, 1, true),

-- Perfectha
('DL PERFECTHA SUBSKIN', 'dl-perfectha-subskin', 765.00, 'Preenchedor Perfectha Subskin para aplicação profunda. Tecnologia francesa para remodelação facial avançada.', ARRAY['/images/products/perfectha-subskin.jpg'], 'PREENCHEDOR', 20, 1, true),

-- Rennova Preenchedores
('DL RENNOVA BODY 3ML', 'dl-rennova-body-3ml', 345.00, 'Preenchedor Rennova Body 3ML para aplicações corporais. Volume estendido para grandes áreas de tratamento.', ARRAY['/images/products/rennova-body-3ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RENNOVA DEEP LINE LIDO', 'dl-rennova-deep-line-lido', 275.00, 'Preenchedor Rennova Deep Line com lidocaína. Especializado para rugas profundas e sulcos nasogenianos.', ARRAY['/images/products/rennova-deep-line-lido.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RENNOVA FILL', 'dl-rennova-fill', 199.00, 'Preenchedor Rennova Fill básico. Excelente opção para iniciantes com qualidade garantida e preço acessível.', ARRAY['/images/products/rennova-fill.jpg'], 'PREENCHEDOR', 45, 1, true),
('DL RENNOVA FILL LIDO', 'dl-rennova-fill-lido', 217.00, 'Preenchedor Rennova Fill com lidocaína. Versão com anestésico para máximo conforto do paciente.', ARRAY['/images/products/rennova-fill-lido.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL RENNOVA LIFT', 'dl-rennova-lift', 215.00, 'Preenchedor Rennova Lift para lifting facial sutil. Densidade intermediária para resultados naturais.', ARRAY['/images/products/rennova-lift.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL RENNOVA LIFT LIDO', 'dl-rennova-lift-lido', 225.00, 'Preenchedor Rennova Lift com lidocaína. Lifting facial confortável com anestésico incorporado.', ARRAY['/images/products/rennova-lift-lido.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL RENNOVA LIFT PLUS LIDO', 'dl-rennova-lift-plus-lido', 285.00, 'Preenchedor Rennova Lift Plus com lidocaína. Versão premium para lifting facial avançado.', ARRAY['/images/products/rennova-lift-plus-lido.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RENNOVA LIFT SHAPE 2ML', 'dl-rennova-lift-shape-2ml', 349.00, 'Preenchedor Rennova Lift Shape 2ML. Volume duplo para tratamentos extensivos de contorno facial.', ARRAY['/images/products/rennova-lift-shape-2ml.jpg'], 'PREENCHEDOR', 20, 1, true),
('DL RENNOVA ULTRA VOLUME LIDO 1ML', 'dl-rennova-ultra-volume-lido-1ml', 285.00, 'Preenchedor Rennova Ultra Volume com lidocaína 1ML. Máxima projeção para volumização intensa.', ARRAY['/images/products/rennova-ultra-volume-lido-1ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RENNOVA ULTRA VOLUME LIDO 2ML', 'dl-rennova-ultra-volume-lido-2ml', 460.00, 'Preenchedor Rennova Ultra Volume com lidocaína 2ML. Volume duplo para transformações faciais dramáticas.', ARRAY['/images/products/rennova-ultra-volume-lido-2ml.jpg'], 'PREENCHEDOR', 15, 1, true),

-- Restylane
('DL RESTYLANE DEFYNE 1ML', 'dl-restylane-defyne-1ml', 420.00, 'Preenchedor Restylane Defyne 1ML. Tecnologia XpresHan para movimento natural e flexibilidade.', ARRAY['/images/products/restylane-defyne-1ml.jpg'], 'PREENCHEDOR', 20, 1, true),
('DL RESTYLANE GEL', 'dl-restylane-gel', 285.00, 'Preenchedor Restylane Gel clássico. Padrão ouro em ácido hialurônico com eficácia comprovada mundialmente.', ARRAY['/images/products/restylane-gel.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RESTYLANE KYSSE 1ML', 'dl-restylane-kysse-1ml', 420.00, 'Preenchedor Restylane Kysse 1ML especializado para lábios. Textura suave para volume e definição labial.', ARRAY['/images/products/restylane-kysse-1ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RESTYLANE LYFT SEM LIDO', 'dl-restylane-lyft-sem-lido', 358.00, 'Preenchedor Restylane Lyft sem lidocaína. Alta viscosidade para volumização e lifting facial profundo.', ARRAY['/images/products/restylane-lyft-sem-lido.jpg'], 'PREENCHEDOR', 20, 1, true),
('DL RESTYLANE REFYNE 1ML', 'dl-restylane-refyne-1ml', 299.00, 'Preenchedor Restylane Refyne 1ML. Flexibilidade otimizada para expressões naturais e movimento facial.', ARRAY['/images/products/restylane-refyne-1ml.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RESTYLANE VOLYME 2ML', 'dl-restylane-volyme-2ml', 720.00, 'Preenchedor Restylane Volyme 2ML. Volume duplo para remodelação facial completa e contorno avançado.', ARRAY['/images/products/restylane-volyme-2ml.jpg'], 'PREENCHEDOR', 15, 1, true),

-- Saypha
('DL SAYPHA FILLER SEM LIDO', 'dl-saypha-filler-sem-lido', 210.00, 'Preenchedor Saypha sem lidocaína. Tecnologia francesa com excelente custo-benefício e qualidade europeia.', ARRAY['/images/products/saypha-filler-sem-lido.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL SAYPHA FILLER LIDO', 'dl-saypha-filler-lido', 220.00, 'Preenchedor Saypha com lidocaína. Conforto máximo durante aplicação com anestésico incorporado.', ARRAY['/images/products/saypha-filler-lido.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL SAYPHA VOLUME PLUS LIDO', 'dl-saypha-volume-plus-lido', 249.00, 'Preenchedor Saypha Volume Plus com lidocaína. Densidade elevada para volumização e contorno facial.', ARRAY['/images/products/saypha-volume-plus-lido.jpg'], 'PREENCHEDOR', 25, 1, true),

-- Singderm
('DL SINGDERM 10ML', 'dl-singderm-10ml', 1100.00, 'Preenchedor Singderm 10ML grande volume. Ideal para clínicas com alto volume de procedimentos.', ARRAY['/images/products/singderm-10ml.jpg'], 'PREENCHEDOR', 10, 1, true),
('DL SINGDERM 2ML', 'dl-singderm-2ml', 350.00, 'Preenchedor Singderm 2ML. Tecnologia asiática com excelente relação custo-benefício e qualidade.', ARRAY['/images/products/singderm-2ml.jpg'], 'PREENCHEDOR', 20, 1, true),

-- Yvoire
('DL YVOIRE CLASSIC PLUS', 'dl-yvoire-classic-plus', 285.00, 'Preenchedor Yvoire Classic Plus. Tecnologia coreana avançada para tratamentos faciais versáteis.', ARRAY['/images/products/yvoire-classic-plus.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL YVOIRE CONTOUR', 'dl-yvoire-contour', 299.00, 'Preenchedor Yvoire Contour para definição facial. Densidade otimizada para contorno e estruturação.', ARRAY['/images/products/yvoire-contour.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL YVOIRE VOLUME PLUS', 'dl-yvoire-volume-plus', 289.00, 'Preenchedor Yvoire Volume Plus para volumização. Alta capacidade de projeção e durabilidade estendida.', ARRAY['/images/products/yvoire-volume-plus.jpg'], 'PREENCHEDOR', 25, 1, true);

-- =============================================
-- FIOS DE BIOESTIMULAÇÃO (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- April Bride
('DL APRIL BRIDE 18GX100MMX160MM ESPICULADO PACK 4 FIOS', 'dl-april-bride-18g-100mm-160mm-espiculado-pack-4', 380.00, 'Fios April Bride espiculados 18G x 100mm x 160mm pack 4 fios. Bioestimulação com fios absorvíveis premium.', ARRAY['/images/products/april-bride-espiculado-4-fios.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),
('DL APRIL BRIDE 19GX100MMX160MM ESPICULADO PACK 4 FIOS', 'dl-april-bride-19g-100mm-160mm-espiculado-pack-4', 380.00, 'Fios April Bride espiculados 19G x 100mm x 160mm pack 4 fios. Lifting facial com tecnologia coreana avançada.', ARRAY['/images/products/april-bride-19g-espiculado-4-fios.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),
('DL APRIL BRIDE 29GX40MMX50MM PACK 10 UN', 'dl-april-bride-29g-40mm-50mm-pack-10', 165.00, 'Fios April Bride 29G x 40mm x 50mm pack 10 unidades. Fios finos para bioestimulação facial delicada.', ARRAY['/images/products/april-bride-29g-pack-10.jpg'], 'FIOS_BIOESTIMULACAO', 35, 1, true),
('DL APRIL BRIDE FILLER 21GX38MMX50MM PACK 4 FIOS', 'dl-april-bride-filler-21g-38mm-50mm-pack-4', 360.00, 'Fios April Bride Filler 21G x 38mm x 50mm pack 4 fios. Combinação de preenchimento e bioestimulação.', ARRAY['/images/products/april-bride-filler-21g-pack-4.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),
('DL APRIL BRIDE FILLER 21GX60MMX80MM PACK 4 FIOS', 'dl-april-bride-filler-21g-60mm-80mm-pack-4', 360.00, 'Fios April Bride Filler 21G x 60mm x 80mm pack 4 fios. Versão estendida para áreas maiores de tratamento.', ARRAY['/images/products/april-bride-filler-21g-60mm-pack-4.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),

-- Biofils
('DL BIOFILS LISO AGULHADO 30GX25MMX30MM PACK 10 UN', 'dl-biofils-liso-agulhado-30g-25mm-30mm-pack-10', 240.00, 'Fios Biofils lisos agulhados 30G x 25mm x 30mm pack 10 unidades. Bioestimulação suave e natural.', ARRAY['/images/products/biofils-liso-agulhado-pack-10.jpg'], 'FIOS_BIOESTIMULACAO', 30, 1, true),
('DL BIOFILS 19GX100MMX170MM ESPICULADO PACK 4UN', 'dl-biofils-19g-100mm-170mm-espiculado-pack-4', 349.00, 'Fios Biofils espiculados 19G x 100mm x 170mm pack 4 unidades. Lifting facial intenso com fios nacionais.', ARRAY['/images/products/biofils-espiculado-pack-4.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),
('DL BIOFILS 23GX38MMX50MM FILLER PACK 4UN', 'dl-biofils-23g-38mm-50mm-filler-pack-4', 349.00, 'Fios Biofils Filler 23G x 38mm x 50mm pack 4 unidades. Combinação de volume e bioestimulação nacional.', ARRAY['/images/products/biofils-filler-pack-4.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),

-- IThread
('DL ITHREAD 21GX38MMX50MM FILLER PACK 20UN', 'dl-ithread-21g-38mm-50mm-filler-pack-20', 1838.00, 'Fios IThread Filler 21G x 38mm x 50mm pack 20 unidades. Kit profissional para volumização avançada.', ARRAY['/images/products/ithread-filler-21g-pack-20.jpg'], 'FIOS_BIOESTIMULACAO', 10, 1, true),
('DL ITHREAD 21GX60MMX90MM FILLER PACK 20UN', 'dl-ithread-21g-60mm-90mm-filler-pack-20', 1838.00, 'Fios IThread Filler 21G x 60mm x 90mm pack 20 unidades. Volume estendido para tratamentos intensivos.', ARRAY['/images/products/ithread-filler-21g-60mm-pack-20.jpg'], 'FIOS_BIOESTIMULACAO', 10, 1, true),
('DL ITHREAD 29GX38MM AGULHADO PACK 20UN', 'dl-ithread-29g-38mm-agulhado-pack-20', 460.00, 'Fios IThread agulhados 29G x 38mm pack 20 unidades. Bioestimulação facial com fios ultra-finos.', ARRAY['/images/products/ithread-agulhado-29g-pack-20.jpg'], 'FIOS_BIOESTIMULACAO', 15, 1, true),
('DL ITHREAD 30GX25MM AGULHADO PACK 20UN', 'dl-ithread-30g-25mm-agulhado-pack-20', 460.00, 'Fios IThread agulhados 30G x 25mm pack 20 unidades. Versão compacta para áreas delicadas.', ARRAY['/images/products/ithread-agulhado-30g-pack-20.jpg'], 'FIOS_BIOESTIMULACAO', 15, 1, true),
('DL ITHREAD ESPICULADO 19GX100X160MM PACK 20UN', 'dl-ithread-espiculado-19g-100mm-160mm-pack-20', 1820.00, 'Fios IThread espiculados 19G x 100mm x 160mm pack 20 unidades. Kit profissional para lifting facial intenso.', ARRAY['/images/products/ithread-espiculado-19g-pack-20.jpg'], 'FIOS_BIOESTIMULACAO', 8, 1, true);

-- =============================================
-- MICROCÂNULAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL MICROCÂNULA PRO DEEP (22GX50MM)', 'dl-microcanula-pro-deep-22g-50mm', 15.00, 'Microcânula Pro Deep 22G x 50mm. Aplicação precisa e confortável para preenchimentos faciais seguros.', ARRAY['/images/products/microcanula-22g-50mm.jpg'], 'MICROCANULA', 100, 1, true),
('DL MICROCÂNULA PRO DEEP (25GX50MM)', 'dl-microcanula-pro-deep-25g-50mm', 15.00, 'Microcânula Pro Deep 25G x 50mm. Calibre fino para aplicações delicadas e precisas em áreas sensíveis.', ARRAY['/images/products/microcanula-25g-50mm.jpg'], 'MICROCANULA', 100, 1, true),
('DL MICROCÂNULA PRO DEEP (22GX70MM)', 'dl-microcanula-pro-deep-22g-70mm', 15.00, 'Microcânula Pro Deep 22G x 70mm. Comprimento estendido para cobrir maiores áreas de tratamento.', ARRAY['/images/products/microcanula-22g-70mm.jpg'], 'MICROCANULA', 100, 1, true),
('DL MICROCÂNULA PRO DEEP (18GX100MM)', 'dl-microcanula-pro-deep-18g-100mm', 18.00, 'Microcânula Pro Deep 18G x 100mm. Calibre maior para produtos de alta viscosidade e volumes elevados.', ARRAY['/images/products/microcanula-18g-100mm.jpg'], 'MICROCANULA', 80, 1, true),
('DL MICROCÂNULA PRO DEEP (18GX70MM)', 'dl-microcanula-pro-deep-18g-70mm', 18.00, 'Microcânula Pro Deep 18G x 70mm. Versatilidade para diferentes técnicas e produtos de preenchimento.', ARRAY['/images/products/microcanula-18g-70mm.jpg'], 'MICROCANULA', 80, 1, true),
('DL MICROCÂNULA PRO DEEP (25GX38MM)', 'dl-microcanula-pro-deep-25g-38mm', 15.00, 'Microcânula Pro Deep 25G x 38mm. Tamanho compacto para aplicações precisas em áreas pequenas.', ARRAY['/images/products/microcanula-25g-38mm.jpg'], 'MICROCANULA', 100, 1, true);

-- =============================================
-- ENZIMAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL HIALURONIDASE 3 VIALS 2.000 UTR', 'dl-hialuronidase-3-vials-2000-utr', 170.00, 'Hialuronidase 3 vials 2.000 UTR cada. Enzima para reversão de preenchimentos de ácido hialurônico com segurança.', ARRAY['/images/products/hialuronidase-3-vials.jpg'], 'ENZIMA', 40, 1, true);