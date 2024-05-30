import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';

const { PRODUCT_SERVICE_PORT } = process.env;

app.listen(Number(PRODUCT_SERVICE_PORT), () => {
  console.log(`Product Service Server Running on port ${PRODUCT_SERVICE_PORT}`);
  console.log(
    `Product Service API Testing UI: http://localhost:${PRODUCT_SERVICE_PORT}/api/v0/docs/`,
  );
});
