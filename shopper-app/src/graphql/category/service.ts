import { Category } from "./schema";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export class CategoryService {
  public async getAllCategories(): Promise<[Category]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/category`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in CategoryService: getAllCategories');
    }
  }

  public async getCategoriesOfProduct(productId: string): Promise<[Category]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/category/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in CategoryService: getCategoriesOfProduct');
    }
  }
}
