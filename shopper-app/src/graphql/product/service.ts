import { Product } from "./schema";
import dotenv from 'dotenv';
dotenv.config({path : '../.env'});

export class ProductService {
  public async getByProductId(productId: string): Promise<Product> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await res.json();
      return json;
    } catch(e) {
      console.log(e);
      throw new Error('error in ProductService: getByProductId')
    }
  }
}