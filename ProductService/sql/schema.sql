DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS review CASCADE;
CREATE TABLE product(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE review(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), product_id UUID REFERENCES product(id), shopper_id UUID NOT NULL, data jsonb);