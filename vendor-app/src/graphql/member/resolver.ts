import {
  Authorized,
  Ctx, 
  Resolver, 
  Mutation,
  Arg,
  Query,
} from "type-graphql"

import { Member } from "./schema"
import { MemberRequest } from "./schema"
import { MemberService } from "./service"
import type { NextApiRequest } from 'next'


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
 
  @Authorized('vendor')
  @Query(() => Boolean)
  async status(@Ctx() request: NextApiRequest): Promise<Boolean> {
    return new MemberService().status(request.user?.id);
  }
}