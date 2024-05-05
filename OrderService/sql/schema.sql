DROP TABLE IF EXISTS order_table;
CREATE TABLE order_table (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID);