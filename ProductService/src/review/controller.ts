import { Controller, Get, Post, Delete, Query, Route, Body, Request, Path, Response, Put } from 'tsoa';
import { NewPost, Posted } from '.';
import { ReviewService } from './service';

@Route('review')
export class ReviewController extends Controller {

  @Get('/product/{productId}')
  public async getAllReviewsUnderProduct(
    @Path() productId: string,
    @Query() page?: number,
    @Query() size?: number
  ): Promise <Posted[]> {
    return new ReviewService().getReviews(productId, page, size);
  }

  @Get('/shopper/{shopperId}')
  public async getAllReviewsUnderShopper(
    @Path() shopperId: string,
    @Query() page?: number,
    @Query() size?: number
  ): Promise <Posted[]> {
    return new ReviewService().getShopperReviews(shopperId, page, size);
  }

  // Gets the total rating from all reviews, excluding ratings with 0 stars (no rating)
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
    @Body() newpost: NewPost
  ): Promise <Posted | undefined> {
    return await new ReviewService()
      .createReview(newpost, shopperId, productId)
      .then(async (result: Posted | undefined): Promise <Posted | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      })
  }

  @Delete('{shopperId}/{reviewId}')
  public async deleteReview(
    @Path() shopperId: string,
    @Path() reviewId: string
  ): Promise <Posted | undefined> {
    return new ReviewService()
      .deleteReview(shopperId, reviewId)
      .then(async (result: Posted | undefined): Promise <Posted | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      })
  }

  @Put('edit/{shopperId}/{reviewId}')
  public async updateReview(
    @Path() shopperId: string,
    @Path() reviewId: string,
    @Body() newPost: NewPost
  ): Promise <Posted | undefined > {
    return new ReviewService()
      .editReview(shopperId, reviewId, newPost)
      .then(async (result: Posted | undefined): Promise <Posted | undefined> => {
        if (!result) {
          this.setStatus(400);
        }
        return result;
      });
  }
  
}