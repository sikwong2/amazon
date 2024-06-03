import { Field, InputType } from "type-graphql"

@InputType('StripeProduct')
export class StripeProduct {
  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  quantity!: number;
}