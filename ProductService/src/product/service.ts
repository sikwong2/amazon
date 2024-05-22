import { pool } from '../db'
import { NewProduct, Product, Order } from '.'

export class ProductService {
  public async getAll(): Promise<Product[]> {
    const query = {
      text: 'SELECT id, data FROM product;',
      values: [],
    }
    const { rows } = await pool.query(query);
    const products: Product[] = [];
    console.log(rows[0]);
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data
        }
      })
    }
    console.log(products)
    return products;
  }

  public async getByPage(page: number, size: number, order: Order) {
      const select = `SELECT id, data FROM product 
      AS subquery 
      ORDER BY (subquery.data->>'$3') DESC 
      LIMIT $1 OFFSET $2`
    const query = {
      text: select,
      values: [size, `${page * 30}`, order]
    }
    const {rows} = await pool.query(query);
    const products: Product[] = [];
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data
        }
      })
    }
    return products;
  }

  // https://stackoverflow.com/questions/45918260/restful-api-multiple-query-strings-over-multiple-resources-for-filtering
  public async getByCategory(category: string, page: number, size: number): Promise<Product[]> {
    const select = `SELECT id, data FROM product 
      WHERE (data->'category')::jsonb ? '$1' 
      AS subquery 
      ORDER BY (subquery.data->>'price') DESC 
      LIMIT $2 OFFSET $3`
    const query = {
      text: select,
      values: [category, size, `${page * 30}`]
    }
    const {rows} = await pool.query(query);
    const products: Product[] = [];
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data
        }
      })
    }
    console.log(products)
    return products;
  }

  public async makeProduct(product: NewProduct): Promise<Product> {
    const query = {
      text: `INSERT INTO product(data) VALUES(jsonb_build_object('name', $1::text, 'price', $2::int, 'stock', $3::int, 'image', $4::text, 'rating', $5::int, 'category', $6::text)) RETURNING *;`,
      values: [product.name, product.price, product.stock, product.image, product.rating, product.category],
    }
    const { rows } = await pool.query(query);

    return rows[0];
  }

  /**
   * Returns the product deleted or undefined if the product doesn't exist
   */
  public async removeProduct(productId: string): Promise<Product | undefined> {
    const query = {
      text: `DELETE FROM product WHERE id = $1 RETURNING id, data;`,
      values: [productId],
    }

    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0];
  }

  public async getId(productId: string): Promise<Product | undefined> {
    console.log('get id')
    const query = {
      text: `SELECT id, data FROM product WHERE id = $1;`,
      values: [productId]
    }
    const { rows } = await pool.query(query);
    console.log(rows)
    return rows[0];
  }
}