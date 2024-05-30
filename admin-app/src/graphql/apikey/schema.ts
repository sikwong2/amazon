import { Field, ObjectType } from 'type-graphql';

@ObjectType('APIKey')
export class APIKey {
  @Field()
  account_id!: string;
  @Field()
  api_key!: string;
  @Field()
  active!: boolean;
}
