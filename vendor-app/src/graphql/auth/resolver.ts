import { Query, Resolver, Args } from 'type-graphql';

import { Credentials, Authenticated, AccessToken } from './schema';
import { AuthService } from './service';

@Resolver()
export class AuthResolver {
  @Query(() => Authenticated)
  async login(@Args() credentials: Credentials): Promise<Authenticated> {
    return new AuthService().login(credentials);
  }

  @Query(() => Boolean)
  async status(@Args() accessToken: AccessToken): Promise<Boolean> {

    console.log("From Status : " + accessToken);

    return Promise.resolve(true);
  }
}
