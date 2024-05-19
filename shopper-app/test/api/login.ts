
export const molly = {
  email: 'molly@books.com',
  password: 'mollymember',
};

export const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
};

export async function login(request: any, member: any): Promise<string|undefined> {
  let accessToken;
  await request.post('/api/graphql')
    .send({query: `{login(email: "${member.email}" password: 
      "${member.password}") { accessToken }}`})
    .expect(200)
    .then((res: any) => {
      accessToken = res.body.data.login.accessToken;
    });
  return accessToken;
}

export async function asMolly(request: any): Promise<string|undefined> {
  return login(request, molly);
}

export async function asAnna(request: any): Promise<string|undefined> {
  return login(request, anna);
}
