import { Field, InputType, ObjectType } from 'type-graphql';
import { IsIn } from 'class-validator';

@ObjectType('OrdersInfo')
export class OrdersInfo {
  @Field(() => [String])
  products!: string[];
  @Field()
  shopperId!: string;
  @Field()
  vendorId!: string;
  @Field()
  orderStatus!: string;
  @Field()
  orderId!: string
  @Field()
  orderDate!: string
}

@InputType('NewOrder')
export class NewOrder {
  @Field(() => [String])
  products!: string[];

  @Field()
  shopperId!: string;

  @Field()
  vendorId!: string;

  @Field()
  orderStatus!: string;
}