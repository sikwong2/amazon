import { Product, ProductArgs } from "./schema";
import { ProductService } from "./service";
import { Query, Resolver, Arg, Args } from "type-graphql"

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  async getByProductId(
    @Arg('productId') productId: string
  ): Promise<Product> {
    return await new ProductService().getByProductId(productId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Product])
  async getAll(
    @Args() {page, size, order, sort}: ProductArgs
  ): Promise <Product[]> {
    return new ProductService().getAllProducts(page, size, order, sort)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Product])
  async getByCategory(
    @Arg('category') category: string,
    @Args() {page, size, order, sort}: ProductArgs
  ): Promise <Product[]> {
    return new ProductService().getByCategory(category, page, size, order, sort)
  }
}
