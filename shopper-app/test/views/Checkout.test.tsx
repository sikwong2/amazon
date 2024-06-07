import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { LoginContext, LoginProvider } from '@/context/Login';
import { PageContext, PageProvider } from '@/context/Page';
import { CartContext, CartProvider } from '@/context/Cart';


import { Checkout } from '@/views/Checkout';
import { SearchProvider } from '@/context/SearchContext';
import React from 'react';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

let member = true;
let getByProduct = true;
let createOrder = true;
let getCheckoutURL = true; 

const handlers = [
  graphql.query('member', ({ query, variables }) => { 
    if (member) {
      return HttpResponse.json({
        data: {
          getMemberInfo: {
            address: 'test address',
            name: 'test name'
          }
        },
      })
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Some Error' }],
      });
    }
  }),
  graphql.query('product', ({ query, variables }) => {
    if (getByProduct) {
      return HttpResponse.json({
        data: {
          getByProductId: {
            category: ['movie', 'dvd', 'shrek'],
            description: ['this is test description'],
            id: 'f697a5b6-7119-47ab-a050-61150cd55b5d',
            image: ["https://m.media-amazon.com/images/I/51JSHMYGTYL._AC_UF894,1000_QL80_.jpg"],
            name: "test product name",
            price: 12, 
            rating: 5,
            stock: 5
          }
        }
      })
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Some Error' }],
      });      
    }
  }),
  graphql.mutation('createOrder', ({query, variables}) => {
    if (createOrder) {
      return HttpResponse.json({
        data: {
          createOrder: {
            products: ['f697a5b6-7119-47ab-a050-61150cd55b5d', 'f697a5b6-7119-47ab-a050-61150cd55b5d', 'f697a5b6-7119-47ab-a050-61150cd55b5d'],
            shopperId: 'f697a5b6-7119-47ab-a050-61150cd55b5d',
            vendorId: 'f697a5b6-7119-47ab-a050-61150cd55b5d',
            orderStatus: 'delivered'
          }
        }
      })
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Some Error' }],
      });      
    }
  }),
  graphql.query('checkoutURL', ({query, variables}) => {
    if (getCheckoutURL) {
      return HttpResponse.json({
        data: {
          getCheckoutURL: {
            name: 'molly member',
            quantity: 2,
            price: 2
          }
        }
      })
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Some Error' }],
      });          
    }

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

// used for mocking useMediaQuery breakpoints (xs: 0, sm: 600, md: 900, lg: 1200)
// https://mui.com/material-ui/react-use-media-query/#testing
// Utility function to create matchMedia mock
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    const instance: MediaQueryList = {
      matches: mediaQuery.match(query, { width }),
      media: query,
      addListener: (listener: (e: MediaQueryListEvent) => void) => {
        listeners.push(listener);
      },
      removeListener: (listener: (e: MediaQueryListEvent) => void) => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      },
      addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          listeners.push(listener as (e: MediaQueryListEvent) => void);
        }
      },
      removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          const index = listeners.indexOf(listener as (e: MediaQueryListEvent) => void);
          if (index !== -1) {
            listeners.splice(index, 1);
          }
        }
      },
      dispatchEvent: (event: Event) => true,
      onchange: null
    };

    return instance;
  };
}


const setScreenWidth = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};


