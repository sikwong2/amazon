import { pool } from '../db'
import { NewProduct, Product } from '.'

export class ProductService {
  public async getAll(): Promise<Product[]> {
    const query = {
      text: 'SELECT * FROM product;',
      values: [],
    }
    const { rows } = await pool.query(query);
    const products: Product[] = [];

    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          name: row.data.name,
          price: row.data.name,
          stock: row.data.stock,
          image: row.data.image,
          rating: row.data.rating,
        }
      })
    }
    return products;
  }

  public async makeProduct(product: NewProduct): Promise<Product> {
    const query = {
      text: `INSERT INTO product(data) VALUES(jsonb_build_object('name', $1::text, 'price', $2::int, 'stock', $3::int, 'image', $4::text, 'rating', $5::int)) RETURNING *;`,
      values: [product.name, product.price, product.stock, product.image, product.rating],
    }
    const { rows } = await pool.query(query);

    return rows[0];
  }

  /**
   * Returns the product deleted or undefined if the product doesn't exist
   */
  public async removeProduct(productId: string): Promise<Product | undefined> {
    const query = {
      text: `DELETE FROM product WHERE id = $1 RETURNING *;`,
      values: [productId],
    }

    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async getId(productId: string): Promise<Product | undefined> {
    const query = {
      text: `SELECT * FROM product WHERE id = $1;`,
      values: [productId]
    }
    const { rows } = await pool.query(query);
    return rows[0];
  }
}