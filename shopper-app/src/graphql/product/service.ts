import { Product } from './schema';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export class ProductService {
  public async getByProductId(productId: string): Promise<Product> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/${productId}`,
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
      console.log(e);
      throw new Error('error in ProductService: getByProductId');
    }
  }

  public async getAllProducts(
    page: number = 1,
    size: number = 30,
    order: string = 'price',
    sort: string = 'DESC',
  ): Promise<Product[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product?page=${page}&size=${size}&order=${order}&sort=${sort}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      const products: Product[] = json.map((item: any) => ({
        id: item.id,
        name: item.data.name,
        price: item.data.price,
        stock: item.data.stock,
        image: item.data.image,
        rating: item.data.rating,
        category: item.data.category,
        description: item.data.description,
      }));
      return products;
    } catch (e) {
      console.log(e);
      throw new Error('error in ProductService: getAll');
    }
  }

  public async getByCategory(
    category: string,
    page: number = 1,
    size: number = 30,
    order: string = 'price',
    sort: string = 'DESC',
  ): Promise<Product[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/category/${category}?page=${page}&size=${size}&order=${order}&sort=${sort}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      const products: Product[] = json.map((item: any) => ({
        id: item.id,
        name: item.data.name,
        price: item.data.price,
        stock: item.data.stock,
        image: item.data.image,
        rating: item.data.rating,
        category: item.data.category,
        description: item.data.description,
      }));
      return products;
    } catch (e) {
      console.log(e);
      throw new Error('error in ProductService: getByCategory');
    }
  }

  public async getByName(name: string, page: number = 1, size: number = 30, order: string = 'price', sort: string = 'DESC'): Promise<Product[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/name/${name}?page=${page}&size=${size}&order=${order}&sort=${sort}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await res.json();
      const products: Product[] = json.map((item: any) => ({
        id: item.id,
        name: item.data.name,
        price: item.data.price,
        stock: item.data.stock,
        image: item.data.image,
        rating: item.data.rating,
        category: item.data.category
      }));
      return products;
    } catch(e) {
      console.log(e);
      throw new Error('error in ProductService: getByName')
    }
  }
}
