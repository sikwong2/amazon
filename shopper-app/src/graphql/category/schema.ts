import { Field, ObjectType } from "type-graphql";

@ObjectType('Category')
export class Category {
  @Field()
  id!: string;
  @Field()
  name!: string;
}


