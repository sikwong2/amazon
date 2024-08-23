import { pool } from '../db';
import { NewReview, RatingHistogram, Review } from '.';

export class ReviewService {

  public async findReview(shopper_id: string, product_id: string): Promise <boolean> {
    const select = `SELECT * FROM review WHERE shopper_id = $1 AND product_id = $2`;
    const query = {
      text: select,
      values: [shopper_id, product_id]
    };
    const {rows} = await pool.query(query);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  public async findReviewUsingId(review_id: string): Promise <boolean> {
    const select = `SELECT * FROM review WHERE id = $1`;
    const query = {
      text: select,
      values: [review_id]
    }
    const {rows} = await pool.query(query);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public async createReview(review: NewReview, shopper_id: string, product_id: string): Promise <Review | undefined> {
    try {
      console.log('creating review');
      const posted = new Date();
      let create  = 
          `INSERT INTO review(product_id, shopper_id, data)
            VALUES ($1, $2, 
              jsonb_build_object(
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
      console.log(rows);
      return {id: rows[0].id, product_id: rows[0].product_id, shopper_id: rows[0].shopper_id, ...rows[0].data};
    
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

  public async getProductRating(productId: string): Promise <RatingHistogram> {
    const select = `SELECT data->>'rating' AS rating FROM review WHERE product_id = $1 ORDER BY data->>'posted' DESC`;
    const query = {
      text: select,
      values: [productId]
    };
    const {rows} = await pool.query(query);
    let reviewTotal: number = 0;
    let fiveStar: number = 0;
    let fourStar: number = 0;
    let threeStar: number = 0;
    let twoStar: number = 0;
    let oneStar: number = 0;
    let length = 0;
    for (const row of rows) {
      if ((row.rating != "0")) {
        reviewTotal = reviewTotal + (+row.rating);
        length += 1;
      }
      if (row.rating == "5") {
        fiveStar += 1;
      } else if (row.rating == "4") {
        fourStar += 1;
      } else if (row.rating == "3") {
        threeStar += 1;
      } else if (row.rating == "2") {
        twoStar += 1;
      } else if (row.rating == "1") {
        oneStar += 1;
      }
    }
    return {
      average: length != 0 ? (reviewTotal / length) : 0,
      total: length,
      fiveStar: fiveStar,
      fourStar: fourStar,
      threeStar: threeStar,
      twoStar: twoStar,
      oneStar: oneStar
    };
  }

  public async deleteReview(reviewId: string): Promise <Review | undefined> {
    const select = `DELETE FROM review WHERE id = $1 RETURNING *`
    const query = {
      text: select,
      values: [reviewId]
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
  }
  
  public async editReview(reviewId: string, content?: string, title?: string, rating?: number): Promise<Review | undefined> {
    try {
      
      // appends changes to array
      let values: any[] = [reviewId];
      let changes = [];
      if (content) {
        values.push(content);
        changes.push(`'content', $${values.length}::text`);
        
      }
      if (title) {
        values.push(title);
        changes.push(`'title', $${values.length}::text`);
      }
      if (rating) {
        values.push(rating);
        changes.push(`'rating', $${values.length}::numeric`);
      }

      // updates date
      const posted = new Date();
      values.push(posted);
      changes.push(`'posted',  $${values.length}::timestamptz`);

      // joins all changes into comma separated string
      let finalchanges = changes.join(", ");

      // concatenates current data w/ new jsonb data 
      let update = `UPDATE review SET data = data || jsonb_build_object(${finalchanges}) WHERE id = $1 RETURNING *`;

      const query = {
        text: update,
        values: values
      }
  
      const { rows } = await pool.query(query);

      if (rows.length === 0) {
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