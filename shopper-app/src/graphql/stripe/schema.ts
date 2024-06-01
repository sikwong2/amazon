import { Field, InputType } from "type-graphql"

@InputType()
export class StripeProduct {
  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  quantity!: number;
}