import { Member } from './schema';
import { MemberRequest } from './schema';
import type { MemberInfo } from './schema';
import type { GoogleMemberRequest } from './schema';

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

  async createGoogleAccount(googleInput: GoogleMemberRequest): Promise<Member | undefined> {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/createGoogleAccount`, {
        method: 'POST',
        body: JSON.stringify(googleInput),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok){
            throw res;
          }
          return res.json();
        })
        .then((member) => {
          resolve(member);
        })
        .catch((err) => {
          reject(new Error('Google Account already exists (service.ts)'));
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
}
