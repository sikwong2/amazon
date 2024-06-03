import { Query, Resolver, Arg } from "type-graphql"
import { StripeProduct } from "./schema"
import { StripeService } from "./service";

@Resolver()
export class StripeResolver {
  @Query(() => String) 
  async getCheckoutURL(
    @Arg('products', () => [StripeProduct]) products: StripeProduct[],
  ): Promise<string> {
    return await new StripeService().getCheckoutURL(products);
  }
}
