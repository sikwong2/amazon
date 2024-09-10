CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS apikeytable;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS history;

CREATE TABLE account(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE apikeytable (account_id UUID REFERENCES account(id), api_key text UNIQUE NOT NULL, active boolean DEFAULT true);

CREATE TABLE history(account_id UUID REFERENCES account(id), product_id UUID NOT NULL, timestamp TIMESTAMPTZ DEFAULT NOW(), UNIQUE(account_id, product_id));