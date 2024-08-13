import { Controller, Get, Post, Delete, Query, Route, Body, Request, Path, Response, Put, SuccessResponse } from 'tsoa';
import { NewReview, RatingHistogram, Review } from '.';
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
  ): Promise <RatingHistogram> {
    return new ReviewService().getProductRating(productId);
  }

  @Post('create/{shopperId}/{productId}')
  @Response('409', "Review Already Exists") // only one review per product can exist
  @SuccessResponse('201', 'Created')
  public async createReview(
    @Path() shopperId: string,
    @Path() productId: string,
    @Body() NewReview: NewReview
  ): Promise <Review | undefined> {
    return await new ReviewService()
      .findReview(shopperId, productId)
      .then(async (exists: boolean): Promise <Review | undefined> => {
        if (exists) {
          this.setStatus(409);
        } else {
          return await new ReviewService()
            .createReview(NewReview, shopperId, productId)
            .then(async (result: Review | undefined): Promise <Review | undefined> => {
              if (!result) {
                this.setStatus(400);
              }
              return result;
            })
        }
      })
      
  }

  @Delete('{reviewId}')
  @SuccessResponse('200', 'Deleted')
  @Response('404', 'Review Not Found')
  public async deleteReview(
    @Path() reviewId: string
  ): Promise <Review | undefined> {
    return new ReviewService()
    .findReviewUsingId(reviewId)
    .then(async (exists: boolean): Promise <Review | undefined> => {
      if (!exists) {
        this.setStatus(404)
      } else {
        return new ReviewService()
          .deleteReview(reviewId)
          .then(async (result: Review | undefined): Promise <Review | undefined> => {
            if (!result) {
              this.setStatus(400);
            }
            return result;
          })
      }
    })
      
  }

  @Put('edit/{reviewId}')
  @SuccessResponse('200', 'Edited')
  @Response('404', 'Review Not Found')
  public async updateReview(
    @Path() reviewId: string,
    @Query() content?: string,
    @Query() title?: string,
    @Query() rating?: number
  ): Promise <Review | undefined > {
    if (!content && !title && !rating) {
      this.setStatus(404);
    }
    return new ReviewService()
    .findReviewUsingId(reviewId)
    .then(async (exists: boolean): Promise <Review | undefined> => {
      if (!exists) {
        this.setStatus(404);
      } else {
        return new ReviewService()
          .editReview(reviewId, content, title, rating)
          .then(async (result: Review | undefined): Promise <Review | undefined> => {
            if (!result) {
              this.setStatus(400);
            }
            return result;
          });
      }
    })
  }

  
}