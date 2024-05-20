import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length } from "class-validator";

@ArgsType()
export class Credentials {
  @Field()
  @Length(4, 16)
    email!: string
  @Field()
  @Length(8, 16)
    password!: string
}

@ObjectType()
export class Authenticated {
  @Field()
    name!: string
  @Field()
    accessToken!: string
  @Field()
    role!: string
}

@ArgsType()
export class AccessToken {
  @Field()
    accessToken!: string
}
