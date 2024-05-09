
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(Number(process.env.ORDER_SERVICE_PORT), () => {
  console.log(`Order Service Server Running on port ${process.env.ORDER_SERVICE_PORT}`);
  console.log(`Order Service API Testing UI: http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/docs/`);
});