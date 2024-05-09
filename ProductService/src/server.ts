import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
  console.log(`Server Running on port ${process.env.PRODUCT_SERVICE_PORT}`);
  console.log(`API Testing UI: http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/docs/`);
});