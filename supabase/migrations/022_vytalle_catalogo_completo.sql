-- Migration: 022 - Catálogo Completo Vytalle
-- Description: Catálogo completo com todos os produtos e preços PIX
-- Data: 2025-07-21

-- Limpar dados existentes
DELETE FROM products;

-- =============================================
-- TOXINAS BOTULÍNICAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- DL BOTOX
('DL BOTOX 50UI', 'dl-botox-50ui', 530.00, 'Toxina botulínica tipo A premium para tratamentos estéticos de alta qualidade. Indicada para rugas de expressão e linhas finas.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 50, 1, true),
('DL BOTOX 100UI', 'dl-botox-100ui', 799.00, 'Toxina botulínica tipo A premium 100UI para tratamentos estéticos avançados. Ideal para áreas extensas e múltiplas aplicações.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 30, 1, true),
('DL BOTOX 200UI', 'dl-botox-200ui', 1400.00, 'Toxina botulínica tipo A premium 200UI para tratamentos estéticos profissionais. Máxima potência para resultados excepcionais.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),

-- DL BOTULIFT
('DL BOTULIFT 100UI', 'dl-botulift-100ui', 775.00, 'Toxina botulínica especializada para lifting facial. Tecnologia avançada para rejuvenescimento e lifting natural.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 25, 1, true),
('DL BOTULIFT 150UI', 'dl-botulift-150ui', 940.00, 'Toxina botulínica para lifting facial 150UI. Concentração ideal para tratamentos de rejuvenescimento extensivos.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),
('DL BOTULIFT 200UI', 'dl-botulift-200ui', 1245.00, 'Toxina botulínica para lifting facial 200UI. Máxima concentração para tratamentos de rejuvenescimento profissionais.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 15, 1, true),

-- DL BOTULIM
('DL BOTULIM 50UI', 'dl-botulim-50ui', 499.00, 'Toxina botulínica tipo A com excelente custo-benefício. Eficácia comprovada para tratamentos estéticos básicos.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 40, 1, true),
('DL BOTULIM 100UI', 'dl-botulim-100ui', 649.00, 'Toxina botulínica tipo A 100UI com ótimo custo-benefício. Ideal para clínicas que buscam qualidade e economia.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 35, 1, true),
('DL BOTULIM 200UI', 'dl-botulim-200ui', 1065.00, 'Toxina botulínica tipo A 200UI econômica. Concentração elevada com excelente relação custo-benefício.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 25, 1, true),

-- DL DYSPORT
('DL DYSPORT 300UI', 'dl-dysport-300ui', 959.00, 'Toxina botulínica Dysport 300UI. Tecnologia europeia com difusão otimizada para resultados naturais.', ARRAY['/images/products/dysport-medical.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),
('DL DYSPORT 500UI', 'dl-dysport-500ui', 1349.00, 'Toxina botulínica Dysport 500UI. Alta concentração com tecnologia avançada para tratamentos profissionais.', ARRAY['/images/products/dysport-medical.jpg'], 'TOXINA_BOTULINICA', 15, 1, true),

-- DL NABOTA
('DL NABOTA 100UI', 'dl-nabota-100ui', 620.00, 'Toxina botulínica coreana Nabota 100UI. Tecnologia asiática com alta pureza e eficácia comprovada.', ARRAY['/images/products/botox-medical.jpg'], 'TOXINA_BOTULINICA', 30, 1, true),

-- DL XEOMIN
('DL XEOMIN 100UI', 'dl-xeomin-100ui', 620.00, 'Toxina botulínica alemã Xeomin 100UI. Proteína pura sem complexantes para resultados precisos.', ARRAY['/images/products/xeomin-medical.jpg'], 'TOXINA_BOTULINICA', 25, 1, true);

-- =============================================
-- BIOESTIMULADORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL ELLANSE M', 'dl-ellanse-m', 1199.00, 'Bioestimulador de colágeno Ellanse M com duração média. Estimula a produção natural de colágeno para rejuvenescimento facial.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 15, 1, true),
('DL ELLANSE S', 'dl-ellanse-s', 1020.00, 'Bioestimulador de colágeno Ellanse S com duração curta. Ideal para quem busca resultados naturais e graduais.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL HARMONYCA 2ML', 'dl-harmonyca-2ml', 1850.00, 'Bioestimulador híbrido Harmonyca 2ML. Combina ácido hialurônico com microesferas de hidroxiapatita de cálcio.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 10, 1, true),
('DL HIALUROX BIO 1ML', 'dl-hialurox-bio-1ml', 379.00, 'Bioestimulador com ácido hialurônico Hialurox Bio 1ML. Hidratação profunda e estímulo de colágeno.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 50, 1, true),
('DL NUTRIEX CIENTIFIC', 'dl-nutriex-cientific', 310.00, 'Bioestimulador nutricional Nutriex Científic. Complexo vitamínico e mineral para revitalização celular.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 40, 1, true),
('DL RADIESSE DUO 1.5CC', 'dl-radiesse-duo-1-5cc', 770.00, 'Bioestimulador Radiesse Duo 1.5CC com hidroxiapatita de cálcio. Estimulação de colágeno e preenchimento imediato.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 25, 1, true),
('DL RADIESSE DUO 3.0CC', 'dl-radiesse-duo-3-0cc', 1320.00, 'Bioestimulador Radiesse Duo 3.0CC para grandes volumes. Ideal para tratamentos corporais e faciais extensos.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 15, 1, true),
('DL RADIESSE PLUS LIDO', 'dl-radiesse-plus-lido', 770.00, 'Bioestimulador Radiesse Plus com lidocaína. Máximo conforto durante aplicação com anestésico incorporado.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL RENNOVA DIAMOND INTENSE', 'dl-rennova-diamond-intense', 499.00, 'Bioestimulador Rennova Diamond Intense com tecnologia avançada. Rejuvenescimento intenso e duradouro.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 30, 1, true),
('DL RENNOVA ELLEVA 150MG', 'dl-rennova-elleva-150mg', 599.00, 'Bioestimulador Rennova Elleva 150mg com poli-L-láctico. Estimulação gradual e natural de colágeno.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 25, 1, true),
('DL RENNOVA ELLEVA 210MG', 'dl-rennova-elleva-210mg', 799.00, 'Bioestimulador Rennova Elleva 210mg alta concentração. Máxima estimulação de colágeno para resultados profissionais.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL RENNOVA ELLEVA X 630MG', 'dl-rennova-elleva-x-630mg', 2320.00, 'Bioestimulador Rennova Elleva X 630mg concentração máxima. Para tratamentos corporais e faciais de grande extensão.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 10, 1, true),
('DL SCULPTRA 2 FRASCOS', 'dl-sculptra-2-frascos', 2149.00, 'Bioestimulador Sculptra kit com 2 frascos. Poli-L-láctico premium para rejuvenescimento facial profundo.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIOESTIMULADOR', 8, 1, true);

-- =============================================
-- BIOREMODELADORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL BIO EXO PLUS (EXOSSOMOS PDRN HIALURONICO) 7ML', 'dl-bio-exo-plus-7ml', 359.00, 'Bioremodelador Bio Exo Plus com exossomos, PDRN e ácido hialurônico. Regeneração celular avançada em 7ML.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIORREMODELADOR', 30, 1, true),
('DL EVO PDRN TRIPLE 1 VIAL 3ML', 'dl-evo-pdrn-triple-1-vial-3ml', 229.00, 'Bioremodelador Evo PDRN Triple 1 vial 3ML. Regeneração tecidual com polideoxirribonucleotídeo.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIORREMODELADOR', 40, 1, true),
('DL EVO PDRN TRIPLE 5 VIALS 3ML', 'dl-evo-pdrn-triple-5-vials-3ml', 970.00, 'Bioremodelador Evo PDRN Triple kit 5 vials 3ML. Tratamento completo para regeneração tecidual intensiva.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIORREMODELADOR', 15, 1, true),
('DL PROPHILO 2ML', 'dl-prophilo-2ml', 889.00, 'Bioremodelador Prophilo 2ML com ácido hialurônico híbrido. Remodelação e hidratação profunda da pele.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIORREMODELADOR', 20, 1, true),
('DL REJUVITAL PDRN 5 VIALS 3ML', 'dl-rejuvital-pdrn-5-vials-3ml', 749.00, 'Bioremodelador Rejuvital PDRN kit 5 vials 3ML. Regeneração celular avançada com polideoxirribonucleotídeo.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'BIORREMODELADOR', 18, 1, true);

-- =============================================
-- SKINBOOSTERS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL HIALUROX SKIN PLUS 3 VIALS 4ML', 'dl-hialurox-skin-plus-3-vials-4ml', 299.00, 'Skinbooster Hialurox Skin Plus kit 3 vials 4ML. Hidratação profunda e luminosidade para a pele.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'SKINBOOSTER', 35, 1, true),
('DL RESTYLANE VITAL 1ML', 'dl-restylane-vital-1ml', 320.00, 'Skinbooster Restylane Vital 1ML. Ácido hialurônico para hidratação e melhora da qualidade da pele.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'SKINBOOSTER', 30, 1, true),
('DL SAYPHA RICH', 'dl-saypha-rich', 199.00, 'Skinbooster Saypha Rich com ácido hialurônico. Hidratação intensa e revitalização da pele com excelente custo-benefício.', ARRAY['/images/products/bioestimulador-medical.jpg'], 'SKINBOOSTER', 45, 1, true);

-- =============================================
-- PREENCHEDORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- BELOTERO
('DL BELOTERO BALANCE LIDO', 'dl-belotero-balance-lido', 265.00, 'Preenchedor Belotero Balance com lidocaína para rugas finas. Tecnologia Cohesive Polydensified Matrix.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL BELOTERO INTENSE LIDO', 'dl-belotero-intense-lido', 275.00, 'Preenchedor Belotero Intense com lidocaína para rugas moderadas. Maior densidade para resultados duradouros.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL BELOTERO VOLUME LIDO', 'dl-belotero-volume-lido', 525.00, 'Preenchedor Belotero Volume com lidocaína para restauração de volume facial. Alta viscosidade para resultados profissionais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),

-- BIO LIFT
('DL BIO LIFT 24MG', 'dl-bio-lift-24mg', 179.00, 'Preenchedor Bio Lift 24mg com ácido hialurônico reticulado. Lifting natural e revitalização facial.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 50, 1, true),

-- BIOGELIS
('DL BIOGELIS FINE LINES 2ML', 'dl-biogelis-fine-lines-2ml', 460.00, 'Preenchedor Biogelis Fine Lines 2ML para linhas finas. Ácido hialurônico específico para rugas superficiais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL BIOGELIS GLOBAL 2ML', 'dl-biogelis-global-2ml', 499.00, 'Preenchedor Biogelis Global 2ML para uso geral. Versatilidade e qualidade para diversos tratamentos.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL BIOGELIS VOLUME 2ML', 'dl-biogelis-volume-2ml', 499.00, 'Preenchedor Biogelis Volume 2ML para restauração volumétrica. Densidade ideal para projeção facial.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL BIOGELIS VOLUMAX 2ML', 'dl-biogelis-volumax-2ml', 699.00, 'Preenchedor Biogelis Volumax 2ML alta densidade. Máximo volume e projeção para tratamentos profissionais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 20, 1, true),

-- NEURAMIS
('DL NEURAMIS DEEP', 'dl-neuramis-deep', 199.00, 'Preenchedor Neuramis Deep para rugas profundas. Ácido hialurônico coreano com excelente custo-benefício.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 45, 1, true),
('DL NEURAMIS LIDOCAINE', 'dl-neuramis-lidocaine', 199.00, 'Preenchedor Neuramis com lidocaína para máximo conforto. Aplicação indolor com resultados naturais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 45, 1, true),
('DL NEURAMIS VOLUME', 'dl-neuramis-volume', 199.00, 'Preenchedor Neuramis Volume para restauração facial. Densidade otimizada para projeção volumétrica.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),

-- PERFECTHA
('DL PERFECTHA SUBSKIN', 'dl-perfectha-subskin', 765.00, 'Preenchedor Perfectha Subskin para camadas profundas. Tecnologia francesa premium para resultados excepcionais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 20, 1, true),

-- RENNOVA
('DL RENNOVA BODY 3ML', 'dl-rennova-body-3ml', 345.00, 'Preenchedor Rennova Body 3ML para tratamentos corporais. Volume ideal para aplicações em grandes áreas.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RENNOVA DEEP LINE LIDO', 'dl-rennova-deep-line-lido', 275.00, 'Preenchedor Rennova Deep Line com lidocaína. Específico para rugas profundas e sulcos acentuados.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL RENNOVA FILL', 'dl-rennova-fill', 199.00, 'Preenchedor Rennova Fill básico. Qualidade nacional com excelente relação custo-benefício.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 50, 1, true),
('DL RENNOVA FILL LIDO', 'dl-rennova-fill-lido', 217.00, 'Preenchedor Rennova Fill com lidocaína. Conforto durante aplicação com resultados naturais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 45, 1, true),
('DL RENNOVA LIFT', 'dl-rennova-lift', 215.00, 'Preenchedor Rennova Lift para efeito lifting. Densidade específica para sustentação e projeção facial.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL RENNOVA LIFT LIDO', 'dl-rennova-lift-lido', 225.00, 'Preenchedor Rennova Lift com lidocaína. Efeito lifting com máximo conforto durante aplicação.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL RENNOVA LIFT PLUS LIDO', 'dl-rennova-lift-plus-lido', 285.00, 'Preenchedor Rennova Lift Plus com lidocaína. Versão aprimorada para lifting facial avançado.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RENNOVA LIFT SHAPE 2ML', 'dl-rennova-lift-shape-2ml', 349.00, 'Preenchedor Rennova Lift Shape 2ML. Contorno e definição facial com volume duplo.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RENNOVA ULTRA VOLUME LIDO 1ML', 'dl-rennova-ultra-volume-lido-1ml', 285.00, 'Preenchedor Rennova Ultra Volume com lidocaína 1ML. Máxima densidade para volume intenso.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RENNOVA ULTRA VOLUME LIDO 2ML', 'dl-rennova-ultra-volume-lido-2ml', 460.00, 'Preenchedor Rennova Ultra Volume com lidocaína 2ML. Volume duplo para tratamentos extensos.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 20, 1, true),

-- RESTYLANE
('DL RESTYLANE DEFYNE 1ML', 'dl-restylane-defyne-1ml', 420.00, 'Preenchedor Restylane Defyne 1ML para definição facial. Tecnologia XpresHAn para resultados naturais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RESTYLANE GEL', 'dl-restylane-gel', 285.00, 'Preenchedor Restylane Gel clássico. Qualidade sueca premium para tratamentos estéticos profissionais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 35, 1, true),
('DL RESTYLANE KYSSE 1ML', 'dl-restylane-kysse-1ml', 420.00, 'Preenchedor Restylane Kysse 1ML para lábios. Tecnologia OBT para resultados naturais e duradouros.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RESTYLANE LYFT SEM LIDO', 'dl-restylane-lyft-sem-lido', 358.00, 'Preenchedor Restylane Lyft sem lidocaína. Volume e sustentação para contorno facial profissional.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL RESTYLANE REFYNE 1ML', 'dl-restylane-refyne-1ml', 299.00, 'Preenchedor Restylane Refyne 1ML para movimentos naturais. Flexibilidade e expressão facial preservada.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL RESTYLANE VOLYME 2ML', 'dl-restylane-volyme-2ml', 720.00, 'Preenchedor Restylane Volyme 2ML para grandes volumes. Restauração facial completa com tecnologia sueca.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 15, 1, true),

-- SAYPHA
('DL SAYPHA FILLER SEM LIDO', 'dl-saypha-filler-sem-lido', 210.00, 'Preenchedor Saypha Filler sem lidocaína. Qualidade francesa com ácido hialurônico puro.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL SAYPHA FILLER LIDO', 'dl-saypha-filler-lido', 220.00, 'Preenchedor Saypha Filler com lidocaína. Conforto durante aplicação com tecnologia francesa.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 40, 1, true),
('DL SAYPHA VOLUME PLUS LIDO', 'dl-saypha-volume-plus-lido', 249.00, 'Preenchedor Saypha Volume Plus com lidocaína. Versão volumétrica para restauração facial profissional.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),

-- SINGDERM
('DL SINGDERM 10ML', 'dl-singderm-10ml', 1100.00, 'Preenchedor Singderm 10ML volume profissional. Ideal para clínicas com alta demanda de tratamentos.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 10, 1, true),
('DL SINGDERM 2ML', 'dl-singderm-2ml', 350.00, 'Preenchedor Singderm 2ML. Tecnologia chinesa com qualidade internacional para diversos tratamentos.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),

-- YVORE
('DL YVORE CLASSIC PLUS', 'dl-yvore-classic-plus', 285.00, 'Preenchedor Yvoire Classic Plus. Tecnologia coreana avançada para resultados naturais e duradouros.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 30, 1, true),
('DL YVORE CONTOUR', 'dl-yvore-contour', 299.00, 'Preenchedor Yvoire Contour para definição facial. Densidade específica para contorno e estruturação.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true),
('DL YVORE VOLUME PLUS', 'dl-yvore-volume-plus', 289.00, 'Preenchedor Yvoire Volume Plus para restauração volumétrica. Tecnologia coreana para resultados profissionais.', ARRAY['/images/products/preenchedor-medical.jpg'], 'PREENCHEDOR', 25, 1, true);

-- =============================================
-- FIOS BIO ESTIMULAÇÃO (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- APRIL BRIDE
('DL APRIL BRIDE 18GX100MMX160MM ESPICULADO PACK 4 FIOS', 'dl-april-bride-18gx100mmx160mm-espiculado-pack-4-fios', 380.00, 'Fios April Bride 18G espiculados pack 4 unidades. Bioestimulação intensiva com espículas para máximo estímulo de colágeno.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),
('DL APRIL BRIDE 19GX100MMX160MM ESPICULADO PACK 4 FIOS', 'dl-april-bride-19gx100mmx160mm-espiculado-pack-4-fios', 380.00, 'Fios April Bride 19G espiculados pack 4 unidades. Calibre otimizado para bioestimulação facial e corporal.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),
('DL APRIL BRIDE 29GX40MMX50MM PACK 10 UN', 'dl-april-bride-29gx40mmx50mm-pack-10-un', 165.00, 'Fios April Bride 29G pack 10 unidades. Calibre fino para áreas delicadas e tratamentos precisos.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 30, 1, true),
('DL APRIL BRIDE FILLER 21GX38MMX50MM PACK 4 FIOS', 'dl-april-bride-filler-21gx38mmx50mm-pack-4-fios', 360.00, 'Fios April Bride Filler 21G pack 4 fios. Combinação de preenchimento e bioestimulação em um só produto.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),
('DL APRIL BRIDE FILLER 21GX60MMX80MM PACK 4 FIOS', 'dl-april-bride-filler-21gx60mmx80mm-pack-4-fios', 360.00, 'Fios April Bride Filler 21G pack 4 fios. Versão estendida para tratamentos de maior extensão.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),

-- BIOFILS
('DL BIOFILS LISO AGULHADO 30GX25MMX30MM PACK 10 UN', 'dl-biofils-liso-agulhado-30gx25mmx30mm-pack-10-un', 240.00, 'Fios Biofils lisos agulhados 30G pack 10 unidades. Calibre ultrafino para bioestimulação suave e precisa.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 35, 1, true),
('DL BIOFILS 19GX100MMX170MM ESPICULADO PACK 4UN', 'dl-biofils-19gx100mmx170mm-espiculado-pack-4un', 349.00, 'Fios Biofils 19G espiculados pack 4 unidades. Bioestimulação intensiva com tecnologia nacional.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 20, 1, true),
('DL BIOFILS 23GX38MMX50MM FILLER PACK 4UN', 'dl-biofils-23gx38mmx50mm-filler-pack-4un', 349.00, 'Fios Biofils Filler 23G pack 4 unidades. Combinação perfeita de preenchimento e estimulação de colágeno.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 25, 1, true),

-- ITHREAD
('DL ITHREAD 21GX38MMX50MM FILLER PACK 20UN', 'dl-ithread-21gx38mmx50mm-filler-pack-20un', 1838.00, 'Fios iThread Filler 21G pack 20 unidades. Kit profissional para clínicas com alta demanda.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 10, 1, true),
('DL ITHREAD 21GX60MMX90MM FILLER PACK 20UN', 'dl-ithread-21gx60mmx90mm-filler-pack-20un', 1838.00, 'Fios iThread Filler 21G estendidos pack 20 unidades. Versão longa para tratamentos extensivos.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 10, 1, true),
('DL ITHREAD 29GX38MM AGULHADO PACK 20UN', 'dl-ithread-29gx38mm-agulhado-pack-20un', 460.00, 'Fios iThread 29G agulhados pack 20 unidades. Calibre fino para bioestimulação delicada em grande quantidade.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 15, 1, true),
('DL ITHREAD 30GX25MM AGULHADO PACK 20UN', 'dl-ithread-30gx25mm-agulhado-pack-20un', 460.00, 'Fios iThread 30G agulhados pack 20 unidades. Ultrafinos para bioestimulação facial precisa.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 15, 1, true),
('DL ITHREAD ESPICULADO 19GX100X160MM PACK 20UN', 'dl-ithread-espiculado-19gx100x160mm-pack-20un', 1820.00, 'Fios iThread espiculados 19G pack 20 unidades. Kit profissional para bioestimulação intensiva.', ARRAY['/images/products/fio-medical.jpg'], 'FIOS_BIOESTIMULACAO', 8, 1, true);

-- =============================================
-- MICRO CÂNULAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL MICROCÂNULA PRO DEEP (22GX50MM)', 'dl-microcanula-pro-deep-22gx50mm', 15.00, 'Microcânula Pro Deep 22G x 50mm. Aplicação profunda com máxima precisão e mínimo trauma tecidual.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 100, 1, true),
('DL MICROCÂNULA PRO DEEP (25GX50MM)', 'dl-microcanula-pro-deep-25gx50mm', 15.00, 'Microcânula Pro Deep 25G x 50mm. Calibre fino para aplicações delicadas e precisas.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 100, 1, true),
('DL MICROCÂNULA PRO DEEP (22GX70MM)', 'dl-microcanula-pro-deep-22gx70mm', 15.00, 'Microcânula Pro Deep 22G x 70mm. Versão estendida para tratamentos de maior alcance.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 80, 1, true),
('DL MICROCÂNULA PRO DEEP (18GX100MM)', 'dl-microcanula-pro-deep-18gx100mm', 18.00, 'Microcânula Pro Deep 18G x 100mm. Calibre robusto para volumes maiores e aplicações extensas.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 60, 1, true),
('DL MICROCÂNULA PRO DEEP (18GX70MM)', 'dl-microcanula-pro-deep-18gx70mm', 18.00, 'Microcânula Pro Deep 18G x 70mm. Equilíbrio perfeito entre calibre e comprimento para versatilidade.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 80, 1, true),
('DL MICROCÂNULA PRO DEEP (25GX38MM)', 'dl-microcanula-pro-deep-25gx38mm', 15.00, 'Microcânula Pro Deep 25G x 38mm. Calibre fino e comprimento otimizado para áreas delicadas.', ARRAY['/images/products/microcanula-medical.jpg'], 'MICROCANULA', 120, 1, true);

-- =============================================
-- ENZIMAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL HIALURONIDASE 3 VIALS 2.000 UTR', 'dl-hialuronidase-3-vials-2000-utr', 170.00, 'Hialuronidase 3 vials 2.000 UTR. Enzima para dissolução de ácido hialurônico em procedimentos de correção e emergência.', ARRAY['/images/products/enzima-medical.jpg'], 'ENZIMA', 25, 1, true);