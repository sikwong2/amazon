DROP TABLE IF EXISTS order_;
CREATE TABLE order_(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID);
