import { Product } from "./schema";
import { ProductService } from "./service";
import { Query, Resolver, Arg } from "type-graphql"

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  async getByProductId(
    @Arg('productId') productId: string
  ): Promise<Product> {
    return await new ProductService().getByProductId(productId);
  }
}