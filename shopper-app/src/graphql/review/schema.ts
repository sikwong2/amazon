import { ArgsType, Field, ID, Int, ObjectType } from 'type-graphql';
import { IsIn, IsNotEmpty, Matches, Max, Min } from 'class-validator';

@ObjectType()
export class NewReview {
  @Field({ nullable: true })
  @Matches(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/)
  images?: string[];
  @Field()
  @IsNotEmpty()
  content!: string;
  @Field(() => Int)
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating!: number;
  @Field()
  @IsNotEmpty()
  title!: string;
  @Field()
  @IsNotEmpty()
  name!: string;
}

@ObjectType()
export class Review {
  @Field(() => ID)
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  id!: string;
  @Field(() => ID)
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  shopper_id!: string;
  @Field(() => ID)
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  product_id!: string;
  @Field({ nullable: true })
  @Matches(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/)
  images?: string[];
  @Field()
  @IsNotEmpty()
  content!: string;
  @Field()
  @IsNotEmpty()
  title!: string;
  @Field()
  posted!: Date;
  @Field()
  @IsNotEmpty()
  name!: string;
  @Field()
  rating!: number
}

@ObjectType()
export class RatingHistogram {
  @Field()
  average!: number;
  @Field()
  total!: number;
  @Field()
  fiveStar!: number;
  @Field()
  fourStar!: number;
  @Field()
  threeStar!: number;
  @Field()
  twoStar!: number;
  @Field()
  oneStar!: number;
}
