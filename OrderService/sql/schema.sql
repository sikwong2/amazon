DROP TABLE IF EXISTS order;
CREATE TABLE order (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID);