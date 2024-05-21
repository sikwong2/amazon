import { 
  Resolver, 
  Mutation,
  Arg,
  Query,
} from "type-graphql"

import { Member } from "./schema"
import { MemberRequest } from "./schema"
import { AccessToken } from "./schema"
import { MemberService } from "./service"

@Resolver()
export class MemberResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Member)
  async createaccount(
    @Arg("input") input: MemberRequest,
  ): Promise <Member> {
    return new MemberService().createaccount(input)
      .then(async (response: Member | undefined): Promise <Member> => {
        if (response == undefined) {
          throw new Error("Account already exists")
        }
        return response;
      })
  }

  @Query(() => Boolean)
  async status(@Arg("accessToken") accessToken : string): Promise<Boolean> {
    return new MemberService().status(accessToken);
  }

}