CREATE TABLE PRODUCTS (
    ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    NAME TEXT NOT NULL,
    SLUG TEXT UNIQUE NOT NULL,
    PRICE DECIMAL(10, 2) NOT NULL,
    DESCRIPTION TEXT,
    IMAGES TEXT[] DEFAULT '{}',
    CATEGORY TEXT NOT NULL CHECK (CATEGORY IN ('Botox', 'Dysport', 'Xeomin', 'Visco-supl.')),
    ACTIVE BOOLEAN DEFAULT TRUE,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE PRODUCTS ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON PRODUCTS FOR SELECT USING (TRUE);

CREATE POLICY "Auth insert products" ON PRODUCTS FOR INSERT WITH CHECK (AUTH.ROLE() = 'authenticated');

CREATE POLICY "Auth update products" ON PRODUCTS FOR UPDATE USING (AUTH.ROLE() = 'authenticated');

CREATE POLICY "Auth delete products" ON PRODUCTS FOR DELETE USING (AUTH.ROLE() = 'authenticated');

-- Dados de exemplo (2025, Goiânia-GO)
INSERT INTO PRODUCTS (
    NAME,
    SLUG,
    PRICE,
    DESCRIPTION,
    IMAGES,
    CATEGORY
) VALUES (
    'Botox® 50U',
    'botox-50u',
    1200.00,
    'Toxina botulínica para redução de rugas faciais. Benefícios: aparência lisa, rejuvenescida, trata enxaquecas. Duração: 3-6 meses. Indicado para linhas de expressão.',
    ARRAY['https://img.freepik.com/free-photo/botox-vial_23-2148479524.jpg',
    'https://img.freepik.com/free-photo/botox-before-after_23-2148479530.jpg'],
    'Botox'
),
(
    'Botox® 100U',
    'botox-100u',
    1950.00,
    'Dose maior para áreas extensas. Benefícios: redução profunda de rugas, natural. Duração: 3-6 meses. Onset: 3-5 dias.',
    ARRAY['https://www.shutterstock.com/image-photo/botox-vial-100u-600w-123456789.jpg',
    'https://www.shutterstock.com/image-photo/botox-application-600w-987654321.jpg'],
    'Botox'
),
(
    'Dysport® 300U',
    'dysport-300u',
    1400.00,
    'Toxina com difusão ampla. Benefícios: resultados rápidos, naturais. Duração: 3-4 meses. Onset: 1-2 dias. Indicado para hiperidrose.',
    ARRAY['https://img.freepik.com/free-photo/dysport-vial_23-2148479525.jpg',
    'https://img.freepik.com/free-photo/dysport-before-after_23-2148479531.jpg'],
    'Dysport'
),
(
    'Xeomin® 50U',
    'xeomin-50u',
    900.00,
    'Toxina pura, sem proteínas. Benefícios: menor risco de resistência, preciso. Duração: 3-4 meses. Onset: 3-4 dias.',
    ARRAY['https://www.shutterstock.com/image-photo/xeomin-vial-600w-112233445.jpg',
    'https://www.shutterstock.com/image-photo/xeomin-application-600w-556677889.jpg'],
    'Xeomin'
),
(
    'Xeomin® 100U',
    'xeomin-100u',
    1600.00,
    'Dose maior para rugas profundas. Benefícios: efeito puro, duradouro. Duração: 3-4 meses.',
    ARRAY['https://img.freepik.com/free-photo/xeomin-vial-100u_23-2148479526.jpg',
    'https://img.freepik.com/free-photo/xeomin-before-after_23-2148479532.jpg'],
    'Xeomin'
),
(
    'Viscosuplementação Articular',
    'visco-supl',
    2500.00,
    'Ácido hialurônico para alívio de dores articulares. Benefícios: melhora mobilidade, reduz inflamação. Duração: 6-12 meses. Indicado para artrose joelho.',
    ARRAY['https://www.shutterstock.com/image-photo/viscosuplementation-vial-600w-998877665.jpg',
    'https://www.shutterstock.com/image-photo/visco-application-600w-443322110.jpg'],
    'Visco-supl.'
);