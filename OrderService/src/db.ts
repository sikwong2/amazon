
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_ORDER_PORT ? parseInt(process.env.POSTGRES_ORDER_PORT) : 5432,
  database: process.env.POSTGRES_ORDER_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export { pool };
