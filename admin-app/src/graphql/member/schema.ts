import { Field, ObjectType, ID } from 'type-graphql';
import { Matches } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

@ObjectType('Account')
export class Member {
  @Field(() => ID)
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  id!: string;
  @Field()
  @IsNotEmpty()
  name!: string;
  @Field()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  email!: string;
  @Field()
  role!: string;
}
