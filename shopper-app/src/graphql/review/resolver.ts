import { Query, Resolver, Arg, Args, Int, Mutation } from 'type-graphql';
import { ReviewService } from './service';
import {NewReview, Review, RatingHistogram} from './schema'

@Resolver()
export class ReviewResolver {
  @Mutation(() => Review)
  async postReview(
    @Arg('newReview') newReview: NewReview,
    @Arg('memberId') memberId: string,
    @Arg('productId') productId: string,
  ): Promise <Review> {
    return await new ReviewService().postReview(newReview, memberId, productId);
  }

  @Query(() => [Review])
  async getProductReviews(
    @Arg('productId') productId: string,
    @Arg('page', () => Int, { defaultValue: 0 }) page: number,
    @Arg('size', () => Int, { defaultValue: 10 }) size: number
  ): Promise <Review[]> {
    return await new ReviewService().getProductReviews(productId, page, size);
  }

  @Query(() => [Review])
  async getShopperReviews(
    @Arg('memberId') memberId: string,
    @Arg('page', () => Int, { defaultValue: 0 }) page: number,
    @Arg('size', () => Int, { defaultValue: 10 }) size: number
  ): Promise <Review[]> {
    return await new ReviewService().getShopperReviews(memberId, page, size);
  }

  @Query(() => RatingHistogram)
  async getRatings(
    @Arg('productId') productId: string
  ): Promise <RatingHistogram> {
    return await new ReviewService().getRatings(productId);
  }

}