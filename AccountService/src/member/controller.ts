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
  Delete,
} from 'tsoa';

import { MemberInput, Member, Role, BrowserHistoryEntry } from '.';
import { MemberService } from './service';
import { query } from 'express';
import { access } from 'fs';
import { MemberInfo } from '.';
import { UUID } from '../types/express';

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
  public async vendorStatus(@Query() id: string): Promise<boolean> {
    return new MemberService().vendorStatus(id).then(async (status: boolean): Promise<boolean> => {
      return status;
    });
  }

  @Get('unapprovedvendors')
  @Response('401', 'Unauthorized')
  public async unapprovedVendors(): Promise<Member[] | undefined> {
    return new MemberService()
      .unapprovedVendors()
      .then(async (response: Member[] | undefined): Promise<Member[] | undefined> => {
        if (response === undefined) {
          this.setStatus(401);
        }
        return response;
      });
  }

  @Post('approvevendor')
  @Response('401', 'Unauthorized')
  public async approveVendor(@Query() id: string): Promise<Member | undefined> {
    return new MemberService()
      .approveVendor(id)
      .then(async (response: Member | undefined): Promise<Member | undefined> => {
        if (response === undefined) {
          this.setStatus(401);
        }
        return response;
      });
  }

  @Get('{memberId}')
  @Response('400', 'Bad')
  @SuccessResponse('200', 'Good')
  public async getAccountInfo(@Path('memberId') memberId: string): Promise<MemberInfo | undefined> {
    return new MemberService()
      .getInfo(memberId)
      .then(async (response: MemberInfo | undefined): Promise<MemberInfo | undefined> => {
        if (response === undefined) {
          this.setStatus(409);
        }
        return response;
      });
  }

  @Get('{memberId}/browser-history')
  @Response('400', 'Bad Request')
  @SuccessResponse('200', 'Good')
  public async getBrowserHistory(
    @Path('memberId') memberId: UUID,
    @Query('size') size?: number,
    @Query('page') page?: number
  ): Promise<BrowserHistoryEntry[] | undefined> {
    const p: number = page ? (page - 1) : 0;
    const s: number = size ? size : 4;
    return new MemberService()
      .getBrowserHistory(memberId, s, p)
      .then(async (response: BrowserHistoryEntry[] | undefined): Promise<BrowserHistoryEntry[] | undefined> => {
        if (response == undefined) {
          this.setStatus(404);
        }
        return response;
      });
  }

  @Post('{memberId}/browser-history/{productId}')
  @SuccessResponse('201', 'Created')
  public async addBrowserHistory(
    @Path('memberId') memberId: UUID,
    @Path('productId') productId: UUID
  ): Promise<boolean> {
    return new MemberService()
      .addBrowserHistory(memberId, productId)
  }

  @Delete('{memberId}/browser-history')
  @Response('400', 'Bad Request')
  @SuccessResponse('200', 'Deleted')
  public async deleteBrowserHistory(
    @Path('memberId') memberId: UUID,
    @Query() date?: Date
  ): Promise <BrowserHistoryEntry[]> {
    const t = new Date();
    const timestamp = date ? date : t;
    return new MemberService()
      .deleteBrowserHistory(memberId, timestamp);
  }
}
