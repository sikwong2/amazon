import { pool } from "../db";
import { Category } from ".";

export class CategoryService {
  public async getAll(): Promise<Category[]> {
    const query = {
      text: 'SELECT * FROM category;'
    }
    const { rows } = await pool.query(query);
    return rows;
  }

  public async getCategoriesOfProducts(productId: string): Promise<Category[]> {
    const query = {
      text: 'SELECT category_id as id, name FROM category c JOIN product_category pc ON c.id = pc.category_id WHERE pc.product_id = $1',
      values: [productId]
    }
    const { rows } = await pool.query(query);
    return rows;
  }

  public async create(category: string): Promise<Category | undefined> {
    const query = {
      text: 'INSERT INTO category (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *',
      values: [category]
    }
    const { rows } = await pool.query(query);
    console.log('create category: ', category, ': ', rows);
    return rows[0];
  }

  public async delete(category: string): Promise<boolean> {
    let query = {
      text: 'SELECT id FROM category WHERE name = $1',
      values: [category]
    }
    const categoryExists = await pool.query(query);
    if(categoryExists.rowCount === 0) {
      return false;
    }
    const categoryId = categoryExists.rows[0].id;

    query = {
      text: 'DELETE FROM product_category WHERE category_id = $1',
      values: [categoryId]
    }
    await pool.query(query);

    query = {
      text: "SELECT id, data FROM product WHERE (data->'category') ? $1",
      values: [category]
    }
    const products = await pool.query(query);
    console.log("products in category: ", category, " about to be deleted: ", products);

    for (const product of products.rows) {
      const newCategories = product.data.category.filter((cat: string) => category !== cat);
      query = {
        text: 'UPDATE product SET data = jsonb_set(data, \'{category}\', $1) WHERE id = $2',
        values: [JSON.stringify(newCategories), product.id]
      } 
      await pool.query(query);
    }

    query = {
      text: 'DELETE FROM category WHERE name = $1',
      values: [category]
    }
    await pool.query(query);

    return true;
  }

}