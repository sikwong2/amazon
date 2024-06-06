import { render, screen } from '@testing-library/react';
import Index from '@/pages';

import { useRouter } from 'next/router';
import { fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { SearchProvider } from '@/context/SearchContext';
import { PageProvider, PageContext } from '@/context/Page';
import { LoginContext, LoginProvider } from '../../src/context/Login';

// https://www.npmjs.com/package/next-router-mock
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

it('Renders', async () => {
  render(
    <SearchProvider>
      <PageProvider>
        <Index />
      </PageProvider>
    </SearchProvider>
  );
  expect(screen.findByText('go-to-login')).toBeDefined();
  expect(screen.findByText('change-language')).toBeDefined();
});

it('Renders Cart', async () => {
  const page = 'cart'
  const setPage = (page: string) => {}
  let accessToken = '123';
  const setAccessToken = (newToken: string) => {
    accessToken = newToken;
  };
  const userName = '123';
  const setUserName = () => {};
  const role = 'member';
  const setRole = (newrole: string) => {}
  let id = '123';
  const setId = (newid: string) => {
    id = newid;
  };
  render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <Index />
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  );
  expect(screen.findByText('go-to-login')).toBeDefined();
  expect(screen.findByText('change-language')).toBeDefined();
});

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
  render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <Index />
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  );
  expect(screen.findByText('go-to-login')).toBeDefined();
  expect(screen.findByText('change-language')).toBeDefined();
});


it('Renders OrderHistory', async () => {
  const page = 'orderHistory'
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
  render(
    <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <SearchProvider>
        <PageContext.Provider value={{page, setPage}}>
          <Index />
        </PageContext.Provider>
      </SearchProvider>
    </LoginContext.Provider>
  );
  expect(screen.findByText('go-to-login')).toBeDefined();
  expect(screen.findByText('change-language')).toBeDefined();
});