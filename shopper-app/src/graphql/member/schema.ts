import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Length, Matches } from "class-validator";
import { IsNotEmpty } from "class-validator";

@ObjectType()
@InputType("NewAccount")
export class MemberRequest {
  @Field()
  @IsNotEmpty()
    name!: string
  @Field()
  @Matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    email!: string
  @Field()
  @IsNotEmpty()
  @Length(8, 16)
    password!: string
  @Field()
    role!: string
}

@ObjectType("Account")
export class Member {
  @Field(() => ID)
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
    id!: string
  @Field()
  @IsNotEmpty()
    name!: string
  @Field()
  @Matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    email!: string
  @Field()
    role!: string
}

@ObjectType("AccountInfo")
export class MemberInfo {
  @Field()
  name!: string
  @Field()
  address!: string
}