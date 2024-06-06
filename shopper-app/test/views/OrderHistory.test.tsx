import { OrderHistory } from '@/views/OrderHistory';
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginContext, LoginProvider } from '@/context/Login';
import { SearchProvider } from '@/context/SearchContext';
import { PageContext } from '@/context/Page';

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
  graphql.query('orders', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        getOrders: [{
          products: ['string'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'pending',
          orderId: 'string',
          orderDate: 'string'
        },{
          products: ['string'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'shipped',
          orderId: 'string',
          orderDate: 'string'
        },{
          products: ['string'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'cancelled',
          orderId: 'string',
          orderDate: 'string'
        },
        {
          products: ['string'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'delivered',
          orderId: 'string',
          orderDate: 'string'
        },
        ]
      }
    })
  }),
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
  graphql.query('getMemberInfo', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        getMemberInfo: {
          address: 'string'
        }
      }
    })
  }),
];

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('Renders', async () => {
  const setPage = () => { };
  const page: string = 'orderHistory';

  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'shopper';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };
  render(
    <SearchProvider>
      <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
        <PageContext.Provider value={{ page, setPage }}>
          <OrderHistory />
        </PageContext.Provider>
      </LoginContext.Provider>
    </SearchProvider>
  );

  // Ensure the component renders correctly
  await waitFor(() => {
    const deliveryAddressButton = screen.getByLabelText('delivery-address');
    expect(deliveryAddressButton).toBeDefined();
    expect(screen.getAllByLabelText('delivery-address')).toBeDefined();
  });
})
