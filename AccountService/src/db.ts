import { Pool } from 'pg';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_ACCOUNT_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

console.log('POSTGRES_HOST:', POSTGRES_HOST);
console.log('POSTGRES_PORT:', POSTGRES_PORT);
console.log('POSTGRES_ACCOUNT_DATABASE:', POSTGRES_ACCOUNT_DATABASE);
console.log('POSTGRES_USER:', POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', POSTGRES_PASSWORD);

if (!POSTGRES_HOST) {
  console.error('Error: POSTGRES_HOST is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_PORT) {
  console.error('Error: POSTGRES_ACCOUNT_PORT is not defined in db.ts AccountService.');
  process.exit(1);
}

if (!POSTGRES_ACCOUNT_DATABASE) {
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
  port: Number(POSTGRES_PORT),
  database: POSTGRES_ACCOUNT_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export { pool };