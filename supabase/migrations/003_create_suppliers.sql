CREATE TABLE SUPPLIERS (
    ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    NAME TEXT NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PHONE TEXT,
    ADDRESS TEXT,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE SUPPLIERS ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth CRUD suppliers" ON SUPPLIERS FOR ALL USING (AUTH.ROLE() = 'authenticated');