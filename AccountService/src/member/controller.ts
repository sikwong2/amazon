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

import { MemberInput, Member, Role } from '.';
import { MemberService } from './service';

@Route('account')
export class MemberController extends Controller {
  @Post()
  @Response('409', 'Account Exists')
  @SuccessResponse('201', 'Account Created')
  public async createAccount(@Body() memberinput: MemberInput): Promise<Member | undefined> {
    return new MemberService()
      .create(memberinput)
      .then(async (response: Member | undefined): Promise<Member | undefined> => {
        if (response === undefined) {
          this.setStatus(409);
        }
        return response;
      });
  }

  @Get('vendorstatus')
  @Response('401', 'Unauthorized')
  public async vendorStatus(@Query() accessToken: string): Promise<boolean> {
    return new MemberService()
      .vendorStatus(accessToken)
      .then(async (status: boolean): Promise<boolean> => {
        return status;
      });
  }
}
