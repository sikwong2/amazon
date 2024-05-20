import { Field, ObjectType, ArgsType } from "type-graphql"
import { IsNotEmpty, Length } from "class-validator";

@ArgsType()
export class Credentials {
  @Field()
  @Length(4, 16)
  @IsNotEmpty()
    email!: string
  @Field()
  @IsNotEmpty()
  @Length(8, 16)
    password!: string
}

@ObjectType()
export class Authenticated {
  @Field()
    name!: string
  @Field()
    accessToken!: string
}
