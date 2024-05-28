import { NewProduct, Product } from '.';

export class ProductService {
  public async createProduct(newProduct: NewProduct): Promise<Product|undefined> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/`, {
          method: 'POST',
          body: JSON.stringify(newProduct),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await res.json();
      console.log("newproduct: ", json);
      if(!json || json.length === 0) {
        return undefined;
      } else {
        return json;
      }
    } catch (e) {
      console.error(e);
      throw new Error('Vendor API: failed to create new product')
    }
  }
}
