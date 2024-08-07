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


const badorder = {
  products: ['b521def1-13a6-4242-8b79-710e3cf00b28'],
  shopperId: 'c34e',
}
test('Create order', async () => {
  await supertest(server)
    .post('/api/v0/order')
    .send(badorder)
    .then((res) => {
      expect(res.status).toBe(400)
    })
});

test('Get Order By Id', async () => {
  await supertest(server)
    .get(`/api/v0/order/${orderId}`)
    .then((res) => {
      expect(res.body.shopperId).toBe(order.shopperId);
    })
});

test('Get Order By Bad Id', async () => {
  await supertest(server)
    .get(`/api/v0/order/${orderId + '123'}`)
    .expect(204)
});


test('Update Order Status', async () => {
  await supertest(server)
    .put(`/api/v0/order/${orderId}`)
    .send({ status: 'shipped' })
    .then((res) => {
      expect(res.body.products[0]).toBe(order.products[0]);
    })
})

test('GET by Vendor ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/vendor/${order.vendorId}`)
    .then((res) => {
      expect(res.body.length).toBe(1);
    })
})

test('GET by Bad Vendor ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/vendor/${order.vendorId + '123'}`)
    .expect(204)
})

test('GET by Shopper ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/shopper/${order.shopperId}`)
    .then((res) => {
      expect(res.body.length).toBe(1);
    })
});

test('GET by Bad Shopper ID', async () => {
  await supertest(server)
    .get(`/api/v0/orders/shopper/${order.shopperId + '123'}`)
    .expect(204)
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

test('Delete Bad order', async () => {
  await supertest(server)
    .delete(`/api/v0/orders/${orderId + '123'}`)
    .expect(500)
})

