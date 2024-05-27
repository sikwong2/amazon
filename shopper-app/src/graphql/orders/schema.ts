import { Field, ObjectType, ArgsType } from "type-graphql"

@ObjectType()
export class OrdersInfo {
  @Field()
    productId!: string
  @Field()
    shopperId!: string
  @Field()
    vendorId!: string
  @Field()
    orderStatus!: string
  @Field()
    orderId!: string
}