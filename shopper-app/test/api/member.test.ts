import http from 'http';
import supertest from 'supertest';

import { http as rest, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import requestHandler from './requestHandler';
import * as login from './login';

import { Member } from '@/graphql/member/schema';
import { MemberRequest } from '@/graphql/member/schema';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

let createdShopper = false;
let createdVendor = false;

const newShopper = {
  name: 'Sally Shopper',
  email: 'sally@amazon.com',
  password: 'sallyshopper',
  role: 'shopper',
};

const newVendor = {
  name: 'Vivi Vendor',
  email: 'vivi@amazon.com',
  password: 'vivivendor',
  role: 'vendor',
};

const invalidRole = {
  name: 'Invalid',
  email: 'invalid@amazon.com',
  password: 'invalid',
  role: 'invalid',
};

const invalidEmail = {
  name: 'Invalid',
  email: 'invalid',
  password: 'invalid',
  role: 'shopper',
};

let getMember = true;

const handlers = [
  rest.post('http://localhost:3011/api/v0/account', async ({ request }) => {
    const member = (await request.json()) as MemberRequest;
    if (member.email == newShopper.email && createdShopper == false) {
      createdShopper = true;
      return HttpResponse.json(
        {
          id: '994f5d51-e62b-4b3a-8e8f-735fd876babe',
          name: newShopper.name,
          email: newShopper.email,
          role: newShopper.role,
        },
        { status: 200 },
      );
    } else if (member.email == newVendor.email && createdVendor == false) {
      createdVendor = true;
      return HttpResponse.json(
        {
          id: 'fbbf06ec-6716-40a0-b83f-c17df8c17b81',
          name: newVendor.name,
          email: newVendor.email,
          role: newVendor.role,
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json({}, { status: 401 });
    }
  }),
  rest.get('http://localhost:3011/api/v0/account/:memberId', async ({request}) => {

    if (getMember) {
      return HttpResponse.json(
        {
          name: 'Molly Member',
          address: '123 Santa Cruz St'
        },
        { status: 200 },
      )
    } else {
      return HttpResponse.json({}, {status: 401})
    }
  }),
];

const microServices = setupServer(...handlers);

beforeAll(async () => {
  microServices.listen({ onUnhandledRequest: 'bypass' });
  server = http.createServer(requestHandler);
  server.listen();
});

beforeEach(() => {
  createdShopper = false;
  createdVendor = false;
});

afterEach(() => {
  microServices.resetHandlers();
});

afterAll((done) => {
  microServices.close();
  server.close(done);
});

test('Creates Shopper', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation createaccount {
      createaccount(
        input: {
          name: "${newShopper.name}"
          email: "${newShopper.email}"
          password: "${newShopper.password}"
          role: "${newShopper.role}" 
        }
      ) { id, name, email, role } }`,
    })
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.data).toBeDefined();
      expect(res.body.data.createaccount.id).toBeDefined();
      expect(res.body.data.createaccount.name).toBe(newShopper.name);
      expect(res.body.data.createaccount.role).toBe('shopper');
      expect(res.body.data.createaccount.email).toBe(newShopper.email);
    });
  expect(createdShopper).toBe(true);
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation createaccount {
      createaccount(
        input: {
          name: "${newShopper.name}"
          email: "${newShopper.email}"
          password: "${newShopper.password}"
          role: "${newShopper.role}" 
        }
      ) { id, name, email, role } }`,
    })
    .expect(200)
    .then((res: any) => {
      // console.log(res.body)
      expect(res.body.errors.length).toEqual(1);
      expect(res.body.errors[0].message).toEqual('Unexpected error.');
    });
});

test('Creates Vendor', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation createaccount {
      createaccount(
        input: {
          name: "${newVendor.name}"
          email: "${newVendor.email}"
          password: "${newVendor.password}"
          role: "${newVendor.role}" 
        }
      )
      { id, name, email, role }
    }`,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.data).toBeDefined();
      expect(res.body.data.createaccount.id).toBeDefined();
      expect(res.body.data.createaccount.name).toBe(newVendor.name);
      expect(res.body.data.createaccount.role).toBe('vendor');
      expect(res.body.data.createaccount.email).toBe(newVendor.email);
    });
});

test('Invalid Role', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation createaccount {
      createaccount(
        input: {
          name: "${invalidRole.name}"
          email: "${invalidRole.email}"
          password: "${invalidRole.password}"
          role: "${invalidRole.role}" 
        }
      )
      { id, name, email, role }
    }`,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.errors.length).toEqual(1);
      expect(res.body.errors[0].message).toEqual('Argument Validation Error');
    });
});

test('Invalid Email', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `mutation createaccount {
      createaccount(
        input: {
          name: "${invalidEmail.name}"
          email: "${invalidEmail.email}"
          password: "${invalidEmail.password}"
          role: "${invalidEmail.role}" 
        }
      )
      { id, name, email, role }
    }`,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.errors.length).toEqual(1);
      expect(res.body.errors[0].message).toEqual('Argument Validation Error');
    });
});

test('Get Member Info', async () => {
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query getMemberInfo {
        getMemberInfo(memberId: "994f5d51-e62b-4b3a-8e8f-735fd876babe") {
          name, address
        }
      }`
    })
    .expect(200)
    .then((res) => {
      expect(res.body.data.getMemberInfo.name).toBe('Molly Member')
      expect(res.body.data.getMemberInfo.address).toBe('123 Santa Cruz St')
    })
})

test('Error in Get Member Info', async() => {
  getMember = false;
  await supertest(server)
    .post('/api/graphql')
    .send({
      query: `query getMemberInfo {
        getMemberInfo(memberId: "99") {
          name, address
        }
      }`
    })
    .expect(200)
    .then((res) => {
      expect(res.body.errors.length).toEqual(1);
      expect(res.body.errors[0].message).toEqual('Unexpected error.');
    })
});