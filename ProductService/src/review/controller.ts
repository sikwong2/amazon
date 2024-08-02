import { Controller, Get, Post, Delete, Query, Route, Body, Request, Path, Response, Put } from 'tsoa';
import { NewReview, Review } from '.';
import { ReviewService } from './service';

@Route('review')
export class ReviewController extends Controller {

  @Get('/product/{productId}')
  public async getAllReviewsUnderProduct(
    @Path() productId: string,
    @Query() page?: number,
    @Query() size?: number
  ): Promise <Review[]> {
    return new ReviewService().getReviews(productId, page, size);
  }

  @Get('/shopper/{shopperId}')
  public async getAllReviewsUnderShopper(
    @Path() shopperId: string,
    @Query() page?: number,
    @Query() size?: number
  ): Promise <Review[]> {
    return new ReviewService().getShopperReviews(shopperId, page, size);
  }

  // Gets the average rating from all reviews, excluding ratings with 0 stars (no rating)
  @Get('/rating/{productId}')
  public async getAllRatingsUnderProduct(
    @Path() productId: string
  ): Promise <number> {
    return new ReviewService().getProductRating(productId);
  }

  @Post('create/{shopperId}/{productId}')
  public async createReview(
    @Path() shopperId: string,
    @Path() productId: string,
    @Body() NewReview: NewReview
  ): Promise <Review | undefined> {
    return await new ReviewService()
      .createReview(NewReview, shopperId, productId)
      .then(async (result: Review | undefined): Promise <Review | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      })
  }

  @Delete('{reviewId}')
  public async deleteReview(
    @Path() reviewId: string
  ): Promise <Review | undefined> {
    return new ReviewService()
      .deleteReview(reviewId)
      .then(async (result: Review | undefined): Promise <Review | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      })
  }

  @Put('edit/{reviewId}')
  public async updateReview(
    @Path() reviewId: string,
    @Body() NewReview: NewReview
  ): Promise <Review | undefined > {
    return new ReviewService()
      .editReview(reviewId, NewReview)
      .then(async (result: Review | undefined): Promise <Review | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      });
  }
  
}