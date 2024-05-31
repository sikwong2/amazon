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

const products = {
  "products": [
    {
      "name": "Shrek 2 DVD",
      "quantity": 1,
      "price": 2000
    },
    {
      "name": "Harry Potter books",
      "quantity": 2,
      "price": 2000
    }
  ]
}

test('Create checkout url', async () => {
  await supertest(server)
    .post('/create-checkout-session')
    .send(products)
    .then((res) => {
      expect(res.body.url);
    })
}, 1000)