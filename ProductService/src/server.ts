import dotenv from 'dotenv';
dotenv.config({path : '../.env'});

import app from './app';

app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
  console.log(`Product Service Server Running on port ${process.env.PRODUCT_SERVICE_PORT}`);
  console.log(`Product Service API Testing UI: http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/docs/`);
});