DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS review CASCADE;
CREATE TABLE product(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT UNIQUE NOT NULL);

-- Junction table: https://megocode3.wordpress.com/2008/01/04/understanding-a-sql-junction-table/
DROP TABLE IF EXISTS product_category CASCADE;
CREATE TABLE product_category(product_id UUID REFERENCES product(id), category_id UUID references category(id), PRIMARY KEY (product_id, category_id));

CREATE TABLE review(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), product_id UUID REFERENCES product(id), shopper_id UUID NOT NULL, data jsonb);

-- https://stackoverflow.com/questions/36169733/how-to-implement-a-likes-system
DROP TABLE IF EXISTS like_count CASCADE;
CREATE TABLE like_count(review_id UUID PRIMARY KEY REFERENCES review(id) ON DELETE CASCADE, shopper_id UUID NOT NULL, UNIQUE(review_id, shopper_id));
-- Index to count # of likes faster https://www.atlassian.com/data/databases/how-does-indexing-work
DROP INDEX IF EXISTS like_count_index CASCADE;
CREATE INDEX like_count_index ON like_count(review_id);