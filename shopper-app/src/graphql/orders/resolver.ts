import { OrdersInfo } from "./schema";
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

  @Query(() => [OrdersInfo])
  async getOrdersByStatus(
    @Arg('shopperId') shopperId: string,
    @Arg('status') status: string,
  ): Promise<OrdersInfo[]> {
    return await new OrdersService().getOrdersByStatus(shopperId, status);
  }

  @Mutation(() => OrdersInfo)
  async deleteOrder(
    @Arg('orderId') orderId: string,
  ): Promise<OrdersInfo> {
    return await new OrdersService().deleteOrder(orderId);
  }
}