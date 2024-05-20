
import { Pool } from 'pg';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_ORDER_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (!POSTGRES_HOST) {
  console.error('Error: POSTGRES_HOST is not defined in db.ts OrderService.');
  process.exit(1);
}

if (!POSTGRES_PORT) {
  console.error('Error: POSTGRES_ORDER_PORT is not defined in db.ts OrderService.');
  process.exit(1);
}

if (!POSTGRES_ORDER_DATABASE) {
  console.error('Error: POSTGRES_ORDER_DB is not defined in db.ts OrderService.');
  process.exit(1);
}

if (!POSTGRES_USER) {
  console.error('Error: POSTGRES_USER is not defined in db.ts OrderService.');
  process.exit(1);
}

if (!POSTGRES_PASSWORD) {
  console.error('Error: POSTGRES_PASSWORD is not defined in db.ts OrderService.');
  process.exit(1);
}

const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_ORDER_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export { pool };
