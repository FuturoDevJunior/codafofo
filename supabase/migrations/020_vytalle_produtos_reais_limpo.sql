-- Migration: 020 - Produtos Reais Vytalle (Versão Limpa)
-- Description: Inserção dos produtos reais com preços PIX da Vytalle

-- Limpar dados existentes
DELETE FROM products;

-- Atualizar categorias permitidas
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check 
  CHECK (category IN ('TOXINA_BOTULINICA', 'BIOESTIMULADOR', 'BIORREMODELADOR', 'SKINBOOSTER', 'PREENCHEDOR', 'FIOS_BIOESTIMULACAO', 'MICROCANULA', 'ENZIMA'));

-- =============================================
-- TOXINAS BOTULÍNICAS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

-- DL BOTOX
('DL BOTOX 50UI', 'dl-botox-50ui', 530.00, 'Toxina botulínica tipo A premium para tratamentos estéticos de alta qualidade. Indicada para rugas de expressão e linhas finas.', ARRAY['/images/products/botox-50ui.jpg'], 'TOXINA_BOTULINICA', 50, 1, true),
('DL BOTOX 100UI', 'dl-botox-100ui', 799.00, 'Toxina botulínica tipo A premium 100UI para tratamentos estéticos avançados. Ideal para áreas extensas e múltiplas aplicações.', ARRAY['/images/products/botox-100ui.jpg'], 'TOXINA_BOTULINICA', 30, 1, true),
('DL BOTOX 200UI', 'dl-botox-200ui', 1400.00, 'Toxina botulínica tipo A premium 200UI para tratamentos estéticos profissionais. Máxima potência para resultados excepcionais.', ARRAY['/images/products/botox-200ui.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),

-- DL BOTULIFT
('DL BOTULIFT 100UI', 'dl-botulift-100ui', 775.00, 'Toxina botulínica especializada para lifting facial. Tecnologia avançada para rejuvenescimento e lifting natural.', ARRAY['/images/products/botulift-100ui.jpg'], 'TOXINA_BOTULINICA', 25, 1, true),
('DL BOTULIFT 150UI', 'dl-botulift-150ui', 940.00, 'Toxina botulínica para lifting facial 150UI. Concentração ideal para tratamentos de rejuvenescimento extensivos.', ARRAY['/images/products/botulift-150ui.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),
('DL BOTULIFT 200UI', 'dl-botulift-200ui', 1245.00, 'Toxina botulínica para lifting facial 200UI. Máxima concentração para tratamentos de rejuvenescimento profissionais.', ARRAY['/images/products/botulift-200ui.jpg'], 'TOXINA_BOTULINICA', 15, 1, true),

-- DL BOTULIM
('DL BOTULIM 50UI', 'dl-botulim-50ui', 499.00, 'Toxina botulínica tipo A com excelente custo-benefício. Eficácia comprovada para tratamentos estéticos básicos.', ARRAY['/images/products/botulim-50ui.jpg'], 'TOXINA_BOTULINICA', 40, 1, true),
('DL BOTULIM 100UI', 'dl-botulim-100ui', 649.00, 'Toxina botulínica tipo A 100UI com ótimo custo-benefício. Ideal para clínicas que buscam qualidade e economia.', ARRAY['/images/products/botulim-100ui.jpg'], 'TOXINA_BOTULINICA', 35, 1, true),
('DL BOTULIM 200UI', 'dl-botulim-200ui', 1065.00, 'Toxina botulínica tipo A 200UI econômica. Concentração elevada com excelente relação custo-benefício.', ARRAY['/images/products/botulim-200ui.jpg'], 'TOXINA_BOTULINICA', 25, 1, true),

-- DL DYSPORT
('DL DYSPORT 300UI', 'dl-dysport-300ui', 959.00, 'Toxina botulínica Dysport 300UI. Tecnologia europeia com difusão otimizada para resultados naturais.', ARRAY['/images/products/dysport-300ui.jpg'], 'TOXINA_BOTULINICA', 20, 1, true),
('DL DYSPORT 500UI', 'dl-dysport-500ui', 1349.00, 'Toxina botulínica Dysport 500UI. Alta concentração com tecnologia avançada para tratamentos profissionais.', ARRAY['/images/products/dysport-500ui.jpg'], 'TOXINA_BOTULINICA', 15, 1, true),

-- DL NABOTA
('DL NABOTA 100UI', 'dl-nabota-100ui', 620.00, 'Toxina botulínica coreana Nabota 100UI. Tecnologia asiática com alta pureza e eficácia comprovada.', ARRAY['/images/products/nabota-100ui.jpg'], 'TOXINA_BOTULINICA', 30, 1, true),

-- DL XEOMIN
('DL XEOMIN 100UI', 'dl-xeomin-100ui', 620.00, 'Toxina botulínica alemã Xeomin 100UI. Proteína pura sem complexantes para resultados precisos.', ARRAY['/images/products/xeomin-100ui.jpg'], 'TOXINA_BOTULINICA', 25, 1, true);

-- =============================================
-- BIOESTIMULADORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL ELLANSE M', 'dl-ellanse-m', 1199.00, 'Bioestimulador de colágeno Ellanse M com duração média. Estimula a produção natural de colágeno para rejuvenescimento facial.', ARRAY['/images/products/ellanse-m.jpg'], 'BIOESTIMULADOR', 15, 1, true),
('DL ELLANSE S', 'dl-ellanse-s', 1020.00, 'Bioestimulador de colágeno Ellanse S com duração curta. Ideal para quem busca resultados naturais e graduais.', ARRAY['/images/products/ellanse-s.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL HARMONYCA 2ML', 'dl-harmonyca-2ml', 1850.00, 'Bioestimulador híbrido Harmonyca 2ML. Combina ácido hialurônico com microesferas de hidroxiapatita de cálcio.', ARRAY['/images/products/harmonyca-2ml.jpg'], 'BIOESTIMULADOR', 10, 1, true),
('DL HIALUROX BIO 1ML', 'dl-hialurox-bio-1ml', 379.00, 'Bioestimulador com ácido hialurônico Hialurox Bio 1ML. Hidratação profunda e estímulo de colágeno.', ARRAY['/images/products/hialurox-bio-1ml.jpg'], 'BIOESTIMULADOR', 50, 1, true),
('DL NUTRIEX CIENTIFIC', 'dl-nutriex-cientific', 310.00, 'Bioestimulador nutricional Nutriex Científic. Complexo vitamínico e mineral para revitalização celular.', ARRAY['/images/products/nutriex-cientific.jpg'], 'BIOESTIMULADOR', 40, 1, true),
('DL RADIESSE DUO 1.5CC', 'dl-radiesse-duo-1-5cc', 770.00, 'Bioestimulador Radiesse Duo 1.5CC com hidroxiapatita de cálcio. Estimulação de colágeno e preenchimento imediato.', ARRAY['/images/products/radiesse-duo-1-5cc.jpg'], 'BIOESTIMULADOR', 25, 1, true),
('DL RADIESSE DUO 3.0CC', 'dl-radiesse-duo-3-0cc', 1320.00, 'Bioestimulador Radiesse Duo 3.0CC para grandes volumes. Ideal para tratamentos corporais e faciais extensos.', ARRAY['/images/products/radiesse-duo-3-0cc.jpg'], 'BIOESTIMULADOR', 15, 1, true),
('DL RADIESSE PLUS LIDO', 'dl-radiesse-plus-lido', 770.00, 'Bioestimulador Radiesse Plus com lidocaína. Máximo conforto durante aplicação com anestésico incorporado.', ARRAY['/images/products/radiesse-plus-lido.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL RENNOVA DIAMOND INTENSE', 'dl-rennova-diamond-intense', 499.00, 'Bioestimulador Rennova Diamond Intense com tecnologia avançada. Rejuvenescimento intenso e duradouro.', ARRAY['/images/products/rennova-diamond-intense.jpg'], 'BIOESTIMULADOR', 30, 1, true),
('DL RENNOVA ELLEVA 150MG', 'dl-rennova-elleva-150mg', 599.00, 'Bioestimulador Rennova Elleva 150mg com poli-L-láctico. Estimulação gradual e natural de colágeno.', ARRAY['/images/products/rennova-elleva-150mg.jpg'], 'BIOESTIMULADOR', 25, 1, true),
('DL RENNOVA ELLEVA 210MG', 'dl-rennova-elleva-210mg', 799.00, 'Bioestimulador Rennova Elleva 210mg alta concentração. Máxima estimulação de colágeno para resultados profissionais.', ARRAY['/images/products/rennova-elleva-210mg.jpg'], 'BIOESTIMULADOR', 20, 1, true),
('DL RENNOVA ELLEVA X 630MG', 'dl-rennova-elleva-x-630mg', 2320.00, 'Bioestimulador Rennova Elleva X 630mg concentração máxima. Para tratamentos corporais e faciais de grande extensão.', ARRAY['/images/products/rennova-elleva-x-630mg.jpg'], 'BIOESTIMULADOR', 10, 1, true),
('DL SCULPTRA 2 FRASCOS', 'dl-sculptra-2-frascos', 2149.00, 'Bioestimulador Sculptra kit com 2 frascos. Poli-L-láctico premium para rejuvenescimento facial profundo.', ARRAY['/images/products/sculptra-2-frascos.jpg'], 'BIOESTIMULADOR', 8, 1, true);

-- =============================================
-- BIOREMODELADORES (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL BIO EXO PLUS (EXOSSOMOS PDRN HIALURONICO) 7ML', 'dl-bio-exo-plus-7ml', 359.00, 'Bioremodelador Bio Exo Plus com exossomos, PDRN e ácido hialurônico. Regeneração celular avançada em 7ML.', ARRAY['/images/products/bio-exo-plus-7ml.jpg'], 'BIORREMODELADOR', 30, 1, true),
('DL EVO PDRN TRIPLE 1 VIAL 3ML', 'dl-evo-pdrn-triple-1-vial-3ml', 229.00, 'Bioremodelador Evo PDRN Triple 1 vial 3ML. Regeneração tecidual com polideoxirribonucleotídeo.', ARRAY['/images/products/evo-pdrn-triple-1-vial.jpg'], 'BIORREMODELADOR', 40, 1, true),
('DL EVO PDRN TRIPLE 5 VIALS 3ML', 'dl-evo-pdrn-triple-5-vials-3ml', 970.00, 'Bioremodelador Evo PDRN Triple kit 5 vials 3ML. Tratamento completo para regeneração tecidual intensiva.', ARRAY['/images/products/evo-pdrn-triple-5-vials.jpg'], 'BIORREMODELADOR', 15, 1, true),
('DL PROPHILO 2ML', 'dl-prophilo-2ml', 889.00, 'Bioremodelador Prophilo 2ML com ácido hialurônico híbrido. Remodelação e hidratação profunda da pele.', ARRAY['/images/products/prophilo-2ml.jpg'], 'BIORREMODELADOR', 20, 1, true),
('DL REJUVITAL PDRN 5 VIALS 3ML', 'dl-rejuvital-pdrn-5-vials-3ml', 749.00, 'Bioremodelador Rejuvital PDRN kit 5 vials 3ML. Regeneração celular avançada com polideoxirribonucleotídeo.', ARRAY['/images/products/rejuvital-pdrn-5-vials.jpg'], 'BIORREMODELADOR', 18, 1, true);

-- =============================================
-- SKINBOOSTERS (Preços PIX)
-- =============================================
INSERT INTO products (name, slug, price, description, images, category, stock, supplier_id, active) VALUES

('DL HIALUROX SKIN PLUS 3 VIALS 4ML', 'dl-hialurox-skin-plus-3-vials-4ml', 299.00, 'Skinbooster Hialurox Skin Plus kit 3 vials 4ML. Hidratação profunda e luminosidade para a pele.', ARRAY['/images/products/hialurox-skin-plus-3-vials.jpg'], 'SKINBOOSTER', 35, 1, true),
('DL RESTYLANE VITAL 1ML', 'dl-restylane-vital-1ml', 320.00, 'Skinbooster Restylane Vital 1ML. Ácido hialurônico para hidratação e melhora da qualidade da pele.', ARRAY['/images/products/restylane-vital-1ml.jpg'], 'SKINBOOSTER', 30, 1, true),
('DL SAYPHA RICH', 'dl-saypha-rich', 199.00, 'Skinbooster Saypha Rich com ácido hialurônico. Hidratação intensa e revitalização da pele com excelente custo-benefício.', ARRAY['/images/products/saypha-rich.jpg'], 'SKINBOOSTER', 45, 1, true);

-- Continua na próxima migração com preenchedores, fios, microcânulas e enzimas...