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

  @Authorized('vendor')
  @Mutation(() => APIKey)
  async createAPIKey(@Arg('id') id: string): Promise<APIKey | undefined> {
    return new APIKeyService().createAPIKey(id);
  }

  @Authorized('vendor')
  @Query(() => [APIKey])
  async vendorKeys(@Arg('id') id: string): Promise<APIKey[] | undefined> {
    return new APIKeyService().getVendorKeys(id);
  }
}
