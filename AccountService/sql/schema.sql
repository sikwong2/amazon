\c accountdatabase;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS account;
CREATE TABLE account(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);