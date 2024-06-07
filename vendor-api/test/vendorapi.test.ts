import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import * as httpServer from 'http';
import app from '../src/app';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let server: httpServer.Server<typeof httpServer.IncomingMessage, typeof httpServer.ServerResponse>;

const VENDOR_ID = '1234';
const BAD_VENDOR_ID = 'badId';
const API_KEY = '4321';
const BAD_API_KEY = 'badkey';
const ERROR_KEY = 'error';
const API_KEY_FOR_BAD_VENDOR = 'badVendor';

export type OrdersInfo = {
  orderId: string;
  products: string[];
  shopperId: string;
  vendorId: string;
  orderStatus: string;
  orderDate: Date;
};

export type OrderUpdate = {
  status: string;
};

const handlers = [
  http.get(
    `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/checkkey`,
    ({ request }) => {
      const url = new URL(request.url);
      const key = url.searchParams.get('key');
      if (key === API_KEY) {
        return HttpResponse.json({ id: VENDOR_ID }, { status: 200 });
      } else if (key == API_KEY_FOR_BAD_VENDOR) {
        return HttpResponse.json({ id: BAD_VENDOR_ID }, { status: 200 });
      } else if (key == BAD_API_KEY) {
        return HttpResponse.json({}, { status: 200 });
      } else if (key == ERROR_KEY) {
        return HttpResponse.json({}, { status: 500 });
      }
    },
  ),
  http.get(
    `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/vendor/:Id`,
    ({ params }) => {
      const { Id } = params;
      if (Id === VENDOR_ID) {
        return HttpResponse.json(
          {
            orderId: '1',
            products: ['apple', 'banana'],
            shopperId: '2',
            vendorId: '1234',
            orderStatus: 'cancelled',
            orderDate: new Date(),
          },
          { status: 200 },
        );
      } else if (Id == BAD_VENDOR_ID) {
        return HttpResponse.json({ error: 'An error occurred' }, { status: 500 });
      } else {
        return HttpResponse.json({}, { status: 401 });
      }
    },
  ),
  http.put(
    `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order/:orderId`,
    ({ params }) => {

      console.log("ORDER CAPTURED", params);

      const { orderId } = params;
      if (orderId === '1') {
        console.log('Order ID:', orderId);
        return HttpResponse.json(
          [
            {
              status: 'cancelled',
            },
          ],
          { status: 200 },
        );
      } else {
        return HttpResponse.json({ error: 'An error occurred' }, { status: 404 });
      }
    },
  ),
  http.post(
    `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/v0/product/`,
    () => {

      const body = {
        name: "string",
        price: 0,
        stock: 0,
        rating: 0,
        image: ["string"],
        category: ["string"],
        description: ["string"]
      };

      return HttpResponse.json(
        {
          name: body.name,
          price: body.price,
          stock: body.stock,
          rating: body.rating,
          image: body.image,
          category: body.category,
          description: body.description,
        },
        { status: 200 },
      );
    },
  ),
];

const mswServer = setupServer(...handlers);

beforeAll(async () => {
  mswServer.listen();
  server = httpServer.createServer(app);
  server.listen();
});

afterAll((done) => {
  mswServer.close();
  server.close(done);
});

test('GET /vendorapi/', async () => {
  await supertest(server).get('/vendorapi/').expect(200);
});

test('GET Invalid URL', async () => {
  await supertest(server).get('/api/v0/vendorapi').expect(404);
});

test('GET Missing API Key /vendorapi/v0/orders', async () => {
  await supertest(server).get('/vendorapi/v0/orders').expect(401);
});

test('GET Invalid API Key /vendorapi/v0/orders', async () => {
  await supertest(server)
    .get('/vendorapi/v0/orders')
    .set('Authorization', `Bearer ${BAD_API_KEY}`)
    .expect(404);
});

test('GET Error Key /vendorapi/v0/orders', async () => {
  await supertest(server)
    .get('/vendorapi/v0/orders')
    .set('Authorization', `Bearer ${ERROR_KEY}`)
    .expect(401);
});

test('GET Key Missing From Bearer Token /vendorapi/v0/orders', async () => {
  await supertest(server).get('/vendorapi/v0/orders').set('Authorization', 'Bearer ').expect(401);
});

test('GET /vendorapi/v0/orders', async () => {
  await supertest(server)
    .get('/vendorapi/v0/orders')
    .set('Authorization', `Bearer ${API_KEY}`)
    .expect(200);
});

test('GET Bad Vendor Service /vendorapi/v0/orders', async () => {
  await supertest(server)
    .get('/vendorapi/v0/orders')
    .set('Authorization', `Bearer ${API_KEY_FOR_BAD_VENDOR}`)
    .expect(200);
});

test('PUT /vendorapi/v0/order/{orderId}', async () => {
  await supertest(server)
    .put('/vendorapi/v0/order/1')
    .set('Authorization', `Bearer ${API_KEY}`)
    .send({ status: 'cancelled' })
    .expect(200);
});

test('PUT /vendorapi/v0/order/{orderId} Bad Vendor ID', async () => {
  await supertest(server)
    .put('/vendorapi/v0/order/1')
    .set('Authorization', `Bearer ${API_KEY_FOR_BAD_VENDOR}`)
    .expect(400);
});

test('PUT /vendorapi/v0/product', async () => {
  const productData = {
    name: "string",
    price: 0,
    stock: 0,
    rating: 0,
    image: ["string"],
    category: ["string"],
    description: ["string"]
  };

  await supertest(server)
    .post('/vendorapi/v0/product')
    .set('Authorization', `Bearer ${API_KEY}`)
    .send(productData)
    .expect(200);
})
