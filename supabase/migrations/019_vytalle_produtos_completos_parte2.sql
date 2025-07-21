-- Migration: 019 - Dados completos dos produtos Vytalle - Parte 2
-- Description: Continuação da inserção dos produtos reais

-- BIOREMODELADORES
INSERT INTO products (name, slug, description, category, price_credit, price_pix, stock, image_url, supplier_id, active, features, specifications) VALUES

('DL BIO EXO PLUS (EXOSSOMOS PDRN HIALURONICO) 7ML', 'dl-bio-exo-plus-7ml', 'Bioremodelador Bio Exo Plus com exossomos, PDRN e ácido hialurônico. Regeneração celular avançada em 7ML.', 'BIORREMODELADOR', 39900, 35900, 30, '/images/products/bio-exo-plus-7ml.jpg', 1, true,
'["Exossomos + PDRN", "Ácido hialurônico", "Regeneração celular", "Volume 7ML"]',
'{"volume": "7ml", "duracao": "6-9 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL EVO PDRN TRIPLE 1 VIAL 3ML', 'dl-evo-pdrn-triple-1-vial', 'Bioremodelador Evo PDRN Triple em vial único de 3ML. Polinucleotídeos para regeneração e reparação tecidual.', 'BIORREMODELADOR', 24500, 22900, 50, '/images/products/evo-pdrn-triple-1-vial.jpg', 1, true,
'["PDRN concentrado", "Regeneração tecidual", "Vial único 3ML", "Reparação celular"]',
'{"volume": "3ml", "duracao": "4-6 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL EVO PDRN TRIPLE 5 VIALS 3ML', 'dl-evo-pdrn-triple-5-vials', 'Bioremodelador Evo PDRN Triple kit com 5 viais de 3ML. Tratamento completo de regeneração celular.', 'BIORREMODELADOR', 103600, 97000, 20, '/images/products/evo-pdrn-triple-5-vials.jpg', 1, true,
'["Kit 5 viais", "PDRN concentrado", "Tratamento completo", "Economia em volume"]',
'{"volume": "5x3ml", "duracao": "4-6 meses por vial", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL PROPHILO 2ML', 'dl-prophilo-2ml', 'Bioremodelador Profhilo 2ML com ácido hialurônico ultra-puro. Bioestimulação e hidratação profunda da pele.', 'BIORREMODELADOR', 91500, 88900, 15, '/images/products/prophilo-2ml.jpg', 1, true,
'["Ácido hialurônico ultra-puro", "Bioestimulação", "Hidratação profunda", "Tecnologia italiana"]',
'{"volume": "2ml", "duracao": "6-9 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL REJUVITAL PDRN 5 VIALS 3ML', 'dl-rejuvital-pdrn-5-vials', 'Bioremodelador Rejuvital PDRN kit com 5 viais de 3ML. Polinucleotídeos para rejuvenescimento facial intensivo.', 'BIORREMODELADOR', 79900, 74900, 25, '/images/products/rejuvital-pdrn-5-vials.jpg', 1, true,
'["Kit 5 viais", "PDRN rejuvenescedor", "Tratamento intensivo", "Regeneração avançada"]',
'{"volume": "5x3ml", "duracao": "4-6 meses por vial", "conservacao": "2-8°C", "validade": "24 meses"}');

-- SKINBOOSTERS
INSERT INTO products (name, slug, description, category, price_credit, price_pix, stock, image_url, supplier_id, active, features, specifications) VALUES

('DL HIALUROX SKIN PLUS 3 VIALS 4ML', 'dl-hialurox-skin-plus-3-vials', 'Skinbooster Hialurox Skin Plus kit com 3 viais de 4ML. Hidratação profunda e melhora da qualidade da pele.', 'SKINBOOSTER', 33900, 29900, 40, '/images/products/hialurox-skin-plus-3-vials.jpg', 1, true,
'["Kit 3 viais", "Hidratação profunda", "Melhora da textura", "Volume 4ML cada"]',
'{"volume": "3x4ml", "duracao": "4-6 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL RESTYLANE VITAL 1ML', 'dl-restylane-vital-1ml', 'Skinbooster Restylane Vital 1ML com ácido hialurônico não reticulado. Hidratação e luminosidade natural.', 'SKINBOOSTER', 33500, 32000, 35, '/images/products/restylane-vital-1ml.jpg', 1, true,
'["Ácido hialurônico não reticulado", "Hidratação natural", "Luminosidade", "Qualidade Galderma"]',
'{"volume": "1ml", "duracao": "4-6 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL SAYPHA RICH', 'dl-saypha-rich', 'Skinbooster Saypha Rich com ácido hialurônico enriquecido. Nutrição e hidratação profunda da pele.', 'SKINBOOSTER', 21000, 19900, 45, '/images/products/saypha-rich.jpg', 1, true,
'["Ácido hialurônico enriquecido", "Nutrição profunda", "Hidratação intensa", "Custo-benefício"]',
'{"volume": "1ml", "duracao": "3-5 meses", "conservacao": "2-8°C", "validade": "24 meses"}');

-- PREENCHEDORES - PARTE 1
INSERT INTO products (name, slug, description, category, price_credit, price_pix, stock, image_url, supplier_id, active, features, specifications) VALUES

