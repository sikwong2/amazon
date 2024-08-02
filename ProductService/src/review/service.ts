import { pool } from '../db';
import { NewReview, Review } from '.';

export class ReviewService {

  public async createReview(review: NewReview, shopper_id: string, product_id: string): Promise <Review | undefined> {
    try {
      const posted = new Date();
      let create  = 
          `INSERT INTO review(product_id, shopper_id, data)
            VALUES ($1, $2, 
              json_build_object(
                'images', $3::jsonb,
                'content', $4::text,
                'rating', $5::numeric,
                'title', $6::text,
                'posted', $7::timestamptz,
                'name', $8::text
              )
            )
          RETURNING *;
      `;
      

      const query = {
        text: create,
        values: [
          product_id,
          shopper_id,
          JSON.stringify(review.images),
          review.content,
          review.rating,
          review.title,
          posted,
          review.name
        ]
      };

      const {rows} = await pool.query(query);
      return {id: rows[0].id, ...rows[0].data};
    
    } catch (e) {
      console.error('Problem Creating Review', e);
      return undefined;
    }
  }

  public async getReviews(productId: string, page: number = 0, size: number = 10): Promise <Review[]> {
    const select = `SELECT * FROM review WHERE product_id = $1 
      ORDER BY data->>'posted' 
      DESC LIMIT $2 OFFSET $3`;
    const query = {
      text: select,
      values: [productId, size, `${page * 10}` ]
    }
    const {rows} = await pool.query(query);
    const reviews: Review[] = [];
    for (const row of rows) {
      reviews.push(
        {
          id: row.id,
          shopper_id: row.shopper_id,
          product_id: row.product_id,
          ...row.data
        }
      )
    }
    return reviews;
  }

  public async getShopperReviews(shopperId: string, page: number = 0, size: number = 10): Promise <Review[]> {
    const select = `SELECT * FROM review WHERE shopper_id = $1 
      ORDER BY data->>'posted' 
      DESC LIMIT $2 OFFSET $3`;
    const query = {
      text: select,
      values: [shopperId, size, `${page * 10}` ]
    }
    const {rows} = await pool.query(query);
    const reviews: Review[] = [];
    for (const row of rows) {
      reviews.push(
        {
          id: row.id,
          shopper_id: row.shopper_id,
          product_id: row.product_id,
          ...row.data
        }
      )
    }
    return reviews;
  }

  public async getProductRating(productId: string): Promise <number> {
    const select = `SELECT data->>'rating' AS rating FROM review WHERE product_id = $1 ORDER BY data->>'posted' DESC`;
    const query = {
      text: select,
      values: [productId]
    };
    const {rows} = await pool.query(query);
    let reviewTotal: number = 0;
    let length = 0;
    for (const row of rows) {
      if ((row.rating != "0")) {
        reviewTotal = reviewTotal + (+row.rating);
        length += 1;
      }
    }
    if (length == 0) {
      return 0;
    }
    return reviewTotal / length;
  }

  public async deleteReview(reviewId: string): Promise <Review | undefined> {
    const select = `DELETE FROM review WHERE id = $1 RETURNING *`
    const query = {
      text: select,
      values: [reviewId]
    };
    const {rows} = await pool.query(query);
    return {
      id: rows[0].id, 
      shopper_id: rows[0].shopper_id,
      product_id: rows[0].product_id,
      ...rows[0].data
    };
  }

  public async editReview(reviewId: string, NewReview: NewReview): Promise <Review | undefined> {
    try {
      const update = `UPDATE review SET data = 
        json_build_object(
          'images', $1::jsonb,
          'content', $2::text,
          'rating', $3::numeric,
          'title', $4::text,
          'posted', $5::timestamptz,
          'name', $6::text
        )
        WHERE id = $7
        RETURNING *
        `;
      const posted = new Date();
      const query = {
        text: update,
        values: [
          JSON.stringify(NewReview.images),
          NewReview.content,
          NewReview.rating,
          NewReview.title,
          posted,
          NewReview.name,
          reviewId
        ]
      };

      const {rows} = await pool.query(query);
      if (rows.length == 0) {
        return undefined;
      }
      return {
        id: rows[0].id, 
        shopper_id: rows[0].shopper_id,
        product_id: rows[0].product_id,
        ...rows[0].data
      };
    } catch (e) {
      console.error("Problem Editing Review", e);
      return undefined;
    }
  }


}