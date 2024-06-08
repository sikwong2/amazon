import { fireEvent, render, screen } from '@testing-library/react';
import TopBar from '@/components/TopBar';
import { SearchProvider } from '@/context/SearchContext';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Login } from '@/views/Login';
import userEvent from '@testing-library/user-event';
import { LoginContext, LoginProvider } from '@/context/Login';
import React from 'react';
import mediaQuery from 'css-mediaquery';
import { Home } from '@/views/Home';


jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const handlers = [
  graphql.query('getMemberInfo', ({ query, variables }) => { 
    return HttpResponse.json({
      data: {
        getMemberInfo: {
          address: 'test address',
          name: 'test name'
        }
      }
    })
  })
];
// let apiCalled = false; 
// const handlers = [
//   graphql.query('login', ({ query, variables }) => {
//     apiCalled = true;
//     if (query.includes('anna@books.com')) {
//       return HttpResponse.json({
//         errors: [
//           {
//             message: 'Some Error',
//           },
//         ],
//       });
//     }
//     return HttpResponse.json({
//       data: {
//         login: {
//           id: 'Some Id',
//           name: 'Some Name',
//           accessToken: 'Some JWT',
//         },
//       },
//     });
//   }),
// ];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders', async () => {
  render(
    <SearchProvider>
      <TopBar/>
    </SearchProvider>
  );
});

it('Sign-In', async () => {
  render(
    <SearchProvider>
      <TopBar/>
    </SearchProvider>
  );
  const signIn = await screen.findByLabelText('sign-in');
  fireEvent.click(signIn);
});

it('Sign-Out', async () => {
  let accessToken = '12345';
  const setAccessToken = () => {};
  const userName = '';
  const address = 'some long address i dont know what to put at the moment'
  const setUserName = () => {};
  const role = 'vendor';
  const setRole = () => {};
  const id = '';
  const setId = () => {};

  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <TopBar />
      </SearchProvider>
    </LoginContext.Provider>
  );

  const signOut = await screen.findByLabelText('user');
  fireEvent.click(signOut);
});

it('Orders', async () => {
  render(
    <SearchProvider>
      <TopBar/>
    </SearchProvider>
  );
  const orders = await screen.findByLabelText('orders');
  fireEvent.click(orders);
});

it('Cart', async () => {
  render(
    <SearchProvider>
      <TopBar/>
    </SearchProvider>
  );
  const cart = await screen.findByLabelText('cart');
  fireEvent.click(cart);
});

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

it('Menu', async () => {
  setScreenWidth(5);
  render(
    <SearchProvider>
      <Home/>
    </SearchProvider>
  );
  const menu = await screen.findByLabelText('menu');
  fireEvent.click(menu);
  const language = await screen.findAllByLabelText('change-language');
  fireEvent.click(language[1]);
  const popover = await screen.findByLabelText('language-selection-menu');
  fireEvent.click(popover);
  const mandarin = await screen.findAllByLabelText('English - EN');
  fireEvent.click(mandarin[1]);
  fireEvent.keyDown(menu, {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27
  });
});
