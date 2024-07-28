import { pool } from "src/db";
import { Category } from ".";

export class CategoryService {
  public async getAll(): Promise<Category[]> {
    const query = {
      text: 'SELECT * FROM category;'
    }
    const { rows } = await pool.query(query);
    console.log("get all categories: ", rows);
    return rows;
  }

  public async getCategoriesOfProducts(productId: string): Promise<Category[]> {
    const query = {
      text: 'SELECT * FROM category c JOIN product_category pc ON c.id = pc.category_id WHERE pc.product_id = $1',
      values: [productId]
    }
    const { rows } = await pool.query(query);
    console.log("get category of products: ", rows);
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
      text: 'DELETE FROM product_category WHERE category_id = $1 RETURNING product_id',
      values: [categoryId]
    }
    const products = await pool.query(query);
    console.log("deleting product_categories: ", products);


    return true;
  }

}