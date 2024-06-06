import { graphql, HttpResponse } from 'msw'
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { OrderHistory } from '@/views/OrderHistory';
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
          products: ['string1'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'pending',
          orderId: 'string1',
          orderDate: 'string'
        },{
          products: ['string2'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'shipped',
          orderId: 'string2',
          orderDate: 'string'
        },{
          products: ['string3'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'cancelled',
          orderId: 'string3',
          orderDate: 'string'
        },
        {
          products: ['string4'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'delivered',
          orderId: 'string4',
          orderDate: 'string'
        },{
          products: ['string5'],
          shopperId: 'string',
          vendorId: 'string',
          orderStatus: 'confirmed',
          orderId: 'string5',
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
