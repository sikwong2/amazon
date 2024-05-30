import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  InputType,
  Authorized,
} from 'type-graphql';
import { APIKey } from './schema';
import { APIKeyService } from './service';

export class APIKeyResolver {
  @Authorized('admin')
  @Query(() => [APIKey])
  async allKeys(): Promise<APIKey[] | undefined> {
    return new APIKeyService().getAllKeys();
  }

  @Authorized('admin')
  @Mutation(() => Boolean)
  async activateAPIKey(@Arg('key') key: string): Promise<Boolean> {
    return new APIKeyService().activateAPIKey(key);
  }

  @Authorized('admin')
  @Mutation(() => Boolean)
  async deactivateAPIKey(@Arg('key') key: string): Promise<Boolean> {
    return new APIKeyService().deactivateAPIKey(key);
  }
}
