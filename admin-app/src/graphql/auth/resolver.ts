import { Query, Resolver, Args } from "type-graphql"

import { Credentials, Authenticated } from "./schema"
import { AuthService } from "./service"

@Resolver()
export class AuthResolver {
  @Query(() => Authenticated)
  async login(
    @Args() credentials: Credentials,
  ): Promise<Authenticated> {
    return new AuthService().login(credentials)
  }
}
