import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, IsNotEmpty } from "class-validator";

@ObjectType()
export class OrdersInfo {
  @Field()
  @IsNotEmpty()
    productId!: string
  @Field()
  @IsNotEmpty()
    shopperId!: string
  @Field()
  @IsNotEmpty()
    vendorId!: string
  @Field()
  @IsNotEmpty()
    orderStatus!: string
  @Field()
  @IsNotEmpty()
    orderId!: string
}