import type { Member } from "./schema";
import type { MemberRequest } from "./schema";

export class MemberService {
  async createaccount(memberinput: MemberRequest): Promise <Member | undefined> {
    console.log('creating account');
    console.log(memberinput);
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
            throw res
          }
          return res.json()
        })
        .then((member) => {
          resolve(member)
        })
        .catch((err) => {
          console.log(err)
          reject(new Error("Account already exists"))
        });
    })
  }
}