DROP TYPE IF EXISTS order_status_type CASCADE;
CREATE TYPE order_status_type AS ENUM ('pending', 'shipped', 'completed', 'cancelled');

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID, order_status order_status_type);