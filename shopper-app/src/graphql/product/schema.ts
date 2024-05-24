import { Field, ObjectType } from "type-graphql"
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class Product {
  @Field()
  @IsNotEmpty()
    name!: string
  @Field()
    price!: number
  @Field()
    stock!: number
  @Field(() => [String])
    image!: string[]
  @Field()
    rating!: number
  @Field(() => [String])
    description?: string[]
}