const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders Checkout', async () => {
  const page = 'checkout'
  const setPage = (page: string) => {}
  let accessToken = '123';
  const setAccessToken = (newToken: string) => {
    accessToken = newToken;
  };
  const userName = '123';
  const setUserName = () => {};
  const role = '123';
  const setRole = (newrole: string) => {}
  let id = '123';
  const setId = (newid: string) => {
    id = newid;
  };
  const cart = {
    "product-123": 2,
    "product-456": 5,
    "product-789": 1
  };
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};

  // mocks state of order
  const useStateMock = jest.spyOn(React, 'useState');
  
  const mockOrder = {
    products: ['product 1', 'product 2', 'product 3'],
    shopperId: '123',
    orderStatus: 'pending',
    vendorId: 'fb31ce70-f4f3-4bcc-b493-14e8311c61d1',
  };
  
  useStateMock.mockImplementationOnce(() => [mockOrder, jest.fn()]);

  // mocks window.open
  window.alert = () => {}; 

  jest.useFakeTimers();
  jest.runAllTimers();

  await act(async () => render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateProductQuantity}}>
            <Checkout />
          </CartContext.Provider>
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  ));
  expect(screen.getByLabelText('header')).toBeDefined();
  const checkout = screen.getByLabelText('checkout');
  expect(checkout).toBeDefined();
  fireEvent.click(checkout);
  const radio2 = screen.getByLabelText('radio-2');
  expect(radio2).toBeDefined();
  fireEvent.click(radio2)
  const placeOrder = screen.getByLabelText('Place Order');
  expect(placeOrder).toBeDefined();
  fireEvent.click(placeOrder);
  const checkoutTitle = screen.getByLabelText('checkout-title');
  expect(checkoutTitle).toBeDefined();
  fireEvent.click(checkoutTitle);
  const stayInCheckout = screen.getByLabelText('stay in checkout');
  expect(stayInCheckout).toBeDefined();
  fireEvent.click(stayInCheckout);
  fireEvent.click(checkoutTitle);
  const returnToCart = screen.getByLabelText('return to cart');
  expect(returnToCart).toBeDefined();
  fireEvent.click(returnToCart);
  fireEvent.click(checkoutTitle);
  await waitFor(() => {
    expect(screen.getByLabelText('show-popover')).toBeDefined();
  })
  fireEvent.click(screen.getByLabelText('header'));
});

it('Renders Checkout Member Error', async () => {
  member = false;
  const page = 'checkout'
  const setPage = (page: string) => {}
  let accessToken = '123';
  const setAccessToken = (newToken: string) => {
    accessToken = newToken;
  };
  const userName = '123';
  const setUserName = () => {};
  const role = '123';
  const setRole = (newrole: string) => {}
  let id = '123';
  const setId = (newid: string) => {
    id = newid;
  };
  const cart = {
    "product-123": 2,
    "product-456": 5,
    "product-789": 1
  };
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};

  // mocks state of order
  const useStateMock = jest.spyOn(React, 'useState');
  
  const mockOrder = {
    products: ['product 1', 'product 2', 'product 3'],
    shopperId: '123',
    orderStatus: 'pending',
    vendorId: 'fb31ce70-f4f3-4bcc-b493-14e8311c61d1',
  };
  
  useStateMock.mockImplementationOnce(() => [mockOrder, jest.fn()]);


  await act(async () => render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateProductQuantity}}>
            <Checkout />
          </CartContext.Provider>
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  ));
  expect(screen.getByLabelText('header')).toBeDefined();
  member = true;
});



