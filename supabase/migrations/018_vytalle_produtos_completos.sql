-- Migration: 018 - Atualização dos preços reais Vytalle
-- Description: Atualização dos produtos existentes com preços PIX corretos

-- Atualizar TOXINAS BOTULÍNICAS com preços PIX reais
UPDATE products SET price = 530.00 WHERE slug = 'dl-botox-50ui';
UPDATE products SET price = 799.00 WHERE slug = 'dl-botox-100ui';
UPDATE products SET price = 1400.00 WHERE slug = 'dl-botox-200ui';

-- Inserir novos produtos BOTULIFT que não existem
INSERT INTO products (name, slug, price, description, images, category, stock, discount_percent, currency) VALUES
('DL BOTULIFT 100UI', 'dl-botulift-100ui', 775.00, 'Toxina botulínica especializada para lifting facial. Tecnologia avançada para rejuvenescimento e lifting natural.', 
 ARRAY['/images/products/botulift-100ui.jpg'], 'Botox', 25, 0, 'BRL'),
('DL BOTULIFT 150UI', 'dl-botulift-150ui', 940.00, 'Toxina botulínica para lifting facial 150UI. Concentração ideal para tratamentos de rejuvenescimento extensivos.', 
 ARRAY['/images/products/botulift-150ui.jpg'], 'Botox', 20, 0, 'BRL'),
('DL BOTULIFT 200UI', 'dl-botulift-200ui', 1245.00, 'Toxina botulínica para lifting facial 200UI. Máxima concentração para tratamentos de rejuvenescimento profissionais.', 
 ARRAY['/images/products/botulift-200ui.jpg'], 'Botox', 15, 0, 'BRL'),

-- Inserir novos produtos BOTULIM que não existem  
('DL BOTULIM 50UI', 'dl-botulim-50ui', 499.00, 'Toxina botulínica tipo A com excelente custo-benefício. Eficácia comprovada para tratamentos estéticos básicos.',
 ARRAY['/images/products/botulim-50ui.jpg'], 'Botox', 40, 0, 'BRL'),
('DL BOTULIM 100UI', 'dl-botulim-100ui', 649.00, 'Toxina botulínica tipo A 100UI com ótimo custo-benefício. Ideal para clínicas que buscam qualidade e economia.',
 ARRAY['/images/products/botulim-100ui.jpg'], 'Botox', 35, 0, 'BRL'),
('DL BOTULIM 200UI', 'dl-botulim-200ui', 1065.00, 'Toxina botulínica tipo A 200UI econômica. Concentração elevada com excelente relação custo-benefício.',
 ARRAY['/images/products/botulim-200ui.jpg'], 'Botox', 25, 0, 'BRL'),

-- Inserir produtos DYSPORT que não existem
('DL DYSPORT 300UI', 'dl-dysport-300ui', 959.00, 'Toxina botulínica Dysport 300UI. Tecnologia européia com difusão otimizada para resultados naturais.',
 ARRAY['/images/products/dysport-300ui.jpg'], 'Dysport', 20, 0, 'BRL'),
('DL DYSPORT 500UI', 'dl-dysport-500ui', 1349.00, 'Toxina botulínica Dysport 500UI. Alta concentração com tecnologia avançada para tratamentos profissionais.',
 ARRAY['/images/products/dysport-500ui.jpg'], 'Dysport', 15, 0, 'BRL'),

-- Inserir produtos NABOTA e XEOMIN que não existem
('DL NABOTA 100UI', 'dl-nabota-100ui', 620.00, 'Toxina botulínica coreana Nabota 100UI. Tecnologia asiática com alta pureza e eficácia comprovada.',
 ARRAY['/images/products/nabota-100ui.jpg'], 'Xeomin', 30, 0, 'BRL'),
('DL XEOMIN 100UI', 'dl-xeomin-100ui', 620.00, 'Toxina botulínica alemã Xeomin 100UI. Proteína pura sem complexantes para resultados precisos.',
 ARRAY['/images/products/xeomin-100ui.jpg'], 'Xeomin', 25, 0, 'BRL');

-- Atualizar BIOESTIMULADORES existentes
UPDATE products SET price = 1199.00 WHERE slug = 'dl-ellanse-m';
UPDATE products SET price = 1020.00 WHERE slug = 'dl-ellanse-s';  
UPDATE products SET price = 1850.00 WHERE slug = 'dl-harmonyca-2ml';

-- Inserir novos BIOESTIMULADORES
INSERT INTO products (name, slug, price, description, images, category, stock, discount_percent, currency) VALUES
('DL HIALUROX BIO 1ML', 'dl-hialurox-bio-1ml', 379.00, 'Bioestimulador com ácido hialurônico Hialurox Bio 1ML. Hidratação profunda e estímulo de colágeno.',
 ARRAY['/images/products/hialurox-bio-1ml.jpg'], 'Visco-supl.', 50, 0, 'BRL'),
('DL NUTRIEX CIENTIFIC', 'dl-nutriex-cientific', 310.00, 'Bioestimulador nutricional Nutriex Científic. Complexo vitamínico e mineral para revitalização celular.',
 ARRAY['/images/products/nutriex-cientific.jpg'], 'Visco-supl.', 40, 0, 'BRL'),
('DL RADIESSE DUO 1.5CC', 'dl-radiesse-duo-1-5cc', 770.00, 'Bioestimulador Radiesse Duo 1.5CC com hidroxiapatita de cálcio. Estimulação de colágeno e preenchimento imediato.',
 ARRAY['/images/products/radiesse-duo-1-5cc.jpg'], 'Visco-supl.', 25, 0, 'BRL'),
