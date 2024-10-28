import { ArgsType, Field, Int, ObjectType } from 'type-graphql';
import { IsIn, Min } from 'class-validator';

@ObjectType('Product')
export class Product {
  @Field()
  id!: string;
  @Field()
  name!: string;
  @Field()
  price!: number;
  @Field()
  stock!: number;
  @Field(() => [String])
  image!: string[];
  @Field()
  rating?: number;
  @Field(() => [String])
  category!: string[];
  @Field(() => [String])
  description?: string[];
}

@ArgsType()
export class ProductArgs {
  @Field(() => Int)
  @Min(1)
  size?: number;
  @Field(() => Int)
  @Min(1)
  page?: number;
  @Field()
  order?: string;
  @Field()
  sort?: string;
}

@ObjectType('PaginatedProducts')
export class PaginatedProducts {
  @Field(() => [Product])
  products!: Product[];

  @Field()
  @Min(0)
  totalProducts!: number;
}
