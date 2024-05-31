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

const order = {
  products: ['b521def1-13a6-4242-8b79-710e3cf00b28'],
  shopperId: 'c34eac73-9ebf-42fd-b1c8-f124c2de4139',
  vendorId: '8835d856-f3ca-4c65-8a8e-d4df9bb9db95',
  orderStatus: 'pending'
}
let orderId: string;
test('Create order', async () => {
  await supertest(server)
    .post('/api/v0/order')
    .send(order)
    .then((res) => {
      orderId = res.body.orderId;
    })
});

test('Get Order By Id', async () => {
  await supertest(server)
    .get(`/api/v0/order/${orderId}`)
    .then((res) => {
      expect(res.body.shopperId).toBe(order.shopperId);
    })
});

test('Update Order Status', async () => {
  await supertest(server)
    .put(`/api/v0/order/${orderId}`)
    .send({ status: 'shipped' })
    .then((res) => {
      expect(res.body.shopperId).toBe(order.shopperId);
    })
})

test('GET by Vendor ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/vendor/${order.vendorId}`)
    .then((res) => {
      expect(res.body.length).toBe(1);
    })
})

test('GET by Shopper ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/shopper/${order.shopperId}`)
    .then((res) => {
      expect(res.body.length).toBe(1);
    })
});

test('GET orders by status', async () => {
  await supertest(server)
    .get(`/api/v0/orders/shopper/${order.shopperId}/shipped`)
    .then((res) => {
      expect(res.body.length).toBe(1);
    })
})

test('Delete order', async () => {
  await supertest(server)
    .delete(`/api/v0/orders/${orderId}`)
    .then((res) => {
      expect(res.body.orderId).toBe(orderId);
    })
})