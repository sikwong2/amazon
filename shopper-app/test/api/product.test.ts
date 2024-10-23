import http, { request } from 'http';
import supertest from 'supertest';

import { http as rest, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

const handlers = [
  rest.post('http://localhost:3012/api/v0/product', async ({ request }) => {
    return HttpResponse.json(
      {
        id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
        data: {
          name: 'string',
          price: 100,
          stock: 100,
          image: ['string'],
          rating: 5,
          category: ['string'],
          description: ['string']
        }
      }
    );
  }),
  rest.get('http://localhost:3012/api/v0/product?page=1&size=30&order=DESC&sort=price', async ({ request }) => {
    return HttpResponse.json(
      [
        {
          id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
          data: {
            name: 'string',
            price: 100,
            stock: 100,
            image: ['string'],
            rating: 5,
            category: ['string'],
            description: ['string']
          }
        }
      ]
    );
  }),
  rest.get(`http://localhost:3012/api/v0/product/category/test?page=1&size=30&order=DESC&sort=price`
    , async ({ request }) => {
      return HttpResponse.json(
        [
          {
            id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
            data: {
              name: 'string',
              price: 100,
              stock: 100,
              image: ['string'],
              rating: 5,
              category: ['string'],
              description: ['string']
            }
          }
        ]
      );
    }),
    rest.get(`http://localhost:3012/api/v0/product/name/test?page=1&size=30&order=DESC&sort=price`, async ({ request }) => {
      return HttpResponse.json(
        {
          products: [
            {
              id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
              name: 'string',
              price: 100,
              stock: 100,
              image: ['string'],
              rating: 5,
              category: ['string'],
              description: ['string']
            }
          ],
          totalProducts: 1
        }
      );
    }),    
  rest.get('http://localhost:3012/api/v0/product/2fdfda40-8522-4e8d-9021-9f12ecba20cd', async ({ request }) => {
    return HttpResponse.json(
      {
        id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
        name: 'string',
        price: 100,
        stock: 100,
        image: ['string'],
        rating: 5,
        category: ['string'],
        description: ['string']

      }
    );
  }),
  rest.delete('http://localhost:3012/api/v0/product/2fdfda40-8522-4e8d-9021-9f12ecba20cd', async ({ request }) => {
    return HttpResponse.json(
      {
        id: '2fdfda40-8522-4e8d-9021-9f12ecba20cd',
        data: {
          name: 'string',
          price: 100,
          stock: 100,
          image: ['string'],
          rating: 5,
          category: ['string'],
          description: ['string']
        }
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

test('Get Product by Id', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query getProduct {
        getByProductId( productId: "2fdfda40-8522-4e8d-9021-9f12ecba20cd")
        { id, price, image, stock, rating, description, name, category }
      }`
    })
    .then((res) => {
      // console.log(res.body)
      expect(res.body.data.getByProductId.name).toBe('string')
    })
})

test('Get all products', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query allProducts {
        getAll(size: 30, page: 1, order: "DESC", sort: "price")
        { id, price, image, stock, rating, description, name, category }
      }`
    })
    .then((res) => {
      expect(res.body.data.getAll[0].name).toBe('string')
    })
})

test('Get by category', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query category {
        getByCategory(category: "test", size: 30, page: 1, order: "DESC", sort: "price")
        { id, price, image, stock, rating, description, name, category }
      }`
    })
    .then((res) => {
      expect(res.body.data.getByCategory[0].name).toBe('string')
    })
  })
  
  test('Get by Name', async () => {
    await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query getByName {
        getByName(name: "test", size: 30, page: 1, order: "DESC", sort: "price")
        { id, price, image, stock, rating, name, category }
      }`
    })
    .then((res) => {
      expect(res.body.data.getByName.products.length).toBe(1)
    })
})