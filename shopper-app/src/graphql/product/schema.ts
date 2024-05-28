import { ArgsType, Field, Int, ObjectType } from "type-graphql"
import { IsIn, Min } from "class-validator";

@ObjectType()
export class Product {
  @Field()
    id!: string
  @Field()
    name!: string
  @Field()
    price!: number
  @Field()
    stock!: number
  @Field(() => [String])
    image!: string[]
  @Field()
    rating?: number
  @Field(() => [String])
    category!: string[]
  @Field(() => [String])
    description?: string[]
}

@ArgsType()
export class ProductArgs {
  @Field(() => Int, { nullable: true })
  @Min(1)
    size?: number
  @Field(() => Int, { nullable: true })
  @Min(1)
    page?: number
  @Field({ nullable: true })
    order?: string
  @Field({ nullable: true })
    sort?: string
}
