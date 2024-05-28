import { Field, ObjectType } from "type-graphql"
import { IsIn } from "class-validator";

@ObjectType()
export class OrdersInfo {
  @Field(() => [String])
    products!: string[]
  @Field()
    shopperId!: string
  @Field()
    vendorId!: string
  @Field()
  @IsIn(['pending', 'confirmed', 'shipped', 'delayed', 'out for delivery', 'delivered', 'cancelled', 'refunded', 'returned'], { message: 'Order status must be one of the following values: pending, confirmed, shipped, delayed, out for delivery, delivered, cancelled, refunded, returned' })
    orderStatus!: string
  @Field()
    orderId!: string
}