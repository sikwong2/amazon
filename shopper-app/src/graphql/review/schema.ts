import { ArgsType, Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { ArrayNotEmpty, IsIn, IsNotEmpty, Matches, Max, Min, Validate, ValidateNested } from 'class-validator';


@InputType()
export class NewReview {
  @Field(() => [String!], { nullable: true })
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
  id!: string;
  @Field(() => ID)
  @IsNotEmpty()
  shopper_id!: string;
  @Field(() => ID)
  @IsNotEmpty()
  product_id!: string;
  @Field(() => [String!], { nullable: true })
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
