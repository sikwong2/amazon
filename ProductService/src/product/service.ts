import { pool } from '../db';
import { NewProduct, Product, Order, Sort } from '.';

export class ProductService {
  public async getAll(): Promise<Product[]> {
    const query = {
      text: 'SELECT id, data FROM product;',
      values: [],
    };
    const { rows } = await pool.query(query);
    const products: Product[] = [];
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data,
        },
      });
    }
    return products;
  }

  public async getByPage(page: number, size: number, order: Order, sort: Sort) {
    let select;
    if (order === 'price' || order === 'rating' || order === 'stock') {
      select = `SELECT id, data FROM product 
      AS subquery 
      ORDER BY (subquery.data->>'${order}')::numeric ${sort} 
      LIMIT $1 OFFSET $2`;
    } else {
      select = `SELECT id, data FROM product 
      AS subquery 
      ORDER BY (subquery.data->>'${order}') ${sort} 
      LIMIT $1 OFFSET $2`;
    }
    const query = {
      text: select,
      values: [size, `${page * 30}`],
    };
    const { rows } = await pool.query(query);
    const products: Product[] = [];
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data,
        },
      });
    }
    return products;
  }

  // https://stackoverflow.com/questions/45918260/restful-api-multiple-query-strings-over-multiple-resources-for-filtering
  public async getByCategory(
    category: string,
    page: number,
    size: number,
    order: Order,
    sort: Sort,
  ): Promise<Product[]> {
    let select;
    if (order === 'price' || order === 'rating' || order === 'stock') {
      select = `SELECT p.id, data FROM product p
      JOIN product_category pc ON p.id = pc.product_id
      JOIN category c ON pc.category_id = c.id
      WHERE c.name = $1
      ORDER BY (data->>'${order}')::numeric ${sort} 
      LIMIT $2 OFFSET $3`;
    } else {
      select = `SELECT p.id, data FROM product p
      JOIN product_category pc ON p.id = pc.product_id
      JOIN category c ON pc.category_id = c.id
      WHERE c.name = $1
      ORDER BY (data->>'${order}') ${sort} 
      LIMIT $2 OFFSET $3`;
    }

    const query = {
      text: select,
      values: [category, size, `${page * 30}`],
    };
    const { rows } = await pool.query(query);
    const products: Product[] = [];
    for (const row of rows) {
      products.push({
        id: row.id,
        data: {
          ...row.data,
        },
      });
    }

    return products;
  }

  public async getByName(name: string, page: number, size: number, order: Order, sort: Sort): Promise<Product[]> {
    let select;
    if (order === 'price' || order === 'rating' || order === 'stock') {
      select = `SELECT id, data FROM product 
      WHERE (data->>'name' ILIKE '%' || $1 || '%' OR data->>'category' ILIKE '%' || $1 || '%')
      ORDER BY (data->>'${order}')::numeric ${sort} 
      LIMIT $2 OFFSET $3`;
    } else {
      select = `SELECT id, data FROM product 
      WHERE (data->>'name' ILIKE '%' || $1 || '%' OR data->>'category' ILIKE '%' || $1 || '%')
      ORDER BY (data->>'${order}') ${sort} 
      LIMIT $2 OFFSET $3`;
    }

    const query = {
      text: select,
      values: [name, size, `${page * 30}`]
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
  
  public async makeProduct(product: NewProduct): Promise<Product | undefined> {
    try {
      const query = {
        text: `INSERT INTO product(data) VALUES(
          jsonb_build_object(
          'name', $1::text, 
          'price', $2::numeric, 
          'stock', $3::int, 
          'image', $4::jsonb, 
          'rating', $5::numeric, 
          'description', $6::jsonb,
          'category', $7::jsonb
          )
        ) RETURNING *;`,
        values: [
          product.name,
          product.price,
          product.stock,
          JSON.stringify(product.image),
          product.rating,
          JSON.stringify(product.description),
          JSON.stringify(product.category),
        ],
      };
      const { rows } = await pool.query(query);
      
      // insert into category table
      const insert_values: string[] = [];
      if (product.category) {
        for (let i = 1; i <= product.category.length; i++){
          insert_values.push(`($${i})`);
        }
      }
      const insert_category = {
        text: `INSERT INTO category (name) VALUES ${insert_values.toString()} ON CONFLICT (name) DO NOTHING RETURNING *`,
        values: product.category
      }
      await pool.query(insert_category);

      // insert into junction table
      await product.category?.forEach(async(category) => {
        const insert_junction = {
          text: 'INSERT INTO product_category (product_id, category_id) VALUES ($1, (SELECT id FROM category WHERE name=$2))',
          values: [rows[0].id, category]
        }
        await pool.query(insert_junction);
      })

      return { ...rows[0].data, id: rows[0].id };
    } catch (e) {
      console.error('Error making product: ', e);
      return undefined;
    }
  }

  /**
   * Returns the product deleted or undefined if the product doesn't exist
   */
  public async removeProduct(productId: string): Promise<Product | undefined> {
    const delete_junction = {
      text: `DELETE FROM product_category WHERE product_id = $1`,
      values: [productId]
    }
    await pool.query(delete_junction);

    const delete_product = {
      text: `DELETE FROM product WHERE id = $1 RETURNING id, data;`,
      values: [productId],
    };
    const { rows } = await pool.query(delete_product);

    return { ...rows[0].data, id: rows[0].id };
  }

  public async getId(productId: string): Promise<Product | undefined> {
    const query = {
      text: `SELECT id, data FROM product WHERE id = $1;`,
      values: [productId],
    };
    const { rows } = await pool.query(query);
    return { ...rows[0].data, id: rows[0].id };
  }
}