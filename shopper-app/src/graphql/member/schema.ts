import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, Matches } from 'class-validator';

@ObjectType()
@InputType('NewAccount')
export class MemberRequest {
  @Field()
  name!: string;
  @Field()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  email!: string;
  @Field()
  @Length(8, 16)
  password!: string;
  @Field()
  role!: string;
}

@ObjectType()
@InputType('NewGoogleAccount')
export class GoogleMemberRequest {
  @Field()
  id!: string;
  @Field()
  name!: string;
  @Field()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  email!: string; 
  @Field()
  role!: string;
}

@ObjectType('Account')
export class Member {
  @Field(() => ID)
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  id!: string;
  @Field()
  name!: string;
  @Field()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  email!: string;
  @Field()
  role!: string;
}

@ObjectType('AccountInfo')
export class MemberInfo {
  @Field()
  name!: string;
  @Field()
  address!: string;
}
