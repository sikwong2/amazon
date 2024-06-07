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

test('Gets Api key', async () => {
  await supertest(server)
    .get('/api/v0/apikey')
    .expect(404)
})

test('Gets Api key', async () => {
  await supertest(server)
    .get('/api/v0/apikey/getallkeys')
    .expect(200)
})



test('Gets Vendor key', async () => {
  let key = ''
  await supertest(server)
    .get('/api/v0/apikey/createkey?id=7312ca31-1f18-4ab5-a1ef-18ce0bd22f32')
    .expect(201)
    .then((res) => {
      console.log(res.body)
      key = res.body.api_key
    })
  await supertest(server)
    .get('/api/v0/apikey/getvendorkeys?id=7312ca31-1f18-4ab5-a1ef-18ce0bd22f32')
    .expect(200)
  await supertest(server)
    .get(`/api/v0/apikey/activatekey?key=${key}`)
    .expect(200)
  await supertest(server)
    .get(`/api/v0/apikey/checkkey?key=${key}`)
    .expect(200)
  await supertest(server)
    .get(`/api/v0/apikey/checkkey?key=${key + '123'}`)
    .expect(401)
  await supertest(server)
    .get(`/api/v0/apikey/deactivatekey?key=${key}`)
    .expect(200)
  await supertest(server)
    .get(`/api/v0/apikey/checkkey?key=${key}`)
    .expect(401)
})
