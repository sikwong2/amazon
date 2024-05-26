import type { Member } from './schema';

export class MemberService {
  async unapprovedvendors(): Promise<Member[] | undefined> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/account/unapprovedvendors`,
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
        .then((members) => {
          resolve(members);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }
}
