import { Resolver, Mutation, Arg, Query, Int } from 'type-graphql';

import { BrowserHistoryEntry, Member } from './schema';
import { MemberRequest } from './schema';
import { MemberInfo } from './schema';
import { MemberService } from './service';


@Resolver()
export class MemberResolver {
  //  eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(() => Member)
  async createaccount(@Arg('input') input: MemberRequest): Promise<Member> {
    return new MemberService()
      .createaccount(input)
      .then(async (response: Member | undefined): Promise<Member> => {
        if (response == undefined) {
          throw new Error('Account already exists');
        }
        return response;
      });
  }

  @Query((returns) => MemberInfo)
  async getMemberInfo(@Arg('memberId') memberId: string): Promise<MemberInfo> {
    return new MemberService()
      .getMemberInfo(memberId)
      .then(async (response: MemberInfo | undefined): Promise<MemberInfo> => {
        if (response == undefined) {
          throw new Error('Cannot get Member info');
        }
        return response;
      });
  }

  @Query((returns) => [BrowserHistoryEntry])
  async getBrowserHistory(
    @Arg('memberId') memberId: string,
    @Arg('page', () => Int, { defaultValue: 1 }) page: number,
    @Arg('size', () => Int, { defaultValue: 4 }) size: number
  ): Promise <[BrowserHistoryEntry]> {
    return new MemberService()
      .getBrowserHistory(memberId, size, page)
  }

  @Mutation((returns) => Boolean)
  async addBrowserHistory(
    @Arg('memberId') memberId: string,
    @Arg('productId') productId: string,
  ): Promise <Boolean> {
    return new MemberService()
      .addBrowserHistory(memberId, productId)
  }

  @Mutation((returns) => [BrowserHistoryEntry])
  async deleteBrowserHistory(
    @Arg('memberId') memberId: string,
    @Arg('date', () => Date, { nullable: true }) date?: Date,
  ): Promise <[BrowserHistoryEntry]> {
    const today = new Date();
    const d = date ? date : today;
    return new MemberService()
      .deleteBrowserHistory(memberId, d);
  }
}