('DL RADIESSE DUO 3.0CC', 'dl-radiesse-duo-3-0cc', 1320.00, 'Bioestimulador Radiesse Duo 3.0CC para grandes volumes. Ideal para tratamentos corporais e faciais extensos.',
 ARRAY['/images/products/radiesse-duo-3-0cc.jpg'], 'Visco-supl.', 15, 0, 'BRL'),
('DL RADIESSE PLUS LIDO', 'dl-radiesse-plus-lido', 770.00, 'Bioestimulador Radiesse Plus com lidocaína. Máximo conforto durante aplicação com anestésico incorporado.',
 ARRAY['/images/products/radiesse-plus-lido.jpg'], 'Visco-supl.', 20, 0, 'BRL'),
('DL RENNOVA DIAMOND INTENSE', 'dl-rennova-diamond-intense', 499.00, 'Bioestimulador Rennova Diamond Intense com tecnologia avançada. Rejuvenescimento intenso e duradouro.',
 ARRAY['/images/products/rennova-diamond-intense.jpg'], 'Visco-supl.', 30, 0, 'BRL'),
('DL RENNOVA ELLEVA 150MG', 'dl-rennova-elleva-150mg', 599.00, 'Bioestimulador Rennova Elleva 150mg com poli-L-láctico. Estimulação gradual e natural de colágeno.',
 ARRAY['/images/products/rennova-elleva-150mg.jpg'], 'Visco-supl.', 25, 0, 'BRL'),
('DL RENNOVA ELLEVA 210MG', 'dl-rennova-elleva-210mg', 799.00, 'Bioestimulador Rennova Elleva 210mg alta concentração. Máxima estimulação de colágeno para resultados profissionais.',
 ARRAY['/images/products/rennova-elleva-210mg.jpg'], 'Visco-supl.', 20, 0, 'BRL'),
('DL RENNOVA ELLEVA X 630MG', 'dl-rennova-elleva-x-630mg', 2320.00, 'Bioestimulador Rennova Elleva X 630mg concentração máxima. Para tratamentos corporais e faciais de grande extensão.',
 ARRAY['/images/products/rennova-elleva-x-630mg.jpg'], 'Visco-supl.', 10, 0, 'BRL'),
('DL SCULPTRA 2 FRASCOS', 'dl-sculptra-2-frascos', 2149.00, 'Bioestimulador Sculptra kit com 2 frascos. Poli-L-láctico premium para rejuvenescimento facial profundo.',
 ARRAY['/images/products/sculptra-2-frascos.jpg'], 'Visco-supl.', 8, 0, 'BRL');

-- BIOREMODELADORES
INSERT INTO products (name, slug, price, description, images, category, stock, discount_percent, currency) VALUES
('DL BIO EXO PLUS 7ML', 'dl-bio-exo-plus-7ml', 359.00, 'Bioremodelador Bio Exo Plus com exossomos, PDRN e ácido hialurônico. Regeneração celular avançada em 7ML.',
 ARRAY['/images/products/bio-exo-plus-7ml.jpg'], 'Biorremodelador', 30, 0, 'BRL'),
('DL EVO PDRN TRIPLE 1 VIAL', 'dl-evo-pdrn-triple-1-vial', 229.00, 'Bioremodelador Evo PDRN Triple em vial único de 3ML. Polinucleotídeos para regeneração e reparação tecidual.',
 ARRAY['/images/products/evo-pdrn-triple-1-vial.jpg'], 'Biorremodelador', 50, 0, 'BRL'),
('DL EVO PDRN TRIPLE 5 VIALS', 'dl-evo-pdrn-triple-5-vials', 970.00, 'Bioremodelador Evo PDRN Triple kit com 5 viais de 3ML. Tratamento completo de regeneração celular.',
 ARRAY['/images/products/evo-pdrn-triple-5-vials.jpg'], 'Biorremodelador', 20, 0, 'BRL'),
('DL PROPHILO 2ML', 'dl-prophilo-2ml', 889.00, 'Bioremodelador Profhilo 2ML com ácido hialurônico ultra-puro. Bioestimulação e hidratação profunda da pele.',
 ARRAY['/images/products/prophilo-2ml.jpg'], 'Biorremodelador', 15, 0, 'BRL'),
('DL REJUVITAL PDRN 5 VIALS', 'dl-rejuvital-pdrn-5-vials', 749.00, 'Bioremodelador Rejuvital PDRN kit com 5 viais de 3ML. Polinucleotídeos para rejuvenescimento facial intensivo.',
 ARRAY['/images/products/rejuvital-pdrn-5-vials.jpg'], 'Biorremodelador', 25, 0, 'BRL');

-- SKINBOOSTERS  
INSERT INTO products (name, slug, price, description, images, category, stock, discount_percent, currency) VALUES
('DL HIALUROX SKIN PLUS 3 VIALS', 'dl-hialurox-skin-plus-3-vials', 299.00, 'Skinbooster Hialurox Skin Plus kit com 3 viais de 4ML. Hidratação profunda e melhora da qualidade da pele.',
 ARRAY['/images/products/hialurox-skin-plus-3-vials.jpg'], 'Skinbooster', 40, 0, 'BRL'),
('DL RESTYLANE VITAL 1ML', 'dl-restylane-vital-1ml', 320.00, 'Skinbooster Restylane Vital 1ML com ácido hialurônico não reticulado. Hidratação e luminosidade natural.',
 ARRAY['/images/products/restylane-vital-1ml.jpg'], 'Skinbooster', 35, 0, 'BRL'),
('DL SAYPHA RICH', 'dl-saypha-rich', 199.00, 'Skinbooster Saypha Rich com ácido hialurônico enriquecido. Nutrição e hidratação profunda da pele.',
 ARRAY['/images/products/saypha-rich.jpg'], 'Skinbooster', 45, 0, 'BRL');