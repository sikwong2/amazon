import supertest from 'supertest';
import * as http from 'http';

import app from '../src/app';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await supertest(server).get('/api/v0/vendorapi').expect(404);
});

test('GET No API Key /vendorapi/v0/orders', async () => {
  await supertest(server).get('/vendorapi/v0/orders').expect(401);
});
