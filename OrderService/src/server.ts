
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';

const { ORDER_SERVICE_PORT } = process.env;

if (!ORDER_SERVICE_PORT) {
  console.error('Error: ORDER_SERVICE_PORT is not defined in server.ts OrderService.');
  process.exit(1);
}

app.listen(Number(ORDER_SERVICE_PORT), () => {
  console.log(`Order Service Server Running on port ${ORDER_SERVICE_PORT}`);
  console.log(`Order Service API Testing UI: http://localhost:${ORDER_SERVICE_PORT}/api/v0/docs/`);
});