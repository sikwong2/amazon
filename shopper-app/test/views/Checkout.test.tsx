import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { LoginContext, LoginProvider } from '@/context/Login';
import { PageContext, PageProvider } from '@/context/Page';
import { CartContext, CartProvider } from '@/context/Cart';


import { Checkout } from '@/views/Checkout';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const handlers = [
  graphql.query('member', ({ query, variables }) => { 
    return HttpResponse.json({
      data: {
        getMemberInfo: {
          address: 'test address',
          name: 'test name'
        }
      }
    })
  }),
  graphql.query('product', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        getByProductId: {
          category: ['movie', 'dvd', 'shrek'],
          description: ['this is test description'],
          id: ['1234'],
          image: ["https://m.media-amazon.com/images/I/51JSHMYGTYL._AC_UF894,1000_QL80_.jpg"],
          name: "test product name",
          price: 'test price', 
          rating: 'test rating',
          stock: 'test stock'
        }
      }
    })
  })
];

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Get Checkout Title', () => {
  it('Renders Checkout page', async () => {
  let accessToken = '12345';
  const setAccessToken = () => {};
  const userName = '';
  const setUserName = () => {};
  const role = 'vendor';
  const setRole = () => {};
  const id = '';
  const setId = () => {};
  const page = 'checkout';
  const setPage = () => {};
  const cart = {};
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};

    render(
      <LoginProvider>
        <PageContext.Provider value={{ page , setPage }}>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </PageContext.Provider>
      </LoginProvider>
    );

    await act(async () => {
      await screen.getByLabelText('checkout-title');
      await screen.getByLabelText('shipping-address-label')
    });
  });
});
