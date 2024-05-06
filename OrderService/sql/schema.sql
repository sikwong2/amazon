DROP TABLE IF EXISTS orders;
CREATE TABLE orders (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID);