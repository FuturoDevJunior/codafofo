CREATE TABLE AUDITS (
    ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    TABLE_NAME TEXT NOT NULL,
    RECORD_ID UUID NOT NULL,
    ACTION TEXT NOT NULL, -- insert/update/delete
    OLD_DATA JSONB,
    NEW_DATA JSONB,
    USER_ID UUID, -- auth.uid()
    TIMESTAMP TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE AUDITS ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth read audits" ON AUDITS FOR SELECT USING (AUTH.ROLE() = 'authenticated');

CREATE OR REPLACE FUNCTION AUDIT_CHANGES(
) RETURNS TRIGGER AS
    $$     BEGIN IF TG_OP = 'DELETE' THEN
        INSERT INTO AUDITS (
            TABLE_NAME,
            RECORD_ID,
            ACTION,
            OLD_DATA,
            USER_ID
        ) VALUES (
            TG_RELNAME,
            OLD.ID,
            'delete',
            ROW_TO_JSON(OLD),
            AUTH.UID()
        );
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO AUDITS (
            TABLE_NAME,
            RECORD_ID,
            ACTION,
            OLD_DATA,
            NEW_DATA,
            USER_ID
        ) VALUES (
            TG_RELNAME,
            NEW.ID,
            'update',
            ROW_TO_JSON(OLD),
            ROW_TO_JSON(NEW),
            AUTH.UID()
        );
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO AUDITS (
            TABLE_NAME,
            RECORD_ID,
            ACTION,
            NEW_DATA,
            USER_ID
        ) VALUES (
            TG_RELNAME,
            NEW.ID,
            'insert',
            ROW_TO_JSON(NEW),
            AUTH.UID()
        );
        RETURN NEW;
    END IF;
END;
$$     LANGUAGE PLPGSQL;
CREATE TRIGGER TRG_AUDIT_PRODUCTS AFTER INSERT OR UPDATE OR DELETE ON PRODUCTS FOR EACH ROW EXECUTE PROCEDURE AUDIT_CHANGES(
));