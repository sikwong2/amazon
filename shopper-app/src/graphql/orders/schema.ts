import { Field, InputType, ObjectType } from 'type-graphql';
import { IsIn } from 'class-validator';

@ObjectType()
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

@InputType()
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