('DL BELOTERO BALANCE LIDO', 'dl-belotero-balance-lido', 'Preenchedor Belotero Balance com lidocaína. Coesividade balanceada para rugas moderadas e linhas de expressão.', 'PREENCHEDOR', 28900, 26500, 30, '/images/products/belotero-balance-lido.jpg', 1, true,
'["Com lidocaína", "Coesividade balanceada", "Rugas moderadas", "Aplicação confortável"]',
'{"volume": "1ml", "duracao": "6-9 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BELOTERO INTENSE LIDO', 'dl-belotero-intense-lido', 'Preenchedor Belotero Intense com lidocaína. Alta coesividade para rugas profundas e sulcos pronunciados.', 'PREENCHEDOR', 29900, 27500, 25, '/images/products/belotero-intense-lido.jpg', 1, true,
'["Com lidocaína", "Alta coesividade", "Rugas profundas", "Sulcos pronunciados"]',
'{"volume": "1ml", "duracao": "9-12 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BELOTERO VOLUME LIDO', 'dl-belotero-volume-lido', 'Preenchedor Belotero Volume com lidocaína. Máxima coesividade para restauração de volume facial e contorno.', 'PREENCHEDOR', 56000, 52500, 20, '/images/products/belotero-volume-lido.jpg', 1, true,
'["Com lidocaína", "Máxima coesividade", "Restauração de volume", "Contorno facial"]',
'{"volume": "1ml", "duracao": "12-18 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BIO LIFT 24MG', 'dl-bio-lift-24mg', 'Preenchedor Bio Lift 24mg com tecnologia nacional. Lifting facial natural e duradouro com ácido hialurônico.', 'PREENCHEDOR', 19900, 17900, 50, '/images/products/bio-lift-24mg.jpg', 1, true,
'["Tecnologia nacional", "Lifting natural", "24mg concentrado", "Custo-benefício"]',
'{"concentracao": "24mg/ml", "duracao": "6-9 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BIOGELIS FINE LINES 2ML', 'dl-biogelis-fine-lines-2ml', 'Preenchedor Biogelis Fine Lines 2ML para linhas finas. Textura suave e natural para rugas superficiais.', 'PREENCHEDOR', 49000, 46000, 35, '/images/products/biogelis-fine-lines-2ml.jpg', 1, true,
'["Volume 2ML", "Linhas finas", "Textura suave", "Resultado natural"]',
'{"volume": "2ml", "duracao": "6-9 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BIOGELIS GLOBAL 2ML', 'dl-biogelis-global-2ml', 'Preenchedor Biogelis Global 2ML versátil. Aplicação universal para rugas, sulcos e restauração de volume.', 'PREENCHEDOR', 53000, 49900, 30, '/images/products/biogelis-global-2ml.jpg', 1, true,
'["Volume 2ML", "Aplicação universal", "Versátil", "Múltiplas indicações"]',
'{"volume": "2ml", "duracao": "9-12 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BIOGELIS VOLUME 2ML', 'dl-biogelis-volume-2ml', 'Preenchedor Biogelis Volume 2ML para restauração de volume. Alta viscosidade para resultados duradouros.', 'PREENCHEDOR', 53000, 49900, 25, '/images/products/biogelis-volume-2ml.jpg', 1, true,
'["Volume 2ML", "Restauração de volume", "Alta viscosidade", "Resultados duradouros"]',
'{"volume": "2ml", "duracao": "12-15 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL BIOGELIS VOLUMAX 2ML', 'dl-biogelis-volumax-2ml', 'Preenchedor Biogelis VoluMax 2ML máxima viscosidade. Para aumento de volume significativo e contorno facial.', 'PREENCHEDOR', 72900, 69900, 20, '/images/products/biogelis-volumax-2ml.jpg', 1, true,
'["Volume 2ML", "Máxima viscosidade", "Aumento significativo", "Contorno facial"]',
'{"volume": "2ml", "duracao": "15-18 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL NEURAMIS DEEP', 'dl-neuramis-deep', 'Preenchedor Neuramis Deep para rugas profundas. Tecnologia coreana com ácido hialurônico de alta qualidade.', 'PREENCHEDOR', 21900, 19900, 40, '/images/products/neuramis-deep.jpg', 1, true,
'["Rugas profundas", "Tecnologia coreana", "Alta qualidade", "Excelente custo-benefício"]',
'{"volume": "1ml", "duracao": "9-12 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL NEURAMIS LIDOCAINE', 'dl-neuramis-lidocaine', 'Preenchedor Neuramis com lidocaína. Máximo conforto durante aplicação com anestésico incorporado.', 'PREENCHEDOR', 21900, 19900, 35, '/images/products/neuramis-lidocaine.jpg', 1, true,
'["Com lidocaína", "Máximo conforto", "Tecnologia coreana", "Aplicação indolor"]',
'{"volume": "1ml", "duracao": "9-12 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL NEURAMIS VOLUME', 'dl-neuramis-volume', 'Preenchedor Neuramis Volume para restauração de volume facial. Alta viscosidade com tecnologia coreana.', 'PREENCHEDOR', 21900, 19900, 30, '/images/products/neuramis-volume.jpg', 1, true,
'["Restauração de volume", "Alta viscosidade", "Tecnologia coreana", "Resultado duradouro"]',
'{"volume": "1ml", "duracao": "12-15 meses", "conservacao": "2-8°C", "validade": "24 meses"}'),

('DL PERFECTHA SUBSKIN', 'dl-perfectha-subskin', 'Preenchedor Perfectha Subskin para camadas profundas. Máxima projeção e volume para contorno facial.', 'PREENCHEDOR', 79900, 76500, 15, '/images/products/perfectha-subskin.jpg', 1, true,
'["Camadas profundas", "Máxima projeção", "Volume intenso", "Contorno facial"]',
'{"volume": "1ml", "duracao": "15-18 meses", "conservacao": "2-8°C", "validade": "24 meses"}');

-- Continua na próxima migração...