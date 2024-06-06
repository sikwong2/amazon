import { graphql, HttpResponse } from 'msw'
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import OrderCard from '@/components/OrderCard';
import { LoginContext } from '@/context/Login';

// https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

const handlers = [
  graphql.query('getAddress', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        getMemberInfo: {
          address: 'string'
        }
      }
    })
  }),
  graphql.query('product', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        getByProductId: {
          name: 'string',
          price: 100,
          image: ['string'],
          stock: 1,
          rating: 1
        }
      }
    })
  }),
];

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('OrderCard Render', async () => {
  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'shopper';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };

  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <OrderCard orderStatus='pending' productIds={['string']} orderDate='string' orderNumber='string' />
    </LoginContext.Provider>
  )
})