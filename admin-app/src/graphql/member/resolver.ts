import { Authorized, Ctx, Resolver, Mutation, Arg, Query } from 'type-graphql';

import { Member } from './schema';
import { MemberService } from './service';
import type { NextApiRequest } from 'next';

@Resolver()
export class MemberResolver {
  @Authorized('admin')
  @Query(() => [Member])
  async unapprovedvendors(): Promise<Member[] | undefined> {
    return new MemberService().unapprovedvendors();
  }

  @Authorized('admin')
  @Mutation(() => Member)
  async approvevendor(@Arg('id') id: string): Promise<Member | undefined> {
    return new MemberService().approvevendor(id);
  }
}
