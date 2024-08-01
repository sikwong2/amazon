DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS review CASCADE CASCADE;
CREATE TABLE product(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT UNIQUE NOT NULL);

-- Junction table: https://megocode3.wordpress.com/2008/01/04/understanding-a-sql-junction-table/
DROP TABLE IF EXISTS product_category CASCADE;
CREATE TABLE product_category(product_id UUID REFERENCES product(id), category_id UUID references category(id), PRIMARY KEY (product_id, category_id));


CREATE TABLE review(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), product_id UUID REFERENCES product(id), shopper_id UUID NOT NULL, data jsonb);