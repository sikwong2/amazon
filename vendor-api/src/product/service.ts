import { NewProduct, Product } from '.';

export class ProductService {
  public async createProduct(newProduct: NewProduct): Promise<Product | undefined> {
    const res = await fetch(
      `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/`,
      {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await res.json();
    return json;
  }
}
