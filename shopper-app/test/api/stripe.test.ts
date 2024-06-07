import http, { request } from 'http';
import supertest from 'supertest';

import { http as rest, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

const handlers = [
  rest.post('http://localhost:3013/create-checkout-session', async () => {
    return HttpResponse.json({ url: "string" })
  })
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


test('Create checkout session url', async () => {
  const query = `
      query checkoutURL($products: [StripeProduct!]!) {
        getCheckoutURL(products: $products)
      }
    `;
  const variables = {
    products: [
      {
        name: "string",
        price: 100,
        quantity: 1
      }
    ]
  }
  await supertest(server)
    .post('/api/graphql')
    .send({query, variables})
    .then((res) => {
      expect(res.body.data.getCheckoutURL).toBe('string');
    })
})