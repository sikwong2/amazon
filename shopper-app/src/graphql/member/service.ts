import { Member } from './schema';
import { MemberRequest } from './schema';
import type { BrowserHistoryEntry, MemberInfo } from './schema';

export class MemberService {
  async createaccount(memberinput: MemberRequest): Promise<Member | undefined> {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account`, {
        method: 'POST',
        body: JSON.stringify(memberinput),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((member) => {
          resolve(member);
        })
        .catch((err) => {
          reject(new Error('Account already exists'));
        });
    });
  }

  async getMemberInfo(memberId: string): Promise<MemberInfo | undefined> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/${memberId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      throw new Error('Error in AccountSerivce: getInfo');
    }
  }

  async getBrowserHistory(memberId: string, size: number, page: number): Promise<[BrowserHistoryEntry]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/${memberId}/browser-history?size=${size}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch(e) {
      console.log(e);
      throw new Error('Error in AccountService: getBrowserHistory')
    }
  }

  async addBrowserHistory(memberId: string, productId: string): Promise<BrowserHistoryEntry> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/${memberId}/browser-history/${productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch(e) {
      console.log(e);
      throw new Error('Error in AccountService: addBrowserHistory');
    }
  }

  async deleteBrowserHistory(memberId: string, date: Date): Promise<[BrowserHistoryEntry]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/${memberId}/browser-history?date=${date.toISOString()}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch(e) {
      console.log(e);
      throw new Error('Error in AccountService: addBrowserHistory');
    }
  }
}
