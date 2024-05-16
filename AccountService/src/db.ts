import { Pool } from 'pg';

const { POSTGRES_HOST, POSTGRES_ACCOUNT_PORT, POSTGRES_ACCOUNT_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (!POSTGRES_HOST) {
  console.error('Error: POSTGRES_HOST is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_ACCOUNT_PORT) {
  console.error('Error: POSTGRES_ACCOUNT_PORT is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_ACCOUNT_DB) {
  console.error('Error: POSTGRES_ACCOUNT_DB is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_USER) {
  console.error('Error: POSTGRES_USER is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_PASSWORD) {
  console.error('Error: POSTGRES_PASSWORD is not defined in db.ts AccountService.');
  process.exit(1);
}

const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_ACCOUNT_PORT),
  database: POSTGRES_ACCOUNT_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export { pool };