it('Renders Checkout createOrder Error', async () => {
  createOrder = false;
  const page = 'checkout'
  const setPage = (page: string) => {}
  let accessToken = '123';
  const setAccessToken = (newToken: string) => {
    accessToken = newToken;
  };
  const userName = '123';
  const setUserName = () => {};
  const role = '123';
  const setRole = (newrole: string) => {}
  let id = '123';
  const setId = (newid: string) => {
    id = newid;
  };
  const cart = {
    "product-123": 2,
    "product-456": 5,
    "product-789": 1
  };
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};

  // mocks state of order
  const useStateMock = jest.spyOn(React, 'useState');
  
  const mockOrder = {
    products: ['product 1', 'product 2', 'product 3'],
    shopperId: '123',
    orderStatus: 'pending',
    vendorId: 'fb31ce70-f4f3-4bcc-b493-14e8311c61d1',
  };
  
  useStateMock.mockImplementationOnce(() => [mockOrder, jest.fn()]);


  await act(async () => render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateProductQuantity}}>
            <Checkout />
          </CartContext.Provider>
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  ));
  expect(screen.getByLabelText('header')).toBeDefined();

  expect(screen.getByLabelText('header')).toBeDefined();
  const checkout = screen.getByLabelText('checkout');
  expect(checkout).toBeDefined();
  fireEvent.click(checkout);
  const radio2 = screen.getByLabelText('radio-2');
  expect(radio2).toBeDefined();
  fireEvent.click(radio2)
  const placeOrder = screen.getByLabelText('Place Order');
  expect(placeOrder).toBeDefined();
  fireEvent.click(placeOrder);
  const checkoutTitle = screen.getByLabelText('checkout-title');
  expect(checkoutTitle).toBeDefined();
  fireEvent.click(checkoutTitle);
  const stayInCheckout = screen.getByLabelText('stay in checkout');
  expect(stayInCheckout).toBeDefined();
  fireEvent.click(stayInCheckout);
  fireEvent.click(checkoutTitle);
  const returnToCart = screen.getByLabelText('return to cart');
  expect(returnToCart).toBeDefined();
  fireEvent.click(returnToCart);
  fireEvent.click(checkoutTitle);
  await waitFor(() => {
    expect(screen.getByLabelText('show-popover')).toBeDefined();
  })
  fireEvent.click(screen.getByLabelText('header'));
  createOrder = true;
});

it('Renders Checkout getByCheckoutURL Error', async () => {
  getCheckoutURL = false;
  const page = 'checkout'
  const setPage = (page: string) => {}
  let accessToken = '123';
  const setAccessToken = (newToken: string) => {
    accessToken = newToken;
  };
  const userName = '123';
  const setUserName = () => {};
  const role = '123';
  const setRole = (newrole: string) => {}
  let id = '123';
  const setId = (newid: string) => {
    id = newid;
  };
  const cart = {
    "product-123": 2,
    "product-456": 5,
    "product-789": 1
  };
  const setCart = () => {};
  const addToCart = () => {};
  const removeFromCart = () => {};
  const updateProductQuantity = () => {};

  // mocks state of order
  const useStateMock = jest.spyOn(React, 'useState');
  
  const mockOrder = {
    products: ['product 1', 'product 2', 'product 3'],
    shopperId: '123',
    orderStatus: 'pending',
    vendorId: 'fb31ce70-f4f3-4bcc-b493-14e8311c61d1',
  };
  
  useStateMock.mockImplementationOnce(() => [mockOrder, jest.fn()]);


  await act(async () => render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateProductQuantity}}>
            <Checkout />
          </CartContext.Provider>
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  ));
  expect(screen.getByLabelText('header')).toBeDefined();

  expect(screen.getByLabelText('header')).toBeDefined();
  const checkout = screen.getByLabelText('checkout');
  expect(checkout).toBeDefined();
  fireEvent.click(checkout);
  const radio2 = screen.getByLabelText('radio-2');
  expect(radio2).toBeDefined();
  fireEvent.click(radio2)
  const placeOrder = screen.getByLabelText('Place Order');
  expect(placeOrder).toBeDefined();
  fireEvent.click(placeOrder);
  const checkoutTitle = screen.getByLabelText('checkout-title');
  expect(checkoutTitle).toBeDefined();
  fireEvent.click(checkoutTitle);
  const stayInCheckout = screen.getByLabelText('stay in checkout');
  expect(stayInCheckout).toBeDefined();
  fireEvent.click(stayInCheckout);
  fireEvent.click(checkoutTitle);
  const returnToCart = screen.getByLabelText('return to cart');
  expect(returnToCart).toBeDefined();
  fireEvent.click(returnToCart);
  fireEvent.click(checkoutTitle);
  await waitFor(() => {
    expect(screen.getByLabelText('show-popover')).toBeDefined();
  })
  fireEvent.click(screen.getByLabelText('header'));
  getCheckoutURL = true;
});
