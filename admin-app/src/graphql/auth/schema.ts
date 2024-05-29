import { Field, ObjectType, ArgsType } from "type-graphql"
import { IsNotEmpty, Length } from "class-validator";

@ArgsType()
export class Credentials {
  @Field()
  @IsNotEmpty()
    email!: string
  @Field()
  @IsNotEmpty()
  @Length(6, 64)
    password!: string
}

@ObjectType()
export class Authenticated {
  @Field()
    name!: string
  @Field()
    accessToken!: string
}
