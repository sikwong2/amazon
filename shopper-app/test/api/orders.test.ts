import http, { request } from 'http';
import supertest from 'supertest';

import { http as rest, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import requestHandler from './requestHandler';
import { stringify } from 'querystring';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

const handlers = [
  rest.delete('http://localhost:3013/api/v0/orders/7320ddda-38e5-432d-a89a-12d267ade829', async ({ request }) => {
    return HttpResponse.json(
      {
        orderId: "7320ddda-38e5-432d-a89a-12d267ade829",
        orderStatus: "pending",
        products: [
          "6a2212e5-af0b-4472-a724-537bdc6c571c",
          "20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8",
          "fb31be70-f4f3-4ccc-b483-14e831dc61d1",
          "e64edcc9-3262-49b8-bda4-066c34089e05"
        ],
        shopperId: "92846fcb-9c73-4fc6-b652-3443874118b8",
        vendorId: "33d646df-1f4a-4130-8590-720f45ba4179",
        orderDate: "string"
      }
    );
  }),
  rest.get('http://localhost:3013/api/v0/orders/shopper/2fdfda40-8522-4e8d-9021-9f12ecba20cd/pending', async({request}) => {
    return HttpResponse.json(
      [
        {
          orderId: "7320ddda-38e5-432d-a89a-12d267ade829",
          orderStatus: "pending",
          products: [
            "6a2212e5-af0b-4472-a724-537bdc6c571c",
            "20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8",
            "fb31be70-f4f3-4ccc-b483-14e831dc61d1",
            "e64edcc9-3262-49b8-bda4-066c34089e05"
          ],
          shopperId: "92846fcb-9c73-4fc6-b652-3443874118b8",
          vendorId: "33d646df-1f4a-4130-8590-720f45ba4179",
          orderDate: "string"
        } 
      ]
    )
  }),
  rest.get('http://localhost:3013/api/v0/orders/shopper/92846fcb-9c73-4fc6-b652-3443874118b8', async ({ request }) => {
    return HttpResponse.json(
      [
        {
          orderId: "7320ddda-38e5-432d-a89a-12d267ade829",
          orderStatus: "pending",
          products: [
            "6a2212e5-af0b-4472-a724-537bdc6c571c",
            "20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8",
            "fb31be70-f4f3-4ccc-b483-14e831dc61d1",
            "e64edcc9-3262-49b8-bda4-066c34089e05"
          ],
          shopperId: "92846fcb-9c73-4fc6-b652-3443874118b8",
          vendorId: "33d646df-1f4a-4130-8590-720f45ba4179",
          orderDate: "string"
        }
      ]
    )
  }),
  rest.post('http://localhost:3013/api/v0/order', async ({ request }) => {
    return HttpResponse.json(
      {
        orderId: 'string'
      }
    );
  }),
]
const microServices = setupServer(...handlers);

beforeAll(async () => {
  microServices.listen({ onUnhandledRequest: 'bypass' });
  server = http.createServer(requestHandler);
  server.listen();
});
afterEach(() => {
  microServices.resetHandlers();
});

afterAll((done) => {
  microServices.close();
  server.close(done);
});

test('Get shopper by Id', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query getByShopperId {
        getByShopperId( shopperId: "92846fcb-9c73-4fc6-b652-3443874118b8")
        { orderDate, orderId, orderStatus, products, shopperId, vendorId }
      }`
    })
    .then((res) => {
      expect(res.body.data.getByShopperId[0].orderStatus).toBe('pending')
    })
})

test('Deletes an order', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation deleteOrder{
        deleteOrder(orderId: "7320ddda-38e5-432d-a89a-12d267ade829") {
          products, shopperId, vendorId, orderStatus, orderId, orderDate
        }
      }`
    })
    .then((res) => {
      
      expect(res.body.data.deleteOrder.orderStatus).toBe('pending');
    })
  })

  test('gets an order by status', async () => {
    await supertest(server)
      .post('/api/graphql')
      .send({
        query: `query getOrdersByStatus{
        getOrdersByStatus(shopperId: "2fdfda40-8522-4e8d-9021-9f12ecba20cd", status: "pending",) {
          products, shopperId, vendorId, orderStatus, orderId, orderDate
        }
      }`
      })
      .then((res) => {
        expect(res.body.data.getOrdersByStatus[0]).toBeDefined();
      })
    })

  test('Get shopper by Id', async () => {
    await supertest(server)
      .post('/api/graphql')
      .send({
        query: `query getOrders {
          getOrders( shopperId: "92846fcb-9c73-4fc6-b652-3443874118b8")
          { orderDate, orderId, orderStatus, products, shopperId, vendorId }
        }`
      })
      .then((res) => {
        expect(res.body.data.getOrders[0].orderStatus).toBe('pending')
      })
  })

  test('Create Order', async () => {
    const obj = {
      products: ['string'], 
      shopperId: 'string', 
      vendorId: 'string',
      orderStatus: 'string'
    }
    const query = `
      mutation createOrder($order: NewOrder!) {
        createOrder(order: $order)
      }
    `;
    const variables = {
      order: obj
    }
    await supertest(server)
    .post('/api/graphql')
    .send({
        query, variables
      })
      .then((res) => {
        expect(res.body.data.createOrder).toBeDefined()
      })
    })