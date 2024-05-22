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

const newProduct = {
  "name": "string",
  "price": 0,
  "stock": 0,
  "image": "string",
  "rating": 0
}

test('Create New Product', async () => {
  await supertest(server)
    .post('/api/v0/product')
    .send(newProduct)
    .then((res) => {
      expect(res.body.data.name).toBe('string');
    })
});

let productId: string;
test('GET all Products', async () => {
  await supertest(server)
    .get('/api/v0/product')
    .then((res) => {
      productId = res.body[0].id;
      console.log(productId)
      expect(res.body.length).toBe(1);
    })
});

test('GET productId', async () => {
  console.log(productId)
  await supertest(server)
    .get(`/api/v0/product/${productId}`)
    .then((res) => {
      console.log(res.body)
      expect(res.body.id).toBe(productId);
    })
})

test('DELETE product', async () => {
  await supertest(server)
    .delete(`/api/v0/product/${productId}`)
    .then((res) => {
      expect(res.body.id).toBe(productId);
    })
})

test('Check that product was deleted', async () => {
  await supertest(server)
    .get('/api/v0/product')
    .then((res) => {
      expect(res.body.length).toBe(0);
    })
});