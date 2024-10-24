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

const newProduct = {
  name: 'string',
  price: 0,
  stock: 0,
  image: ['string'],
  rating: 0,
  category: ['new'],
};

const cheapProduct = {
  name: 'cheap',
  price: 1,
  stock: 100,
  image: ['string'],
  rating: 1,
  category: ['sale'],
};

const midProduct = {
  name: 'mid',
  price: 5,
  stock: 50,
  image: ['string'],
  rating: 3,
  category: ['sale'],
};

const expensiveProduct = {
  name: 'expensive',
  price: 100,
  stock: 10,
  image: ['string'],
  rating: 5,
  category: ['sale'],
};

test('GET API Docs', async () => {
  await supertest(server).get('/api/v0/docs/').expect(200);
});

test('Create New Product', async () => {
  await supertest(server)
    .post('/api/v0/product')
    .send(newProduct)
    .then((res) => {
      expect(res.body.name).toBe('string');
    });
});
let productId: string;
test('GET all Products', async () => {
  await supertest(server)
    .get('/api/v0/product')
    .then((res) => {
      productId = res.body[0].id;
      expect(res.body.length).toBe(1);
    });
});

test('GET productId', async () => {
  await supertest(server)
    .get(`/api/v0/product/${productId}`)
    .then((res) => {
      expect(res.body.id).toBe(productId);
    });
});


test('DELETE product', async () => {
  await supertest(server)
    .delete(`/api/v0/product/${productId}`)
    .then((res) => {
      expect(res.body.id).toBe(productId);
    });
});

test('Check that product was deleted', async () => {
  await supertest(server)
    .get('/api/v0/product')
    .then((res) => {
      expect(res.body.length).toBe(0);
    });
});

test('Get product by price', async () => {
  await supertest(server)
    .post('/api/v0/product')
    .send(cheapProduct)
    .then((res) => {
      expect(res.body.name).toBe('cheap');
    });
  await supertest(server)
    .post('/api/v0/product')
    .send(midProduct)
    .then((res) => {
      expect(res.body.name).toBe('mid');
    });
  await supertest(server)
    .post('/api/v0/product')
    .send(expensiveProduct)
    .then((res) => {
      expect(res.body.name).toBe('expensive');
    });
  await supertest(server)
    .get('/api/v0/product?order=price')
    .then((res) => {
      expect(res.body.length).toBe(3);
      expect(res.body[0].data.name).toBe('expensive');
      expect(res.body[1].data.name).toBe('mid');
      expect(res.body[2].data.name).toBe('cheap');
    });
  await supertest(server)
    .get('/api/v0/product?order=price&sort=ASC')
    .then((res) => {
      expect(res.body.length).toBe(3);
      expect(res.body[0].data.name).toBe('cheap');
      expect(res.body[1].data.name).toBe('mid');
      expect(res.body[2].data.name).toBe('expensive');
    });
  await supertest(server)
    .get('/api/v0/product?order=name&sort=ASC')
    .then((res) => {
      expect(res.body.length).toBe(3);
      expect(res.body[0].data.name).toBe('cheap');
      expect(res.body[1].data.name).toBe('expensive');
      expect(res.body[2].data.name).toBe('mid');
    });
});

test('Get product 1 size', async () => {
  await supertest(server)
    .get('/api/v0/product?page=1&size=1')
    .then((res) => {
      expect(res.body.length).toBe(1);
    });
});

test('Get product by category', async () => {
  await supertest(server)
    .get('/api/v0/product/category/sale')
    .then((res) => {
      expect(res.body.length).toBe(3);
    });
});

test('Get product by category 1 size', async () => {
  await supertest(server)
    .get('/api/v0/product/category/sale?page=1&size=1')
    .then((res) => {
      expect(res.body.length).toBe(1);
      expect(res.body[0].data.name).toBe('expensive');
    });
});

test('Get product by category order name', async () => {
  await supertest(server)
    .get('/api/v0/product/category/sale?order=name&sort=ASC')
    .then((res) => {
      expect(res.body.length).toBe(3);
    });
});

test('Get product by name', async () => {
  await supertest(server)
    .get('/api/v0/product/name/sale')
    .then((res) => {
      expect(res.body.products.length).toBe(3);
    });
});

test('Get product by name 1 size', async () => {
  await supertest(server)
    .get('/api/v0/product/name/sale?page=1&size=1')
    .then((res) => {
      expect(res.body.products.length).toBe(1);
      expect(res.body.products[0].data.name).toBe('expensive');
    });
});

test('Get product by name order name', async () => {
  await supertest(server)
    .get('/api/v0/product/name/sale?order=name&sort=ASC')
    .then((res) => {
      expect(res.body.products.length).toBe(3);
    });
});

const badProduct = {
  name: '1234',
  price: 100,
  stock: 10,
  image: ['string'],
  rating: 5,
  category: ['sale'],
};

