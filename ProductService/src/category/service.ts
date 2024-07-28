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
    return rows[0];
  }

  public async delete(category: string, byId=false): Promise<boolean> {
    // check if category exists and get its name/id
    let deleteText;
    if(byId) {
      deleteText = 'SELECT id, name FROM category WHERE id = $1';
    } else {
      deleteText = 'SELECT id, name FROM category WHERE name = $1';
    }
    let query = {
      text: deleteText,
      values: [category]
    }
    const categoryExists = await pool.query(query);
    if(categoryExists.rowCount === 0) {
      return false;
    }
    const categoryId = categoryExists.rows[0].id;
    const categoryName = categoryExists.rows[0].name;

    // delete from junction table
    query = {
      text: 'DELETE FROM product_category WHERE category_id = $1',
      values: [categoryId]
    }
    await pool.query(query);

    // get all products that have this category
    query = {
      text: "SELECT id, data FROM product WHERE (data->'category') ? $1",
      values: [categoryName]
    }
    const products = await pool.query(query);

    // remove category from products that had this category
    for (const product of products.rows) {
      const newCategories = product.data.category.filter((cat: string) => categoryName !== cat);
      query = {
        text: 'UPDATE product SET data = jsonb_set(data, \'{category}\', $1) WHERE id = $2',
        values: [JSON.stringify(newCategories), product.id]
      } 
      await pool.query(query);
    }

    // delete from category table
    query = {
      text: 'DELETE FROM category WHERE name = $1',
      values: [categoryName]
    }
    await pool.query(query);

    return true;
  }
}