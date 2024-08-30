import { Review, NewReview, RatingHistogram } from './schema';

export class ReviewService {
  public async postReview(newReview: NewReview, memberId: string, productId: string): Promise <Review> {
    try {

      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/review/create/${memberId}/${productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        },
      );

      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in ReviewService: postReview');
    }
  }


  public async getProductReviews(productId: string, page: number, size: number): Promise <Review[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/review/product/${productId}?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in ReviewService: getProductReviews');
    }
  }

  public async getShopperReviews(memberId: string, page: number, size: number): Promise <Review[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/review/shopper/${memberId}?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in ReviewService: getShopperReviews');
    }
  }

  public async getRatings(productId: string): Promise <RatingHistogram> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/review/rating/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('error in ReviewService: getRatings');
    }
  }
}