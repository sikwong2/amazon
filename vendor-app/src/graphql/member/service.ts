import type { Member } from './schema';
import type { MemberRequest } from './schema';

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
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }

  async status(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/vendorstatus?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }
}
