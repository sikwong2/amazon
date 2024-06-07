import supertest from 'supertest';
import * as http from 'http';

import * as db from './db';
import app from '../src/app';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  return db.reset();
});

afterAll((done) => {
  db.shutdown();
  server.close(done);
});

export interface Member {
  email: string;
  password: string;
}

export const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
  name: 'Anna Admin',
};

async function loginAs(member: Member): Promise<string | undefined> {
  let accessToken;
  await supertest(server)
    .post('/api/v0/authenticate')
    .send({ email: member.email, password: member.password })
    .expect(200)
    .then((res) => {
      accessToken = res.body.accessToken;
    });
  return accessToken;
}

test('GET Invalid URL', async () => {
  await supertest(server).get('/api/v0/accounty-wounty').expect(404);
});

test('GET API Docs', async () => {
  await supertest(server).get('/api/v0/docs/').expect(200);
});

export const bad = {
  email: '',
  password: '',
};

test('Bad Credentials Rejected', async () => {
  await supertest(server).post('/api/v0/authenticate').send(bad).expect(401);
});

test('Anna can log in', async () => {
  const accessToken = await loginAs(anna);
  expect(accessToken).toBeDefined();
  await supertest(server).get(`/api/v0/authenticate?accessToken=${accessToken}`).expect(200);
});

test('Anna cant login', async() => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/authenticate')
    .send({ email: 123, password: 123 })
    .expect(400)
})

test('Anna invalid accesstoken', async () => {
  const accessToken = await loginAs(anna);
  expect(accessToken).toBeDefined();
  await supertest(server).get(`/api/v0/authenticate?accessToken=123`).expect(401);
  await supertest(server)
    .get(
      `/api/v0/authenticate?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
    )
    .expect(401);
});

test('invalid account', async () => {
  await supertest(server)
    .post('/api/v0/authenticate')
    .send({ email: 'invalid@gmail.com', password: '12345' })
    .expect(401);
});

test('Good Access Token Authenticated', async () => {
  let accessToken = await loginAs(anna);
  await supertest(server)
    .get('/api/v0/authenticate?accessToken=' + accessToken)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.role).toBeDefined();
      expect(res.body.role).toEqual('admin');
    });
  await supertest(server).get('/api/v0/authenticate?accessToken=' + accessToken)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined()
      expect(res.body).toBeDefined()
      expect(res.body.id).toBeDefined()
      expect(res.body.role).toBeDefined()
      expect(res.body.role).toEqual('admin')
    });
});

test('Bad Access Token Rejected', async () => {
  await supertest(server).get('/api/v0/authenticate?accessToken=garbage').expect(401);
});
