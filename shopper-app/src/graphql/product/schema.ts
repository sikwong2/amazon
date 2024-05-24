import { ArgsType, Field, Int, ObjectType } from "type-graphql"
import { IsIn, IsNotEmpty, Min } from "class-validator";

@ObjectType()
export class Product {
  @Field()
  @IsNotEmpty()
    id!: string
  @Field()
  @IsNotEmpty()
    name!: string
  @Field()
  @IsNotEmpty()
    price!: number
  @Field()
  @IsNotEmpty()
    stock!: number
  @Field(() => [String])
  @IsNotEmpty()
    image!: string[]
  @Field()
  @IsNotEmpty()
    rating!: number
  @Field(() => [String])
  @IsNotEmpty()
    category!: string[]
}

@ArgsType()
export class ProductArgs {
  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsNotEmpty()
    size?: number
  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsNotEmpty()
    page?: number
  @Field({ nullable: true })
  @IsIn(['price', 'name', 'stock', 'rating', 'image', 'category'], { message: 'Order must be one of the following values: price, name, stock, rating, image, category' })
  @IsNotEmpty()
    order?: string
  @Field({ nullable: true })
  @IsIn(['ASC', 'DESC'], { message: 'Sort must be one of the following values: ASC, DESC' })
  @IsNotEmpty()
    sort?: string
}