CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS account;
CREATE TABLE account(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE apikey (
  account_id UUID REFERENCES account(id),
  api_key text UNIQUE NOT NULL,
  active boolean DEFAULT true,
);