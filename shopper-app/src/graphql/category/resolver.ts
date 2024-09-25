import { Arg, Query, Resolver } from "type-graphql";
import { Category } from "./schema";
import { CategoryService } from "./service";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<[Category]> {
    return await new CategoryService().getAllCategories();
  }

  @Query(()=> [Category])
  async getCategoriesOfProduct(
    @Arg('productId') productId: string
  ): Promise<[Category]> {
    return await new CategoryService().getCategoriesOfProduct(productId);
  }

  @Query(() => [Category])
  async getCategoriesWithMinProducts(
    @Arg('count') count: number
  ): Promise<[Category]> {
    return await new CategoryService().getCategoriesWithMinProducts(count);
  }
}
