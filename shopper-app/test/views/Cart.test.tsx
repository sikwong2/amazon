import { graphql, HttpResponse } from 'msw'
import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { LoginContext } from '@/context/Login';
import { SearchProvider } from '@/context/SearchContext';
import { PageContext } from '@/context/Page';
import { Cart } from '@/views/Cart';
import { CartContext } from '@/context/Cart';
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
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('renders', async () => {
  const setPage = () => { };
  const page: string = 'cart';

  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'shopper';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };

  const cart = {"string": 1};
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};
  render(
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateProductQuantity }}>
      <SearchProvider>
        <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
          <PageContext.Provider value={{ page, setPage }}>
            <Cart />
          </PageContext.Provider>
        </LoginContext.Provider>
      </SearchProvider>
    </CartContext.Provider>
  );
  fireEvent.click(screen.getByLabelText('go-to-checkout'));
})

it('Goto checkout when not logged in', async () => {
  const setPage = () => { };
  const page: string = 'cart';

  let accessToken = '';
  const setAccessToken = () => { };
  const userName = '';
  const setUserName = () => { };
  const role = '';
  const setRole = () => { };
  const id = '';
  const setId = () => { };

  const cart = {"string": 1};
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};
  render(
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateProductQuantity }}>
      <SearchProvider>
        <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
          <PageContext.Provider value={{ page, setPage }}>
            <Cart />
          </PageContext.Provider>
        </LoginContext.Provider>
      </SearchProvider>
    </CartContext.Provider>
  );
  fireEvent.click(screen.getByLabelText('go-to-checkout'));
})