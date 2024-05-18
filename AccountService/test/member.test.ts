import supertest from 'supertest';
import * as http from 'http';

import * as db from './db';
import app from '../src/app';

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

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

export const sally = {
  email: 'sally@amazon.com',
  password: 'sallyshopper',
  name: "Sally Shopper",
  role: "shopper"
};

const vivi = {
  email: 'vivi@amazon.com',
  password: 'vivivendor',
  name: "Vivi Vendor",
  role: "vendor"
}

const vivilogin = {
  email: "vivi@amazon.com",
  password: "vivivendor"
}

const sallylogin = {
  email: "sally@amazon.com",
  password: "sallyshopper"
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

test('Sally can make an account', async () => {

  await supertest(server)
    .post('/api/v0/account')
    .send(sally)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeDefined();
    })
  loginAs(sallylogin);
});

test('Sally cannot make another account with the same email', async () => {
  await supertest(server)
    .post('/api/v0/account')
    .send(sally)
    .expect(409)
});

test('Vivi can make an account', async () => {
  await supertest(server)
    .post('/api/v0/account')
    .send(vivi)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeDefined();
    })
  loginAs(vivilogin);
});

test('Invalid Email', async () => {
  await supertest(server)
    .post('/api/v0/account')
    .send({
      email: 'sally',
      password: 'sallyshopper',
      name: "Sally Shopper",
      role: "shopper"
    })
    .expect(400)
});

test('Invalid Role', async () => {
  await supertest(server)
    .post('/api/v0/account')
    .send({
      email: 'sally@amazon.com',
      password: 'sallyshopper',
      name: "Sally Shopper",
      role: "invalid"
    })
    .expect(400)
});


