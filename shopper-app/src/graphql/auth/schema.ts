import { Field, ObjectType, ArgsType } from 'type-graphql';
import { Length } from 'class-validator';

@ArgsType()
export class Credentials {
  @Field()
  email!: string;
  @Field()
  @Length(6, 64)
  password!: string;
}

@ObjectType()
export class Authenticated {
  @Field()
  name!: string;
  @Field()
  accessToken!: string;
  @Field()
  id!: string;
}
