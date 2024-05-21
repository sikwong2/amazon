import { OrdersInfo } from "./shema";
import { OrdersService } from "./service";
import { Query, Resolver, Arg, Mutation } from "type-graphql"

@Resolver()
export class OrdersResolver {
  @Query(() => [OrdersInfo])
  async getByShopperId(
    @Arg('shopperId') shopperId: string,
  ): Promise<OrdersInfo[]> {
    return await new OrdersService().getByShopperId(shopperId);
  }

  @Mutation(() => OrdersInfo)
  async deleteOrder(
    @Arg('orderId') orderId: string,
  ): Promise<OrdersInfo> {
    return await new OrdersService().deleteOrder(orderId);
  }
}