import {
  Body,
  Query,
  Controller,
  SuccessResponse,
  Post,
  Path,
  Get,
  Response,
  Security,
  Route,
} from 'tsoa';

import {MemberInput, Member, Role} from '.';
import { MemberInfo } from '.';
import { MemberService } from './service';

@Route('account')
export class MemberController extends Controller {
  @Post()
  @Response('409', 'Account Exists')
  @SuccessResponse('201', 'Account Created')
  public async createAccount(
    @Body() memberinput: MemberInput
  ): Promise<Member | undefined> {
    return new MemberService()
      .create(memberinput)
      .then(async (response: Member | undefined): Promise<Member | undefined> => {
        if (response === undefined) {
          this.setStatus(409);
        }
        return response;
      })
  }

  @Get('{memberId}')
  @Response('400', 'Bad')
  @SuccessResponse('200', 'Good')
  public async getAccountInfo(
    @Path('memberId') memberId: string
  ): Promise <MemberInfo | undefined> {
    return new MemberService()
      .getInfo(memberId)
      .then(async (response: MemberInfo | undefined): Promise < MemberInfo | undefined> => {
        if (response === undefined) {
          this.setStatus(409);
        }
        return response;
      })
  }
}