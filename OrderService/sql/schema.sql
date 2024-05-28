\c orderdatabase;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TYPE IF EXISTS order_status_type CASCADE;
CREATE TYPE order_status_type AS ENUM ('pending', 'confirmed', 'shipped', 'delayed', 'out for delivery', 'delivered', 'cancelled', 'refunded', 'returned');

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb, vendor_id UUID, shopper_id UUID, order_status order_status_type);